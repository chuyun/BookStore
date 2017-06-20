/**
 * Created by jun on 2017/3/1.
 */

/**
 * @author  info_together@aliyun.com
 * @description mongodb数据库 models
 * @param [...]
 * @return 用户(user) 书籍详情(goods) 购物车信息(carts)
 */

module.exports = {
    user: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        registerDate: { type: Date, required: true }
    },
    goods: {
        name: String,
        price: String || Number,
        imgSrc: String,
        id: Number,
        isbn10: String,
        isbn13: { type: String, unique: true },
        title: String,
        origin_title: String,
        alt_title: String,
        subtitle: String,
        url: String,
        alt: String,
        image: String,
        images: {
            small: String,
            large: String,
            medium: String
        },
        author: Array,
        translator: Array,
        publisher: String,
        rating: {
            max: Number,
            numRaters: Number,
            average: Number,
            min: Number
        },
        tags: Array,
        series: {
            id: Number,
            title: String
        },
        author_intro: String,
        summary: String,
        catalog: String,
        pages: String,
        binding: String,
        pubdate: String

    },
    cart: {
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type: String },
        cQuantity: { type: Number },
        cStatus: { type: Boolean, default: false }
    },
    order: {
        uId: { type: String },
        userName: { type: String },
        userAddress: { type: String },
        userPhone: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type: String },
        cQuantity: { type: Number },
        isDone: { type: Boolean, default: false }
    }
};