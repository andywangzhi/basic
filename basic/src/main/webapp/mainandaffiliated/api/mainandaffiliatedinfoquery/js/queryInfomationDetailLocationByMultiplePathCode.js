// datagrid查询器
var communityDatagridJQueryFind = "#communityDataGrid";
var areaDatagridJQueryFind = "#areaDataGrid";
var buildingDatagridJQueryFind = "#buildingDataGrid";
var floorDatagridJQueryFind = "#floorDataGrid";
var unitDatagridJQueryFind = "#unitDataGrid";
var affiliatedDatagridJQueryFind = "#affiliatedDataGrid";
var searchFrom = "#searchFrom";
$(function() {
	$("#search")
			.click(
					function() {
						$.messager.progress({ 
							title:'温馨提示', 
							msg:'正在查询数据，请稍后...'
							});
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationDetailLocation.json?multiple_path_code_flag=true",
									data : param,
									type : "POST",
									dataType : 'JSON',
									success : function(data) {
										 $.messager.progress('close');
										// var obj = eval('(' + data + ')');
										var obj = data;
										var status = obj.status;
										if (status == 1) {
											var result = data.result;
											var res = result.community;
											if (res == "" || res == null) {
												$(communityDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(communityDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
											res = result.area;
											if (res == "" || res == null) {
												$(areaDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(areaDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
											res = result.building;
											if (res == "" || res == null) {
												$(buildingDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(buildingDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
											res = result.floor;
											if (res == "" || res == null) {
												$(floorDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(floorDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
											res = result.unit;
											if (res == "" || res == null) {
												$(unitDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(unitDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
											res = result.affiliated;
											if (res == "" || res == null) {
												$(affiliatedDatagridJQueryFind)
														.datagrid('loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(affiliatedDatagridJQueryFind)
														.datagrid('loadData',
																res);
											}
										} else {
											var msg = obj.message;
											alert(msg);
										}
									},
									failure : function(data) {
										$.messager.progress('close');
										alert("查询失败!");
									}
								});
					});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	initDataGrid();
	
});

function initDataGrid() {
	$(communityDatagridJQueryFind).datagrid({
		title:'楼盘详细位置信息',
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
			$(communityDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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
	$(areaDatagridJQueryFind).datagrid({
		title:'分区详细位置信息',
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
			$(areaDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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

	$(buildingDatagridJQueryFind).datagrid({
		title:'楼宇详细位置信息',
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
			$(buildingDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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

	$(floorDatagridJQueryFind).datagrid({
		title:'楼层详细位置信息',
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
			$(floorDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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

	$(unitDatagridJQueryFind).datagrid({
		title:'单元详细位置信息',
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
			$(unitDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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

	$(affiliatedDatagridJQueryFind).datagrid({
		title:'附属详细位置信息',
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
			$(affiliatedDatagridJQueryFind).datagrid('clearSelections');
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
			field : 'name',
			title : '名称',
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
