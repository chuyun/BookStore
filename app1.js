var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
//文件上传中间件multer
var multer = require('multer');
var session = require('express-session');

var app = express();

// var index = require('./routes/login');
// var users = require('./routes/users');


global.dbHelper = require('./common/dbHelper');

global.db = mongoose.connect("mongodb://127.0.0.1:27017/design");


// 设置会话cookie session cookie
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:'secret',
    cookie:{
      maxAge:1000*60*30
    }
}));

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设置网页模板引擎 view engine
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

//以下两行代码为设置ejs 渲染引擎的
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


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
app.use(cookieParser());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error.ejs');
});


require('./routes')(app);

app.get('/', function (req, res) {
    res.render('login-old');
});
// app.listen(3000);
module.exports = app;

