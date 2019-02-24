// T7GJ8GipjvitkrlQ
const express = require('express')
const bodyParser = require('body-parser')
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express()
mongoose.connect("mongodb+srv://ridho:T7GJ8GipjvitkrlQ@cluster0-tyuir.mongodb.net/node-angular?retryWrites=true",{ useNewUrlParser: true })
    .then( () => {
        console.log('connected to database')
    }).catch(() => {
        console.log('connection failed')
    })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });
  

app.post("/api/posts", (req, res, next) => {

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

app.get('/api/posts', (req, res, next) => {
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

app.delete('/api/posts/:id',(req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({message:'post deleted'})
        })
})



module.exports = app;