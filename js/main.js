function load() {
	// dht11();
}

function check_login() {
	var strCookie = document.cookie;
	//alert(strCookie); 
	if (strCookie.length == 0) {
		alert("请先登录");
		window.location.href = "../index.html";
	}
	else {
		document.getElementById("user-name").innerHTML = strCookie.split("=")[1].split(";")[0];
	}
}


function user_exit() {
	var strCookie = document.cookie;
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = "userId=" + strCookie.split("=")[1].split(";")[0]; + "=v;path=/; expires=" + date.toGMTString();
	document.cookie = "userId=" + strCookie.split("=")[1].split(";")[0]; + "=v;path=/html; expires=" + date.toGMTString();
	document.cookie = "userName=" + strCookie.split("=")[1].split(";")[0]; + "=v;path=/; expires=" + date.toGMTString();
	document.cookie = "userName=" + strCookie.split("=")[1].split(";")[0]; + "=v;path=/html; expires=" + date.toGMTString();
	window.location.href = "../index.html";
}

/*
* This function is to use form to simulate request.
* @url: url link
* @action: "get", "post"
* @json: {'key1':'value2', 'key2':'value2'} 
*/
function doFormRequest(url, action, json) {
	var form = document.createElement("form");
	form.action = url;
	form.method = action;

	// append input attribute and valus
	for (var key in json) {
		if (json.hasOwnProperty(key)) {
			var val = json[key];
			input = document.createElement("input");
			input.type = "hidden";
			input.name = key;
			input.value = val;

			// append key-value to form
			form.appendChild(input)
		}
	}

	// send post request
	document.body.appendChild(form);
	form.submit();

	// remove form from document
	document.body.removeChild(form);
}

var led_img1 = 0, led_img2 = 0, led_img3 = 0, led_img4 = 0;
var beep_img = 0;
var all_switch_value = 0;
var check_value = 0; var t3;

function change_beep_img()
{
	var img = document.getElementById("beep-img");
	if (beep_img == 0) {
		beep_img = 1;
		img.src = "../images/v3.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'beep', 'value': '1' });
		try {
			$.get("../cgi-bin/control.cgi", { 'name': 'beep', 'value': 'up' }, function (data, status) {
				//alert(status);
				if (status == "success") {
					change_log(data);
				}
				else {
					change_log("Error,please check connect!");
				}
				
				});
		} catch (error) {
			alert("Error,please check connect!");

		}
		
	}
	else {
		beep_img = 0;
		img.src = "../images/v4.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'beep', 'value': '0' });
		$.get("../cgi-bin/control.cgi", { 'name': 'beep', 'value': 'down' }, function (data) {
			change_log(data);
		});
	}
}

//---------------------------------------
function change_led_img1() {
	var img = document.getElementById("led-img1");
		img.src = "../images/lamp1.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led1', 'value': '1' });
		$.get("../cgi-bin/list.cgi", { 'name': 'led_0', 'value': 'up' }, function (data) {
			
		});
}

function change_led_img2() {
	var img = document.getElementById("led-img2");
	if (led_img2 == 0) {
		led_img2= 1;
		img.src = "../images/lamp1.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led2', 'value': '1' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_1', 'value': 'up' }, function (data) {
			change_log(data);
		});
	}
	else {
		led_img2 = 0;
		img.src = "../images/lamp.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led2', 'value': '0' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_1', 'value': 'down' }, function (data) {
			change_log(data);
		});
	}
}

function change_led_img3() {
	var img = document.getElementById("led-img3");
	if (led_img3 == 0) {
		led_img3 = 1;
		img.src = "../images/lamp1.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led3', 'value': '1' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_2', 'value': 'up' }, function (data) {
			change_log(data);
		});
	}
	else {
		led_img3 = 0;
		img.src = "../images/lamp.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led3', 'value': '0' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_2', 'value': 'down' }, function (data) {
			change_log(data);
		});
	}
}

function change_led_img4() {
	var img = document.getElementById("led-img4");
	if (led_img4 == 0) {
		led_img4 = 1;
		img.src = "../images/lamp1.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led4', 'value': '1' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_3', 'value': 'up' }, function (data) {
			change_log(data);
		});
	}
	else {
		led_img4 = 0;
		img.src = "../images/lamp.png";
		//doFormRequest("./cgi-bin/conctrl.cgi", "get", { 'name': 'led4', 'value': '0' });
		$.get("../cgi-bin/control.cgi", { 'name': 'led_3', 'value': 'down' }, function (data) {
			change_log(data);
		});
	}
}

