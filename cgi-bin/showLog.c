#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>

#define MAX_LINE 1024

const char path[] = "./control.log";

int main()
{
	char *addr;
	addr = getenv("REMOTE_ADDR");
	int count = 0;
	/*printf("%s\r\n\r\n", "Content_Type:text/html");*/
	printf("<!DOCTYPE html><html lang = \"cn\"><head><meta charset = \"utf-8\"><title>智能环境监控系统</title><meta http - equiv = \"Content-Type\" content = \"text/html; charset=utf-8\"><meta name = \"viewport\" content = \"width=device-width,inital-scale=1.0\"><!--自适应--><link rel = \"icon\" type = \"image/x-icon\" href = \"../images/favicon.ico\"></head><body>");
	FILE *fp;
	char strLine[MAX_LINE];	//读取缓冲区
	printf("<p>路径:/www/cgi-bin/control.log<p>");
	if ((fp = fopen(path, "r")) == NULL)		//判断文件是否存在及可读
	{
		printf("找不到日志文件!");
		return -1;
	}
	printf("<h1>全部日志</h1><h3>本机ip地址:%s</h3><pre>",addr);
	while (!feof(fp))									//循环读取每一行，直到文件尾
	{
		fgets(strLine, MAX_LINE, fp);					    //将fp所指向的文件一行内容读到strLine缓冲区
		if (strlen(strLine) != 0)
			printf("%d:%s", count++, strLine);		   					//输出所读到的内容
		//DO SOMETHING ELSE
	}
	printf("</pre>");
	printf("</body></html>");
	fclose(fp);
	return 0;
}
