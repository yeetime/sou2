$(document).ready(function() {
    //判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    }else{
        $(".wd").focus();
    }
    //搜索引擎图片点击
    $(".se").click(function(){
        $(".search-engine").show();
    })
    //搜索列表点击
    $(".se-li").click(function(){
        url = $(this).attr('url');
        name = $(this).attr('name');
        $("#search").attr("action",url);
        $(".wd").attr("name",name);
        $(".search-engine").hide();
    })
    //菜单点击
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".list").toggleClass('closed');
        $(".search-engine").hide();
        //$(".mywth").toggleClass('hidden');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".list").addClass('closed');

        //$(".mywth").removeClass('hidden');
    });

});
