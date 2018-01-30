const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytarticles",
  {
    useMongoClient: true
  }
);

const nytSeed = [
  {
    title: "The Mist",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The click",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The rick",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The flick",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The misk",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The fit",
    url: "www.google.com",
    date: new Date(Date.now())
  },
  {
    title: "The kit",
    url: "www.google.com",
    date: new Date(Date.now())
  }
];

db.Nyt
  .remove({})
  .then(() => db.Nyt.collection.insertMany(nytSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
