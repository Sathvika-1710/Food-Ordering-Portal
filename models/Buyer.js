const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for storing properly in the database
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	fav: {
		type: Array
	},
	money:{
		type:Number,
		default:0,
		min:0,
		max:100000
	}
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
