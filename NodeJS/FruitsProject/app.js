
//Connect to Database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true});

//Fruits
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: [true, "FRUIT NEED NAME"] },
  rating: {
    type: Number,
    min: 1,
    max: 10},
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

 const fruit = new Fruit( {
  rating: 10,
  review: "Great fruit"
});

//fruit.save();

//People
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("people", personSchema);

const strawberry = new Fruit({
  name: "Strawberry",
  score: 8,
  review: "A bit tart but tasty"
});
strawberry.save();

Person.updateOne({name: "John"}, {favoriteFruit: strawberry}, function(err) {
  if(err){
    console.log(err);
  }
});

// const person = new Person({
//   name:"Amy",
//   age: 32,
//   favoriteFruit: pineapple
// });
//
// person.save();

//Insert many
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit?"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 8,
//   review: "Good when ripe"
// });
//
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err)
//   {
//     console.log(err);
//   }
//   else {
//     console.log("Saved all the fruit!");
//   }
// });

// Fruit.deleteOne({ name: "Apple"}, function(err){
//   if(err) {
//     console.log(err);
//   }
// });

Fruit.find(function(err, fruits){
  if(err) {
    console.log(err);
  }
  else {
    mongoose.connection.close();
    fruits.forEach(element => console.log(element.name))
  }

});
