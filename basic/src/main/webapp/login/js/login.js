// JavaScript Document
//支持Enter键登录

$(function() {
	// 提交表单
	$('#LoginBtn').click(function() {
		if ($('#loginId').val() == '') {
			show_err_msg('用户名不能为空！');
			$('#loginId').focus();
		} else if ($('#passWord').val() == '') {
			show_err_msg('密码不能为空！');
			$('#passWord').focus();
		} else {
			submitForm();
		}
	});
	
	$("#loginDiv").keydown(function(event) {
		if (event.keyCode == 13) {
			submitForm();
		}
	})
	
});



function submitForm() {
	show_loading();
	var param = $.fn.getFormParams("#saveForm");
	$
			.ajax({
				url : "/basic/login/checkLogin",
				data : param,
				type : "POST",
				dataType : 'JSON',
				xhrFields : {
					withCredentials : true
				},
				crossDomain : true,
				success : function(data) {
					remove_loading();
					var status = data.status;
					if (status == 1) {
						var token = data.token;
						var host = document.domain;
						addCookie("DASHUAUTHINFO", token, 20, host);
						if (getURLParam('redirectURL') != null) {
							window.location.href = getURLParam('redirectURL');
						} else {
							window.location.href = "/basic/index.html";
						}
					} else {
						var msg = data.content;
						show_err_msg(msg);
					}
				}, failure:function (result) {  
					remove_loading();
		         }
			});
}

function getURLParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name)
			return arr[1];
	}
	return "";
}

function addCookie(name, value, expiresHours, domain) {
	var cookieString = name + "=" + escape(value);
	// 判断是否设置过期时间
	if (expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expiresHours * 3600 * 1000);
		cookieString = cookieString + "; expires=" + date.toGMTString();
	}
	cookieString += ";path=/;domain=" + domain;
	document.cookie = cookieString;
}