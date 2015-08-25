// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var saveFormDiv = "#saveAuthForm";
var searchFrom = "#searchFrom";
var community_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
var area_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=area&queryConditionFlag=true";
var building_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=building&queryConditionFlag=true";
var floor_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=floor&queryConditionFlag=true";
var unit_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=unit&queryConditionFlag=true";
var community_edit_flag = false;
var area_edit_flag = false;
var building_edit_flag = false;
var floor_edit_flag = false;
var unit_edit_flag = false;
var affiliated_edit_flag = false;
var affiliated_type_edit_flag = false;
var batch_add_flag = false;
$(function() {
	initDataGrid();
	$("#search").click(function() {
		var param = $.fn.getFormParams(searchFrom);
		$(datagridJQueryFind).datagrid('options').queryParams = param;
		$(datagridJQueryFind).datagrid('reload');
	});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	$("#addDIV").hide();
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=affiliated&detail_location_flag="true"';
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

	$("#community_id").combobox(
			{
				multiple : false,
				panelHeight : '100px',
				url : community_url,
				valueField : 'id',
				textField : 'name',
				method : 'GET',
				onSelect : function(rec) {
					$("#area_id").combobox('clear');
					$("#building_id").combobox('clear');
					$("#floor_id").combobox('clear');
					$("#unit_id").combobox('clear');
					$("#parent_id").combotree('clear');
					$("#area_id").combobox("loadData", "");
					$("#building_id").combobox("loadData", "");
					$("#floor_id").combobox("loadData", "");
					$("#unit_id").combobox("loadData", "");
					$("#parent_id").combotree('tree').tree("loadData", "");// 清除数据
				}
			});
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
								$("#area_id").combobox('options').url = url;
								$("#area_id").combobox('reload');
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
									"");// 清除数据
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
								$("#building_id").combobox('options').url = url;
								$("#building_id").combobox('reload');
							}
						},
						onSelect : function(rec) {
							$("#floor_id").combobox('clear');
							$("#unit_id").combobox('clear');
							$("#parent_id").combotree('clear');
							$("#floor_id").combobox("loadData", "");
							$("#unit_id").combobox("loadData", "");
							$("#parent_id").combotree('tree').tree("loadData",
									"");// 清除数据
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
								$("#floor_id").combobox('options').url = url;
								$("#floor_id").combobox('reload');
							}
						},
						onSelect : function(rec) {
							$("#unit_id").combobox('clear');
							$("#parent_id").combotree('clear');
							$("#unit_id").combobox("loadData", "");
							$("#parent_id").combotree('tree').tree("loadData",
									"");// 清除数据
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
								$("#unit_id").combobox('options').url = url;
								$("#unit_id").combobox('reload');
							}
						},
						onSelect : function(rec) {
							$("#parent_id").combotree('clear');
							$("#parent_id").combotree('tree').tree("loadData",
									"");// 清除数据

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
								 * "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedInni.json?type=" +
								 * type + "&id=&parent_id=0" + last_url;
								 **********************************************/
								var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
										+ type + "&id=&parent_id=0" + last_url;
								setTreeJson("#parent_id", "", url2);
							}

						},
						onBeforeExpand : function(node, param) {
							var community_id = $("#community_id").combobox(
									'getValue');
							var area_id = $("#area_id").combobox('getValue');
							var building_id = $("#building_id").combobox(
									'getValue');
							var floor_id = $("#floor_id").combobox('getValue');
							var unit_id = $("#unit_id").combobox('getValue');
							var type = "";
							if (unit_id != null && unit_id != "") {
								type = "unit";
							} else if (floor_id != null && floor_id != "") {
								type = "floor";
							} else if (building_id != null && building_id != "") {
								type = "building";
							} else if (area_id != null && area_id != "") {
								type = "area";
							} else if (community_id != null
									&& community_id != "") {
								type = "community";
							} else {
								return;
							}
							var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
									+ type + "&id=&parent_id=" + node.id;
							$('#parent_id').combotree("tree").tree("options").url = url2;
							/***************************************************
							 * $('#parent_id').combotree("tree").tree("options").url =
							 * "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedChildrenNode.json?id=&parent_id=" +
							 * node.id;
							 **************************************************/
						}
					});

	$('#affiliated_type_tree_id')
			.combotree(
					{
						onBeforeExpand : function(node, param) {
							var community_id = $("#community_id").combobox(
									'getValue');
							$('#affiliated_type_tree_id').combotree("tree")
									.tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
									+ node.id + "&community_id=" + community_id;
						},
						onShowPanel : function(rec) {
							var root = $('#affiliated_type_tree_id').combotree(
									"tree").tree("getRoot");
							if (root != null) {
								return;
							}
							var community_id = $("#community_id").combobox(
									'getValue');
							var community_id = $("#community_id").combobox(
									'getValue');
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0";
							$("#affiliated_type_tree_id").combotree('options').url = url;
							$("#affiliated_type_tree_id").combotree('reload');
						}
					});

	$("#affiliated_type_list_id")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						// url :
						// "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=list",
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
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=list&queryConditionFlag=true";
							$("#affiliated_type_list_id").combobox('options').url = url;
							// $("#affiliated_type_list_id").combobox('clear');
							$("#affiliated_type_list_id").combobox('reload');
						}
					});

	$('#name2').textbox({
		required : true
	});
	$("#community_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : community_url,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						required : true,
						onShowPanel : function(rec) {
							community_edit_flag = false;
						},
						onSelect : function(rec) {
							if (!community_edit_flag) {
								$("#area_id2").combobox('clear');
								$("#building_id2").combobox('clear');
								$("#floor_id2").combobox('clear');
								$("#unit_id2").combobox('clear');
								$("#parent_id2").combotree('clear');
								$("#area_id2").combobox("loadData", "");
								$("#building_id2").combobox("loadData", "");
								$("#floor_id2").combobox("loadData", "");
								$("#unit_id2").combobox("loadData", "");
								$("#parent_id2").combotree('tree').tree(
										"loadData", "");// 清除数据
							}
						},
						onLoadSuccess : function(rec) {
						}
					});
	$("#area_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							area_edit_flag = false;

							var data = $('#area_id2').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id2").combobox(
									'getValue');
							if (community_id == null || community_id == "") {
								$("#area_id2").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id2")
										.combobox('getValue');
								var url = area_url + "&community_id="
										+ community_id
								$("#area_id2").combobox('options').url = url;
								$("#area_id2").combobox('reload');
							}
						},
						onSelect : function(rec) {
							if (!area_edit_flag) {
								$("#building_id2").combobox('clear');
								$("#floor_id2").combobox('clear');
								$("#unit_id2").combobox('clear');
								$("#parent_id2").combotree('clear');
								$("#building_id2").combobox("loadData", "");
								$("#floor_id2").combobox("loadData", "");
								$("#unit_id2").combobox("loadData", "");
								$("#parent_id2").combotree('tree').tree(
										"loadData", "");// 清除数据
							}

						},
						onLoadSuccess : function(rec) {
						}
					});
	$("#building_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							building_edit_flag = false;
							var data = $('#building_id2').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id2").combobox(
									'getValue');
							var area_id = $("#area_id2").combobox('getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == "") {
								$("#building_id2").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id2")
										.combobox('getValue');
								var area_id = $("#area_id2").combobox(
										'getValue');
								var url = building_url + "&community_id="
										+ community_id + "&area_id=" + area_id
								$("#building_id2").combobox('options').url = url;
								$("#building_id2").combobox('reload');
							}
						},
						onSelect : function(rec) {
							if (!building_edit_flag) {
								$("#floor_id2").combobox('clear');
								$("#unit_id2").combobox('clear');
								$("#parent_id2").combotree('clear');
								$("#floor_id2").combobox("loadData", "");
								$("#unit_id2").combobox("loadData", "");
								$("#parent_id2").combotree('tree').tree(
										"loadData", "");// 清除数据
							}

						},
						onLoadSuccess : function(rec) {
						}
					});

	$("#floor_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							floor_edit_flag = false;
							var data = $('#floor_id2').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id2").combobox(
									'getValue');
							var area_id = $("#area_id2").combobox('getValue');
							var building_id = $("#building_id2").combobox(
									'getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == ""
									|| building_id == null || building_id == "") {
								$("#floor_id2").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id2")
										.combobox('getValue');
								var area_id = $("#area_id2").combobox(
										'getValue');
								var building_id = $("#building_id2").combobox(
										'getValue');
								var url = floor_url + "&community_id="
										+ community_id + "&area_id=" + area_id
										+ "&building_id=" + building_id
								$("#floor_id2").combobox('options').url = url;
								$("#floor_id2").combobox('reload');
							}

						},
						onSelect : function(rec) {
							if (!floor_edit_flag) {
								$("#unit_id2").combobox('clear');
								$("#parent_id2").combotree('clear');
								$("#unit_id2").combobox("loadData", "");
								$("#parent_id2").combotree('tree').tree(
										"loadData", "");// 清除数据
							}

						},
						onLoadSuccess : function(rec) {
						}
					});

	$("#unit_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						url : null,
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onShowPanel : function(rec) {
							unit_edit_flag = false;
							var data = $('#unit_id2').combobox("getData");
							if (data.length > 0) {
								return;
							}
							var community_id = $("#community_id2").combobox(
									'getValue');
							var area_id = $("#area_id2").combobox('getValue');
							var building_id = $("#building_id2").combobox(
									'getValue');
							var floor_id = $("#floor_id2").combobox('getValue');
							if (community_id == null || community_id == ""
									|| area_id == null || area_id == ""
									|| building_id == null || building_id == ""
									|| floor_id == null || floor_id == "") {
								$("#unit_id2").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id2")
										.combobox('getValue');
								var area_id = $("#area_id2").combobox(
										'getValue');
								var building_id = $("#building_id2").combobox(
										'getValue');
								var floor_id = $("#floor_id2").combobox(
										'getValue');
								var url = unit_url + "&community_id="
										+ community_id + "&area_id=" + area_id
										+ "&building_id=" + building_id
										+ "&floor_id=" + floor_id;
								$("#unit_id2").combobox('options').url = url;
								$("#unit_id2").combobox('reload');
							}
						},
						onSelect : function(rec) {
							if (!unit_edit_flag) {
								$("#parent_id2").combotree('clear');
								$("#parent_id2").combotree('tree').tree(
										"loadData", "");// 清除数据
							}

						},
						onLoadSuccess : function(rec) {

						}
					});

	$('#parent_id2')
			.combotree(
					{
						url : '',
						onShowPanel : function(rec) {
							affiliated_edit_flag = false;
							var root = $('#parent_id2').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}

							var community_id = $("#community_id2").combobox(
									'getValue');
							if (community_id == null || community_id == "") {
								$("#parent_id2").combobox('hidePanel');
								$.messager
										.alert(
												"操作提示",
												"主体与附属条件选择顺序为:楼盘->分区->楼宇->楼层->单元，另外选择附属时，必须至少先选择楼盘！",
												"info");
							} else {
								var community_id = $("#community_id2")
										.combobox('getValue');
								var area_id = $("#area_id2").combobox(
										'getValue');
								var building_id = $("#building_id2").combobox(
										'getValue');
								var floor_id = $("#floor_id2").combobox(
										'getValue');
								var unit_id = $("#unit_id2").combobox(
										'getValue');
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
								 * "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedInni.json?type=" +
								 * type + "&id=&parent_id=0" + last_url;
								 **********************************************/
								var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
										+ type + "&id=&parent_id=0" + last_url;
								setTreeJson("#parent_id2", "", url2);
							}
						},
						onBeforeExpand : function(node, param) {
							var community_id = $("#community_id2").combobox(
									'getValue');
							var area_id = $("#area_id2").combobox('getValue');
							var building_id = $("#building_id2").combobox(
									'getValue');
							var floor_id = $("#floor_id2").combobox('getValue');
							var unit_id = $("#unit_id2").combobox('getValue');
							var type = "";
							if (unit_id != null && unit_id != "") {
								type = "unit";
							} else if (floor_id != null && floor_id != "") {
								type = "floor";
							} else if (building_id != null && building_id != "") {
								type = "building";
							} else if (area_id != null && area_id != "") {
								type = "area";
							} else if (community_id != null
									&& community_id != "") {
								type = "community";
							} else {
								return;
							}
							var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=child_node&main_affiliated_type="
									+ type + "&id=&parent_id=" + node.id;
							$('#parent_id2').combotree("tree").tree("options").url = url2;
							/***************************************************
							 * $('#parent_id2').combotree("tree").tree("options").url =
							 * "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedChildrenNode.json?id=&parent_id=" +
							 * node.id;
							 **************************************************/
						},
						onLoadSuccess : function(rec) {

						}
					});

	$('#affiliated_type_tree_id2')
			.combotree(
					{
						url : '',
						onBeforeExpand : function(node, param) {
							var community_id = $("#community_id2").combobox(
									'getValue');
							$('#affiliated_type_tree_id2').combotree("tree")
									.tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
									+ node.id + "&community_id=" + community_id;
						},
						onShowPanel : function(rec) {
							var root = $('#affiliated_type_tree_id2')
									.combotree("tree").tree("getRoot");
							if (root != null) {
								return;
							}
							var community_id = $("#community_id2").combobox(
									'getValue');
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0";
							$("#affiliated_type_tree_id2").combotree('options').url = url;
							$("#affiliated_type_tree_id2").combotree('clear');
							$("#affiliated_type_tree_id2").combotree('reload');
						}
					});

	$("#affiliated_type_list_id2")
			.combobox(
					{
						multiple : false,
						panelHeight : '100px',
						// url :
						// "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=list",
						url : '',
						valueField : 'id',
						textField : 'name',
						method : 'GET',
						onSelect : function(rec) {

						},
						onShowPanel : function(rec) {
							var data = $('#affiliated_type_list_id2').combobox(
									"getData");
							if (data.length > 0) {
								return;
							}
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=list&queryConditionFlag=true";
							$("#affiliated_type_list_id2").combobox('options').url = url;
							$("#affiliated_type_list_id2").combobox('clear');
							$("#affiliated_type_list_id2").combobox('reload');
						}
					});
	$("#affiliated_type2")
			.combobox(
					{
						required : true,
						multiple : false,
						panelHeight : '100px',
						data : [ {
							text : '树形',
							id : '1'
						}, {
							text : '列表',
							id : '2'
						} ],
						valueField : 'id',
						textField : 'text',
						onShowPanel : function(rec) {
							affiliated_type_edit_flag = false;
						},
						onSelect : function(rec) {
							if (!affiliated_type_edit_flag) {
								var value = $("#affiliated_type2").combobox(
										"getValue");
								$("#affiliated_type_tree_id2")
										.combobox("clear");
								$("#affiliated_type_list_id2")
										.combobox("clear");
								if (value == '1') {
									$("#affiliated_type_tree_id2").combotree(
											"enable");
									var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0&community_id="
											+ community_id;
									$('#affiliated_type_tree_id2').combotree(
											"tree").tree("options").url = url;
									/**$('#affiliated_type_tree_id2').combotree(
											"tree").tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?id=&parent_id=0";
									 **/
									$('#affiliated_type_tree_id2').combotree(
											"tree").tree("reload");
									$("#affiliated_type_list_id2").combobox(
											"disable");
									// $("#affiliated_type_tree_id2").combobox("required",true);
									// $("#affiliated_type_list_id2").combobox("required",false);

								} else if (value == '2') {
									$("#affiliated_type_list_id2").combobox(
											"enable");
									$("#affiliated_type_list_id2").combobox(
											'reload');
									$("#affiliated_type_tree_id2").combotree(
											"disable");

									// $("#affiliated_type_tree_id2").combobox("required",false);
									// $("#affiliated_type_list_id2").combobox("required",true);

								}
							}

						}
					});

	//批量添加开始
	$("#cyclical_type2").combobox({
		required : true,
		multiple : false,
		panelHeight : '100px',
		data : [ {
			text : '阿拉伯数字',
			id : '1'
		}, {
			text : '小写字母',
			id : '2'
		}, {
			text : '大写字母',
			id : '3'
		} ],
		valueField : 'id',
		textField : 'text',
		onShowPanel : function(rec) {

		},
		onSelect : function(rec) {

		}
	});
	$('#start_point2').textbox({
		required : true
	});
	$('#end_point2').textbox({
		required : true
	});

	tr_batch_none();

	//批量添加结束

});
function tr_batch_none() {
	var table_batch = document.getElementById("table_batch");
	table_batch.style.display = 'none';
	$("#name2").textbox("enable");
	$("#cyclical_type2").combobox("disable");
	$("#start_point2").textbox("disable");
	$("#end_point2").textbox("disable");

}

