#include<stdio.h>
#include<stdlib.h>

int main()
{
	char *data;
	int a = 0, b = 0;
	data = getenv("QUERY_STRING");
	//printf("data=%s\n", data);
	printf("%s\r\n\r\n", "Content_Type:text/html");
	printf("<html>\n<title>cgi1:相加结果</title><br>");
	sscanf(data, "m=%d&n=%d", &a, &b);
	printf("%d\n", a + b);
	printf("</html>");
	return 0;

}