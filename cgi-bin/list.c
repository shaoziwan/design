#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include<string.h>
#include<stdlib.h>

//network
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

//file normal
#include <unistd.h>
#include <sys/stat.h>
#include <pthread.h>
#include <dirent.h>
#include <fcntl.h>

//time
#include <time.h>


#define BUF_SIZE 1024
#define LISTEN_LENGTH 20
#define STR_LEN 256


#define MIN_LEN 10


//--------------------------------------------
//  帧头 功能码
char g_input_cmd[]="#1!";//获取商品信息数据
#define PORT 8008
char ipAddr[] = "192.168.4.2";//单片机IP地址

int main(int argc, char *argv[])
{
	printf("hello \n");
	int fd;
	unsigned char buf[STR_LEN];	
	int length;
	char tmp[STR_LEN] = { 0 };

	char *addr;
	printf("hello \n");
	addr = getenv("REMOTE_ADDR");
	buf[0]=3;
	buf[2]=10;

	

	//通信套接字
	int sockfd;
	int recvBytes;
	//unsigned char buffer[BUF_SIZE];

	//ip 地址结构体
	struct hostent *host;

	//server 地址结构体
	struct sockaddr_in server_addr;

	//解析并将字符串ip转换成ip结构体中
	host=gethostbyname(ipAddr);
	printf("init\n");
	if(NULL==host)
	{
		printf("honst name error!\n");
		exit(1);
	}

	//创建通信套接字
	sockfd=socket(AF_INET,SOCK_STREAM,0);
	if(sockfd<0)
	{
		printf("socket error!\n");
		exit(1);
	}

	//填充服务器端的ip地址和端口进地址结构体
	server_addr.sin_family=AF_INET;
	server_addr.sin_port=htons(PORT);
	server_addr.sin_addr=*((struct in_addr*)host->h_addr);
	bzero(&(server_addr.sin_zero),8);

	printf("init ok\n");
	//请求链接服务器
	if(connect(sockfd,(struct sockaddr* )&server_addr,sizeof(struct sockaddr))<0)
	{
		//连接失败，服务器不在线
		printf("Error\n");
		
	}

	//发送数据
	send(sockfd,g_input_cmd,strlen(g_input_cmd)+1,0);
	printf("send ok\n");
	//接收数据
	recvBytes=recv(sockfd,buf,sizeof(buf),0);
	//关闭套接字
	close(sockfd);

	//显示网页信息
	// 商品分类 剩余数量
	printf("Content-Type:text/html\n\n");
	printf("{\"xuebi\":%d,\"kele\":%d,\"lvcha\":%d,\"pijiu\":%d,\"hongniu\":%d}\n", buf[0]-'0', buf[1]-'0',buf[2]-'0', buf[3]-'0', buf[4]-'0');
	return 0;
}