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

    //本地数据

    //搜索引擎
    var se_list = {
        'baidu':{
            id      :1,
            title   :"百度",
            url     :"https://www.baidu.com/s",
            name    :"wd",
            img     :"./icon/baidu.ico",
        },
        'google':{
            id      :2,
            title   :"谷歌",
            url     :"https://www.google.com/search",
            name    :"q",
            img     :"./icon/google_1.png",
        },
        'bing':{
            id      :3,
            title   :"必应",
            url     :"https://cn.bing.com/search",
            name    :"q",
            img     :"./icon/bing.ico",
        },
        'dogedoge':{
            id      :4,
            title   :"多吉",
            url     :"https://www.dogedoge.com/results",
            name    :"q",
            img     :"./icon/doge_ico.png",
        },
        'mijisou':{
            id      :5,
            title   :"秘迹",
            url     :"https://mijisou.com",
            name    :"q",
            img     :"./icon/mijisou.png",
        },
        'seeres':{
            id      :6,
            title   :"seeres*",
            url     :"https://seeres.com/search",
            name    :"q",
            img     :"./icon/seeres.png",
        },
    };

    //默认搜索引擎
    var se_default = Cookies.get('se_default')?Cookies.get('se_default'):"baidu";

    //首页数据加载
    homeData();

    //判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    }else{
        $(".wd").focus();
    }

    //选择搜索引擎
    $(document).on('click',function(e){
        var con = $(".search-engine");
        var img = $(".se");

        if($(".search-engine").is(":hidden") && img.is(e.target)){
            if (img.is(e.target)) {
                seList();
                $(".search-engine").show();
            }
        }else{
            if (!con.is(e.target) && con.has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    //搜索引擎列表点击
    $(".search-engine-list").on("click",".se-li",function(){
        var url = $(this).attr('url');
        var name = $(this).attr('name');
        var img = $(this).attr('img');
        $("#search").attr("action",url);
        $(".wd").attr("name",name);
        $(".se").attr("src",img);
        $(".search-engine").hide();
    })

    //菜单点击
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".side").toggleClass('closed');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".side").addClass('closed');
    });

    //设置展开动画
    $(".set").click(function() {
        if($("#controll").is(":hidden")){
            setinit();
            $("#controll").show();
            $("#controll")[0].style.height = 400+"px";
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
        //alert("默认搜索引擎已保存");
    });

    //首页数据加载
    function homeData() {
        var defaultSe = se_list[se_default];
        $("#search").attr("action", defaultSe["url"]);
        $(".se").attr("src", defaultSe["img"]);
        $(".wd").attr("name", defaultSe["name"]);
    }
    //搜索引擎列表加载
    function seList() {
        var html = "";
        for(var i in se_list){
            html+="<li class='se-li' url='"+se_list[i]["url"]+"' name='"+se_list[i]["name"]+"' img='"+se_list[i]["img"]+"'><img src='"+se_list[i]["img"]+"'></img>"+se_list[i]["title"]+"</li>";
        }
        $(".search-engine-list").html(html);
    }
    //设置内容加载
    function setinit () {
        var html = "<ul>";
        for(var i in se_list){
            if(i == se_default){
                html+="<li><input type='radio' class='se_l' name='se_default' value='"+i+"' checked='checked'> "+ se_list[i]["title"] +"</li>";
            } else {
                html+="<li><input type='radio' class='se_l' name='se_default' value='"+i+"'> "+ se_list[i]["title"] +"</li>";
            }
        }
        html+="</ul>"
        $(".se_list").html(html);
    }
});
