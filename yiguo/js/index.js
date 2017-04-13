//banner轮播
$(function(){
	$(".banner1 > li:eq(0)").children().show(600).css({
		"transform":"scale(1)",
		"-ms-transform": "scale(1)",	
		"-webkit-transform": "scale(1)",	
		"-o-transform": "scale(1)",
		"-moz-transform": "scale(1)"
	});
	$(".banner2 > li:eq(0)").fadeIn(2000);
	//向左向右手动轮播
	var currIndex = 0;
	$(".b_next").click(function(){
		isRunning = false;
		currIndex ++;
		if(currIndex == 9){
			currIndex = 0;
		}
		$(".banner1 > li").children().hide(600).eq(currIndex).show(600).css({
			transform:"scale(1)",
			"-ms-transform": "scale(1)",	
			"-webkit-transform": "scale(1)",	
			"-o-transform": "scale(1)",
			"-moz-transform": "scale(1)"
		});
		$(".banner2 > li").hide().eq(currIndex).fadeIn(2000);
		$(".dot > span").removeClass("on").eq(currIndex).addClass("on");
	});
	$(".b_prev").click(function(){
		isRunning = false;
		currIndex --;
		if(currIndex == -1){
			currIndex = 8;
		}
		$(".banner1 > li").children().hide(600).eq(currIndex).show(600).css({
			transform:"scale(1)",
			"-ms-transform": "scale(1)",	
			"-webkit-transform": "scale(1)",	
			"-o-transform": "scale(1)",
			"-moz-transform": "scale(1)"
		});
		$(".banner2 > li").hide().eq(currIndex).fadeIn(2000);
		$(".dot > span").removeClass("on").eq(currIndex).addClass("on");
	});
	//左右键效果
	$(".b_prev,.b_next").css({opacity:0}).hover(function(){
		$(this).stop().animate({
			opacity:1
		})
	},function(){
		$(this).stop().animate({
			opacity:.5
		})
	}).parent().hover(function(){
		$(".b_prev,.b_next").stop().animate({
			opacity:.5
		});
		isRunning = false;
	},function(){
		$(".b_prev,.b_next").stop().animate({
			opacity:0
		});
		isRunning = true;
	});
	//按钮效果
	$(".dot > span").click(function(){
		currIndex = $(this).index();
		$(".banner1 > li").children().hide(600).eq(currIndex).show(600).css({
			transform:"scale(1)",
			"-ms-transform": "scale(1)",	
			"-webkit-transform": "scale(1)",	
			"-o-transform": "scale(1)",
			"-moz-transform": "scale(1)"
		});
		$(".banner2 > li").hide().eq(currIndex).fadeIn(2000);
		$(".dot > span").removeClass("on").eq(currIndex).addClass("on");
	});
	//自动轮播
	var isRunning = true;
	setInterval(function(){
		if(isRunning == true){
			currIndex ++;
			if(currIndex == 9){
				currIndex = 0;
			}
			$(".banner1 > li").children().hide(600).eq(currIndex).show(600).css({
				transform:"scale(1)",
				"-ms-transform": "scale(1)",	
				"-webkit-transform": "scale(1)",	
				"-o-transform": "scale(1)",
				"-moz-transform": "scale(1)"
			});
			$(".banner2 > li").hide().eq(currIndex).fadeIn(2000);
			$(".dot > span").removeClass("on").eq(currIndex).addClass("on");
		}
	},4000)
})


//floor列表
$(function(){
	var oDiv = "";
	$.get("../js/floor.json",function(data){
		for(var i = 0;i < data.length;i ++){
			if(i < 4){
				oDiv = "<div class='f_left'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[0] +".jpg'></a></div>"
					 + "<ul class='f_right'>"
						 + "<li class='f_li2'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[1] +".jpg'></a></li>"
						 + "<li class='f_li3'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[2] +".jpg'></a></li>"
						 + "<li class='f_li4'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[3] +".jpg'></a></li>"
						 + "<li class='f_li5'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[4] +".jpg'></a></li>"
						 + "<li class='f_li6'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[5] +".jpg'></a></li>"
						 + "<li class='f_li7'><a href='blueberry.html'><img src='../img/"+ data[i].subitem[6] +".jpg'></a></li>"
					 + "</ul>" 
				$(".f"+ (i+1) +"_Div").html(oDiv);
			}
			
		}
		
		$(".f_right > li").hover(function(){
			$(this).children().children().stop().animate({
				left:10
			},200)
		},function(){
			$(this).children().children().stop().animate({
				left:0
			},200)
		});

		$(".f_center > li > a,.f2_li5 > a").hover(function(){
			$(this).children().stop().animate({
				left:10
			},200)
		},function(){
			$(this).children().stop().animate({
				left:0
			},200)
		});
	});
})

// 左侧导航栏
$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() > 950){
			$("#sidenav").show();
		}else{
			$("#sidenav").hide();
		}
	})
	$("#sidenav").hover(function(e){
		if($(e.target).is(".f1")){
			$(".f1").css("background","#008842").html("进口水果");
		}else if($(e.target).is(".f2")){
			$(".f2").css("background","#008842").html("国产水果");
		}else if($(e.target).is(".f3")){
			$(".f3").css("background","#008842").html("新鲜蔬菜");
		}else if($(e.target).is(".f4")){
			$(".f4").css("background","#008842").html("海鲜水产");
		}else if($(e.target).is(".f5")){
			$(".f5").css("background","#008842").html("精选肉类");
		}
	},function(){
		$(this).children().css("background","#fff url(../img/floor_guide.png) no-repeat").html("");
		$(this).children(".f2").css("background-position","-40px 0");
		$(this).children(".f3").css("background-position","-80px 0");
		$(this).children(".f4").css("background-position","-120px 0");
		$(this).children(".f5").css("background-position","-160px 0");
	});
	$("#sidenav").click(function(e){
		if($(e.target).is(".f1")){
			$(window).scrollTop(910);
		}else if($(e.target).is(".f2")){
			$(window).scrollTop(1420);
		}else if($(e.target).is(".f3")){
			$(window).scrollTop(1940);
		}else if($(e.target).is(".f4")){
			$(window).scrollTop(2460);
		}else if($(e.target).is(".f5")){
			$(window).scrollTop(2980);
		}
	})
})
