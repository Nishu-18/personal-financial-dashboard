const { default: mongoose } = require("mongoose")

require('dotenv').config()
mongoose.connect(process.env.DB_URI)


const userSchema = new mongoose.Schema({ "name": String, "username": String, "password": String })
const User = new mongoose.model('user', userSchema)
const incomeSchema = new mongoose.Schema({ "userID": { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, "title": String, "type": String, "amount": Number, "date": Date })
const Income = new mongoose.model('Income', incomeSchema)

const expenseSchema = new mongoose.Schema({ "userID": { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, "title": String, "type": String, "amount": Number, "date": Date })
const Expense = new mongoose.model('Expense', expenseSchema)




module.exports = { User, Income, Expense }