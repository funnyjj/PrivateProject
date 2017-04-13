//我的易果列表
$(function(){
	$(".h_right > .myyiguo").mouseover(function(){
		$(this).children().css({
			width:98,
			borderLeft:"1px solid #999999",
			borderRight:"1px solid #999999",
			color:"#008842"
		}).children().eq(-1).css({
			"transition": ".2s",
			"-moz-transition": ".2s",	
			"-webkit-transform":".2s",
			"-o-transition":  ".2s",
			transform:"rotate(180deg)",
			"-moz-transition": "rotate(180deg)",	
			"-webkit-transform":"rotate(180deg)",
			"-o-transition":  "rotate(180deg)"
		});
		$("#myyg").show();
	});
	$(".h_right > .myyiguo").mouseout(function(){
		$(this).children().css({
			width:100,
			borderLeft:0,
			borderRight:0,
			color:"#444444"
		}).children().eq(-1).css({
			"transition": ".2s",
			"-moz-transition": ".2s",	
			"-webkit-transform":".2s",
			"-o-transition":  ".2s",
			transform:"rotate(0deg)",
			"-moz-transition": "rotate(0deg)",	
			"-webkit-transform":"rotate(0deg)",
			"-o-transition":  "rotate(0deg)"
		});
		$("#myyg").hide();	
	});
	$("#myyg").mouseover(function(e){
		$(".h_right > .myyiguo").mouseover();
		$(e.target).children().hover(function(){
			$(this).css("color","#008842");
		},function(){
			$(this).css("color","#727272");
		})
	});
	$("#myyg").mouseout(function(e){
		$(".h_right > .myyiguo").mouseout();
	});
});

//手机易果列表
$(function(){
	$(".h_right > .mobile").mouseover(function(){
		$(this).children().css({
			width:98,
			borderLeft:"1px solid #999999",
			borderRight:"1px solid #999999",
			color:"#008842"
		}).children().eq(-1).css({
			"transition": ".2s",
			"-moz-transition": ".2s",	
			"-webkit-transform":".2s",
			"-o-transition":  ".2s",
			transform:"rotate(180deg)",
			"-moz-transition": "rotate(180deg)",	
			"-webkit-transform":"rotate(180deg)",
			"-o-transition":  "rotate(180deg)"
		});
		$("#QRCode").show();
	});
	$(".h_right > .mobile").mouseout(function(){
		$(this).children().css({
			width:100,
			borderLeft:0,
			borderRight:0,
			color:"#444444"
		}).children().eq(-1).css({
			"transition": ".2s",
			"-moz-transition": ".2s",	
			"-webkit-transform":".2s",
			"-o-transition":  ".2s",
			transform:"rotate(0deg)",
			"-moz-transition": "rotate(0deg)",	
			"-webkit-transform":"rotate(0deg)",
			"-o-transition":  "rotate(0deg)"
		});
		$("#QRCode").hide();	
	});
});


// 购物车

// cookie字符串拼接
var strOper = {
	addStr:function(str1,str2){
		var rowArr = str1.split("|");
		var isAdd = true;
		for(var i = 0; i < rowArr.length; i++){
			var colArr = rowArr[i].split("#");
			var str2Arr = str2.split("#");
			if(colArr[0] == str2Arr[0]){
				isAdd = false;
				colArr[4] = parseInt(colArr[4]) + 1;
				rowArr[i] = colArr.join("#");
				break;
			}
		}
		if(isAdd){
			rowArr.push(str2);
		}
		return rowArr.join("|");
	},

	getStr:function($cookie){
		var rowArr = $cookie === "" ? [] : $cookie.split("|");
		var newArr = [];
		for(var i = 0; i < rowArr.length; i ++){
			var colArr = rowArr[i].split("#");
			var colObj = {};
			colObj.id = colArr[0];
			colObj.img = colArr[1];
			colObj.info = colArr[2];
			colObj.price = colArr[3];
			colObj.num = colArr[4];
			newArr.push(colObj);
		}
		return newArr;
	},

	counter:function($cookie,id,type){
		var rowArr = $cookie.split("|");
		for(var i = 0; i < rowArr.length; i ++){
			var colArr = rowArr[i].split("#");
			if(colArr[0] == id){
				if(type == 0){
					colArr[4] = parseInt(colArr[4]) - 1;
				}else{
					colArr[4] = parseInt(colArr[4]) + 1;
				}
				rowArr[i] = colArr.join("#");
				break;
			}
		}
		return rowArr.join("|");
	},

	remove:function($cookie,id){
		var rowArr = $cookie.split("|");
		var newArr = [];
		for(var i = 0; i < rowArr.length; i ++){
			var colArr = rowArr[i].split("#");
			if(colArr[0] != id){
				newArr.push(colArr.join("#"));
			}
		}
		return newArr.join("|");
	}
}