function all_switch() {
	if (all_switch_value == 0) {
		all_switch_value = 1;
		led_img1 = 0;
		led_img2 = 0;
		led_img3 = 0;
		led_img4 = 0;

		/*禁用其他开关*/
		//document.getElementById("one-text").disabled = true;
		document.getElementById("two-text").disabled = true;
		document.getElementById("three-text").disabled = true;
		document.getElementById("four-text").disabled = true;
	}
	else {
		all_switch_value = 0;
		led_img1 = 1;
		led_img2 = 1;
		led_img3 = 1;
		led_img4 = 1;

		/*启用其他开关*/
		document.getElementById("one-text").disabled = false;
		document.getElementById("two-text").disabled = false;
		document.getElementById("three-text").disabled = false;
		document.getElementById("four-text").disabled = false;
	}
	change_led_img1();
	change_led_img2();
	change_led_img3();
	change_led_img4();
}

var run_value = 0;
var t;
var i = 1;

function run(){
	if (run_value == 0) {
		t=setInterval("run_all_led()", 1000);
		run_value = 1;


		/*禁用其他开关*/
		document.getElementById("one-text").disabled = true;
		//document.getElementById("two-text").disabled = true;
		document.getElementById("three-text").disabled = true;
		document.getElementById("four-text").disabled = true;
	}
	else {
		clearTimeout(t);
		run_value = 0
		i = 1;

		//off all leds
		led_img1 = 1;
		led_img2 = 1;
		led_img3 = 1;
		led_img4 = 1;
		change_led_img1();
		change_led_img2();
		change_led_img3();
		change_led_img4();

		/*启用其他开关*/
		document.getElementById("one-text").disabled = false;
		document.getElementById("two-text").disabled = false;
		document.getElementById("three-text").disabled = false;
		document.getElementById("four-text").disabled = false;
	}
	
}

function run_all_led() {
	led_img1 = 1;
	led_img2 = 1;
	led_img3 = 1;
	led_img4 = 1;
	change_led_img1();
	change_led_img2();
	change_led_img3();
	change_led_img4();

	//run 
	switch (i) {
		case 1: led_img1 = 0;
			change_led_img1();
			break;
		case 2: led_img2 = 0;
			change_led_img2();
			break;
		case 3: led_img3 = 0;
			change_led_img3();
			break;
		case 4:
			led_img4 = 0;
			change_led_img4();
			i = 0;
			break;
	}
	i++;
}

function check_led() {

	if (check_value == 0) {
		t3 = setInterval("check_all_led()", 500);
		check_value = 1;

		/*禁用其他开关*/
		document.getElementById("one-text").disabled = true;
		document.getElementById("two-text").disabled = true;
		//document.getElementById("three-text").disabled = true;
		document.getElementById("four-text").disabled = true;
	}
	else {
		clearTimeout(t3);
		check_value = 0;
		i = 1;

		led_img1 = 1;
		led_img2 = 1;
		led_img3 = 1;
		led_img4 = 1;
		change_led_img1();
		change_led_img2();
		change_led_img3();
		change_led_img4();

		/*启用其他开关*/
		document.getElementById("one-text").disabled = false;
		document.getElementById("two-text").disabled = false;
		document.getElementById("three-text").disabled = false;
		document.getElementById("four-text").disabled = false;
	}

}

function check_all_led() {
	led_img1 = 1;
	led_img2 = 1;
	led_img3 = 1;
	led_img4 = 1;
	change_led_img1();
	change_led_img2();
	change_led_img3();
	change_led_img4();

	//run 
	switch (i) {
		case 1: led_img1 = 0;
			change_led_img1();
			break;
		case 2: led_img2 = 0;
			change_led_img2();
			break;
		case 3: led_img3 = 0;
			change_led_img3();
			break;
		case 4:
			led_img4 = 0;
			change_led_img4();
			break;
		case 5:
			led_img1 = 1;
			led_img2 = 1;
			led_img3 = 1;
			led_img4 = 1;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 6:
			led_img1 = 0;
			led_img2 = 0;
			led_img3 = 0;
			led_img4 = 0;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 7:
			led_img1 = 1;
			led_img2 = 1;
			led_img3 = 1;
			led_img4 = 1;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 8:
			led_img1 = 0;
			led_img2 = 0;
			led_img3 = 0;
			led_img4 = 0;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 9:
			led_img1 = 1;
			led_img2 = 1;
			led_img3 = 1;
			led_img4 = 1;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 10:
			led_img1 = 0;
			led_img2 = 0;
			led_img3 = 0;
			led_img4 = 0;
			change_led_img1();
			change_led_img2();
			change_led_img3();
			change_led_img4();
			break;
		case 11:
			check_led();
			i = 0;
			break;
	}
	i++;
	
}

