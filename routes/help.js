/**
 * Created by jun on 2017/4/6.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

module.exports = function (app) {
    app.get("/help", function (req, res) {
        res.render('help');
    });
};