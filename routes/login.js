/**
 * Created by jun on 2017/4/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description 用户登录
 * @param [...]
 * @return [...]
 */

module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        console.log(uname);
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                res.send(500);
                console.log(error);
            } else if (!doc) {
                req.session.error = "用户名不存在";
                res.send(404);
            } else {
                req.session.user = doc;
                res.send(200);
            }
        })
    })

};