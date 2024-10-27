const express = require('express');
const authMiddleware = require('../middleware');
const { Income } = require('../db');
const router = express.Router();


router.post("/addIncome", authMiddleware, async function(req, res) {
    const user_ID = req.ID
    const { title, type, amount, date } = req.body
        // console.log(user_ID);

    const newIncome = await Income.create({ userID: user_ID, title, type, amount, date })
    return res.json({
        msg: "Income added",
        _id: newIncome._id

    })

})
router.get("/getIncome", authMiddleware, async function(req, res) {
    const user_ID = req.ID;
    const users = await Income.find({ userID: user_ID })
    res.json({
        users: users
    })
})


router.delete("/deleteIncome/:id", authMiddleware, async function(req, res) {
    const { id } = req.params;
    await Income.findByIdAndDelete(id)
    return res.json({ msg: "Income deleted successfully" })
})




module.exports = router