const express = require("express");
const app = express();
const https = require("https");
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// const url = "&id=4299276&";    This is the id for louisville
const openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=";
const appId = "appid=f6b7b8197421864017ce3530aafa2cf0"
const imageUrlBase = "https://openweathermap.org/img/wn/";
const units = "units=imperial";


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res)
{
  var cityName = req.body.cityName
  var fullApiUrl = openWeatherAPI + cityName + "&" + units + "&" + appId;
  https.get(fullApiUrl, function(response) {

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      var desc = weatherData.weather[0].description;
      var temp = weatherData.main.temp;
      var iconUrl = imageUrlBase + weatherData.weather[0].icon + "@2x.png";

      //Can use res.write() to build the response before calling res.send()
      var sendText = "The weather is currently " + desc;
      sendText += "<h1>The temperature in "+ cityName + " is " + temp + " degress F.</h1>";
      sendText += "<image src=" + iconUrl + "></image>";
      res.send(sendText);
    });
  });
});




app.listen(3000, function() {
  console.log("Server is listening.");
});
