var save_maa_batch_execl_url = "/basicinfo/admin/importAT/saveATBatchExecl.json";// 批量导入url
var upload_file_key = "";// 上传文件的关键信息
var query_at_excel_monitor_url = "/basicinfo/admin/importAT/queryATExcelMonitor.json";// 批量导入url
var save_at_excel_to_database_url = "/basicinfo/admin/importAT/saveATBatchExeclRowToDatabase.json";// 将excel的数据存储到数据库
var monitor_interval;// 监视定时器
var type_url = "";
$(function() {
	$("#submit").click(function() {
		// 执行批量导入
		saveATBatchExecl();
	});
	$("#mBtn").click(function() {
		$("#show_upload_info_div").dialog('open');
	});
	$("#clearBtn").click(function() {
		$("#uploadDataForm").form("clear");
	});
	// 批量导入开始
	// 隐藏文件信息对话框
	$("#show_upload_info_div").dialog('close');
	// 批量导入结束

	// 初始化类型
	$("#type").combobox({
		required : true,
		multiple : false,
		panelHeight : '100px',
		data : [ {
			text : '树形',
			id : 'tree'
		}, {
			text : '列表',
			id : 'list'
		}],
		valueField : 'id',
		textField : 'text'
	});

});

/**
 * 批量导入
 */
function saveATBatchExecl() {
	var type=$("#type").combobox('getValue');
    if(type==""){
    	alert("类型不能为空！");
    	return;
    }
    var file_path = document.getElementById('uploadFile').value;    
    if(file_path==""){
    	alert("文件不能为空！");
    	return;
    }
	$("#uploadDataForm").form('submit', {
		url : save_maa_batch_execl_url,
		ajax : true,
		onSubmit: function(){
			var isValid = $(this).form('validate');//校验是否所有的字段是否合规
			if (isValid){
				$.messager.progress({ 
					title:'温馨提示', 
					msg:'正在提交数据，请稍后...'
					});
			}
			return isValid;	// 返回false终止表单提交
		},
		success : function(data) {
			$.messager.progress('close');
			var obj = eval('(' + data + ')');
			var status = obj.status;
			console.log(JSON.stringify(obj));
			if (status == 1) {
				alert("文件上传成功！");
				upload_file_key = obj.result;
				// 保存excel的行数据到数据库
				saveATBatchExeclRowToDatabase();
				// 打开信息显示窗口
				$("#show_upload_info_div").dialog('open');
				// 查询监控信息 每隔5秒获取一次
				monitor_interval = setInterval("queryATExcelMonitor()", 5000);// 1000为1秒钟
			} else {
				alert("文件上传失败！");
			}
		},
		failure : function(data) {
			 $.messager.progress('close');
			 alert("文件上传失败！");
		}
	});
}
/**
 * 保存excel的行数据到数据库
 */
function saveATBatchExeclRowToDatabase() {
	// 清空进度信息
	$("#schedule_info").html("");
	// 清空错误信息
	$("#error_info").html("");
	$('#show_upload_info_progressbar').progressbar('setValue', 0);
	var param = {
		key : upload_file_key
	};
	$.ajax({
		url : save_at_excel_to_database_url,
		data : param,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				// 设置数据
				alert("遍历数据完成！");
			} else {
				//alert("保存失败！");
				var msg = obj.message;
				alert("遍历数据完成！");
			}
		},
		failure : function(data) {
			alert("遍历数据完成！");
		}
	});
}

/**
 * 查询监控信息
 */
function queryATExcelMonitor() {
	var param = {
		key : upload_file_key
	};
	$.ajax({
		url : query_at_excel_monitor_url,
		data : param,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				// 设置数据
				var result = obj.result;
				if (result != null) {
					// result= eval('(' + result + ')');
					// 获得总数
					var total = result.total;
					// 获得当前写入条数
					var current = result.current;
					// 设置进度值 保留两位小数
					$('#show_upload_info_progressbar').progressbar('setValue',
							(current / total * 100).toFixed(2));
					// 添加监控信息
					var schedule_info = result.schedule_info;
					for (var i = 0; i < schedule_info.length; i++) {
						$("#schedule_info").append(schedule_info[i] + "</br>");
					}
					$("#schedule_info").scrollTop(
							$("#schedule_info")[0].scrollHeight);
					var error_info = result.error_info;
					for (var i = 0; i < error_info.length; i++) {
						$("#error_info").append(error_info[i] + "</br>");
					}
					$("#error_info")
							.scrollTop($("#error_info")[0].scrollHeight);
					var sta = result.status;
					if (sta == 'complete') {
						// 完成状态
						window.clearInterval(monitor_interval)
					}
				}
			} else {
				var msg = obj.message;
				alert(msg);
			}
		},
		failure : function(data) {
			alert("查询失败!");
		}
	});
}
