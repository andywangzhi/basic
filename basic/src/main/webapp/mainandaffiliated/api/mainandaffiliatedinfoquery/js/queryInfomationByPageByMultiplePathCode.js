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
						$.messager.progress({ 
							title:'温馨提示', 
							msg:'正在查询数据，请稍后...'
							});
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?multiple_path_code_flag=true&detail_location_flag=true",
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
	
	$('#page').textbox({
		required : true
	});

	$('#rows').textbox({
		required : true
	});
	
	initDataGrid();
	
});

function initDataGrid() {
	$(communityDatagridJQueryFind).datagrid({
		title:'楼盘详细信息',
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
	$(areaDatagridJQueryFind).datagrid({
		title:'分区详细信息',
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
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
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

	$(buildingDatagridJQueryFind).datagrid({
		title:'楼宇详细信息',
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
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'area_name',
			title : '分区名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'area_id',
			title : '分区ID',
			width : 120,
			align : 'center',
			hidden : true,
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

	$(floorDatagridJQueryFind).datagrid({
		title:'楼层详细信息',
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
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'area_name',
			title : '分区名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'building_name',
			title : '楼宇名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'area_id',
			title : '分区ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'building_id',
			title : '楼宇ID',
			width : 120,
			align : 'center',
			hidden : true,
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

	$(unitDatagridJQueryFind).datagrid({
		title:'单元详细信息',
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
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'area_name',
			title : '分区名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'building_name',
			title : '楼宇名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'floor_name',
			title : '楼层名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'area_id',
			title : '分区ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'building_id',
			title : '楼宇ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'floor_id',
			title : '楼层ID',
			width : 120,
			align : 'center',
			hidden : true,
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

	$(affiliatedDatagridJQueryFind).datagrid({
		title:'附属详细信息',
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
			field : 'parent_name',
			title : '父名称',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'affiliated_type_tree_name',
			title : '附属树形类型名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'affiliated_type_list_name',
			title : '附属下拉类型名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'area_name',
			title : '分区名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'building_name',
			title : '楼宇名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'floor_name',
			title : '楼层名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'unit_name',
			title : '单元名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'parent_id',
			title : '父ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'affiliated_type_tree_id',
			title : '附属树形类型ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'affiliated_type_list_id',
			title : '附属下拉类型ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'area_id',
			title : '分区ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'building_id',
			title : '楼宇ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'floor_id',
			title : '楼层ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'unit_id',
			title : '单元ID',
			width : 120,
			align : 'center',
			hidden : true,
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
