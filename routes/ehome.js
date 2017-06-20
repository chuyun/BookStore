/**
 * Created by jun on 2017/4/6.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

var https = require('https');

module.exports = function (app) {
    app.get("/ehome", function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        Goods.find({"title": "React"}, function (error, docs) {
            res.render('ehome', {goodList: docs});
        })
    });

    app.post("/search", function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        var needed = '?fields=id,title,url,name,price,id,isbn10,isbn13,origin_title,alt_title,subtitle,alt,image,images,author,translator,publisher,rating,tags,series,author_intro,summary';
        var result = req.body.bookName;
        console.log(result);
        var s = encodeURI('https://api.douban.com/v2/book/search?q=' + result+'&count=100');
        console.log(s);
        https.get(s, function (res) {
            var json = '';
            res.on('data', function (d) {
                json += d;
            });
            res.on('end', function () {
                //获取到的数据
                json = JSON.parse(json);
                console.log(json['books']);

                for (var i = 0; i < parseInt(json['count']); i++) {
                    // console.log(json['books'][i]);
                    Goods.create(json['books'][i], function (err, doc) {
                        if (err) {
                            // res.sendStatus(500);
                            Goods.distinct('isbn13');
                            console.log(err);
                        } else {
                            console.log("SUCCESS");
                        }
                    })
                }
            });
        }).on('error', function (e) {
            console.error(e);
        });
    })
};

