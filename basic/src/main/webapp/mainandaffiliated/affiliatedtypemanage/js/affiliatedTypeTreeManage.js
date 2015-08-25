// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var saveFormDiv = "#saveAuthForm";
var searchFrom = "#searchFrom";
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
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeByPage.json?type=tree';

	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

	/***************************************************************************
	 * $('#parent_id').combotree({ url:
	 * '/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&parent_id=0',
	 * onBeforeExpand:function(node,param) {
	 * $('#parent_id').combotree("tree").tree("options").url =
	 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&id=&parent_id="+
	 * node.id; } });
	 **************************************************************************/

	$('#parent_id')
			.combotree(
					{
						onBeforeExpand : function(node, param) {
							$('#parent_id').combotree("tree").tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
									+ node.id ;
						},
						onShowPanel : function(rec) {
							var root = $('#parent_id').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0"
						    $("#parent_id").combotree('options').url = url;
						    $("#parent_id").combotree('reload');
						}
					});

	/***************************************************************************
	 * $('#parent_id2').combotree({ url: '', required: true,
	 * onBeforeExpand:function(node,param) {
	 * $('#parent_id2').combotree("tree").tree("options").url =
	 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&id=&parent_id="+
	 * node.id; } });
	 **************************************************************************/

	$('#parent_id2')
			.combotree(
					{
						url : '',
						onBeforeExpand : function(node, param) {
							$('#parent_id2').combotree("tree").tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
									+ node.id ;
						},
						onShowPanel : function(rec) {
							var root = $('#parent_id2').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0";
						$("#parent_id2").combotree('options').url = url;
						$("#parent_id2").combotree('clear');
						$("#parent_id2").combotree('reload');
						}
					});

	$('#name2').textbox({
		required : true
	});

});

function submitForm() {
	$('#saveAuthForm')
			.form(
					'submit',
					{
						url : "/basicinfo/admin/affiliatedTypeManage/saveOrUpdateAffiliatedType.json?type=tree",
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
							$('#parent_id').combotree("tree").tree("reload");
							$('#parent_id2').combotree("tree").tree("reload");
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
				submitForm();
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
			}
		} ]
	});
}

function val2From(row, flag) {
	$("#id2").textbox("setValue", row.id);
	$("#name2").textbox("setValue", row.name);
	$("#remark2").textbox("setValue", row.remark);
	/***************************************************************************
	 * var att_url =
	 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeTreeInni.json?id=" +
	 * row.parent_id;
	 **************************************************************************/
	var att_url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=edit_inni_node&id=&id="
			+ row.parent_id;
	setTreeJson("#parent_id2", row.parent_id, att_url);
}

function initDataGrid() {
	$(datagridJQueryFind)
			.datagrid(
					{
						url : null,
						toolbar : [
								{
									text : '添加',
									iconCls : 'icon-add',
									handler : function() {
										setDialog("#addDIV", '');
										clearFrom(saveFormDiv);
										/***************************************
										 * $('#parent_id2').combotree("tree")
										 * .tree("options").url =
										 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedTypeTreeChildrenNode.json?type=tree&id=&parent_id=0";
										 * $('#parent_id2').combotree("tree")
										 * .tree("reload");
										 **************************************/
										$("#addDIV").show();
									}
								},
								'-',
								{
									text : '修改',
									iconCls : 'icon-edit',
									handler : function() {
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
															'您确认想要删除记录吗？',
															function(r) {
																if (r) {
																	$
																			.ajax({
																				type : "POST",
																				dataType : 'html',
																				url : '/basicinfo/admin/affiliatedTypeManage/deleteAffiliatedType.json?type=tree&ids='
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
							field : 'parent_id',
							title : '父ID',
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
						} ] ]

					});

}
