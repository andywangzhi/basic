// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	$("#search").click(function() {
		var community_name = $("#community_name").combobox("getValue");
		if (community_name == null || community_name == "") {
			alert('楼盘名不能为空');
			return;
		}
		var community_path_code = $("#community_path_code").textbox("getValue");
		if (community_path_code == null || community_path_code == "") {
			alert('楼盘代码不能为空');
			return;
		}
		var param = $.fn.getFormParams(searchFrom);
		$.ajax({
			url : "/basicinfo/api/importMAA/queryPathCodeByNameForDevice.json",
			data : param,
			type : "POST",
			dataType : 'JSON',
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			success : function(data) {
				// var obj = eval('(' + data + ')');
				var obj = data;
				var status = obj.status;
				if (status == 1) {
					// 设置数据
					var result = obj.result;
					alert(result);
				} else {
					var msg = obj.message;
					alert(msg);
				}
			},
			failure : function(data) {
				alert("查询失败!");
			}
		});
	});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	 $('#community_path_code').textbox({
		  required : true,
		  readonly:true
	 });
	var community_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
	$("#community_name").combobox({
		multiple : false,
		panelHeight : '100px',
		//url:community_url,
		valueField : 'name',
		textField : 'name',
		method : 'POST',
		onSelect : function(rec) {
			var path_code=rec.path_code;
			 $("#community_path_code").textbox("setValue",path_code);
		}
	});

	$.ajax({
		url : community_url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			// 更新combox数据
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				// 设置数据
				var result = obj.result;
				$("#community_name").combobox("loadData", result);
			} else {
				var msg = obj.message;
				alert(msg);
			}
		},
		failure : function(data) {
			alert("查询失败!");
		}
	});
});
