const JWT_SECRET = require('./config')
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ msg: "Wrong Headers" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.ID = decoded.ID





        next();
    } catch (err) {
        return res.status(403).json({ msg: "You are not signed in" });
    }
};

module.exports = authMiddleware

//{ "title":"Salary","type":"salary","amount":"10000","date":"2024-10-22"}