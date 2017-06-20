/**
 * Created by jun on 2017/4/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description 购物车请求处理
 * @param [...]
 * @return [...]
 */


module.exports = function (app) {

    //allow custom header and CORS
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method == 'OPTIONS') {
            res.send(200);
        }
        else {
            next();
        }
    });
    //查看购物车商品
    app.get('/cart', function (req, res) {
        var Cart = global.dbHelper.getModel('cart');
        if (!req.session.user) {
            req.session.error = "用户已经过期，请重新登录";
            res.redirect("/login");
        } else {
            Cart.find({"uId": req.session.user._id, 'cStatus': false}, function (error, docs) {
                res.render('cart', {carts: docs});
            })
        }
    });

    //topbar 数据返回
    app.get('/info', function (req, res) {
        var Cart = global.dbHelper.getModel('cart');
        if (!req.session.user) {
            req.session.error = "用户已经过期，请重新登录";

        } else {
            Cart.find({"uId": req.session.user._id, 'cStatus': false}, function (error, docs) {
                res.send({data: docs});
                console.log(docs);
            })
        }
    });

    //添加购物车商品
    app.get("/addToCart/:id", function (req, res) {
        //req.params.id 获取商品ID号
        if (!req.session.user) {
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        } else {
            var Good = global.dbHelper.getModel('goods'),
                Cart = global.dbHelper.getModel('cart');
            Cart.findOne({"uId": req.session.user._id, "cId": req.params.id}, function (error, doc) {
                //商品已存在 +1
                if (doc) {
                    Cart.update({
                        "uId": req.session.user._id,
                        "cId": req.params.id
                    }, {$set: {cQuantity: doc.cQuantity + 1}}, function (error, doc) {
                        //成功返回1  失败返回0
                        if (doc > 0) {
                            res.redirect('/home');
                        }
                    });
                    //商品未存在，添加
                } else {
                    Good.findOne({"_id": req.params.id}, function (error, doc) {
                        if (doc) {
                            console.log("ADD START");
                            console.log(doc);
                            console.log("ADD END");
                            Cart.create({
                                uId: req.session.user._id,
                                cId: req.params.id,
                                cName: doc.title,
                                cPrice: doc.price,
                                cImgSrc: doc.images.large,
                                cQuantity: 1
                            }, function (error, doc) {
                                if (doc) {
                                    res.redirect('/home');
                                }
                            });
                        } else {

                        }
                    });
                }
            });
        }
    });


    //删除购物车商品
    app.get("/delFromCart/:id", function (req, res) {
        //req.params.id 获取商品ID号
        var Cart = global.dbHelper.getModel('cart');
        Cart.remove({"_id": req.params.id}, function (error, doc) {
            //成功返回1  失败返回0
            if (doc > 0) {
                res.redirect(302, '/cart');
                // Cart.find({"uId": req.session.user._id, 'cStatus': false}, function (error, docs) {
                //     res.render('cart', {carts: docs});
                // })
            }
        });
    });

    //购物车结算
    app.post("/cart/clearing", function (req, res) {
        var Cart = global.dbHelper.getModel('cart');
        Cart.update({"_id": req.body.cid}, {$set: {cQuantity: req.body.cnum}}, function (error, doc) {
            //更新成功返回1  失败返回0
            if (doc > 0) {
                res.send(200);
            }
        });
    });
    app.post("/cart/order",function (req,res) {
        var Order=global.dbHelper.getModel('order');
        Order.create({
            uId: req.session.user._id,
            userName: req.body.userName,
            userAddress:req.body.userAddress,
            userPhone:req.body.userPhone,
            cId: req.body.cId,
            cName: req.body.cName,
            cPrice: req.body.cPrice,
            cImgSrc: req.body.cImgSrc,
            cQuantity: req.body.cQuantity
        },function (err) {
            if(err){
                console.log(err);
                res.send(500);
            }else {
                res.send(200);
            }
        })
    })

    app.get('/cart/orderlist',function (req,res) {
        var Order=global.dbHelper.getModel('order');
        Order.find({}, function (error, docs) {
            console.log(docs);
            // res.render('admin/user', {userList: docs});
            console.log(docs);
            res.send({orderList: docs});
        })
    })


    // 购物车商品数量+/-
    app.post('/cart/change', function (req, res) {
        var Cart = global.dbHelper.getModel('cart');
        Cart.update({"_id": req.body.cid}, {$set: {cQuantity: req.body.cnum, cStatus: true}}, function (error, doc) {
            //更新成功返回1  失败返回0
            if (doc > 0) {
                res.send(200);
            }
        });

    });


};