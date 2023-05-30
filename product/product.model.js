const mongoose = require("mongoose");
import { isValidCategory, categories } from "../constants";

const productSchema = new mongoose.Schema({
  name: { type: String, default: null },
  price: { type: Number },
  owner : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  category: {type: String, validate: 
    isValidCategory,
    message: productCategory => `${productCategory} is an invalid category! Valid categories are ${categories.toString()}`},
  rating: {type: Number, min: 1, max: 5, default: 3}
});

module.exports = mongoose.model("product", productSchema);