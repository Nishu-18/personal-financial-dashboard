const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User, Income } = require('../db');
const { config } = require('dotenv');
require('dotenv').config()

router.get("/", function(req, res) {
    res.send("hello")
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

module.exports = router