function tr_batch_block() {
	var table_batch = document.getElementById("table_batch");
	table_batch.style.display = 'block';
	$("#name2").textbox("disable");
	$("#cyclical_type2").combobox("enable");
	$("#start_point2").textbox("enable");
	$("#end_point2").textbox("enable");
}
function submitForm() {
	$('#saveAuthForm')
			.form(
					'submit',
					{
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=affiliated",
						//ajax : true,
						onSubmit : function() {
							var isValid = $(this).form('validate');//校验是否所有的字段是否合规
							if (isValid) {
								$.messager.progress({
									title : '温馨提示',
									msg : '正在提交数据，请稍后...'
								});
							}
							return isValid; // 返回false终止表单提交
						},
						success : function(data) {
							$.messager.progress('close');
							if (data == "" || data == null) {
								$('#addDIV').dialog('close');
								$(datagridJQueryFind).datagrid('reload');
							}
							var obj = eval('(' + data + ')');
							var status = obj.status;
							if (status == 1) {
								$.fn.messageInfoTip(data);
								$('#addDIV').dialog('close');
								$(datagridJQueryFind).datagrid('reload');
							} else {
								$.fn.messageInfoTip(data);
							}
						},
						failure : function(data) {
							$.messager.progress('close');
							alert("操作失败!");
						}
					});
}

