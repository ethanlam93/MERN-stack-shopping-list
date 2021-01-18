const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require("path")

// initialize express
const app = express()


//enable cors for all request
app.use(cors())
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
mongoose.connect(process.env.MONGODB_URI || db,mongoConfig)
.then(() => console.log("MongoDB connected"))
.catch( err => console.log(err))

//set up port
const port = process.env.PORT || 5000;

//tell express to listen to port 3001 and console log the result
app.listen(port, () => console.log(`Server started on port ${port}`))

//redirect app.use /api/items to the route
const items = require("./routes/api/items");

//use routes
app.use("/api/items", items)


//serve static build folder if in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"client","build", "index.html"))
    })
}