#!/bin/sh

#initialize the mio-pin 
echo 0 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio0/direction
echo 1 > /sys/class/gpio/gpio0/value

#initialize the led & beep
echo 55 > /sys/class/gpio/export
echo 10 > /sys/class/gpio/export
echo 11 > /sys/class/gpio/export
echo 12 > /sys/class/gpio/export
echo 13 > /sys/class/gpio/export

#setup port direction
echo out > /sys/class/gpio/gpio55/direction
echo out > /sys/class/gpio/gpio10/direction
echo out > /sys/class/gpio/gpio11/direction
echo out > /sys/class/gpio/gpio12/direction
echo out > /sys/class/gpio/gpio13/direction

