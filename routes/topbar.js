/**
 * Created by jun on 2017/5/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

var https = require('https');


module.exports = function (app) {
    app.get('/topbar', function (req, res) {
        var Cart = global.dbHelper.getModel('cart');
        if (!req.session.user) {
            req.session.error = "用户已经过期，请重新登录";
            res.redirect("/login");
        } else {
            Cart.find({"uId": req.session.user._id, 'cStatus': false}, function (error, docs) {
                // res.send({data: docs});
                res.render('template/topbar', {data: docs});
                console.log(docs);
            })
        }
    });

//返回给页首的cart信息
    app.get('/cart/info', function (req, res) {
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

}