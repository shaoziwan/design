#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>
#include"sqlite3.h"

#define MAX_LINE 1024

const char path[] = "./control.log";
const char db_path[] = "./login.db";

int flag = 0;

static int callback(void *NotUsed, int argc, char **argv, char **azColName)
{
	int i;

	for (i = 0; i < argc; i++) {
		/*printf("%s = %s;", azColName[i], argv[i] ? argv[i] : "NULL");*/
		/*printf("success");*/
		flag = 1;
	}
	return 0;
}

int changeUserInfo(char *user,char *value)
{
	char tmp[MAX_LINE] = { 0 };
	sqlite3 *db;
	char *zErrMsg = 0;
	int rc;

	if (user == NULL)
	{
		return 0;
	}
	rc = sqlite3_open(db_path, &db);
	if (rc) {
		fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(db));
		sqlite3_close(db);
		return(1);
	}
	/*printf("value:::::%s\n", value);*/
	sprintf(tmp, "update login set one='%s' where userName='%s';",value,user);
	/*printf("tmp=%s\n", tmp);*/
	rc = sqlite3_exec(db, tmp, callback, 0, &zErrMsg);
	/*if (rc != SQLITE_OK) {
		fprintf(stderr, "SQL error: %s\n", zErrMsg);
		sqlite3_free(zErrMsg);
	}*/
	sqlite3_close(db);
	return 0;
}


int main()
{
	char *addr;
	addr = getenv("REMOTE_ADDR");
	char *data;
	char name[MAX_LINE] = { 0 };
	char value[MAX_LINE] = { 0 };
	char tmp[MAX_LINE] = { 0 };
	data = getenv("QUERY_STRING");
	sscanf(data, "name=%[^&]&value=%s", name,value);
	/*printf("name=%s\nvalue=%s\n", name,value);*/
	changeUserInfo(name, value);
	if (flag)
	{
		printf("success");
	}
	else
	{
		printf("error");
	}
	return 0;
}
