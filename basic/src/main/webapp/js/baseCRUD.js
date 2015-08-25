(function($){
	$.fn.extend({
		charles:function(options){
			var charlesCRUD = {
					hidden:function(hidden){
						$.each(hidden, function(i, n){
							that.find("[name='"+n+"']").parents("tr").hide(1);
						});
					},
					readonly:function(readonly){
						$.each(readonly, function(i, n){
							that.find("[name='"+n+"']").attr("readonly","readonly");
							that.find("[textboxname='"+n+"']").attr("readonly","readonly");
						});
					},
					remove:function(remove){
						$.each(remove, function(i, n){
							that.find("[name='"+n+"']").parents("tr").remove();
						});
					}
			};
			var defaults = {
					targetUrl:	"",		//将数据填充的页面地址
					sourceUrl:	"",		//获取JSON数据的action地址
					hidden:		[],		//要隐藏的行，根据NAME来判断
					readonly:	[],		//显示为只读的行
					remove:		[],		//要移除的行
					callback:	null,	//完成后的回调函数
					method:		"GET",	//获取JSON数据的请求方式
					paramData:	null,	//获取JSON数据的参数
					buttons: 	[],		//弹出框所要带的按钮定义
					width:		600,
					height:		400,
					title:		"系统操作",		//窗口标题
					afterload:	null
			};
			$.extend(defaults, options);
			var that = $(this);
			that.dialog({
		        title: defaults.title,
		        width: defaults.width,
		        height: defaults.height,
		        closed: false,
		        cache: false,
		        href: defaults.targetUrl,
		        modal: true,
		        buttons: defaults.buttons
		    }).each(function(){
		    	if ($.isFunction(defaults.afterload)){
		    		defaults.afterload && defaults.afterload.call(that);
				}
				if (defaults.sourceUrl === "") {
					charlesCRUD.remove(defaults.remove);
					charlesCRUD.hidden(defaults.hidden);
					charlesCRUD.readonly(defaults.readonly);
					if ($.isFunction(defaults.callback)) {
						defaults.callback && defaults.callback.call(that);
					}
				} else {
			    	$.ajax({
					   type: defaults.method,
					   url: defaults.sourceUrl,
					   data: defaults.paramData,
					   dataType:"html",
					   success: function(data){
						   charlesCRUD.remove(defaults.remove);
						   charlesCRUD.hidden(defaults.hidden);
						   charlesCRUD.readonly(defaults.readonly);
						   var obj = eval('(' + data + ')');
						   that.autofill(obj);
						   that.form('load',obj);
						   if ($.isFunction(defaults.callback)){
							   defaults.callback && defaults.callback.call(that);
						   }
					   }
					});
		    	}
		    });

			return that;
		}
	});
})(jQuery);