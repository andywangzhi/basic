// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	initDataGrid();
	$("#search")
			.click(
					function() {
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationDetailLocation.json?type=unit",
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
											if (result == ""
													|| result == null) {
												// $(datagridJQueryFind).datagrid('clear');
												$(datagridJQueryFind).datagrid(
														'loadData', {
															total : 0,
															rows : []
														});
											} else {
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
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		url : null,
		width : '90%',
		/***********************************************************************
		 * pagination : true, pageSize : 10,
		 **********************************************************************/
		singleSelect : true,
		striped : true,
		sortOrder : 'asc',
		rownumbers : true,
		onLoadSuccess : function() {
			$(datagridJQueryFind).datagrid('clearSelections');
		},
		onLoadError : function() {
		},
		columns : [ [ {
			field : 'path_code',
			title : '路径代码',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'detail_location',
			title : '详细位置',
			width : 120,
			align : 'center',
			sortable : true
		} ] ]

	});

}
