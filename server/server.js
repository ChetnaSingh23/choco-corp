var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, '../src'));
app.use(express.static(path.join(__dirname, '../src')));
app.use('/', router);
module.exports=app;