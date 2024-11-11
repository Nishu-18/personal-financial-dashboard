const { default: mongoose } = require("mongoose");
const { number } = require("zod");

require('dotenv').config()
mongoose.connect(process.env.DB_URI)




const userSchema = new mongoose.Schema({ "name": String, "username": String, "password": String, "budget": Number, "goals": [{ name: String, targetAmount: Number, savedAmount: Number, percent: Number }] })
const User = new mongoose.model('user', userSchema)
const incomeSchema = new mongoose.Schema({ "userID": { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, "title": String, "type": String, "amount": Number, "date": Date })
const Income = new mongoose.model('Income', incomeSchema)

const expenseSchema = new mongoose.Schema({ "userID": { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, "title": String, "type": String, "amount": Number, "date": Date })
const Expense = new mongoose.model('Expense', expenseSchema)




module.exports = { User, Income, Expense }