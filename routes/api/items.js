const express = require("express");
const { model } = require("../../models/Item");
const router = express.Router();


// Link the Item model we created in the models folder using Mongoose Schema
const Item = require("../../models/Item")

//@route GET api/items
//@desc GET ALL ITEMS
//@access Public 
router.get("/",(req,res) => {
    Item.find()
    .sort({ date : -1}) // sort mongoose result by date in descending order (-1) change to 1 if you want to sort by ascending order
    .then( items => res.json(items))
})

//@route POST api/items
//@desc create a post
//@access Public 
router.post("/",(req,res) => {
    //Create a new item variable that contain the name field with value extracted from the request body
    const newItem = new Item({
        name: req.body.name
    })
    //Save => insert the item into mongodDB database with .save(). Because it is a promise type, we can access .then()
    newItem.save().then( item => {
        res.json(item)
    })
})

//@route DELETE api/items
//@desc DELETE a post
//@access Public 
router.delete("/:id",(req,res) => {
   Item.findByIdAndDelete(req.params.id, () => { 
       res.json({success: true})
   })
   .catch( err => res.status(404).json(err))
})




//exporting the router
module.exports = router

