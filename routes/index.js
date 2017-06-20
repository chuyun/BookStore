module.exports = function (app) {
    require('./home')(app); //主页
    require('./login')(app); //登录
    require('./logout')(app); //登出
    require('./register')(app); //注册
    require('./cart')(app); //购物车
    require('./book')(app); // 书籍详情页
    require('./list')(app); //书籍分类
    require('./help')(app);
    require('./search')(app);
    require('./admin')(app); //后台管理
};