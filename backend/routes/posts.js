const express = require("express");
const router = express.Router();
const Post = require('../models/post')

router.post("", (req, res, next) => {

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


