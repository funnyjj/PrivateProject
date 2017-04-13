//手机注册/邮箱注册页面切换
$(function(){
	$("#tab1li").click(function(){
		$("#tab2li").removeAttr("class");
		$(this).attr("class","active");
		$("#tab1").css("display","block");
		$("#tab2").css("display","none");
	});
	$("#tab2li").click(function(){
		$("#tab1li").removeAttr("class");
		$(this).attr("class","active");
		$("#tab2").css("display","block");
		$("#tab1").css("display","none");
	});
});

//输入验证
$(function(){
	$("input").blur(function(){
		var $parent = $(this).parent();
		$parent.find(".pass_test").remove();
		//验证手机号
		if($(this).is(".mobile")){
			var mobileMsg = "";
			if(this.value === ""){
				mobileMsg = "手机号不能为空";
				$parent.append("<span class='pass_test pass_tip'><i></i>"+ mobileMsg +"</span>");
			}else if(!/^[1-3]\d{10}$/.test(this.value)){
				mobileMsg = "手机号格式不正确";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ mobileMsg +"</span>");
			}else{
				$parent.append("<span class='pass_test pass_succ'><i></i></span>");			
			}
		}
		//验证手机验证码
		if($(this).is(".mobileCode")){
			var mobileCodeMsg = "";
			if(this.value === ""){
				mobileCodeMsg = "验证码不能为空";
				$parent.append("<span class='pass_test pass_tip'><i></i>"+ mobileCodeMsg +"</span>");				
			}else if(!/\d{6}/.test(this.value)){
				mobileCodeMsg = "请输入正确验证码";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ mobileCodeMsg +"</span>");				
			}else{
				$parent.append("<span class='pass_test pass_succ'><i></i></span>");				
			}
		}
		//验证密码
		if($(this).is(".pswagain")){
			var pswMsg = "";
			if(this.value === "" || $(this).parent().prev().children("input").val() === ""){
				pswMsg = "密码不能为空";
				$parent.append("<span class='pass_test pass_tip'><i></i>"+ pswMsg +"</span>");
			}else if(this.value.length < 6 || $(this).parent().prev().children("input").val().length < 6){
				pswMsg = "密码长度不能小于6位";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ pswMsg +"</span>");					
			}
			else if(this.value.length > 20 || $(this).parent().prev().children("input").val().length > 20){
				pswMsg = "密码长度不能大于20位";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ pswMsg +"</span>");					
			}else if(!/\w{6,20}/.test(this.value) || !/\w{6,20}/.test($(this).parent().prev().children("input").val())){
				pswMsg = "密码格式错误";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ pswMsg +"</span>");				
			}else if(this.value === $(this).parent().prev().children("input").val()){
				$parent.append("<span class='pass_test pass_succ'><i></i></span>");
			}else{
				pswMsg = "两次密码不一致";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ pswMsg +"</span>");
			}
		}
		//验证邮箱
		if($(this).is(".eMail")){
			var mailMsg = "";
			if(this.value === ""){
				mailMsg = "邮箱不能为空";
				$parent.append("<span class='pass_test pass_tip'><i></i>"+ mailMsg +"</span>");
			}else if(!/.+@.+\.[a-zA-Z]{2,4}/.test(this.value)){
				mailMsg = "邮箱格式不正确";
				$parent.append("<span class='pass_test pass_error'><i></i>"+ mailMsg +"</span>");
			}else{
				$parent.append("<span class='pass_test pass_succ'><i></i></span>");			
			}
		}
	}).keyup(function(){
		$(this).triggerHandler("blur");
	});

	//更换图形验证码图片
	$(".change").click(function(){
		var i = parseInt(Math.random() * 6);
		$(this).prev().attr("src","../img/code"+ i +".jpg");
	});
	//获取手机验证码
	$(".getCode").click(function(){
		if(/^[1-3]\d{10}$/.test($(this).parent().prev().children("input").val())){
			var i = 60;
			setInterval(function(){
				if(i > 0){
					i --;
					$(".getCode").text("还剩下"+ i +"秒");
					if(i == 0){
						$(".getCode").text("重新获取验证码");
					}
				}
			},1000);	
		}else{
			var $parent = $(this).parent();
			$parent.find(".pass_test").remove();
			var mobileCodeMsg = "短信发送失败";
			$parent.append("<span class='pass_test pass_error'><i></i>"+ mobileCodeMsg +"</span>");
		}
	});
	//协议未选择
	var ischecked = false;
	$(".agree").click(function(){
		if(ischecked){
			$(".registerbtn").css("background","#008842");
			ischecked = false;
		}else{
			$(".registerbtn").css("background","gray");
			ischecked = true;	
		}	
	});

	//注册
	$("#mobilebtn").click(function(){
		var numError = $(".pass_error").length + $(".pass_tip").length;
		if(numError || $("input").val() === ""){
			alert("请完善注册信息");
		}else{
			var $mobile = $(".mobile").val();
			var $password = $(".password").val();
			$.cookie($mobile,$password,{
				expires:7
			});
			alert("注册成功");
			location.href = "login.html";
		}
	});
	$("#mailbtn").click(function(){
		var numError = $(".pass_error").length + $(".pass_tip").length;
		if(numError){
			alert("请完善注册信息");
		}else{
			var $mail = $(".eMail").val();
			var $password = $(".password").val();
			$.cookie($mail,$password,{
				expires:7
			});
			alert("注册成功");
			location.href = "login.html";
		}
	})
		
})