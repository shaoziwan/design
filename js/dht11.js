function dht11() {
	var temp = document.getElementById("temp-display");
	var humi = document.getElementById("humi-display");
	try{
		console.log("status加载")
		$.get("../cgi-bin/list.cgi", {}, function (data, status) {
			//alert(data);
			if (status == "success") {
				var arr = data.split(",");
				var temp_arr = arr[0].split(":");
				var humi_arr = arr[1].split(":");
				temp.innerHTML = temp_arr[1];
				humi.innerHTML = humi_arr[1];
				//change_log(data);
				g_Temp = temp_arr[1];
				g_Humi = humi_arr[1];
				console.log("g_Temp",g_Temp,"g_Humi",g_Humi)
			}
			else {

			}
		});
	}
	catch(error){
		console.log("设备不在线")
	}
	
	setTimeout("dht11()", 1000);
}

function loadInfo() {
	//userInfo = new object;
	$.get("../cgi-bin/loadUserInfo.cgi", { name: document.getElementById("user-name").innerHTML }, function (data, status) {
		//alert(data);
		var info = data.split(";");
		//alert($("#temp-min").val());
		document.getElementById("temp-min").value =Number( info[4].split("=")[1].split("t")[0]);
		document.getElementById("temp-max").value =Number( info[4].split("=")[1].split("t")[1]);
		document.getElementById("humi-min").value =Number( info[4].split("=")[1].split("t")[2]);
		document.getElementById("humi-max").value =Number( info[4].split("=")[1].split("t")[3]);
												
	});
}

function changeUserInfo() {
	var tempMin = document.getElementById("temp-min").value;
	var tempMax = document.getElementById("temp-max").value;
	var humiMin = document.getElementById("humi-min").value;
	var humiMax = document.getElementById("humi-max").value;
	//alert(typeof(tempMax));

	$.get("../cgi-bin/changeUserInfo.cgi", { name: document.getElementById("user-name").innerHTML, value: (tempMin + "t" + tempMax + "t" + humiMin + "t" + humiMax) }, function (data, status) {
		//alert(data);
		window.location.href = "./index.html";
	});
	loadInfo();
}