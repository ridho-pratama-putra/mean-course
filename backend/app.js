// T7GJ8GipjvitkrlQ
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postsRoutes = require('./routes/posts')

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
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

app.use("/api/posts/", postsRoutes)


module.exports = app;