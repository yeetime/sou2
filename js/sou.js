/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
❶❷❸❹❺❻❼❽❾❿
由 yeetime 修改
github：https://github.com/yeetime/sou2
日期：2019-12-13
*/

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
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".list").addClass('closed');
    });

    //菜单展开动画
    $(".set").click(function() {
        if($("#controll").is(":hidden")){
            $("#controll").show();
            $("#controll")[0].style.height = 200+"px";
            $(".set").html("关闭");
        } else {
            $("#controll")[0].style.height = 0+"px";
            $("#controll").hide();
            $(".set").html("<i class='iconfont icon-kongzhi'></i> 设置");
        }
    });

    //设置默认搜索引擎
    $(".se_list").on("click",".se_l",function(){

        var name = $(this).val();
        Cookies.set('se_default', name, { expires: 30 });
        alert("默认搜索引擎已保存");
    });

    //初始化
    var se_list = {
        1:{
            id      :1,
            title   :"百度",
            url     :"https://www.baidu.com/s",
            name    :"wd",
            img     :"./icon/baidu.ico",
        },
        2:{
            id      :2,
            title   :"谷歌",
            url     :"https://www.google.com/search",
            name    :"q",
            img     :"./icon/google_1.png",
        },
    };

    var se_default = Cookies.get('se_default');

    setinit();
    function setinit () {
        var html = "";
        for(var i in se_list){
            if(i == se_default){
                html+="<input type='radio' class='se_l' name='se_default' value='"+i+"' checked='checked'> "+ se_list[i]["title"];
            } else {
                html+="<input type='radio' class='se_l' name='se_default' value='"+i+"'> "+ se_list[i]["title"];
            }
        }
        $(".se_list").html(html);
    }
});
