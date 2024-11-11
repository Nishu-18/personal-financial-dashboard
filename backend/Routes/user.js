const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User, Income } = require('../db');
const { config } = require('dotenv');
const authMiddleware = require('../middleware');
const { default: axios } = require('axios');
const nodemailer = require('nodemailer')
require('dotenv').config()

router.get("/", function(req, res) {
    res.send("hello")
})
router.get("/getDetails", authMiddleware, async function(req, res) {
    const userDetails = await User.find({ _id: req.ID })
    res.json({
        userDetails: userDetails
    })
})
router.post('/signup', async function(req, res) {
    const { name, username, password } = req.body
    const userFound = await User.findOne({ username: username });
    if (userFound) {
        return res.status(401).json({
            msg: "User already exists"
        })
    }
    const user = await User.create({ name, username, password })
    const userID = user._id
    const token = jwt.sign({ "ID": userID }, process.env.SECRET_KEY)
    return res.json({
        msg: "user added",
        token: token
    })

})
router.post('/setBudget', authMiddleware, async function(req, res) {
    const budget = req.body.budget;
    const userID = req.ID;
    const userFound = await User.findByIdAndUpdate(userID, { $set: { budget: budget } }, { new: true })
    res.json({
        userDetails: userFound
    })
})
router.post('/signin', async function(req, res) {
    const { username, password } = req.body
    const userFound = await User.findOne({ username: username, password: password })

    if (userFound) {
        const userID = userFound._id
        const token = jwt.sign({ "ID": userID }, process.env.SECRET_KEY)
        const name = userFound.name


        return res.json({
            token: token,
            name: name
        })
    }
    return res.status(401).json({
        msg: "Error while logging in"
    })

})
router.post('/subscribe', async function(req, res) {
    const { email, subject, text } = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });



    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        res.json({ success: true, message: 'Email sent successfully!' });

    } catch (err) {
        res.status(500).json({
            msg: "Email failed to send."
        })
    }

})
router.post('/addGoal', authMiddleware, async function(req, res) {

    const userID = req.ID;
    const Upadteduser = await User.findByIdAndUpdate(userID, { $push: { goals: req.body } }, { new: true })
    return res.json({
        msg: "Goal added",
        updatedUser: Upadteduser
    })
})




module.exports = router