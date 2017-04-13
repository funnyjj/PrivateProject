//sort变化
$(function(){
	$(".sort > .sortDiv > p").hover(function(){
		$(this).css("background","#eaeaea")
			   .children().css("color","#008842");
	},function(){
		$(this).css("background","#FFF")
		   	   .children().css("color","#444444");	
	});
})

//进口水果列表
$(function(){
	$.get("../js/products.json",function(data){
		var oProducts = "";
		for(var i = 0; i < data.length;i ++){
			var cssName = "";
			if((i+1) % 4 == 0){
				cssName = "class='pDL'"
			}
			oProducts += "<dl num='"+ data[i].productID +"'"+ cssName +">"
						 + "<dt><a href='blueberry.html'><img src='../img/products/"+ data[i].productImg +"'></a></dt>"
						 + "<div class='buy'><p class='toBuy'>加入购物车</p></div>"
						 + "<dd>"
							 + "<p><a href='blueberry.html'>"+ data[i].productsName +"</a></p>"
							 + "<b>"+ data[i].productsPrice +"</b>"
						 + "</dd>"
						 + "<img src='../img/products/icon06.png' class='newProduct'/>"
					  + "</dl>";
		}
		$(".productsList").html(oProducts);
		$(".buy").css("opacity","0");

		
		//鼠标划入显示加入购物车
		$(".productsList > dl").hover(function(){
			$(this).children(".buy").css({
				display:"block",
				opacity:0.9
			}).click(function(){ //点击加入购物车
				var $imgsrc = $(this).parent().children("dt").children().children("img").attr("src");
				$("<img src='"+ $imgsrc +"' class='buypro'/>").css({
					width:290,
					height:290,
					position:"absolute",
					left:0,
					top:0,
					zIndex:100
				}).appendTo($(this).parent()).stop().animate({
					width:30,
					height:30
				},1000,function(){
					$(this).css({
						position:"fixed",
						left:$(this).parent().offset().left,
						top:$(this).parent().offset().top - $(window).scrollTop(),
						zIndex:120
					}).animate({
						left:1100,
						top:10
					},1000,function(){
						//删除运动的图片
						$(this).remove();
					});
				});

			});
		},function(){
			$(this).children(".buy").css({
				display:"none",
				opacity:0
			});
		})
		
		$(".buy").click(function(){	
			var id = $(this).parent().attr("num");
			var img = $(this).parent().children("dt").children().children("img").attr("src");
			var info = $(this).parent().children("dd").children("p").children().text();
			var price =  $(this).parent().children("dd").children("b").text();
			var num = 1;
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
			// 修改header中购物车数量总价变化
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
				// header中的购物车数据
				$(".shopcart > a").children(".totalNum").children().text(arr[0]);
				$(".shopcart > a").children(".totalPrice").text("￥" + arr[1]);
				// menu中的购物车数据
				$(".shopcart").children(".totalNum").children().text(arr[0]);
				$(".shopcart").children(".totalPrice").text("￥" + arr[1]);
			}
										
		})

	})
})