function submitForm2() {
	$('#saveAuthForm')
			.form(
					'submit',
					{
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=affiliated&batch_add_flag=true",
						//ajax : true,
						onSubmit : function() {
							var isValid = $(this).form('validate');//校验是否所有的字段是否合规
							if (isValid) {
								$.messager.progress({
									title : '温馨提示',
									msg : '正在提交数据，请稍后...'
								});
							}
							return isValid; // 返回false终止表单提交
						},
						success : function(data) {
							$.messager.progress('close');
							if (data == "" || data == null) {
								$('#addDIV').dialog('close');
								$(datagridJQueryFind).datagrid('reload');
							}
							var obj = eval('(' + data + ')');
							var status = obj.status;
							if (status == 1) {
								$.fn.messageInfoTip(data);
								$('#addDIV').dialog('close');
								$(datagridJQueryFind).datagrid('reload');
							} else {
								$.fn.messageInfoTip(data);
							}
						},
						failure : function(data) {
							$.messager.progress('close');
							alert("操作失败!");
						}
					});
}

function clearFrom(cform) {
	$(cform).form("clear");
}

function setDialog(dialogDiv, hrefHtml) {
	$(dialogDiv).dialog({
		title : '编辑',
		width : 700,
		height : 400,
		closed : false,
		cache : false,
		modal : true,
		buttons : [ {
			text : '保存',
			iconCls : 'icon-ok',
			handler : function() {
				if (!batch_add_flag) {
					submitForm();
				} else {
					submitForm2();
				}
			}
		}, {
			text : '重置',
			iconCls : 'icon-clear',
			handler : function() {
				clearFrom(saveFormDiv);
			}
		}, {
			text : '关闭',
			iconCls : 'icon-remove',
			handler : function() {
				$('#saveAuthForm').form("clear");
				$(dialogDiv).dialog('close');
				batch_add_flag = false;
			}
		} ],
		onClose : function() {
		}
	});
}

