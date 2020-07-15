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

// 搜索引擎列表【预设】
var se_list_preinstall = {
    '1': {
        id: 1,
        title: "百度",
        url: "https://www.baidu.com/s",
        name: "wd",
        img: "./icon/baidu.ico",
    },
    '2': {
        id: 2,
        title: "谷歌",
        url: "https://www.google.com/search",
        name: "q",
        img: "./icon/google_1.png",
    },
    '3': {
        id: 3,
        title: "必应",
        url: "https://cn.bing.com/search",
        name: "q",
        img: "./icon/bing.ico",
    },
    '4': {
        id: 4,
        title: "多吉",
        url: "https://www.dogedoge.com/results",
        name: "q",
        img: "./icon/doge_ico.png",
    },
    '5': {
        id: 5,
        title: "秘迹",
        url: "https://mijisou.com",
        name: "q",
        img: "./icon/mijisou.png",
    },
    '6': {
        id: 6,
        title: "seeres*",
        url: "https://seeres.com/search",
        name: "q",
        img: "./icon/seeres.png",
    },
};

// 主页快捷方式【预设】
var quick_list_preinstall = {
    '1': {
        title: "哔哩哔哩",
        url: "https://www.bilibili.com/",
        img: "./icon/bilibili.png",
        explain: "哔哩哔哩 (゜-゜)つロ 干杯~",
    },
    '2': {
        title: "GitHub",
        url: "https://github.com/",
        img: "./icon/github.ico",
        explain: "GitHub",
    },
    '3': {
        title: "V2EX",
        url: "https://www.v2ex.com/",
        img: "./icon/v2ex.png",
        explain: "V2EX",
    },
    '4': {
        title: "Steam",
        url: "https://store.steampowered.com/",
        img: "./icon/steam.ico",
        explain: "Steam",
    },
    '5': {
        title: "scp基金会",
        url: "http://scp-wiki-cn.wikidot.com/",
        img: "./icon/scp.png",
        explain: "控制，收容，保护",
    },
};

// 主题方案【预设】
var themes_preinstall = {
    '1': {
        'name': 'light',// 主题名称
        'bg': "#f5f5f5",// 背景色
        'pop_bg': "#ffffff",// 弹窗背景色
        'shadow': "#d8d7d7",// 阴影
        'bottom_bg': "#ddd",// 按钮背景
        //'top_bg': "#2299ff",// 高亮
        'text_color': "#777777",// 文本颜色
        'bg_img': "",//背景图片
    },
    '2': {
        'name': 'darcula',
        'bg': "#2b2b2b",
        'pop_bg': "#3c3f41",
        'shadow': "#211f1f",
        'bottom_bg': "#4c5052",
        //'top_bg': "#365880",// 高亮
        'text_color': "#bbbbbb",
        'bg_img': "",//背景图片
    },
};

//背景图片
var bg_img_preinstall = {
    "type" : "1",// 1:使用主题默认的背景图片、2:关闭背景图片、3:使用自定义的背景图片
    "path" : "https://cdn.jsdelivr.net/gh/yeetime/img/20200627173550.png",//背景图片
};

// 获取背景图片
function getBgImg() {
    var bg_img_local = Cookies.get('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

// 设置背景图片
function setBgImg(bg_img){
    if (bg_img) {
        Cookies.set('bg_img', bg_img, {expires: 36500});
        return true;
    }
    return false;
}

// 设置-壁纸
function setBgImgInit() {
    var bg_img = getBgImg();

    $("input[name='wallpaper-type'][value="+bg_img["type"]+"]").attr("checked", "checked");
    if (bg_img["type"] === "3") {
        $("#wallpaper-url").val(bg_img["path"]);
        $("#wallpaper_url").show();
    } else {
        $("#wallpaper_url").hide();
    }
}

// 获取搜索引擎列表
function getSeList() {
    var se_list_local = Cookies.get('se_list');
    if (se_list_local !== "{}" && se_list_local) {
        return JSON.parse(se_list_local);
    } else {
        setSeList(se_list_preinstall);
        return se_list_preinstall;
    }
}

// 设置搜索引擎列表
function setSeList(se_list) {
    if (se_list) {
        Cookies.set('se_list', se_list, {expires: 36500});
        return true;
    }
    return false;
}

// 获得默认搜索引擎
function getSeDefault() {
    var se_default = Cookies.get('se_default');
    return se_default ? se_default : "1";
}

// 主题初始化
function themesInit() {
    var bg_img = getBgImg();
    var themes = getThemes();
    var key = getThemesDefault();
    var theme = themes[key];

    switch (bg_img["type"]) {
        case "1":
            if (theme["bg_img"]) {
                $("body").css("background-image", "url(\"" + theme["bg_img"] +"\")");//主题图片
            } else {
                $("body").css("background-image", "none");//无
            }
            break;
        case "2":
            $("body").css("background-image", "none");//无
            break;
        case "3":
            $("body").css("background-image", "url(\"" + bg_img["path"] +"\")");//自定义
            break;
    }

    $("body").css("background-color", theme["bg"]);//主页背景
    $(".con .sou form .wd").css({
        "border": "1px solid " + theme["bottom_bg"],
        "color": theme["text_color"],
    });//输入框
    $(".search-engine").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 5px 20px 0 " + theme["shadow"],
    });//搜索引擎选择弹窗
    $(".search-engine-list .se-li").css({
        "background-color": theme["bottom_bg"],
        "color": theme["text_color"],
    });//搜索引擎选择弹窗里的按钮
    $(".search-engine-tip").css({
        "border-bottom": "8px solid " + theme["pop_bg"],
    });//搜索引擎选择弹窗上的箭头
    $(".quick").css({"background-color": theme["bottom_bg"]});//快捷方式
    $(".quick a").css({"color": theme["text_color"]});//快捷方式 文本
    $(".foot").css({"color": theme["text_color"]});//底部 文本
}

