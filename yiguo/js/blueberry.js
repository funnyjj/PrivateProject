//图片渐隐渐显变化
$(function(){
	$(".pic_thumb > ul > li").mouseenter(function(){
		$(".pic_thumb > ul > li").removeClass("on");
		var $img_big = $(this).attr("class");
		$(this).addClass("on");
		$(".pic_big").children().fadeOut(400);
		$(".pic_big").children("."+ $img_big).fadeIn(400);
	});
});

//产品放大镜
$(function(){
	var scale = 5; //放大倍数
	//插入小方块
	var $lay = $("<div></div>").css({
		width:100,
		height:100,
		position:"absolute",
		left:0,
		top:0,
		background:"#FFF",
		opacity:"0.8",
		boxShadow:"0 0 10px #333"
	}).appendTo(".pic_big").hide();

	$(".pic_big").hover(function(e){
		$lay.show();
		var i = 1;
		//放大不同的图片
		if($(e.target).attr("class") === "pic_b1"){
			i = 1;
			var $img = $("<img src='../img/blueberry/goods"+ i +".jpg' />").width(2500).height(2500);
			$img.appendTo($("#zoom"));
		}else if($(e.target).attr("class") === "pic_b2"){
			i = 2;
			var $img = $("<img src='../img/blueberry/goods"+ i +".jpg' />").width(2500).height(2500);
			$img.appendTo($("#zoom"));
		}else if($(e.target).attr("class") === "pic_b3"){
			i = 3;
			var $img = $("<img src='../img/blueberry/goods"+ i +".jpg' />").width(2500).height(2500);
			$img.appendTo($("#zoom"));
		}
		$("#zoom").show().stop().animate({
			width:500,
			height:500,
			left:500,
			top:0,
			opacity:1
		},600);
		$(this).mousemove(function(e){
			//小方块跟随鼠标移动
			var x = e.pageX - $(this).offset().left - 50;
			var y = e.pageY - $(this).offset().top - 50;
			var maxWidth = 400;
			var maxHeight = 400;
			var nowX = Math.max(Math.min(x,maxWidth),0);
			var nowY = Math.max(Math.min(y,maxHeight),0);
			$lay.css({
				left:nowX,
				top:nowY
			});
			//大图移动
			$("#zoom > img").css({
				marginLeft:nowX * scale * -1,
				marginTop:nowY *scale * -1
			});
		});		
	},function(){
		$lay.hide();
		$("#zoom").animate({
			width:0,
			height:0,
			left:250,
			top:250,
			opacity:0
		},600,function(){
			$("#zoom").children("img").remove();//移除添加的图片
		});
	});

	//放大的图片
	var $zoom = $("<div id='zoom'></div>")
		.css({
			position:"absolute",
			left:250,
			top:250,
			overflow:"hidden",
			width:0,
			height:0,
			opacity:0,
			zIndex:50
		}).appendTo(".pic_big").hide();
});

// 产品规格、数量选择、加入购物车
$(function(){
	// 规格选择
	$(".norms").click(function(){
		$(this).parents().children().removeClass("on");
		$(this).addClass("on");
		var $price = $(this).children().children(".c_price").text();
		$(".berry_price > .price").children().eq(1).children("strong").text($price);
	});
	// 数量选择
	var i = 1;
	$(".count > .increase").click(function(){
		i ++;
		$("#berry_num").val(i);
	});
	$(".count > .decrease").click(function(){
		if(i > 1){
			i --;
			$("#berry_num").val(i);
		}else{
			alert("不能再减了！！！爱我你怕了吗？");
		}	
	});
	// 加入购物车
	$(".amount .addCart").click(function(){
		$("<img src='../img/blueberry/goods1.jpg'/>").css({
			position:"absolute",
			left:0,
			top:0,
			width:500,
			height:500,
			zIndex:120
		}).appendTo(".pic_perview").stop().animate({
			width:50,
			height:50,
		},1000,function(){
			$(this).animate({
				top:-145,
				left:1100
			},1000,function(){
				var id = 4;
				var img = $(this).attr("src");
				var info =  $(".product_info").children("h2").text();
				var price = $(".product_info > .berry_price > .price").children().children().text();
				var num = $(".amount > .dd > .count").children("input").val();
				var str = id + "#" + img + "#" + info + "#" + price + "#" + num;  					
				// 判断cookie是否有数据
				if($.cookie("shopcart")){
					var $cookie = strOper.addStr($.cookie("shopcart"),str);				
					$.cookie("shopcart",$cookie,{
						expires:7
					});
				}else{
					$.cookie("shopcart",str,{
						expires:7
					});
				}
				// 修改header和menu中购物车数量总价变化
				function getNum($cookie){
					var rowArr = $cookie === "" ? [] : $cookie.split("|");
					var newArr = [];
					var totalNum = 0;
					var totalPrice = 0;
					for(var i = 0; i < rowArr.length; i ++){
						var colArr = rowArr[i].split("#");
						totalNum += parseInt(colArr[4]);
						var total = colArr[3].replace("￥","");
						totalPrice += parseFloat(total) * colArr[4];		
					}
					newArr.push(totalNum);	
					newArr.push(totalPrice.toFixed(2));	
					return newArr;
				}
				if($.cookie("shopcart")){
					var arr = getNum($.cookie("shopcart"));
					$(".shopcart > a").children(".totalNum").children().text(arr[0]);
					$(".shopcart > a").children(".totalPrice").text("￥" + arr[1]);
					$(".shopcart").children(".totalNum").children().text(arr[0]);
					$(".shopcart").children(".totalPrice").text("￥" + arr[1]);
				}
				//删除运动的图片
				$(this).remove();
			})

		});
	})
	
})

// 当季热卖
$(function(){
	$.get("../js/blueberry.json",function(data){
		var oDL = "";
		for(var i = 0;i < data.length;i ++){
			oDL += "<dl>"
					 + "<dt><a href='#'><img src='../img/blueberry/"+ data[i].hot_img +"'></a></dt>"
					 + "<dd>"
						 + "<p><a href='#'>"+ data[i].hot_name +"</a></p>"
						 + "<span>"+ data[i].hot_price +"</span><del>"+ data[i].hot_del +"</del>"
					 + "</dd>"
				 + "</dl>"
		}
		$(".hotpro").html(oDL);
	})
});

//商品详情菜单
$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() > 1146){
			$(".detail_tab2").css("display","block");
		}else{
			$(".detail_tab2").css("display","none");
		}
	});
	$(".pro_tab").click(function(){
		$(this).parent().children().removeClass("on");
		$(this).addClass("on");
		$(".detail_item").css("display","block");
		$(".comment").css("display","none");
	});
	$(".user_tab").click(function(){
		$(this).parent().children().removeClass("on");
		$(this).addClass("on");
		$(".detail_item").css("display","none");
		$(".comment").css("display","block");
	});
})
