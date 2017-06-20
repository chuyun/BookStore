var express = require('express');
var app = express();//
var path = require('path');
var mongoose = require("mongoose");
var http=require('http');

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require('./common/dbHelper');

global.db = mongoose.connect("mongodb://127.0.0.1:27017/design");

//使用session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));


// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
var cpUpload = upload.any();

app.use(cpUpload);

// 设定静态文件目录，比如本地文件
app.use(express.static('public'));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


require('./routes')(app);

app.get('/', function (req, res) {
    res.render('login');
});

// app.listen(3000);
module.exports = app;

