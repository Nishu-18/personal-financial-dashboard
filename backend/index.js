const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mainRouter = require('./Routes/index')




app.use("/api/v1", mainRouter)



app.listen(process.env.PORT | 3000, function() {
    console.log("Running...");

})