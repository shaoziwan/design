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
	char *data;
	char name[MAX_LINE] = { 0 };
	char passwd[MAX_LINE] = { 0 };
	char tmp[MAX_LINE] = { 0 };
	data = getenv("QUERY_STRING");
	sscanf(data, "name=%[^&]&value=%s", name,passwd);
	int fp;
	fp = open(path, O_CREAT | O_APPEND | O_RDWR, 0777);
	sprintf(tmp, "\n%s->>>name=%s&value=%s\n", addr, name, passwd);
	write(fp, tmp, strlen(tmp) + 1);
	close(fp);
	if (!strcmp(name, "admin"))
	{
		if (!strcmp(passwd, "admin"))
		{
			printf("success");
		}
		else
		{
			printf("error");
		}
	}
	else
	{
		printf("error");
	}
	return 0;
}
