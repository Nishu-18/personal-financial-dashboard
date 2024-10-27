const express = require('express');

const user = require('./user')
const router = express.Router();
const income = require('./income')
const expense = require('./expense')

router.use("/user", user)
router.use('/income', income)
router.use('/expense', expense)




module.exports = router




//{ "title":"Salary","type":"salary","amount":"10000","date":"2024-10-22"}