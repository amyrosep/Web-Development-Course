//Imports
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

//Init
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var items = ["Eat"];
var workItems = ["Program"];

//Respond to root get
app.get("/", function(req, res) {

  let listTitle = date.getDay();
  //use ejs
  renderList(listTitle, items, res);

  //Template literal!
  // res.send(`<h1>It is ${dayString}!</h1>`);
});

app.get("/work", function(req, res) {
  renderList("Work List", workItems, res);
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.post("/", function(req, res) {
  let route = req.body.list;
  let newItem = req.body.todoItem;

  if(route === "Work")
  {
    workItems.push(newItem);
    res.redirect("/work");
  }
  else
  {
    items.push(newItem);
    res.redirect("/");
  }

});

//Spin up
app.listen(3000, function() {
  console.log("Server started.");
});

//Delegates
function renderList(listTitle, listItems, res) {
  res.render('list', {listTitle: listTitle, listItems: listItems});
}