// 获取默认主题
function getThemesDefault() {
    var theme_default = Cookies.get('theme_default');
    return theme_default ? theme_default : "1";
}

// 修改默认主题
function setThemesDefault(key) {
    Cookies.set('theme_default', key, {expires: 36500});
    return true;
}

// 获取主题方案列表
function getThemes() {
    var themes = Cookies.get('themes');
    if (themes && themes !== "{}") {
        return JSON.parse(themes);
    } else {
        setThemes(themes_preinstall);
        return themes_preinstall;
    }
}

// 设置主题列表 Cookies
function setThemes(themes) {
    if (themes) {
        Cookies.set('themes', themes, {expires: 36500});
        return true;
    }
    return false;
}

// 设置-主题方案列表加载
function setThemesInit() {
    var html = "";
    var themes = getThemes();
    var theme_default = getThemesDefault();

    for (var i in themes) {
        if (i === theme_default) {
            //html += "<button class=\"but-active but-ordinary set-theme\" data-id=\"" + i + "\">" + themes[i]["name"] + "</button>";
            html += "<input type=\"button\" class=\"but-ordinary but-active\" value=\"" + themes[i]["name"] + "\">";
        } else {
            html += "<button class=\"but-ordinary set-theme\" data-id=\"" + i + "\">" + themes[i]["name"] + "</button>";
        }
    }
    $("#themes").html(html);
}

// 搜索框高亮
function focusWd() {
    var themes = getThemes();
    var key = getThemesDefault();
    var theme = themes[key];

    $(".wd").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 1px 6px 0 " + theme["shadow"],
    });//输入框
}

//搜索框取消高亮
function blurWd() {
    $(".wd").css({
        "background-color": "",
        "box-shadow": "",
    });//输入框
}

// 搜索框数据加载
function searchData() {
    var se_default = getSeDefault();
    var se_list = getSeList();
    var defaultSe = se_list[se_default];
    if (defaultSe) {
        $(".search").attr("action", defaultSe["url"]);
        $(".se").attr("src", defaultSe["img"]);
        $(".wd").attr("name", defaultSe["name"]);
    }

    // 判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    } else {
        $(".wd").focus();
        focusWd();
    }
}

// 搜索引擎列表加载
function seList() {
    var html = "";
    var se_list = getSeList();
    for (var i in se_list) {
        html += "<li class='se-li' data-url='" + se_list[i]["url"] + "' data-name='" + se_list[i]["name"] + "' data-img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'>" + se_list[i]["title"] + "</li>";
    }
    $(".search-engine-list").html(html);
}

// 设置-搜索引擎列表加载
function setSeInit() {
    var se_default = getSeDefault();
    var se_list = getSeList();
    var html = "";
    for (var i in se_list) {
        var tr = "<tr><td></td>";
        if (i === se_default) {
            tr = "<tr><td><span class='iconfont iconhome'></span></td>";
        }
        tr += "<td>" + i + ". " + se_list[i]["title"] + "</td><td><button class='set_se_default' value='" + i + "'><span class='iconfont iconstrore-add'></span></button> <button class='edit_se' value='" + i + "'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='" + i + "'><span class='iconfont icondelete'></span></button></td></tr>";
        html += tr;
    }
    $(".se_list_table").html(html);
}

