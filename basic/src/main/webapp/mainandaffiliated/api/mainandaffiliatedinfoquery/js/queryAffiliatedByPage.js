// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
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
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=affiliated&detail_location_flag=true",
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
											if (result == "" || result == null) {
												// $(datagridJQueryFind).datagrid('clear');
												$(datagridJQueryFind).datagrid(
														'loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(datagridJQueryFind).datagrid(
														'loadData', result);
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

	var community_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
	var area_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=area&queryConditionFlag=true";
	var building_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=building&queryConditionFlag=true";
	var floor_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=floor&queryConditionFlag=true";
	var unit_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=unit&queryConditionFlag=true";
	$("#community_id").combobox(
			{
				multiple : false,
				panelHeight : '100px',
				url : null,
				valueField : 'id',
				textField : 'name',
				method : 'GET',
				onSelect : function(rec) {
					$("#area_id").combobox('clear');
					$("#building_id").combobox('clear');
					$("#floor_id").combobox('clear');
					$("#unit_id").combobox('clear');
					$("#parent_id").combotree('clear');
					$("#affiliated_type_tree_id").combotree('clear');
					$("#affiliated_type_list_id").combobox('clear');
					$("#area_id").combobox("loadData", "");
					$("#building_id").combobox("loadData", "");
					$("#floor_id").combobox("loadData", "");
					$("#unit_id").combobox("loadData", "");
					$("#parent_id").combotree('tree').tree("loadData", "");
					$("#affiliated_type_tree_id").combotree('tree').tree(
							"loadData", "");// 清除数据
					$("#affiliated_type_tree_id").combobox("loadData", "");// 清除数据
				}
			});
	setComboxJson("#community_id", community_url);
	$("#area_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							var data = $('#area_id').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							if (community_id == null || community_id == "") {
								$("#area_id").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id").combobox(
										'getValue');
								var url = area_url + "&community_id="
										+ community_id
								// $("#area_id").combobox('options').url=url;
								// $("#area_id").combobox('reload');
								setComboxJson("#area_id", url);
							}
						},
						onSelect : function(rec) {
							$("#building_id").combobox('clear');
							$("#floor_id").combobox('clear');
							$("#unit_id").combobox('clear');
							$("#parent_id").combotree('clear');
							$("#building_id").combobox("loadData", "");
							$("#floor_id").combobox("loadData", "");
							$("#unit_id").combobox("loadData", "");
							$("#parent_id").combotree('tree').tree("loadData",
									"");
						}
					});
	$("#building_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							var data = $('#building_id').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							var area_id = $("#area_id").combobox('getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == "") {
								$("#building_id").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id").combobox(
										'getValue');
								var area_id = $("#area_id")
										.combobox('getValue');
								var url = building_url + "&community_id="
										+ community_id + "&area_id=" + area_id
								// $("#building_id").combobox('options').url=url;
								// $("#building_id").combobox('reload');
								setComboxJson("#building_id", url);
							}
						},
						onSelect : function(rec) {
							$("#floor_id").combobox('clear');
							$("#unit_id").combobox('clear');
							$("#parent_id").combotree('clear');
							$("#floor_id").combobox("loadData", "");
							$("#unit_id").combobox("loadData", "");
							$("#parent_id").combotree('tree').tree("loadData",
									"");
						}
					});

	$("#floor_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							var data = $('#floor_id').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							var area_id = $("#area_id").combobox('getValue');
							var building_id = $("#building_id").combobox(
									'getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == ""
									|| building_id == null || building_id == "") {
								$("#floor_id").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id").combobox(
										'getValue');
								var area_id = $("#area_id")
										.combobox('getValue');
								var building_id = $("#building_id").combobox(
										'getValue');
								var url = floor_url + "&community_id="
										+ community_id + "&area_id=" + area_id
										+ "&building_id=" + building_id;
								// $("#floor_id").combobox('options').url=url;
								// $("#floor_id").combobox('reload');
								setComboxJson("#floor_id", url);
							}
						},
						onSelect : function(rec) {
							$("#unit_id").combobox('clear');
							$("#parent_id").combotree('clear');
							$("#unit_id").combobox("loadData", "");
							$("#parent_id").combotree('tree').tree("loadData",
									"");
						}
					});

	$("#unit_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							var data = $('#unit_id').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							var area_id = $("#area_id").combobox('getValue');
							var building_id = $("#building_id").combobox(
									'getValue');
							var floor_id = $("#floor_id").combobox('getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == ""
									|| building_id == null || building_id == ""
									|| floor_id == null || floor_id == "") {
								$("#unit_id").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id").combobox(
										'getValue');
								var area_id = $("#area_id")
										.combobox('getValue');
								var building_id = $("#building_id").combobox(
										'getValue');
								var floor_id = $("#floor_id").combobox(
										'getValue');
								var url = unit_url + "&community_id="
										+ community_id + "&area_id=" + area_id
										+ "&building_id=" + building_id
										+ "&floor_id=" + floor_id;
								// $("#unit_id").combobox('options').url=url;
								// $("#unit_id").combobox('reload');
								setComboxJson("#unit_id", url);
							}
						},
						onSelect : function(rec) {
							$("#parent_id").combotree('clear');
							$("#parent_id").combotree('tree').tree("loadData",
									"");

						}
					});

	$('#parent_id')
			.combotree(
					{
						url : '',
						onShowPanel : function(rec) {
							var root = $('#parent_id').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							if (community_id == null || community_id == "") {
								$("#parent_id").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id").combobox(
										'getValue');
								var area_id = $("#area_id")
										.combobox('getValue');
								var building_id = $("#building_id").combobox(
										'getValue');
								var floor_id = $("#floor_id").combobox(
										'getValue');
								var unit_id = $("#unit_id")
										.combobox('getValue');
								var last_url = "";
								var type = "";
								if (unit_id != null && unit_id != "") {
									type = "unit";
									last_url = "&community_id=" + community_id
											+ "&area_id=" + area_id
											+ "&building_id=" + building_id
											+ "&floor_id=" + floor_id
											+ "&unit_id=" + unit_id;
								} else if (floor_id != null && floor_id != "") {
									type = "floor";
									last_url = "&community_id=" + community_id
											+ "&area_id=" + area_id
											+ "&building_id=" + building_id
											+ "&floor_id=" + floor_id;
								} else if (building_id != null
										&& building_id != "") {
									type = "building";
									last_url = "&community_id=" + community_id
											+ "&area_id=" + area_id
											+ "&building_id=" + building_id;
								} else if (area_id != null && area_id != "") {
									type = "area";
									last_url = "&community_id=" + community_id
											+ "&area_id=" + area_id;
								} else if (community_id != null
										&& community_id != "") {
									type = "community";
									last_url = "&community_id=" + community_id;
								} else {
									return;
								}
								/***********************************************
								 * var url2 =
								 * "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryAffiliatedChildrenNode.json?type=" +
								 * type + "&id=&parent_id=0" + last_url;
								 **********************************************/
								var url2 = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
										+ type + "&id=&parent_id=0" + last_url;
								setComboxTreeJson("#parent_id", url2, null);
							}

						},
						onBeforeExpand : function(node, param) {
							if (node.load_flag == 0) {
								// $('#parent_id').combotree("tree").tree("options").url
								// =
								// "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryAffiliatedChildrenNode.json?id=&parent_id="+
								// node.id;
								var community_id = $("#community_id").combobox(
										'getValue');
								var area_id = $("#area_id")
										.combobox('getValue');
								var building_id = $("#building_id").combobox(
										'getValue');
								var floor_id = $("#floor_id").combobox(
										'getValue');
								var unit_id = $("#unit_id")
										.combobox('getValue');
								var last_url = "";
								var type = "";
								if (unit_id != null && unit_id != "") {
									type = "unit";
									// last_url="&community_id="+community_id+"&area_id="+area_id+"&building_id="+building_id+"&floor_id="+floor_id+"&unit_id="+unit_id;
								} else if (floor_id != null && floor_id != "") {
									type = "floor";
									// last_url="&community_id="+community_id+"&area_id="+area_id+"&building_id="+building_id+"&floor_id="+floor_id;
								} else if (building_id != null
										&& building_id != "") {
									type = "building";
									// last_url="&community_id="+community_id+"&area_id="+area_id+"&building_id="+building_id;
								} else if (area_id != null && area_id != "") {
									type = "area";
									// last_url="&community_id="+community_id+"&area_id="+area_id;
								} else if (community_id != null
										&& community_id != "") {
									type = "community";
									// last_url="&community_id="+community_id;
								} else {
									return;
								}
								/***********************************************
								 * var url2 =
								 * "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryAffiliatedChildrenNode.json?type=" +
								 * type + "&id=&parent_id=" + node.id;
								 **********************************************/
								var url2 = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
										+ type + "&id=&parent_id=" + node.id;
								setComboxTreeJson("#parent_id", url2, node);
							}
						}
					});

	$('#affiliated_type_tree_id')
			.combotree(
					{
						// url:
						// '/basicinfo/api/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?parent_id=0',
						url : '',
						onBeforeExpand : function(node, param) {
							// $('#affiliated_type_tree_id').combotree("tree").tree("options").url
							// =
							// "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?id=&parent_id="+
							// node.id;
							if (node.load_flag == 0) {
								/***********************************************
								 * if (node.id == null || node.id == "") {
								 * node.id = 0; }
								 **********************************************/

								var community_id = $("#community_id").combobox(
										'getValue');
								var affiliated_type_tree_url = "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
										+ node.id
										+ "&community_id="
										+ community_id;
								setComboxTreeJson("#affiliated_type_tree_id",
										affiliated_type_tree_url, node);
							}
						},
						onShowPanel : function(rec) {
							var root = $('#affiliated_type_tree_id').combotree(
									"tree").tree("getRoot");
							if (root != null) {
								return;
							}
							var url = "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0";
							setComboxTreeJson("#affiliated_type_tree_id", url,
									null);
						}
					});
	// var affiliated_type_tree_url =
	// '/basicinfo/api/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?parent_id=0';
	// setComboxTreeJson("#affiliated_type_tree_id",
	// affiliated_type_tree_url,null);

	$("#affiliated_type_list_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						// url:"/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=list",
						url : '',
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onSelect : function(rec) {

						},
						onShowPanel : function(rec) {
							var data = $('#affiliated_type_list_id').combobox(
									"getData");
							if (data.length > 0) {
								return;
							}
							var url = "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=list&queryConditionFlag=true";
							setComboxJson("#affiliated_type_list_id", url);
						}
					});
	// var affiliated_type_list_url =
	// "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=list";
	// setComboxJson("#affiliated_type_list_id", affiliated_type_list_url);

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
