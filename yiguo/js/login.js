//验证码为空
$(function(){
	$(".logbtn").click(function(){
		var message = "";
		$(this).parent().find(".hint").remove();	
		if($("#code").val() === ""){
			message = "请输入正确的验证码";
			$("<p class='hint'>"+ message +"</p>").insertAfter(".toRegister");
			var i = parseInt(Math.random() * 6);
			$(".codeImg > img").attr("src","../img/code"+ i +".jpg");
		}else if($("#username").val() === ""){
			message = "用户名不能为空";
			$("<p class='hint'>"+ message +"</p>").insertAfter(".toRegister");
			var i = parseInt(Math.random() * 6);
			$(".codeImg > img").attr("src","../img/code"+ i +".jpg");
		}else if($("#password").val() === ""){
			message = "密码不能为空";
			$("<p class='hint'>"+ message +"</p>").insertAfter(".toRegister");
			var i = parseInt(Math.random() * 6);
			$(".codeImg > img").attr("src","../img/code"+ i +".jpg");
		}else if($.cookie($("#username").val()) === $("#password").val()){
			alert("登陆成功");
			location.href = "index.html";
		}else{
			alert("用户名或密码错误");
		}
	});
	$(".change").click(function(){
		var i = parseInt(Math.random() * 6);
		$(".codeImg > img").attr("src","../img/code"+ i +".jpg");
	});
})
