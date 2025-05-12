//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const lodash = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Set up database and schema (this really should be in a separate file...)
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true});

const TodoItemSchema = new mongoose.Schema({
  name: {type: String, required: [true, "TODO ITEM NEED NAME"]}
});

const TodoItem = mongoose.model("TodoItem", TodoItemSchema);

const ListSchema = new mongoose.Schema({
  name: String,
  items: [TodoItemSchema]
});

const List = mongoose.model("List", ListSchema);

//Initial load
const todoItems = [];
TodoItem.find({}, function(err, items){
  items.forEach(item => todoItems.push(item));
});


app.get("/", function(req, res){
  res.render("list", {listTitle: "Today", newListItems: todoItems});
})

app.get("/:listname", function(req,res){
  let listName = lodash.lowerCase(req.params.listname);
  let list;

  List.findOne({name: listName}, function(err, item) {
    if(item)
    {
      list = item;
    }
    else{
      list = new List({
        name: listName,
        items: []
      });
    }
    res.render("list", {listTitle: lodash.startCase(list.name), newListItems: list.items});
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){

  let itemName = req.body.newItem;

  let newItem = new TodoItem({
    name: itemName
  });
  newItem.save();
  todoItems.push(newItem);
  res.redirect("/");
});

app.post("/:listname", function(req, res) {
  let itemName = req.body.newItem;
  let listName = lodash.lowerCase(req.params.listname);

  List.findOne({name: listName}, function(err, item) {
    if(item) {
      item.items.push(new TodoItem({name: itemName}));
      item.save();
    }
    else {
      let list = new List({
        name: listName,
        items: new TodoItem({name: itemName})
      });
      list.save(function(err) {
        console.log(err);
      });
    }

    res.redirect("/" + listName);
  });
});

app.post("/delete", function(req,res) {
  let id = req.body.checkbox;
  TodoItem.findByIdAndDelete(id, function(err) {
    if(err) { console.log(err);}
  });

  let index = 0;
  for (let i = 0; i < todoItems.length; i++){
    if(todoItems[i]._id == id) {
      index = i;
      break;
    }
  }
  todoItems.splice(index, 1);
  res.redirect("/");
});

app.post("/delete/:listname", function(req, res){
  let id = req.body.checkbox;
  let listName = lodash.lowerCase(req.params.listname);
  List.findOne({name: listName}, function(err, result) {
    result.items.pull({_id: id});
    result.save();
  })

  res.redirect("/" + listName);
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
