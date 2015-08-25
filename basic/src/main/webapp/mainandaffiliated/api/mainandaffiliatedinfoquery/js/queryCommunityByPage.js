// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
    //初始化类型
	$("#community_type")
	.combobox(
			{
				multiple : false,
				panelHeight : '100px',
				data : [ {
					text : '社区',
					id : 'community'
				}, {
					text : '写字楼',
					id : 'office'
				} ],
				valueField : 'id',
				textField : 'text'
	});
	initDataGrid();
	$("#search")
			.click(
					function() {
						var page = $("#page").textbox("getValue");
						if (page == "") {
							alert('页码必须填写！');
							return;
						}
						var rows = $("#rows").textbox("getValue");
						if (rows == "") {
							alert('每页显示条数必须填写！');
							return;
						}
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=community&detail_location_flag=true",
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

	$('#page').textbox({
		required : true
	});

	$('#rows').textbox({
		required : true
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
			field : 'id',
			title : 'ID',
			width : 65,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'path_code',
			title : '路径代码',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_type',
			title : '类型',
			width : 120,
			align : 'center',
			sortable : true
		},{
			field : 'name',
			title : '名称',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'remark',
			title : '备注',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'developer',
			title : '开发商',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'address',
			title : '楼盘地址',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'create_time',
			title : '创建时间',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'update_time',
			title : '更新时间',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'create_user_id',
			title : '创建者ID',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'update_user_id',
			title : '更新者ID',
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
