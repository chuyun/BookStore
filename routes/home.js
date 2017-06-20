/**
 * Created by jun on 2017/4/6.
 */

/**
 * @author  info_together@aliyun.com
 * @description 主页
 * @param [...]
 * @return [...]
 */

var https = require('https');

module.exports = function (app) {
    app.get("/",function (req,res) {
        res.redirect('home');
    })

    app.get("/home", function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        Goods.find({$or: [{"title": "React"}, {"title": "曹操"}]}, function (error, docs) {
            res.render('home', {goodList: docs});
        })
    });

    //返回搜索页面
    app.post("/search/book/:name",function (req,res) {
        var Goods = global.dbHelper.getModel('goods');
        Goods.find({"title":req.params.name},function (error,doc) {
            res.redirect('list',{listResult: doc});
        })
    });


    app.post("/search2", function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        var needed = '?fields=id,title,url,name,price,id,isbn10,isbn13,origin_title,alt_title,subtitle,alt,image,images,author,translator,publisher,rating,tags,series,author_intro,summary';
        var result = req.body.bookName,
            searchKind = "q";

        var s = encodeURI('https://api.douban.com/v2/book/search?' + searchKind + '=' + result + '&count=10');

        https.get(s, function (res) {
            var json = '';
            res.on('data', function (d) {
                json += d;
            });
            res.on('end', function () {
                //获取到的数据
                json = JSON.parse(json);

                for (var i = 0; i < parseInt(json['count']); i++) {
                    // console.log(json['books'][i]);
                    Goods.create(json['books'][i], function (err, doc) {

                        if (err) {
                            // res.send(500);
                            Goods.distinct('isbn13');
                            console.log(err);
                        } else {
                            console.log("SUCCESS");
                            Goods.distinct('isbn13');
                        }
                    })
                }
            });
        }).on('error', function (e) {
            console.error(e);
        });
    })



};

