const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routers
const userRouter = require('./api/routers/users');

//Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/XKitchen');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    console.log("Server is Running...");
    res.status(200).json({
        message: "Hi, I'm learning NodeJS"
    });
});


module.exports = app; // diexport ke server.js