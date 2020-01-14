
(function($){

	$.fn.rTabs = function(options){

		//默认值
		var defaultVal = {
			btnClass:'.j-tab-nav',	/*按钮的父级Class*/
			conClass:'.j-tab-con',	/*内容的父级Class*/
			bind:'hover',	/*事件参数 click,hover*/
			animation:'0',	/*动画方向 left,up,fadein,0 为无动画*/
			speed:300, 	/*动画运动速度*/
			delay:200,	/*Tab延迟速度*/
			auto:false,	/*是否开启自动运行 true,false*/
			autoSpeed:3000	/*自动运行速度*/
		};

		//全局变量
		var obj = $.extend(defaultVal, options),
			evt = obj.bind,
			btn = $(this).find(obj.btnClass),
			con = $(this).find(obj.conClass),
			anim = obj.animation,
			conWidth = con.width(),
			conHeight = con.height(),
			len = con.children().length,
			sw = len * conWidth,
			sh = len * conHeight,
			i = 0,
			len,t,timer;

		return this.each(function(){

			//判断动画方向
			function judgeAnim(){
				var w = i * conWidth,
					h = i * conHeight;
				btn.children().removeClass('current').eq(i).addClass('current');
				switch(anim){
					case '0':
					con.children().hide().eq(i).show();
					break;
					case 'left':
					con.css({position:'absolute',width:sw}).children().css({float:'left',display:'block'}).end().stop().animate({left:-w},obj.speed);
					break;
					case 'up':
					con.css({position:'absolute',height:sh}).children().css({display:'block'}).end().stop().animate({top:-h},obj.speed);
					break;
					case 'fadein':
					con.children().hide().eq(i).fadeIn();
					break;
				}
			}

			//判断事件类型
			if(evt == "hover"){
				btn.children().hover(function(){
					var j = $(this).index();
					function s(){
						i = j;
						judgeAnim();
					}
					timer=setTimeout(s,obj.delay);
				}, function(){
					clearTimeout(timer);
				})
			}else{
				btn.children().bind(evt,function(){
					i = $(this).index();
					judgeAnim();
				})
			}

			//自动运行
			function startRun(){
				t = setInterval(function(){
					i++;
					if(i>=len){
						switch(anim){
							case 'left':
							con.stop().css({left:conWidth});
							break;
							case 'up':
							con.stop().css({top:conHeight});
						}
						i=0;
					}
					judgeAnim();
				},obj.autoSpeed)
			}

			//如果自动运行开启，调用自动运行函数
			if(obj.auto){
				$(this).hover(function(){
					clearInterval(t);
				},function(){
					startRun();
				})
				startRun();
			}

		})

	}

})(jQuery);