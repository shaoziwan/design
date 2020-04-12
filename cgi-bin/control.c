#include<stdio.h>
#include<string.h>
#include<stdlib.h>

#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>

#define MIN_LEN 10
#define HIGH   "up"
#define LOW    "down"
#define STR_LEN 128

const char path[] = "/www/cgi-bin/control.log";

typedef struct
{
	char deviceName[STR_LEN];
	int devicePin;
	//char deviceValue[STR_LEN];
}GpioDevice;

GpioDevice Gpio_info[] = {
	{"beep",55},
	{"led_0",10},
	{"led_1",11},
	{"led_2",12},
	{"led_3",13},
};

int GPIO_Contrl(int fp,char *op_device, char *op_data)
{
	char cmd[128] = { 0 };
	int i;
	for (i = 0; i < (sizeof(Gpio_info) / sizeof(GpioDevice)); i++)
	{
		if (0 == strcmp(op_device, Gpio_info[i].deviceName))
		{
			if (0 == strcmp(op_data, HIGH))
			{
				sprintf(cmd, "echo %d > /sys/class/gpio/gpio%d/value",
					1, Gpio_info[i].devicePin);
				write(fp, cmd, strlen(cmd) + 1);
				break;
			}
			else if (0 == strcmp(op_data, LOW))
			{
				sprintf(cmd, "echo %d > /sys/class/gpio/gpio%d/value",
					0, Gpio_info[i].devicePin);
				write(fp, cmd, strlen(cmd) + 1);
				break;
			}
			else
			{
				return -1;
			}
		}
	}
	if (i >= (sizeof(Gpio_info) / sizeof(GpioDevice)))
	{
		return -1;
	}
	if (-1 == system(cmd))
	{
		return -1;
	}
	return 0;
}

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

int main()
{
	char *addr;
	addr = getenv("REMOTE_ADDR");
	char *data;
	char name[2][STR_LEN] = { 0 };
	char value[2][STR_LEN] = { 0 };
	char tmp[STR_LEN] = { 0 };
	char tmp1[2][STR_LEN] = { 0 };
	data = getenv("QUERY_STRING");
	//scanf("%s", data);
	departstr(data, '&', tmp1);
	departstr(tmp1[0], '=', name);
	departstr(tmp1[1], '=', value);
	//sscanf(data, "name=%s&value=%s", name, value);
	int fp;
	fp = open(path, O_CREAT|O_APPEND | O_RDWR, 0777);
	sprintf(tmp, "\n%s->>>name=%s&value=%s\n",addr, name[1], value[1]);
	printf("%s\n", tmp);
	//write(fp, data, strlen(data) + 1);
	write(fp, tmp, strlen(tmp)+1);
	GPIO_Contrl(fp,name[1], value[1]);
	close(fp);
	return 0;
}
