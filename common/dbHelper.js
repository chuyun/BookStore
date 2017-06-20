/**
 * Created by jun on 2017/3/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description 使用mongoose 操纵数数据库
 * @param  [...]
 * @return models
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
for (var m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: function(type) {
        return _getModel(type);
    }
};
var _getModel = function(type) {
    return mongoose.model(type);
};