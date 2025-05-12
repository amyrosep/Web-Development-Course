// Imports
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// App init
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Root request response
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


//Post response
app.post("/", function(req, res) {
  var firstName = req.body.inputFirstName;
  var lastName = req.body.inputLastName;
  var email = req.body.inputEmail;
  console.log(firstName);
  console.log(lastName);
  console.log(email);

  // //If I were to actually talk to the API, this is how I would spin up an object
  // // and pack it into JSON
  // var data = {
  //   members: [
  //   {
  //     email_address: email,
  //     status: "subscribed",
  //     merge_fields: {
  //       FNAME: firstName,
  //       LNAME: lastName
  //     }
  //   }
  //   ]
  // }
  //
  // var jsonData = JSON.stringify(data);
  //
  // //This is where I would Post
  // // URL and options from API documentation
  // var url = "mailchimpApiEmail";
  // var options = {
  //   method: "POST",
  //   auth: "usrname:authkey"
  // }
  //
  // //Instantiate request so we can write to it later
  // const https.request(url, options, function(response))
  // {
  //   //Check the response status
  //   if(response.statusCode === 200) {
  //     res.sendFile(__dirname + "success.html");
  //   }
  //   else {
  //     res.sendFile(__dirname + "failure.html");
  //   }
  //
  //   //When we get a response to our request this parses the response
  //   response.on("data", function(data) {
  //     var responseData = JSON.parse(data));
  //   });
  // }
  //
  // //Actually send the request
  // request.write(jsonData);
  // request.end();
});

//Handle Failure post request
app.post("/failure", function(req, res) {
  res.redirect("/");
});

//Spin up the server

//If I were to host this to heroku I would use:
//app.list(process.env.PORT, function() {} );
app.listen(3000, function() {
  console.log("Server is listening.");
});
