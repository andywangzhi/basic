// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var saveFormDiv = "#saveAuthForm";
var searchFrom = "#searchFrom";
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
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=community&detail_location_flag="true"';
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

	$('#name2').textbox({
		required : true
	});
	$('#address2').textbox({
		required : true
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
		}  ],
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
	$("#community_type2")
	.combobox(
			{
				required : true,
				multiple : false,
				panelHeight : '100px',
				data : [  {
					text : '社区',
					id : 'community'
				}, {
					text : '写字楼',
					id : 'office'
				}  ],
				valueField : 'id',
				textField : 'text'
	});

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
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=community",
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
						url : "/basicinfo/admin/mainAndAffiliatedInfomationManage/saveOrUpdateMainAndAffiliatedInfomation.json?type=community&batch_add_flag=true",
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
				batch_add_flag=false;
			}
		} ]
	});
}

function val2From(row, flag) {
	$("#id2").textbox("setValue", row.id);
	$("#name2").textbox("setValue", row.name);
	$("#remark2").textbox("setValue", row.remark);
	$("#developer2").textbox("setValue", row.developer);
	$("#address2").textbox("setValue", row.address);
	$("#community_type2").combobox("setValue", row.community_type);
}
function setInintSelect(idStr, value) {
	var data = $(idStr).combobox('getData');
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == value) {
			$(idStr).combobox('select', data[i].id);
		}
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
								'-',{
									text : '添加',
									iconCls : 'icon-add',
									handler : function() {
										batch_add_flag=false;
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
										batch_add_flag=false;
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
															'删除楼盘，会导致楼盘下的分区、楼宇、楼层、单元、附属、区域位置的关联信息删除，您确认想要删除记录吗？',
															function(r) {
																if (r) {
																	$
																			.ajax({
																				type : "POST",
																				dataType : 'html',
																				url : '/basicinfo/admin/mainAndAffiliatedInfomationManage/deleteMainAndAffiliatedInfomation.json?type=community&ids='
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
						},{
							field : 'community_type',
							title : '类型',
							width : 120,
							align : 'center',
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

}
