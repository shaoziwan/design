var g_Temp,g_Humi

Highcharts.chart('container', {
	chart: {
		type: 'spline',
		animation: Highcharts.svg, // don't animate in old IE
		marginRight: 10,
		events: {
			load: function () {

				// set up the updating of the chart each second
				var series = this.series[0];
				setInterval(function () {
					var x = (new Date()).getTime(), // current time
						y = Number(g_Temp);
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},

	time: {
		useUTC: false
	},

	title: {
		text: '实时温度曲线'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: '摄氏度'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	},
	tooltip: {
		headerFormat: '<b>{series.name}</b><br/>',
		pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}℃'
	},
	legend: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		name: '温度',
		data: (function () {
			// generate an array of random data
			var data = [],
				time = (new Date()).getTime(),
				i;

			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: g_Temp
				});
			}
			return data;
		}())
	}]
});

Highcharts.chart('container1', {
	chart: {
		type: 'spline',
		animation: Highcharts.svg, // don't animate in old IE
		marginRight: 10,
		events: {
			load: function () {

				// set up the updating of the chart each second
				var series = this.series[0];
				setInterval(function () {
					var x = (new Date()).getTime(), // current time
						y = Number(g_Humi);
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},

	time: {
		useUTC: false
	},

	title: {
		text: '实时湿度曲线'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: '度'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	},
	tooltip: {
		headerFormat: '<b>{series.name}</b><br/>',
		pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}度'
	},
	legend: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		name: '湿度',
		data: (function () {
			// generate an array of random data
			var data = [],
				time = (new Date()).getTime(),
				i;

			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: g_Humi
				});
			}
			return data;
		}())
	}]
});