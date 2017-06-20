/**
 * Created by jun on 2017/3/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description 用户注册
 * @param
 * @return
 */

module.exports = function ( app ) {
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.post('/register', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                res.send(500);
                req.session.error = '网络异常错误！';
                console.log(error);
            } else if (doc) {
                req.session.error = '用户名已存在！';
                res.send(500);
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd,
                    email:req.body.uemail,
                    registerDate:req.body.nowDate
                }, function (error, doc) {
                    if (error) {
                        res.send(500);
                        console.log(error);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                });
            }
        });
    });
};