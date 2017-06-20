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
     // app.use(require('body-parser')());

    app.get("/search/:name", function (req, res) {
        var Goods = global.dbHelper.getModel('goods');
        Goods.find({"title":req.params.name}, function (error, docs) {
            res.render('search', {listResult: docs});
        })
    });


    app.get("/search", function (req, res) {
        var myRes=res;
        app.use(require('body-parser')());
        console.log(req.query.s);
        var myTitle=req.query.s;
        var Goods = global.dbHelper.getModel('goods');
        Goods.find({"title":myTitle}, function (error, docs) {
            if(docs.length!==0){
                console.log(docs);
                console.log(docs);
                res.render('search', {listResult: docs});
            }
            else{
                console.log("NULL");
                var needed = '?fields=id,title,url,name,price,id,isbn10,isbn13,origin_title,alt_title,subtitle,alt,image,images,author,translator,publisher,rating,tags,series,author_intro,summary';
                var searchKind = "q";

                var s = encodeURI('https://api.douban.com/v2/book/search?' + searchKind + '=' + myTitle + '&count=100');

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
                                    // Goods.find({'title':myTitle},function (error,docs) {
                                    //     if(docs){
                                    //         myRes.render('search',{listResult:docs})
                                    //     }else {
                                    //         console.log("NULL 2");
                                    //     }
                                    // })

                                }
                            })
                        }
                    });
                }).on('error', function (e) {
                    console.error(e);
                });
                //

                Goods.find({'title':myTitle},function (error,docs) {
                    if(docs){
                        myRes.render('search',{listResult:docs})
                    }else {
                        console.log("NULL 2");
                    }
                })
            }

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

