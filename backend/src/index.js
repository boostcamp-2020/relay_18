
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.set("view engine","ejs")
app.set("views","../../front")
app.engine('html', require('ejs').renderFile);

app.use(express.static('../../front'));

app.get('/',function(req,res){
    res.render('main.html')
})
app.get('/join',function(req,res){
    res.render('join.html')
})
app.get('/chatbot',function(req,res){
    res.render('chatbot.html')
})
app.get('/FriendReco',function(req,res){
    res.render('FriendReco.html')
})





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app)


module.exports = app;
