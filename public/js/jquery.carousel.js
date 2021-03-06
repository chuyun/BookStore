
/**
 * Created by jun on 2017/3/6.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

(function ($, window, document, undefined) {
    $.fn.tab = function (options) {
        var defaults = {
            "color": "red",
            "background": "#eee",
            "mark": "true",
            "prevButton": "",
            "nextButton": "",
            "timer": "5000",
            "mouseover": "false",
            "click": "true"
        };
        var str = $.extend({}, defaults, options);
        this.each(function () {
            var oThis = $(this);
            $(oThis).find("li").eq(0).css({"color": str.color, "background": str.background});
            if (str.click == "true") {
                $(oThis).find("li").bind("click", Move)
            }
            if (str.mouseover == "true") {
                $(oThis).find("li").bind("mouseover", Move)
            }
            function Move() {
                var oindex = $(this).index();
                $(this).css({"color": str.color, "background": str.background}).siblings("li").css({
                    "color": "",
                    "background": ""
                });
                oThis.find(".pj-tab").eq(oindex).show().siblings(".pj-tab").hide();
                mun = oindex
            }

            if (str.mark == "true") {
                var mun = 0;
                setInterval(paly, str.timer)
            }
            function paly() {
                mun++;
                if (mun >= $(oThis).find("li").size()) {
                    mun = 0
                }
                publicFn()
            }

            function publicFn() {
                oThis.find("li").eq(mun).css({
                    "color": str.color,
                    "background": str.background
                }).siblings("li").css({"color": "", "background": ""});
                oThis.find(".pj-tab").eq(mun).show().siblings(".pj-tab").hide()
            }

            if (str.prevButton != "") {
                var oPrev = str.prevButton;
                $(oPrev).bind("click", function () {
                    if (mun == 0) {
                        mun = $(oThis).find("li").size()
                    }
                    mun--;
                    publicFn()
                })
            }
            if (str.nextButton != "") {
                var oNext = str.nextButton;
                $(oNext).bind("click", function () {
                    paly()
                })
            }
        });
        return this
    };
    $.fn.CutString = function (options) {
        var defaults = {"numbers": "200", "lastStr": "..."};
        var str = $.extend({}, defaults, options);
        this.each(function () {
            var oThis = $(this);
            oThis.each(function () {
                var oText = $(this).text().substring(1, str.numbers) + str.lastStr;
                $(this).text(oText)
            })
        });
        return this
    };
    $.fn.Carousel = function (options) {
        var defaults = {
            "background": "red",
            "play": "true",
            "auto": "true",
            "prevButton": "",
            "nextButton": "",
            "AnTimer": "800",
            "playTimer": "5000",
            "WidthMax": "false",
            "fade": "false",
            "eventClick": "false"
        };
        var str = $.extend({}, defaults, options);
        this.each(function () {
            var oThis = $(this);
            oThis.each(function () {
                if (str.WidthMax == "true") {
                    oThis.find(".pj-Carousel").css("width", $(document).width());
                    var oboxWidth = $(document).width()
                } else {
                    var oboxWidth = oThis.find(".pj-Carousel").width()
                }
                var oCarouseL = oThis.find(".pj-Carousel-box");
                var oItemSzie = oThis.find(".pj-Carousel-item").size();
                var oActive = oThis.find(".pj-Carousel-active");
                var oItem = oThis.find(".pj-Carousel-item");
                oCarouseL.css("width", oboxWidth * oItemSzie + "px");
                var color = "";
                for (var i = 0; i < oItemSzie; i++) {
                    color += "<div class ='pj-Carousel-color'> </div>"
                }
                oActive.append(color);
                var colorBg = oThis.find(".pj-Carousel-color").css("background");
                console.log(colorBg);
                oThis.find(".pj-Carousel-color").eq(0).addClass("active");
                oActive.css("marginLeft", (oboxWidth - oActive.width()) / 2 + "px");
                oItem.css("width", oboxWidth);
                if (str.eventClick == "true") {
                    oThis.find(".pj-Carousel-color").bind("click", Toevevt)
                } else {
                    oThis.find(".pj-Carousel-color").bind("mouseover", Toevevt)
                }
                function Toevevt() {
                    var oIndex = $(this).index();
                    $(this).addClass("active").siblings(".pj-Carousel-color").removeClass("active");
                    if (str.fade == "true") {
                        oThis.find(".pj-Carousel-item").eq(oIndex).fadeIn(str.WidthMax).siblings(".pj-Carousel-item").fadeOut(str.WidthMax)
                    } else {
                        oCarouseL.animate({"left": -oboxWidth * oIndex + "px"}, str.AnTimer)
                    }
                    num = oIndex
                }

                var num = 0;
                var timer = null;
                if (str.fade == "true") {
                    oItem.css({"clear": "both", "position": "absolute", "left": "0", "top": "0"});
                    oItem.eq(0).show().siblings(".pj-Carousel-item").hide()
                }
                if (str.auto == "true") {
                    timer = setInterval(plays, str.playTimer)
                }
                function plays() {
                    if (str.play == "true") {
                        num++;
                        if (num >= oItemSzie) {
                            num = 0
                        }
                        publicFn()
                    } else {
                        if (str.play == "false") {
                            if (num >= 0 && num < oItemSzie - 1) {
                                num++;
                                publicFn()
                            }
                        }
                    }
                }

                function publicFn() {
                    oThis.find(".pj-Carousel-color").eq(num).addClass("active").siblings(".pj-Carousel-color").removeClass("active");
                    if (str.fade == "true") {
                        oThis.find(".pj-Carousel-item").eq(num).fadeIn(str.AnTimer).siblings(".pj-Carousel-item").fadeOut(str.AnTimer)
                    } else {
                        oCarouseL.animate({"left": -oboxWidth * num + "px"}, str.AnTimer)
                    }
                }

                if (str.prevButton != "") {
                    var oPrev = str.prevButton;
                    $(oThis.find(oPrev)).bind("click", function () {
                        oCarouseL.stop(true, true);
                        if (str.play == "true") {
                            if (num == 0) {
                                num = oItemSzie
                            }
                            num--;
                            publicFn()
                        }
                        if (str.play == "false") {
                            if (num > 0 && num < oItemSzie) {
                                num--;
                                publicFn()
                            }
                        }
                    })
                }
                if (str.nextButton != "") {
                    var oNext = str.nextButton;
                    $(oThis.find(oNext)).bind("click", function () {
                        oCarouseL.stop(true, true);
                        if (str.play == "true") {
                            num++;
                            if (num >= oItemSzie) {
                                num = 0
                            }
                            publicFn()
                        }
                        if (str.play == "false") {
                            if (num >= 0 && num < oItemSzie - 1) {
                                num++;
                                publicFn()
                            }
                        }
                    })
                }
                oThis.find(".pj-Carousel").bind("mouseover", function () {
                    clearInterval(timer)
                });
                oThis.find(".pj-Carousel").bind("mouseout", function () {
                    timer = setInterval(plays, str.playTimer)
                })
            })
        });
        return this
    }
})(jQuery, window, document);