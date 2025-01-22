const express = require('express')

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({message: "This is a test",id:req.body.authorId});
})

module.exports = router;