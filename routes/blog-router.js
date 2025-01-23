const express = require('express');
const { createBlog } = require('../controllers/blog-controller');
const { deletePreviousFile, upload } = require('../middlewares/upload_image_multer');
const checkToken = require('../middlewares/blog_auth_middleware');

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({message: "This is a test",id:req.body.authorId});
})

router.post("/create",deletePreviousFile,upload.single("coverImage"),checkToken,createBlog)

module.exports = router;