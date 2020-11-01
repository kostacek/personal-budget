const mongoose = require("mongoose")

// validate it is number
// validate if the value has been passed
// find by id --> documents then id is found else --> you may use this id

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true,
    }, 
    budget: {
        type: Number,
        trim: true,
        required: true,
    },
    hex: {
        type: String,
        trim: true,
        required: true,
        maxLength: 6,
    }
}, { collection: 'myBudget'})
// Needed to define schema 
module.exports = mongoose.model('myBudget', budgetSchema)