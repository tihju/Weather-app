leftImage = 1;
var offset = 0;
init();
//hide the left button;
 hideLeftButton();
 // notice();

//track of what is on the screen, sopposed


function init(){
	var range = document.getElementById("range");
	var rangeWidth = range.clientWidth;
	var steppers = document.getElementsByClassName("stepper");
	var n = steppers.length;
	for(i = 0; i < n; i++){
		steppers[i].style.width = rangeWidth / 5 - 10 + "px";
	}
}

/* called when new weather arrives */
function callbackFunction(data) {
	//  var pgh = document.getElementById("forecast");
  //    	pgh.textContent = JSON.stringify(data.query.results.channel.location.city);
	var time = document.getElementById("time");
	//this contain "Mon, 24 Apr 2017  06:00 PM AKDT"
	var dateTime = JSON.stringify(data.query.results.channel.lastBuildDate);
	time.textContent = "Today " + dateTime.substring(18, 26);

	var date = document.getElementById("date");
	//6-17
	date.textContent = dateTime.substring(9,13) + dateTime.substring(6, 8) + "," + dateTime.substring(12,17);

	//for today's weather
	var location = document.getElementById("location");
	 var temp = data.query.results.channel.location;
	 location.textContent = temp.city + "," + temp.region;

	var temNow = document.getElementById("tempNow");
	temNow.textContent = data.query.results.channel.item.condition.temp + "\xB0" + " F";

	var weatherText = document.getElementById("todayText");
	weatherText.textContent = data.query.results.channel.item.condition.text;

	var humiNow = document.getElementById("humiNow");
	humiNow.textContent = data.query.results.channel.atmosphere.humidity + "%"

	var windNow = document.getElementById("windNow");
	windNow.textContent = data.query.results.channel.wind.speed + "mph";

	//image
	var weaImgToday = document.getElementById("weaImgToday");
	matchImages(weaImgToday, weatherText.textContent);


	var apiForecasts = data.query.results.channel.item.forecast;

	var forcasts = document.getElementsByClassName("forecast");

	var n = forcasts.length;
	for(j = 0; j < n; j++){
		var k = j + 1;
		var date = document.getElementById("date" + k);
		date.textContent = apiForecasts[j].day;
		//
		var text = document.getElementById("text" + k);
		text.textContent = apiForecasts[j].text;

		var img = document.getElementById("forecaseImg" + k);
		matchImages(img, text.textContent);

		var temp = document.getElementById("temp" + k);
		temp.textContent= apiForecasts[j].low  + "\xB0 "+ apiForecasts[j].high + "\xB0";

	}


}


function gotNewPlace(){
	var newPlace = document.getElementById("zipbox").value;
	//make a new script element
	var script = document.createElement('script');

	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + newPlace + "')&format=json&callback=callbackFunction";
	script.id = "jsonpCall";

	//remove old script
	var oldScript = document.getElementById("jsonpCall");
	if(oldScript != null){
		document.body.removeChild(oldScript);
	}

	document.body.appendChild(script);
}

//match image with weather;
function matchImages(image, text){
	switch (text) {
		case "Mostly Cloudy":
		case "Cloudy":
			image.src = "../WeatherApp/cloudy.png";
			break;

		case "Mostly Sunny":
		case "Partly Cloudy":
			image.src = "../WeatherApp/part-sun.png";
			break;

		case "Rain":
		case "Showers":
			image.src = "../WeatherApp/rain.png";
			break;

		case "Sunny":
			image.src = "../WeatherApp/sunny.png";
			break;

		case "Breezy":
			image.src = "https://i.imgur.com/0EzkFxH.jpg";
			break;

		case "Mostly Clear":
			image.src = "https://i.imgur.com/73PXNIj.jpg";

		case "Thunder":
		case "Thunderstorms":
			image.src = "../WeatherApp/thunder.png";
			break;

		case "Snow":
			image.src = "../WeatherApp/snow.png";
			break;

			case "Wind":
				image.src = "../WeatherApp/wind.png";
				break;
		default:
			image.src = "../Happy_face.jpg";
			break;

	}

}

//for left arrows
function previousForcast(){
	if(leftImage == 1){
		var leftMove = document.getElementsByClassName("leftRight");
		leftMove[0].style.visibility = "hidden";
		return;
	}
	// console.log("previusForcast" + left);
	var range = document.getElementById("range");
	var rangeWidth = range.clientWidth;

	var steppy = document.getElementsByClassName("stepper");
	var n = steppy.length;
	// left = left + move;
		var move = steppy[0].clientWidth + 11;
		offset = offset + move;

	for(i = 0; i < n; i ++){
		steppy[i].style.left = offset +"px";
	}
	leftImage--;
  if(leftImage != 6){
    var rightMove = document.getElementsByClassName("leftRight");
    rightMove[1].style.visibility = "visible";
  }
}


//for right arrows
function moreForcast(){

	if(leftImage == 6){
		var rightMove = document.getElementsByClassName("leftRight");
		rightMove[1].style.visibility = "hidden";
		return;
	}
	// console.log("moreForcast" + left);
	var range2 = document.getElementById("range");
	var rangeWidth2 = range2.clientWidth;


	var steppy2 = document.getElementsByClassName("stepper");

	var n = steppy2.length;

	var boxWidth = steppy2[0].clientWidth + 11;
	offset = offset - boxWidth;

	for(i = 0; i < n; i ++){
		// var boxWidth = steppy2[0].clientWidth + 10;
		steppy2[i].style.left = offset  +"px";
	}
	leftImage++;
  if(leftImage != 1){
    var leftMove = document.getElementsByClassName("leftRight");
    leftMove[0].style.visibility = "visible";
  }
}

function hideLeftButton(){
	if(leftImage == 1){
		var leftMove = document.getElementsByClassName("leftRight");
		leftMove[0].style.visibility = "hidden";
		return;
	}

}


function notice(){
	alert("The right/left arrow button only can click on the images!");
}
