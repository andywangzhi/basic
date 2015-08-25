(function($) {
	$.fn.extend({
		getFormParams : function(formJQueryFind) {
			var parameter = {};
			var trueValue = "";
			var trueKey = "";
			$(formJQueryFind).each(
					function() {
						for (var i = 0; i < this.length; i++) {
							var f = this[i];
							var key = f.name;
							if (key != null && key != '') {
								if ($(f).hasClass("easyui-combobox")
										|| $(f).hasClass("combo-text")
										|| $(f).hasClass("combo-value")) {
								} else {
								}
								if (key == trueKey) {
									trueValue += ",";
									trueValue += f.value;
								} else {
									trueValue = f.value;
								}
								if (trueValue == "") {
									trueValue = null;
								}
								parameter[key] = trueValue;
							}
							trueKey = key;
						}

					});
			return parameter;
		},
		messageInfoTip : function(data) {
			var obj = eval('(' + data + ')');
			console.log(JSON.stringify(data));
			var title = "系统提示",message;
			if (obj.status == 1) {
				title = "温馨提示";
				message =  obj.message;
			}else{
				title = "系统警告";
				message = obj.message;
			}
			$.messager.show({
				title : title,
				msg : message,
				timeout : 5000,
				showType : 'slide'
			});
			return obj.status;
		},
		ajaxLoading :function(msg){
			if(!msg){
				msg = "正在处理，请稍候。。。";
			}
			$("<div class=\"datagrid-mask\"></div>").css({
				display : "block",
				width : "100%",
				height : $(window).height()
			}).appendTo("body");
			$("<div class=\"datagrid-mask-msg\"></div>").html(msg).css({
				display : "block",
				left : ($(document.body).outerWidth(true) - 190) / 2,
				top : ($(window).height() - 45) / 2
			}).appendTo("body");
		},
		ajaxLoaded:function(){
			$(".datagrid-mask").remove();   
			$(".datagrid-mask-msg").remove();               

		}
	}
	)
})(jQuery);

//easyui 自定义验证
$.extend($.fn.validatebox.defaults.rules, {
phoneRex: {
  validator: function(value){
  var rex=/^1[3-8]+\d{9}$/;
  //var rex=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  //区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
  //电话号码：7-8位数字： \d{7,8
  //分机号：一般都是3位数字： \d{3,}
   //这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		 
  var rex2=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  if(rex.test(value)||rex2.test(value))
  {
    // alert('t'+value);
    return true;
  }else
  {
   //alert('false '+value);
     return false;
  }
    
  },
  message: '请输入正确手机号码'
}
});
