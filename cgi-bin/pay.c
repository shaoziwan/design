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
char g_input_cmd[]="#200000!";//获取商品信息数据
#define PORT 8008
char ipAddr[] = "192.168.4.2";//单片机IP地址

//分割字符串
int  departstr(char *str, char depart, char finalstr[][STR_LEN])
{
	int len, i;
	len = strlen(str);
	int count = 0, j = 0;
	for (i = 0; i < len; i++)
	{
		if (str[i] == depart)
		{
			finalstr[count][j] = '\0';
			count++;
			j = 0;
		}
		else
		{
			finalstr[count][j] = str[i];
			j++;
		}
	}
	finalstr[count][j] = '\0';
	return count + 1;
}

int main(int argc, char *argv[])
{
	int fd;
	unsigned char buf[BUF_SIZE];	
	int length;
	char tmp[STR_LEN] = { 0 };

	char *addr;
	addr = getenv("REMOTE_ADDR");
	buf[0]=3;
	buf[2]=10;
	char *data;
	data = getenv("QUERY_STRING");
	char tmp1[5][STR_LEN] = {0};
	char xuebiCountStr[2][STR_LEN] = {0};
	char keleCountStr[2][STR_LEN] = {0};
	char lvchaCountStr[2][STR_LEN] = {0};
	char pijiuCountStr[2][STR_LEN] = {0};
	char hongniuCountStr[2][STR_LEN] = {0};
	
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

	//解析购买的商品数量
	departstr(data, '&', tmp1);
	departstr(tmp1[0], '=', xuebiCountStr);
	departstr(tmp1[1], '=', keleCountStr);
	departstr(tmp1[2], '=', lvchaCountStr);
	departstr(tmp1[3], '=', pijiuCountStr);
	departstr(tmp1[4], '=', hongniuCountStr);


	g_input_cmd[2] = xuebiCountStr[1][0];
	g_input_cmd[3] = keleCountStr[1][0];
	g_input_cmd[4] = lvchaCountStr[1][0];
	g_input_cmd[5] = pijiuCountStr[1][0];
	g_input_cmd[6] = hongniuCountStr[1][0];

	//填充服务器端的ip地址和端口进地址结构体
	server_addr.sin_family=AF_INET;
	server_addr.sin_port=htons(PORT);
	server_addr.sin_addr=*((struct in_addr*)host->h_addr);
	bzero(&(server_addr.sin_zero),8);

	//请求链接服务器
	if(connect(sockfd,(struct sockaddr* )&server_addr,sizeof(struct sockaddr))<0)
	{
		//连接失败，服务器不在线
		printf("Error/n");
		
	}
	//发送数据
	send(sockfd,g_input_cmd,strlen(g_input_cmd)+1,0);
	//接收数据
	recvBytes=recv(sockfd,buf,sizeof(buf),0);
	//关闭套接字
	close(sockfd);

	//显示网页信息
	// 商品分类 剩余数量
	
	printf("Content-Type:text/html\n\n");
	printf("%d",buf[0]-'0');
	return 0;
}