"use strict";
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var debug_1 = require("./classes/debug");
var Repo_1 = require("./models/Repo");
var config = require('./config/vars');
var keys = require('./config/keys');
var PORT = process.env.PORT || config.PORT;
var app = express();
mongoose.connect('mongodb://' + keys.mongo.user + ':' + keys.mongo.pwd + '@localhost:27017/website', function (err) {
    if (err)
        throw err;
    debug_1["default"].log('Connected to MongoDB');
});
app.set('view engine', 'ejs');
app.use(session({
    secret: 'kittensareverymuchfancy',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/static/', express.static('./static/'));
app.get('/', function (req, res) {
    Repo_1["default"].find({}, function (err, repos) {
        res.render('sites/index', {
            repos: repos
        });
    });
});
app.listen(PORT, function (err) {
    if (err)
        throw err;
    debug_1["default"].log('Server started on Port ' + PORT);
});
