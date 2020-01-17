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

    //首页数据加载
    homeData();
    //设置内容加载
    setinit();

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

    // 侧栏标签卡切换
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    //修改默认搜索引擎
    $(".se_list_table").on("click",".set_se_default",function(){
        var name = $(this).val();
        Cookies.set('se_default', name, { expires: 30 });
        setinit();
    });

    //获得默认搜索引擎
    function getSeDefault(){
        return Cookies.get('se_default') ? Cookies.get('se_default') : "baidu";
    }

    //首页数据加载
    function homeData() {
        var se_default =getSeDefault();
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
        var se_default =getSeDefault();
        var html = "";
        for(var i in se_list){
            var tr = "<tr><td></td>";
            if(i == se_default){
                tr ="<tr><td><span class='iconfont iconhome'></span></td>";
            }
            tr += "<td>"+ se_list[i]["title"] +"</td><td><button class='set_se_default' value='"+i+"'><span class='iconfont iconstrore-add'></span></button><button class='edit_se' value='"+i+"'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='"+i+"'><span class='iconfont icondelete'></span></button></td></tr>";
            html+=tr;
        }
        $(".se_list_table").html(html);
    }

    //搜索引擎添加
    $(".se_add_button button").click(function () {
        $(".se_add_content input").val("");
    });

    //搜索引擎保存
    $(".se_add_save").click(function () {
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        //$(".se_add_content input").val("");

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };

        setinit();
    });

    //搜索引擎详情
    $(".se_list").on("click",".edit_se",function(){
        var key = $(this).val();
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);
    });
});