// 加载购物车
$(function(){
	// 执行加载购物车
	getCart();
	function getCart(){
		var $cookie = $.cookie("shopcart");
		if($cookie){
			$("#no_pro").hide();
			$("#pro_list").show();
			var json = strOper.getStr($cookie === undefined ? "" : $cookie);
			var html = "";	//购物车列表
			$.each(json,function(i,o){
				var price = o.price.replace("￥","");
				html += "<ul class='cart_ul'>"
						+ "<li class='cart_check'>"
							+ "<input type='checkbox' checked='checked'/>"
						+ "</li>"
						+ "<li class='cart_img'><img src='"+ o.img +"'/></li>"
						+ "<li class='cart_info'>"+ o.info +"</li>"
						+ "<li class='cart_ub'>"+ o.id +"</li>"
						+ "<li class='cart_price'>"+ o.price +"</li>"
						+ "<li class='cart_num'>"
							+ "<a href='javascript:;' class='decrease'></a>"
							+ "<input type='text' value='"+ o.num +"'/>"
							+ "<a href='javascript:;' class='increase'></a>"
						+ "</li>"
						+ "<li class='cart_total'>￥"+ (price * o.num).toFixed(2) +"</li>"
						+ "<li class='cart_spec'>份</li>"
						+ "<li class='cart_opera'><a href='javascript:;'>删除</a></li>"
					+ "</ul>"
			});
			$(".cartList").html(html);
		}else{
			$("#no_pro").show();
			$("#pro_list").hide();
		}
		
		// 商品数量加减
		$(".cart_num > .decrease").click(function(){
			var num = parseInt($(this).next().val());
			if(num > 1){
				num --;
				$(this).next().val(num);
				// 控制总价的加减
				var price = $(this).parent().parent().children(".cart_price").text();
				var newprice = price.replace("￥","");
				var newTotal = (num * newprice).toFixed(2);
				$(this).parent().parent().children(".cart_total").text("￥" + newTotal);
				
				var id = $(this).parent().parent().children(".cart_ub").text();
				var result = strOper.counter($.cookie("shopcart"),id,0);
				$.cookie("shopcart",result);
				changeTotal();
			}
		});
		$(".cart_num > .increase").click(function(){
			var count = parseInt($(this).prev().val()) + 1;
			$(this).prev().val(count);
			// 控制总价的加减
			var price = $(this).parent().parent().children(".cart_price").text();
			var newprice = price.replace("￥","");
			var newTotal = (count * newprice).toFixed(2);
			$(this).parent().parent().children(".cart_total").text("￥" + newTotal);

			var id = $(this).parent().parent().children(".cart_ub").text();
			var result = strOper.counter($.cookie("shopcart"),id,1);
			$.cookie("shopcart",result);
			changeTotal();
		});
		// 删除商品
		$(".cart_ul > .cart_opera > a").click(function(){
			var id = $(this).parent().parent().children(".cart_ub").text();
			var result = strOper.remove($.cookie("shopcart"),id);
			$.cookie("shopcart",result);
			getCart();		
		});

		// 总价值变化
		function changeTotal(){
			var newTotalArr = [];
			for(var j = 0; j < $(".cartList").children(".cart_ul").length; j ++){
				var total = $(".cartList").children(".cart_ul").eq(j).children(".cart_total").text();
				var newtotal = total.replace("￥","");
				newTotalArr.push(newtotal);
			}
			var newTotalPrice = 0;
			for(var k = 0;k < newTotalArr.length; k ++){
				newTotalPrice += parseFloat(newTotalArr[k]);
			}
			$(".cart_foot > .cf_right").children("span").children().text(newTotalPrice.toFixed(2));
		}
		changeTotal();
	}	
})


