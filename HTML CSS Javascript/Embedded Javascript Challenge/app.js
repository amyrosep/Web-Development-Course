//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const app = express();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Setup app
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Setup DB
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true})

//DB Schema
const BlogPostSchema = new mongoose.Schema({
  title: {type: String, required: [true, "BLOG NEED TITLE"]},
  body: String
});
const BlogPost = mongoose.model("blogpost", BlogPostSchema);

//Handle get requests
app.get("/home", function(req, res) {
  //Get our blag posts
  BlogPost.find({}, function(err, posts) {
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
  });
});

app.get("/about", function(req, res) {
  res.render("about", {startingContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {startingContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

//This could use some refactoring
app.get("/posts/:postId", function(req, res) {
  let postId = req.params.postId;

  BlogPost.findById(postId, function(err, post){
    //Apparently null/undefined/empty string are all "not truthy" (false)
    if(post)
    {
      res.render("post", {post: post});
    }

    else {
      res.render("post", {post: new BlogPost({title: "Post Not Found", body: "Sorry, the content you're looking for doesn't exist!"})});
    }
  });
});


//Handle POST requests
app.post("/compose", function(req,res) {
  let newPost = new BlogPost( {
    title: lodash.startCase(req.body.postTitle),
    body: req.body.postBody,
  });

  newPost.save(function(err) {
    res.redirect("/home");
  });
});



//Spin up
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
