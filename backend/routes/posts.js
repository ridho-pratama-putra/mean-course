const express = require("express");
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');

// helper contant to get mime type
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }

        // path is relative to server.js
        // null is whether detect error
        callback(error,"backend/images")
    },
    filename: (req, file, callback) => {
        const name  = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name+'-'+Date.now()+'.'+extension);
    }
});

router.post("", multer({storage : storage}).single("image") ,(req, res, next) => {

    // pass data we need for the schema as object, havng title and content 
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    // console.log(post)
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'post added',
            createdPostId: createdPost._id
        })
    })    
})

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "",
                posts: documents
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            // if document is exist
            if (post){
                res.status(200).json(post)
            }else{
                res.status(404).json({
                    message: "post resource not found",
                    posts: documents
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/:id',(req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({message:'post deleted'})
        })
})

router.put("/:id",(req,res,next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
    });
    Post.updateOne({_id:req.params.id},post)
        .then(result => {
            res.status(200).json({
                message: "update success"
            })
        })
})

module.exports = router