function val2From(row, flag) {
	community_edit_flag = true;
	area_edit_flag = true;
	building_edit_flag = true;
	floor_edit_flag = true;
	unit_edit_flag = true;
	affiliated_edit_flag = true;
	affiliated_type_edit_flag = true;
	var community_id = row.community_id;
	var area_id = row.area_id;
	var building_id = row.building_id;
	var floor_id = row.floor_id;
	var unit_id = row.unit_id;
	var affiliated_id = row.affiliated_id;
	var parent_id = row.parent_id;
	var affiliated_type_tree_id = row.affiliated_type_tree_id;
	var affiliated_type_list_id = row.affiliated_type_list_id;

	$("#affiliated_type_tree_id2").combobox("enable");
	$("#affiliated_type_list_id2").combobox("enable");
	$("#id2").textbox("setValue", row.id);
	$("#name2").textbox("setValue", row.name);
	$("#remark2").textbox("setValue", row.remark);

	$("#affiliated_type_tree_id2").combobox("clear");
	$("#affiliated_type_list_id2").combobox("clear");
	if (affiliated_type_list_id != null && affiliated_type_list_id != "") {
		// setInintSelect("#affiliated_type_list_id2", affiliated_type_list_id);
		// $("#affiliated_type2").combobox("setValue", "2");
		/***********************************************************************
		 * $('#affiliated_type_tree_id2').combobox({ required : false });
		 * $('#affiliated_type_list_id2').combobox({ required : true });
		 **********************************************************************/
		var att_url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=list&queryConditionFlag=true"
				+ "&community_id=" + community_id;
		setComboxJson("#affiliated_type_list_id2", affiliated_type_list_id,
				att_url);
		$("#affiliated_type_tree_id2").combotree("disable");
		$("#affiliated_type2").combobox("setValue", "2");

	}

	if (affiliated_type_tree_id != null && affiliated_type_tree_id != "") {
		/***********************************************************************
		 * var att_url =
		 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeTreeInni.json?id=" +
		 * affiliated_type_tree_id + "&community_id=" + community_id;
		 **********************************************************************/
		var att_url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&&queryConditionFlag=true&operate_flag=edit_inni_node&id="
				+ affiliated_type_tree_id + "&community_id=" + community_id;
		setTreeJson("#affiliated_type_tree_id2", affiliated_type_tree_id,
				att_url);
		$("#affiliated_type2").combobox("setValue", "1");
		$("#affiliated_type_list_id2").combobox("disable");
	}

	if (community_id != null && community_id != "") {
		setInintSelect("#community_id2", community_id);
	}
	if (area_id != null && area_id != "") {
		setComboxJson("#area_id2", area_id, area_url);
	}
	if (building_id != null && building_id != "") {
		setComboxJson("#building_id2", building_id, building_url);
	}
	if (floor_id != null && floor_id != "") {
		setComboxJson("#floor_id2", floor_id, floor_url);
	}
	if (unit_id != null && unit_id != "") {
		setComboxJson("#unit_id2", unit_id, unit_url);
	}

	if (row.parent_id != null && row.parent_id != "") {
		var last_url = "";
		var type = "";
		if (unit_id != null && unit_id != "") {
			type = "unit";
			last_url = "&community_id=" + community_id + "&area_id=" + area_id
					+ "&building_id=" + building_id + "&floor_id=" + floor_id
					+ "&unit_id=" + unit_id;
		} else if (floor_id != null && floor_id != "") {
			type = "floor";
			last_url = "&community_id=" + community_id + "&area_id=" + area_id
					+ "&building_id=" + building_id + "&floor_id=" + floor_id;
		} else if (building_id != null && building_id != "") {
			type = "building";
			last_url = "&community_id=" + community_id + "&area_id=" + area_id
					+ "&building_id=" + building_id;
		} else if (area_id != null && area_id != "") {
			type = "area";
			last_url = "&community_id=" + community_id + "&area_id=" + area_id;
		} else if (community_id != null && community_id != "") {
			type = "community";
			last_url = "&community_id=" + community_id;
		} else {
			return;
		}
		/***********************************************************************
		 * var url2 =
		 * "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedInni.json?type=" +
		 * type + "&id=&parent_id=0" + last_url;
		 **********************************************************************/
		/**var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=edit_inni_node&main_affiliated_type="
				+ type + "&id=&parent_id=0" + last_url;**/
		var url2 = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=affiliated&queryConditionFlag=true&operate_flag=edit_inni_node&id="+row.parent_id;
		setTreeJson("#parent_id2", row.parent_id, url2);
	}
}

