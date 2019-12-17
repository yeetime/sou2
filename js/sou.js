$(document).ready(function() {
    //判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    }else{
        $(".wd").focus();
    }

    //选择搜索引擎世界
    $(document).on('click',function(e){
        var con = $(".search-engine");
        var img = $(".se");

        if($(".search-engine").is(":hidden") && img.is(e.target)){
            if (img.is(e.target)) {
                $(".search-engine").show();
            }
        }else{
            if (!con.is(e.target) && con.has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    //搜索引擎列表点击
    $(".se-li").click(function(){
        url = $(this).attr('url');
        name = $(this).attr('name');
        img = $(this).attr('img')
        $("#search").attr("action",url);
        $(".wd").attr("name",name);
        $(".se").attr("src",img);
        $(".search-engine").hide();
    })

    //菜单点击
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".list").toggleClass('closed');
        //$(".mywth").toggleClass('hidden');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".list").addClass('closed');

        //$(".mywth").removeClass('hidden');
    });

});