// 获取快捷方式列表
function getQuickList() {
    var quick_list_local = Cookies.get('quick_list');
    if (quick_list_local !== "{}" && quick_list_local) {
        return JSON.parse(quick_list_local);
    } else {
        setQuickList(quick_list_preinstall);
        return quick_list_preinstall;
    }
}

// 设置快捷方式列表
function setQuickList(quick_list) {
    if (quick_list) {
        Cookies.set('quick_list', quick_list, {expires: 36500});
        return true;
    }
    return false;
}

// 快捷方式数据加载
function quickData() {
    var html = "";
    var quick_list = getQuickList();
    for (var i in quick_list) {
        html += "<li class='quick' title='" + quick_list[i]['explain'] + "'>\
                        <a href='" + quick_list[i]['url'] + "'>\
                            <i style='background-image: url(" + quick_list[i]['img'] + ");'></i>\
                            " + quick_list[i]['title'] + "\
                        </a>\
                     </li>";
    }
    $(".quick-ul").html(html);
}

// 设置-快捷方式加载
function setQuickInit() {

    var quick_list = getQuickList();
    var html = "";
    for (var i in quick_list) {
        tr = "<tr>\
                    <td>" + i + ".&nbsp;</td>\
                    <td>" + quick_list[i]['title'] + "</td>\
                    <td>\
                        <button class='edit_quick' value='" + i + "'><span class='iconfont iconbook-edit'></span></button>\
                        &nbsp;\
                        <button class='delete_quick' value='" + i + "'><span class='iconfont icondelete'></span></button>\
                    </td>\
                </tr>";
        html += tr;
    }
    $(".quick_list_table").html(html);
}

/**
 * 导入备份
 * @param json
 */
function importData(json) {
    // json 格式校验
    try {
        var mydata = JSON.parse(json);
    } catch (e) {
        alert("数据解析异常");
        return;
    }
    if (typeof mydata != 'object') {
        alert("数据格式错误");
        return;
    }

    if (confirm("当前数据将被覆盖！是否继续导入？")) {
        setSeList(mydata["se"]);
        if (mydata["se_default"]) {
            Cookies.set('se_default', mydata["se_default"], {expires: 36500});
        }
        setQuickList(mydata["quick"]);
        setThemes(mydata["themes"]);
        setThemesDefault(mydata["theme_default"]);

        setSeInit();
        setQuickInit();
        setThemesInit();

        alert("导入成功");
    }
}

