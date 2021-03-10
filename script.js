document.getElementById("search-txt").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
    	var searchKey = $("#search-txt").val();
		var com = searchKey.includes(".com"); 
		var coid = searchKey.includes(".co.id");

		if (com || coid)
			window.open('https://'+ searchKey);
		else
			window.open('https://www.google.co.id/search?hl=en&site=webhp&source=hp&q='+ searchKey);

		location.reload();
    }
});

var countdownfunction = setInterval(function() {
	var backgroundMornings = ['morning_1.jpg', 'morning_2.jpg', 'morning_3.jpg', 'morning_4.jpg', 'morning_5.jpg', 'morning_6.jpg', 'morning_7.jpg'];
	var backgroundDays     = ['day_1.jpg', 'day_2.jpg', 'day_3.jpg', 'day_4.jpg', 'day_5.jpg', 'day_6.jpg', 'day_7.jpg'];
	var backgroundEvenings = ['evening_1.jpg', 'evening_2.jpg', 'evening_3.jpg', 'evening_4.jpg', 'evening_5.jpg', 'evening_6.jpg', 'evening_7.jpg'];
	var backgroundNights   = ['night_1.jpg', 'night_2.jpg', 'night_3.jpg', 'night_4.jpg','night_5.jpg', 'night_6.jpg', 'night_7.jpg'];
	var date = new Date();

	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	var dayName = days[date.getDay()];
	var day   	= date.getDate();
	var month 	= months[date.getMonth()];
	var year 	= date.getFullYear();

	var hour   = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	var timeConvention, greeting;
	
	var backgroundMorning = backgroundMornings[date.getDay()];
	var backgroundDay = backgroundDays[date.getDay()];
	var backgroundEvening = backgroundEvenings[date.getDay()];
	var backgroundNight = backgroundNights[date.getDay()];

	if (hour < 10) hour = "0" + hour;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;

	if (hour >= 12 && hour <= 23) {
		greeting = "Good Afternoon";
		timeConvention = " PM";
	 	$("body").css("background-image", "url('Assets/Images/"+backgroundDay+"')");

	 	if (hour >= 16) {
			greeting = "Good Evening";
	 		$("body").css("background-image", "url('Assets/Images/"+backgroundEvening+"')");
	 	}
		if (hour >= 19) {
			greeting = "Good Night";
	 		$("body").css("background-image", "url('Assets/Images/"+backgroundNight+"')");
		}
	}
	else {
		greeting = "Good Morning";
		//timeConvention = " AM";
		$("body").css({
			"color": "black", 
			"background-image" : "url('Assets/Images/"+backgroundMorning+"')"
		});
	}

	$("#greeting-text").html(greeting);
    $("#date-text").html(dayName + ", " + day + " " + month + " " + year);
    $("#time-text").html(hour + " : " + minute + " : " + second)  /*+ timeConvention*/;
}, 1000);

var lat, lon;

$.ajax ({
	url: "http://ip-api.com/json",
	success: function(result) {
		console.log (result);
		lat = result.lat;
		lon = result.lon;
	},
	async:false
});


var vortexDayIcon = ['01', '03', '07', '08', '12', '18', '16', '05'];
var vortexNightIcon = ['33', '36', '38', '08', '39', '40', '42', '37'];
var desc = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'mist'];


$.ajax ({
	url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=969705c469708048b0f8af3ae8c77bf3",
	success: function(result) {
		console.log (result);

		var tempInCelcius = Math.round(result.main.temp - 273.15);
		var weatherDesc = result.weather[0].description;

		console.log(tempInCelcius);

		$("#weather-temp").html(tempInCelcius + " c");
		//°
		$("#weather-desc").html(weatherDesc);


		var date = new Date();
		for (var i = 0; i < 8; i++) {
			if (weatherDesc.includes(desc[i])){
				console.log("sama coy");
				if (date.getHours() < 17 && date.getHours() > 5)
						$("#weather-logo").css("background-image", "url(https://vortex.accuweather.com/adc2010/images/slate/icons/"+vortexDayIcon[i]+".svg)");
				else
						$("#weather-logo").css("background-image", "url(https://vortex.accuweather.com/adc2010/images/slate/icons/"+vortexNightIcon[i]+".svg)");
				
			}
		}
	}
});