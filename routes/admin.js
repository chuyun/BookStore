/**
 * Created by jun on 2017/5/3.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

var sd = require('silly-datetime');

module.exports = function(app) {
    //allow custom header and CORS
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method == 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    });
    //渲染后台管理主页
    app.get("/admin", function(req, res) {
        res.render('admin');
    });

    //获取用户数据 ==> 返回全部注册用户数据 [old]
    app.get('/admin/user', function(req, res) {
        var User = global.dbHelper.getModel('user');

        User.find({}, function(error, docs) {
            res.send({ userList: docs });
        })
    });

    //删除用户
    app.get("/admin/user/del/:id", function(req, res) {
        var User = global.dbHelper.getModel('user');
        User.remove({ "_id": req.params.id }, function(error, doc) {
            if (!error) {
                res.sendStatus(200);
            }
        });
    });

    //删除商品
    app.get("/admin/goods/del/:id", function(req, res) {
        var Goods = global.dbHelper.getModel('goods');
        console.log(req.param.id);
        Goods.remove({ "_id": req.params.id }, function(error) {
            if (!error) {
                res.sendStatus(200);
            }
        })
    })

    //获取订单数 ==> 订单表 暂未实现
    app.get('/order', function(req, res) {

    });

    //获取用户购物车信息 => 暂时觉得意义不大 暂未实现
    app.get('/order', function(req, res) {

    });

    //搜索书籍
    app.get('/admin/search/:id',function (req,res,next) {
        var Goods = global.dbHelper.getModel('goods');
        console.log((req.params.id).replace(":",""));
        Goods.find({"title":(req.params.id).replace(":","")}, function(error, docs) { //req.params.id
            // res.send({ userList: docs });
            res.json(docs);
            console.log(docs);
        })
    })

    //获取商品列表 ==> 分页器实现[避免数据量过大导致 渲染开销太大]
    app.get('/admin/list', function(req, res, next) {
        var Goods = global.dbHelper.getModel('goods');
        var limit = req.param("limit", 1000);
        var currentPage = req.param("currentPage", 1);

        if (currentPage < 1) {
            currentPage = 1;
        }

        Goods.find({}).exec(function(err, rs) {
            if (err) {
                res.send(err);
            } else {
                var totalPage = Math.floor(rs.length / limit);
                if (rs.length % limit != 0) {
                    totalPage += 1;
                }

                if (currentPage > totalPage) {
                    currentPage = totalPage;
                }
                console.log(currentPage);
                var query = Goods.find({});
                query.skip((currentPage - 1) * limit);
                query.limit(limit);
                query.exec(function(err, result) {
                    jsonArray = { totalCount: rs.length, data: result };
                    res.json(jsonArray);
                });
            }
        });
    });

    //添加书籍
    app.post("/add/book", function(req, res, next) {
        var Goods = global.dbHelper.getModel('goods')
        console.log(req.body);
        Goods.create({
            "title": req.body.title,
            "subtitle": req.body.subtitle,
            "publisher": req.body.publisher,
            "author": req.body.author,
            "author_intro": req.body.author_intro,
            "summary": req.body.summary,
            "image": req.body.imgSrc,
            "price": req.body.price,
            "tags": req.tags,
            "isbn10": req.body.isbn10,
            "isbn13": req.body.isbn13
        }, function(error, doc) {
            //成功返回1  失败返回0
            if (!error) {
                res.send("OK");
            } else {
                console.log(error);
            }
        })
    })

    //添加用户
    app.post("/add/user", function(req, res, next) {
        var User = global.dbHelper.getModel('user');
        User.find({ "name": req.body.name }, function(error, doc) {
            if (doc.length === 0) {
                console.log("IS NOT NULL")
                User.create({
                    "name": req.body.name,
                    "password": req.body.password,
                    "email": req.body.email,
                    "registerDate": sd.format(new Date(), 'YYYY-MM-DD HH:mm')
                }, function(error, doc) {
                    //成功返回1  失败返回0
                    if (!error) {
                        res.send("OK");
                    } else {
                        console.log(error);
                    }
                })
            } else {
                res.send("exist")
            }
        })
    });

    //修改用户信息 ==> 更新
    app.post("/edit/user", function(req, res) {
        var User = global.dbHelper.getModel('user');
        User.update({ "_id": req.body._id }, {
            $set: {
                "name": req.body.name,
                "password": req.body.password,
                "email": req.body.email,
                "registerDate": req.body.beizhu
            }
        }, function(error) {
            if (!error) {
                res.send(200);
            } else {
                res.send(500);
            }
        })
    });

    //修改商品信息 ==> 更新
    app.post("/edit/goodlist", function(req, res) {
        console.log(req.body);
        var Goods = global.dbHelper.getModel('goods');
        Goods.update({ "_id": req.body._id }, {
            $set: {
                "title": req.body.title,
                "subtitle": req.body.subtitle,
                "publisher": req.body.publisher,
                "author": req.body.author,
                "author_intro": req.body.author_intro,
                "summary": req.body.summary,
                "image": req.body.image,
                "price": req.body.price,
                "description": req.body.description
            }
        }, function(error) {
            if (!error) {
                res.send(200);
            } else {
                res.send(500);
            }
        })
    })
};