function initDataGrid() {
	$(datagridJQueryFind)
			.datagrid(
					{
						url : null,
						toolbar : [
								{
									text : '批量添加',
									iconCls : 'icon-add',
									handler : function() {
										batch_add_flag = true;
										tr_batch_block();
										setDialog("#addDIV", '');
										clearFrom(saveFormDiv);
										$("#affiliated_type_tree_id2")
												.combobox("enable");
										$("#affiliated_type_list_id2")
												.combobox("enable");
										$("#affiliated_type_tree_id2")
												.combobox("clear");
										$("#affiliated_type_list_id2")
												.combobox("clear");
										$("#affiliated_type_tree_id2")
												.combobox('disable');
										$("#affiliated_type_list_id2")
												.combobox("disable");
										$("#addDIV").show();
									}
								},
								'-',
								{
									text : '添加',
									iconCls : 'icon-add',
									handler : function() {
										tr_batch_none();
										setDialog("#addDIV", '');
										clearFrom(saveFormDiv);
										$("#affiliated_type_tree_id2")
												.combobox("enable");
										$("#affiliated_type_list_id2")
												.combobox("enable");
										$("#affiliated_type_tree_id2")
												.combobox("clear");
										$("#affiliated_type_list_id2")
												.combobox("clear");
										/***************************************
										 * $('#affiliated_type_tree_id2')
										 * .combotree("tree").tree(
										 * "options").url =
										 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?id=&parent_id=0";
										 * $('#affiliated_type_tree_id2')
										 * .combotree("tree").tree( "reload");
										 **************************************/
										$("#affiliated_type_tree_id2")
												.combobox('disable');
										$("#affiliated_type_list_id2")
												.combobox("disable");
										$("#addDIV").show();
									}
								},
								'-',
								{
									text : '修改',
									iconCls : 'icon-edit',
									handler : function() {
										tr_batch_none();
										var getRows = $(datagridJQueryFind)
												.datagrid("getSelections");
										if (getRows.length == 0
												|| getRows.length > 1) {
											$.messager.alert("操作提示", "请选择一行",
													"info");
										} else {
											var getRow = $(datagridJQueryFind)
													.datagrid("getSelected");
											setDialog("#addDIV", '');
											clearFrom(saveFormDiv);
											val2From(getRow);
											$("#addDIV").show();

										}
									}
								},
								'-',
								{
									text : '删除',
									iconCls : 'icon-remove',
									handler : function() {
										var getRows = $(datagridJQueryFind)
												.datagrid("getSelections");
										if (getRows.length == 0) {
											$.messager.alert("操作提示", "请至少选择一行",
													"info");
										} else {
											var ids = [];
											var rows = $(datagridJQueryFind)
													.datagrid('getChecked');
											for (var i = 0; i < rows.length; i++) {
												ids.push(rows[i].id);
											}
											$.messager
													.confirm(
															'确认',
															'删除附属，会导致附属下的子节点、区域位置的关联信息删除，您确认想要删除记录吗？',
															function(r) {
																if (r) {
																	$
																			.ajax({
																				type : "POST",
																				dataType : 'html',
																				url : '/basicinfo/admin/mainAndAffiliatedInfomationManage/deleteMainAndAffiliatedInfomation.json?type=affiliated&ids='
																						+ ids,
																				success : function(
																						data) {
																					var obj = eval('('
																							+ data
																							+ ')');
																					if (obj.status == 1) {
																						$.fn
																								.messageInfoTip(data);
																						$(
																								datagridJQueryFind)
																								.datagrid(
																										'reload');
																					}
																				}
																			});
																}
															});
										}
									}
								} ],
						width : '90%',
						pagination : true,
						pageSize : 10,
						singleSelect : false,
						striped : true,
						sortOrder : 'asc',
						rownumbers : true,
						onLoadSuccess : function() {
							$(datagridJQueryFind).datagrid('clearSelections');
						},
						onLoadError : function() {
						},
						columns : [ [ {
							field : 'ck',
							checkbox : true
						}, {
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
							title : '楼宇名',
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
							title : '楼宇ID',
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
