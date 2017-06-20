/**
 * Created by jun on 2017/4/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */


module.exports = function (app) {
    app.get("/userCart", function (req, res) {
        if (req.session.user) {

            var Cart = global.dbHelper.getModel('cart');
            Cart.find({"uId":req.session.user}, function (error, docs) {
                console.log(docs);
                console.log("USERCART END");
                res.render('userCart', {userCartList: docs});
            });
        } else {
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });


    //添加货物
    app.get("/addgoods", function (req, res) {
        res.render('addgoods');
    });

    app.post('/addgoods', function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        Goods.create({
            name: req.body.name,
            price: req.body.price,
            imgSrc: req.body.imgSrc
        }, function (error, doc) {
            if (doc) {
                res.send(200);
            } else {
                res.send(400);
            }
        })

    })
};