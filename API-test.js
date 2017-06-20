/**
 * Created by jun on 2017/4/7.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */
var https=require('https');

https.get('https://api.douban.com/v2/book/search?q=react', function (res) {
    //console.log("statusCode: ", res.statusCode);
    //console.log("headers: ", res.headers);
    var json = '';
    res.on('data', function (d) {
        json += d;
    });
    res.on('end',function(){
        //获取到的数据
        json = JSON.parse(json);
        console.log(json);
    });
}).on('error', function (e) {
    console.error(e);
});