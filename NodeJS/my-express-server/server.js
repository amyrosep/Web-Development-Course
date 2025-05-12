const express = require("express");
const app = express();
const port = 3000;

// "/" represents the root
app.get("/", function(req, res) {
  res.send("<h1>Hello<h1>");
});

app.get("/about", function(req, res) {
  res.send("I am Amy Pharris. I do things.");
});

app.get("/hobbies", function(req, res) {
  res.send("Hobbies and stuff");
});

app.listen(port, () => {console.log("Example app listening at http://localhose:${port}")});