/**
 * 下載文本为文件
 * @param filename 文件名
 * @param text     内容
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// 侧边栏打开
function openSide() {
    $("#menu").addClass('on');
    $(".side").removeClass('closed');
}

// 侧边栏关闭
function closeSide() {
    $("#menu").removeClass('on');
    $(".side").addClass('closed');

    // 刷新主页数据
    seList();
    quickData();
    themesInit();
}

$(document).ready(function () {

    // 搜索框数据加载
    searchData();

    // 搜索引擎列表加载
    seList();

    // 快捷方式数据加载
    quickData();

    // 主题初始化(必须在页面元素都加载完成后再加载主题,每当页面元素改变时都应进行主题初始化)
    themesInit();

    // 设置内容加载
    setSeInit();//搜索引擎设置
    setQuickInit();//快捷方式设置
    setThemesInit();//主题方案
    setBgImgInit();//壁纸

    // 选择搜索引擎点击事件
    $(document).on('click', function (e) {
        if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
            if ($(".se").is(e.target)) {
                $(".search-engine").show();
            }
        } else {
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    // 搜索引擎列表点击
    $(".search-engine-list").on("click", ".se-li", function () {
        var url = $(this).attr('data-url');
        var name = $(this).attr('data-name');
        var img = $(this).attr('data-img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });

    // 菜单点击
    $("#menu").click(function (event) {
        if ($(this).attr("class") === "on") {
            closeSide();
        } else {
            openSide();
        }
    });
    $("#content").click(function (event) {
        if ($("#menu").attr("class") === "on") {
            closeSide();
        }
    });

    // 搜索框获得焦点事件
    $(".wd").focus(function () {
        focusWd();
    });

    // 搜索框失去焦点事件
    $(".wd").blur(function () {
        blurWd();
    });

    // 侧栏标签卡切换
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    // 修改默认搜索引擎
    $(".se_list_table").on("click", ".set_se_default", function () {
        var name = $(this).val();
        Cookies.set('se_default', name, {expires: 36500});
        setSeInit();
    });

    // 搜索引擎添加
    $(".set_se_list_add").click(function () {
        $(".se_add_content input").val("");
        $(".se_add_content").show();
    });

    // 搜索引擎保存
    $(".se_add_save").click(function () {
        var key_inhere = $(".se_add_content input[name='key_inhere']").val();
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var se_list = getSeList();

        if (se_list[key]) {
            alert("顺序:" + key + " 已有数据，不可用");
            return;
        }

        if (key_inhere && key !== key_inhere) {
            delete se_list[key_inhere];
        }

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };
        setSeList(se_list);
        setSeInit();
        $(".se_add_content").hide();
    });

    // 关闭表单
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();
    });

    // 搜索引擎修改
    $(".se_list").on("click", ".edit_se", function () {

        var se_list = getSeList();
        var key = $(this).val();
        $(".se_add_content input[name='key_inhere']").val(key);
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);

        $(".se_add_content").show();
    });

    // 搜索引擎删除
    $(".se_list").on("click", ".delete_se", function () {
        var se_default = getSeDefault();
        var key = $(this).val();
        if (key == se_default) {
            alert("默认搜索引擎不可删除！");
        } else {
            var r = confirm("顺序 " + key + " 是否删除！");
            if (r) {
                var se_list = getSeList();
                delete se_list[key];
                setSeList(se_list);
                setSeInit();
            }
        }
    });

    // 恢复预设搜索引擎
    $(".set_se_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setSeList(se_list_preinstall);
            Cookies.set('se_default', 1, {expires: 36500});
            setSeInit();
        }
    });

    // 设置-快捷方式添加
    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();
    });

    // 设置-快捷方式保存
    $(".quick_add_save").click(function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var quick_list = getQuickList();

        if (quick_list[key]) {
            alert("顺序:" + key + " 已有数据，不可用");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
    });

    // 设置-快捷方式关闭添加表单
    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();
    });

    //恢复预设快捷方式
    $(".set_quick_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setQuickList(quick_list_preinstall);
            setQuickInit();
        }
    });

    // 快捷方式修改
    $(".quick_list").on("click", ".edit_quick", function () {

        var quick_list = getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        $(".quick_add_content").show();
    });

    // 快捷方式删除
    $(".quick_list").on("click", ".delete_quick", function () {

        var key = $(this).val();

        var r = confirm("顺序 " + key + " 是否删除！");
        if (r) {
            var quick_list = getQuickList();
            delete quick_list[key];
            setQuickList(quick_list);
            setQuickInit();
        }
    });

    // 主题切换
    $("#themes").on("click", ".set-theme", function () {
        var key = $(this).attr("data-id");
        setThemesDefault(key);
        setThemesInit();
    });

    // 壁纸设置
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        var type = $(this).val();
        var bg_img = getBgImg();

        if (type === "3") {
            $("#wallpaper_url").show();
            $("#wallpaper-url").val(bg_img["path"]);
        } else {
            $("#wallpaper_url").hide();
        }
        bg_img["type"] = type;
        setBgImg(bg_img);
    });

    // 壁纸自定义
    $(".wallpaper-submit").click(function () {
        var url = $("#wallpaper-url").val();
        var bg_img = getBgImg();
        bg_img["type"] = "3";
        bg_img["path"] = url;
        setBgImg(bg_img);
    });

    // 我的数据导出
    $("#my_data_out").click(function () {
        var se = getSeList();
        var se_default = getSeDefault();
        var quick = getQuickList();
        var themes = getThemes()
        var theme_default = getThemesDefault()

        var mydata = {
            "se": se,
            "se_default": se_default,
            "quick": quick,
            "themes": themes,
            "theme_default": theme_default,
        };
        var json = JSON.stringify(mydata);

        download("back-up-" + $.now() + ".json", json);
    });

    // 我的数据导入 点击触发文件选择
    $("#my_data_in").click(function () {
        $("#my_data_file").click();
    });

    // 选择文件后读取文件内容
    $("#my_data_file").change(function () {
        var selectedFile = document.getElementById('my_data_file').files[0];
        //var name = selectedFile.name;//读取选中文件的文件名
        //var size = selectedFile.size;//读取选中文件的大小
        //console.log("文件名:"+name+" 大小:"+size);

        var reader = new FileReader();//这是核心,读取操作就是由它完成.
        reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
            //console.log(this.result);

            // 导入数据
            importData(this.result);
        }
    });
});
