const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for storing properly in the database
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min:0,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
	},
	peep:{
		type: Number,
		default: 0,
		required: true
	},
	buyers:{
		type:Number,
		default: 0,
		required: true
	},
	veg: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	}
});

module.exports = Food = mongoose.model("FoodItems", FoodSchema);