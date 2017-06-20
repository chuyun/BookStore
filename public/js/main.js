/**
 * Created by jun on 2017/4/11.
 */

/**
 * @author  info_together@aliyun.com
 * @description
 * @param
 * @return
 */

    //标签替换
    $('#search-btn').click(function () {
        $('#search').html('Search')
    });
    $('#tags-btn').click(function () {
        $('#search').html('Tags')
    });

    // <!--轮播-->
    $(function () {
        $("#pj-lunbo").Carousel({
            'play': 'true', //是否循环播放
            'prevButton': '#prev', //左按钮
            'nextButton': '#next',  //右按钮
            'auto': 'true',   //是否自动播放
            'playTimer': '2000',   //循环播放
        });
        $("#pj-lunbo-main").Carousel({
            'play': 'true', //是否循环播放
            'prevButton': '#prev', //左按钮
            'nextButton': '#next',  //右按钮
            'auto': 'true',   //是否自动播放
            'playTimer': '2000'   //循环播放
            //'WidthMax':'true' //全屏
        });
    });

    //回到顶部
    $(window).scroll(function () {
        var sc = $(window).scrollTop();
        var rwidth = $(window).width()
        if (sc > 0) {
            $("#gotop").css("display", "block");
            $("#gotop").css("left", (rwidth - 36) + "px")
        } else {
            $("#gotop").css("display", "none");
        }
    });
    $("#gotop").click(function () {
        var sc = $(window).scrollTop();
        $('body,html').animate({scrollTop: 0}, 500);
    })


    // search
    $("#search").bind('click', function () {
        var bookName = $("#searchName").val();
        var kind = $('#search').val();
        var data = {'bookName': bookName, 'kind': kind};

        $.ajax({
            url: '/search',
            type: 'POST',
            data: data,
            success: function (data, status) {
                if (status == 'success') {
    //                        location.href = 'login';
                }
            },
            error: function (data, err) {
    //                    location.href = 'register';
            }
        })
    });
