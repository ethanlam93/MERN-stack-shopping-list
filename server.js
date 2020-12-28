const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// initialize express
const app = express()

//body parser middle ware, allows us to access the req.body of a request
app.use(bodyParser.json())

//get the secret MongoDB key from config folder
const db = require("./config/key").mongoURI

//mongoDB config
const mongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true
}

//connect to mongo DB
mongoose.connect(db,mongoConfig)
.then(() => console.log("MongoDB connected"))
.catch( err => console.log(err))

//set up port
const port = process.env.PORT || 3001;

//tell express to listen to port 3001 and console log the result
app.listen(port, () => console.log(`Server started on port ${port}`))

//redirect app.use /api/items to the route
const items = require("./routes/api/items");

//use routes
app.use("/api/items", items)