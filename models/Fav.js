const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for storing properly in the database
const BuyerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bemail: {
        type: String,
        required: true
    },
    vemail: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = Favs = mongoose.model("Favs", BuyerSchema);