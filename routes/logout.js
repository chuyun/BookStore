/**
 * Created by jun on 2017/4/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description 用户登出
 * @param
 * @return
 */

module.exports = function (app) {
    app.get('/logout', function (req, res) {
        req.session.user = null;
        req.session.error = null;
        res.redirect('/');
    });
};