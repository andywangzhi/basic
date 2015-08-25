// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
var query_url = "/basicinfo/api/location/queryNearestCommunity.json";
$(function() {
	initDataGrid();
	$("#search").click(function() {
		var longitude=$("#longitude").textbox("getValue");
		if(longitude==""||longitude==null){
			alert("经度不能为空！");
			return;
		}
		if(isNaN(longitude)){
			alert("经度不能为非数字！");
			return;
		}
		var latitude=$("#latitude").textbox("getValue");
		if(latitude==""||latitude==null){
			alert("纬度不能为空！");
			return;
		}
		if(isNaN(latitude)){
			alert("纬度不能为非数字！");
			return;
		}
		var param = $.fn.getFormParams(searchFrom);
		$
				.ajax({
					url : query_url,
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
							if (result == ""
									|| result == null) {
								// $(datagridJQueryFind).datagrid('clear');
								$(datagridJQueryFind).datagrid(
										'loadData', {
											total : 0,
											rows : []
										});
							} else {
								result='['+JSON.stringify(result)+']';
								result= eval('(' + result + ')');
								$(datagridJQueryFind).datagrid(
										'loadData',
										result);
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
	});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	$("#addDIV").hide();

	$('#longitude2').textbox({
		required : true
	});
	
	$('#latitude2').textbox({
		required : true
	});
	
});

function initDataGrid() {
	$(datagridJQueryFind)
			.datagrid(
					{
						url : null,
						width : '90%',
						singleSelect : false,
						striped : true,
						sortOrder : 'asc',
						rownumbers : true,
						onLoadSuccess : function() {
							$(datagridJQueryFind).datagrid('clearSelections');
						},
						onLoadError : function() {
						},
						columns : [ [  {
							field : 'community_type',
							title : '类型',
							width : 120,
							align : 'center',
							sortable : true
						},{
							field : 'name',
							title : '区域名称',
							width : 120,
							align : 'center',
							sortable : true
						}, {
							field : 'path_code',
							title : '路径代码',
							width : 120,
							align : 'center',
							sortable : true
						},  {
							field : 'distance',
							title : '距离',
							width : 120,
							align : 'center',
							sortable : true
						}] ]
					});

}
