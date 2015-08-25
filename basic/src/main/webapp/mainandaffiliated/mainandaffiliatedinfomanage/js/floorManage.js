// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var saveFormDiv = "#saveAuthForm";
var searchFrom = "#searchFrom";
var community_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
var area_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=area&queryConditionFlag=true";
var building_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=building&queryConditionFlag=true";
var community_edit_flag = false;
var area_edit_flag = false;
var building_edit_flag = false;
var batch_add_flag=false;
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
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=floor&detail_location_flag="true"';
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

	$("#community_id").combobox({
		multiple : false,
		panelHeight : '100px',
		url : community_url,
		valueField : 'id',
		textField : 'name',
		method : 'GET',
		onSelect : function(rec) {
			$("#area_id").combobox('clear');
			$("#building_id").combobox('clear');
			$("#area_id").combobox("loadData", "");
			$("#building_id").combobox("loadData", "");
		}
	});
	$("#area_id").combobox({
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
			var community_id = $("#community_id").combobox('getValue');
			if (community_id == null || community_id == "") {
				$("#area_id").combobox('hidePanel');
				$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇！", "info");
			} else {
				var community_id = $("#community_id").combobox('getValue');
				var url = area_url + "&community_id=" + community_id
				$("#area_id").combobox('options').url = url;
				$("#area_id").combobox('reload');
			}
		},
		onSelect : function(rec) {
			$("#building_id").combobox('clear');
			$("#building_id").combobox("loadData", "");
		}
	});
	$("#building_id").combobox(
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
					var community_id = $("#community_id").combobox('getValue');
					var area_id = $("#area_id").combobox('getValue');
					if (community_id == null || community_id == ""
							|| area_id == null || area_id == "") {
						$("#building_id").combobox('hidePanel');
						$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇！",
								"info");
					} else {
						var community_id = $("#community_id").combobox(
								'getValue');
						var area_id = $("#area_id").combobox('getValue');
						var url = building_url + "&community_id="
								+ community_id + "&area_id=" + area_id
						$("#building_id").combobox('options').url = url;
						$("#building_id").combobox('reload');
					}
				},
				onSelect : function(rec) {
				}
			});

	$('#name2').textbox({
		required : true
	});
	$("#community_id2").combobox({
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
				$("#area_id2").combobox("loadData", "");
				$("#building_id2").combobox("loadData", "");

			}
		},
		onLoadSuccess : function(rec) {
		}
	});
	$("#area_id2").combobox({
		required : true,
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
			var community_id = $("#community_id2").combobox('getValue');
			if (community_id == null || community_id == "") {
				$("#area_id2").combobox('hidePanel');
				$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇！", "info");
			} else {
				var community_id = $("#community_id2").combobox('getValue');
				var url = area_url + "&community_id=" + community_id
				$("#area_id2").combobox('options').url = url;
				$("#area_id2").combobox('reload');
			}
		},
		onSelect : function(rec) {
			if (!area_edit_flag) {
				$("#building_id2").combobox('clear');
				$("#building_id2").combobox("loadData", "");
			}

		},
		onLoadSuccess : function(rec) {
		}
	});
	$("#building_id2")
			.combobox(
					{
						required : true,
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
								$.messager.alert("操作提示",
										"主体条件选择顺序为:楼盘->分区->楼宇！", "info");
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

						},
						onLoadSuccess : function(rec) {
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
function tr_batch_none(){
	var table_batch = document.getElementById("table_batch"); 
	table_batch.style.display = 'none';  
	$("#name2").textbox(
	"enable");
	$("#cyclical_type2").combobox(
	"disable");
	$("#start_point2").textbox(
	"disable");
	$("#end_point2").textbox(
	"disable");
	
	
}

function tr_batch_block(){
	var table_batch = document.getElementById("table_batch"); 
	table_batch.style.display = 'block';  
	$("#name2").textbox(
	"disable");
	$("#cyclical_type2").combobox(
	"enable");
	$("#start_point2").textbox(
	"enable");
	$("#end_point2").textbox(
	"enable");
}

function submitForm() {
	$('#saveAuthForm')
			.form(
					'submit',
					{
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=floor",
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
							 if(data==""||data==null){
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
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=floor&batch_add_flag=true",
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
							 if(data==""||data==null){
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
				if(!batch_add_flag){
					submitForm();
				}else{
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
				saveAuthForm=false;
				batch_add_flag=false;
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
	var community_id = row.community_id;
	var area_id = row.area_id;
	var building_id = row.building_id;

	$("#id2").textbox("setValue", row.id);
	$("#name2").textbox("setValue", row.name);
	$("#remark2").textbox("setValue", row.remark);
	if (community_id != null && community_id != "") {
		setInintSelect("#community_id2", community_id);
	}
	if (area_id != null && area_id != "") {
		setComboxJson("#area_id2", area_id, area_url);
	}
	if (building_id != null && building_id != "") {
		setComboxJson("#building_id2", building_id, building_url);
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
										batch_add_flag=true;
										tr_batch_block();
										setDialog("#addDIV", '');
										clearFrom(saveFormDiv);
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
															'删除楼层，会导致楼层下的单元、附属、及区域位置的关联信息删除，您确认想要删除记录吗？',
															function(r) {
																if (r) {
																	$
																			.ajax({
																				type : "POST",
																				dataType : 'html',
																				url : '/basicinfo/admin/mainAndAffiliatedInfomationManage/deleteMainAndAffiliatedInfomation.json?type=floor&ids='
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

}