var error_value = 0, error_led_value = 0;
var t2
function error_led() {
	if (error_value == 0) {
		error_value = 1;
		t2 = setInterval("error_all_led()", 1000);


		/*禁用其他开关*/
		document.getElementById("one-text").disabled = true;
		document.getElementById("two-text").disabled = true;
		document.getElementById("three-text").disabled = true;
		//document.getElementById("four-text").disabled = true;
	}
	else {
		clearTimeout(t2);
		error_value = 0;

		led_img1 = 1;
		led_img2 = 1;
		led_img3 = 1;
		led_img4 = 1;
		change_led_img1();
		change_led_img2();
		change_led_img3();
		change_led_img4();

		/*启用其他开关*/
		document.getElementById("one-text").disabled = false;
		document.getElementById("two-text").disabled = false;
		document.getElementById("three-text").disabled = false;
		document.getElementById("four-text").disabled = false;
	}
}

function error_all_led() {
	if (error_led_value == 0) {
		led_img1 = 1;
		led_img2 = 1;
		led_img3 = 1;
		led_img4 = 1;
		error_led_value = 1;
	}
	else {
		led_img1 = 0;
		led_img2 = 0;
		led_img3 = 0;
		led_img4 = 0;
		error_led_value = 0;
	}

	change_led_img1();
	change_led_img2();
	change_led_img3();
	change_led_img4();
}

var display_log_value = 0;

function display_log() {
	var log_div = document.getElementById("display-log");
	var log_title_text = document.getElementById("log-title");
	if (display_log_value == 0) {
		log_div.style.display = "block";
		display_log_value = 1;
		log_title_text.innerHTML ="隐藏过程";
	}
	else {
		display_log_value = 0;
		log_div.style.display = "none";
		log_title_text.innerHTML ="显示过程";
	}
}

function change_log(data) {
	//alert(data);
	var log_1_line_text = document.getElementById("log-1-line");
	var log_2_line_text = document.getElementById("log-2-line");
	var log_3_line_text = document.getElementById("log-3-line");
	var log_4_line_text = document.getElementById("log-4-line");
	var log_5_line_text = document.getElementById("log-5-line");
	var log_6_line_text = document.getElementById("log-6-line");
	var log_7_line_text = document.getElementById("log-7-line");
	var log_8_line_text = document.getElementById("log-8-line");

	log_8_line_text.innerHTML=log_7_line_text.innerHTML;
	log_7_line_text.innerHTML=log_6_line_text.innerHTML;
	log_6_line_text.innerHTML=log_5_line_text.innerHTML;
	log_5_line_text.innerHTML=log_4_line_text.innerHTML;
	log_4_line_text.innerHTML=log_3_line_text.innerHTML;
	log_3_line_text.innerHTML=log_2_line_text.innerHTML;
	log_2_line_text.innerHTML=log_1_line_text.innerHTML;
	log_1_line_text.innerHTML = data;
}

function clear_log() {
	var log_1_line_text = document.getElementById("log-1-line");
	var log_2_line_text = document.getElementById("log-2-line");
	var log_3_line_text = document.getElementById("log-3-line");
	var log_4_line_text = document.getElementById("log-4-line");
	var log_5_line_text = document.getElementById("log-5-line");
	var log_6_line_text = document.getElementById("log-6-line");
	var log_7_line_text = document.getElementById("log-7-line");
	var log_8_line_text = document.getElementById("log-8-line");

	log_8_line_text.innerHTML = "";
	log_7_line_text.innerHTML = "";
	log_6_line_text.innerHTML = "";
	log_5_line_text.innerHTML = "";
	log_4_line_text.innerHTML = "";
	log_3_line_text.innerHTML = "";
	log_2_line_text.innerHTML = "";
	log_1_line_text.innerHTML = "";
}

function download_log() {
	doFormRequest("../cgi-bin/showLog.cgi", "get", { 'action': 'download', 'file': 'log.txt' });
}



/* Copyright (C) 2007 Richard Atterer, richard©atterer.net
   This program is free software; you can redistribute it and/or modify it
   under the terms of the GNU General Public License, version 2. See the file
   COPYING for details. */

var imageNr = 0; // Serial number of current image
var finished = new Array(); // References to img objects which have finished downloading
var paused = false;

function createImageLayer() {
	var img = new Image();
	img.style.position = "absolute";
	img.style.zIndex = -1;
	img.onload = imageOnload;
	img.onclick = imageOnclick;
	img.src = "http://192.168.64.101:8080/?action=snapshot&n=" + (++imageNr);
	var webcam = document.getElementById("webcam");
	webcam.insertBefore(img, webcam.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
	this.style.zIndex = imageNr; // Image finished, bring to front!
	while (1 < finished.length) {
		var del = finished.shift(); // Delete old image(s) from document
		del.parentNode.removeChild(del);
	}
	finished.push(this);
	if (!paused) createImageLayer();
}

function imageOnclick() { // Clicking on the image will pause the stream
	paused = !paused;
	if (!paused) createImageLayer();
}
