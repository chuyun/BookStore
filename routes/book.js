/**
 * Created by jun on 2017/4/8.
 */

/**
 * @author  info_together@aliyun.com
 * @description 书籍详情页面
 * @param [isbn10]
 * @return 返回指定isbn10对应的书籍信息
 */
 
 
module.exports=function (app) {
    app.get("/book/", function (req, res) {
        var num=req.url.replace("/book/?","");
        console.log(num);
        var Goods = global.dbHelper.getModel('goods');
        Goods.findOne({"isbn10": num}, function (error, docs) {
            res.render('book', {TheBook: docs});
            console.log("---BOOK Detail---")
            console.log(docs);
        });
    });
};