//sidebar客服、top按钮
$(function(){
	$("#service").hover(function(){
		$(this).css("backgroundPosition","-56px -46px")
	},function(){
		$(this).css("backgroundPosition","0 -46px")
	});
	$("#toTop").hover(function(){
		$(this).css("backgroundPosition","-56px 0")
	},function(){
		$(this).css("backgroundPosition","0 0")
	}).click(function(){
		$("body","html").stop().animate({
			scrollTop:0
		},400);
		if($(window).scrollTop() != 0){
			$(window).scrollTop(0);  //IE8
		}
	});
	$(window).scroll(function(){
		if($(this).scrollTop() >= $(this).height()){
			$("#toTop").css("display","block");
		}else{
			$("#toTop").css("display","none");
		}
	})
})

//menu显示
$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() >= 108){
			$("#menu").css("display","block");
		}else{
			$("#menu").css("display","none");
		}
	});
	// 购物车数量变化
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
		$(".shopcart").children(".totalNum").children().text(arr[0]);
		$(".shopcart").children(".totalPrice").text("￥" + arr[1]);
	}
	
});
