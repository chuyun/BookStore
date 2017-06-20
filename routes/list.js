/**
 * Created by jun on 2017/4/11.
 */

/**
 * @author  info_together@aliyun.com
 * @description 分类
 * @param [...]
 * @return [...]
 */

var https = require('https');

module.exports = function (app) {
    app.get('/list/:id', function (req, res) {

        var argument = req.params.id,
            species = argument;
        switch (argument) {
            case 'novel':
                species = "小说";
                break;
            case 'Administered':
                species = "经管";
                break;
            case 'Inspirational':
                species = "成功励志";
                break;
            case 'Humanities':
                species = "人文社科";
                break;
            case 'Literature':
                species = "文学";
                break;
            case 'Computer':
                species = "计算机";
                break;
            case 'History':
                species = "历史";
                break;
            case 'Life':
                species = "生活";
                break;
            case 'develop':
                species = "开发";
                break;
            case 'Magazine':
                species = "杂志";
                break;
            case 'web':
                species = "web";
                break;
            case 'bigdata':
                species = "大数据";
                break;
            case 'design':
                species = "设计";
                break;
            case 'children':
                species = "少儿";
                break;
            case 'ly':
                species = "旅游";
                break;
            case 'js':
                species = "军事";
                break;
            case 'ys':
                species = "艺术";
                break;
            case 'fl':
                species = "法律";
                break;
            case 'jy':
                species = "教育";
                break;
            case 'wy':
                species = "外语";
                break;
            default:
                species = argument;
                break;
        }

        var Goods = global.dbHelper.getModel('goods');

        var s = encodeURI('https://api.douban.com/v2/book/search?tag=' + species + '&count=100');
        https.get(s, function (res) {
            var json = '';
            res.on('data', function (d) {
                json += d;
            });
            res.on('end', function () {
                //获取到的数据
                json = JSON.parse(json);

                for (var i = 0; i < parseInt(json['count']); i++) {
                    Goods.create(json['books'][i], function (err, doc) {
                        Goods.distinct('isbn13');
                        if (err) {
                            //res.send(500);
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

        Goods.find({'tags.title': species}, function (error, doc) {
            console.log("---TITLE----");
            console.log(doc);
            console.log("---TITTLE END---");

            res.render('list', {listResult: doc});
        });


    })
};