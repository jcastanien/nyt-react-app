const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  url: String,
  favorite: Boolean,
  date: { type: Date, default: Date.now }  
});

const Nyt = mongoose.model("Nyt", articleSchema);

module.exports = Nyt;
