const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//Set up app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Set up database
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true});

//Schema
const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("article", ArticleSchema);


//HTTP listeners
app.route("/articles")

.get(function(req, res){
  Article.find({}, function(err, result){
    if(err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
})

.post(function(req, res) {
  let title = req.body.title;
  let content = req.body.content;

  let newArticle = new Article({
    title: title,
    content: content
  });

  newArticle.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("Successfully added new article!");
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany({}, function(err) {
    if(err) {
      res.send(err);
    }
    else {
      res.send("All articles deleted Successfully");
    }
  });
});


app.route("/articles/:articleTitle").get(function(req,res) {
  let articleTitle = req.params.articleTitle;

  Article.findOne({title: articleTitle}, function(err, result) {
    if(err) {
      res.send(err);
    }
    else {
      if(result) {
          res.send(result);
      }
      else {
        res.send("No articles matching that title found.");
      }
    }
  })
})

.put(function(req, res) {
  let title = req.params.articleTitle;

  Article.update(
    {title: title},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err) {
      if(err) {
        res.send(err);
      }
      else {
        res.send("Successfully updated article!");
      }
    }
  );
})

.patch(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err) {
      if(err) {
        res.send(err);
      }
      else {
        res.send("Successfully updated article!")
      }
    })
})

.delete(function(req, res) {
  Article.findOneAndDelete({title: req.params.articleTitle}, function(err) {
    if(err) {
      res.send(err);
    }
    else {
      res.send("Successfully deleted the article!");
    }
  })
});

//Spin up the server
app.listen(3000, function(){
  console.log("Server started!");
});
