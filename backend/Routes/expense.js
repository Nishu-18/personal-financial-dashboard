const express = require('express');
const authMiddleware = require('../middleware');
const { Income, Expense, User } = require('../db');
const router = express.Router();

router.post("/addExpense", authMiddleware, async function(req, res) {
    const user_ID = req.ID

    const { title, type, amount, date } = req.body
        // console.log(user_ID);

    const newExpsnse = await Expense.create({ userID: user_ID, title, type, amount, date })
    return res.json({
        msg: "Expense added",
        _id: newExpsnse._id
    })

})
router.get("/getExpense", authMiddleware, async function(req, res) {
    const user_ID = req.ID;
    const users = await Expense.find({ userID: user_ID })
    res.json({
        users: users
    })
})


router.delete("/deleteExpense/:id", authMiddleware, async function(req, res) {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id)
    return res.json({ msg: "Expense deleted successfully" })
})






module.exports = router