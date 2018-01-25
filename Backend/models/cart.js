const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bootcamp4");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id:String
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;