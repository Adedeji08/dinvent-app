const dotenv = require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const cors = require("cors")
const  userRoute = require("./routes/userRoute")
const  errorHandler = require("./middleWare/errorMiddleWare")
const app = express()

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyparser.json())

//ROUTES MIDDLEWARE
app.use("/api/users", userRoute)

//ROUTES
app.get("/", (req, res) => {
      res.send("Home Page");
})

//ERROR MIDDLEWARE
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

//CONNECT TO MONGODB AND START SERVER

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))