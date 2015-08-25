/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseDeviceTypeRequestUrl = '/basicinfo/tenantinfo';
var formsubmitUrl;
$(function() {
	initDataGrid();
	$("#search").click(function() {
		var param = $.fn.getFormParams(searchFrom);
		$(datagridJQueryFind).datagrid('options').queryParams = param;
		$(datagridJQueryFind).datagrid('reload');
	});
	$("#clearBtn").click(function() {
		clearFrom(searchFrom);
	});
	$("#dlgDIV").hide();
	$("#upload_file_div").hide();
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseDeviceTypeRequestUrl+'/findAllTenantComps.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseDeviceTypeRequestUrl+'/saveTenantComp.json';
				setDialog("#dlgDIV", '','新增');
				clearFrom(dataFormDiv);
				$("#dlgDIV").show();
			}
		},'-',{
			text : '编辑',
			iconCls : 'icon-edit',
			handler : function() {
				var row = $(datagridJQueryFind).datagrid("getSelected");
				if (row) {
					setDialog("#dlgDIV",'','编辑');
					$("#dlgDIV").show();
					clearFrom(dataFormDiv);
					$(dataFormDiv).form('load',row);
					formsubmitUrl = baseDeviceTypeRequestUrl+'/updateTenantComp.json';
				} else {
					$.messager.alert("操作提示", "请选择一行", "info");
				}
				$('#descPicLink').val("");
			}
		},'-',{
			text : '删除',
			iconCls : 'icon-cancel',
			handler : function() {
				var rows = $(datagridJQueryFind).datagrid("getSelections");
				if (rows.length == 0 ) {
					$.messager.alert("操作提示", "请至少选择一行", "info");
				} else {
					var ids = [];
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].id);
					}
					$.messager.confirm('确认','您确认想要删除记录吗？',function(r) {
						if (r) {
							$.ajax({
								type : "POST",
								dataType : 'html',
								url : baseDeviceTypeRequestUrl+'/deleteTenantComp.json?ids='+ids,
								success : function(data) {
									var obj = eval('('+ data+ ')');
									console.log(JSON.stringify(obj));
									if (obj.status == 1) {
										$.fn.messageInfoTip(data);
										$(datagridJQueryFind).datagrid('reload');
									}
								},
								error: function(textStatus){
									if(console){
										console.error("ajax出现异常："+textStatus);
									}
									alert(textStatus);
								}
							});
						}else{
							return false;
						}
					});
				}
		}} ,'-',{
			text:'批量导入',
			iconCls:'icon-redo',
			handler: function(){
				formsubmitUrl = baseDeviceTypeRequestUrl+'/uploadComInfo.json';
				$("#upload_file_div").dialog({
					title : '上传文件:',
					width : 500,
					height : 300,
					closed : false,
					cache : false,
					modal : true,
					buttons : [ {
						text : '保存',
						iconCls : 'icon-ok',
						handler : function() {
//							$(this).css({"background": "grey"});
//							$(this).css({"display": "none"});
							$("#uploadDataForm").form('submit', {
								url : formsubmitUrl,
								ajax : true,
								onSubmit:function(){
									
								},
								success : function(data) {
									var obj = eval('(' + data + ')');
									var status = obj.status;
									console.log(JSON.stringify(obj));
									if (status == 1) {
										$.fn.messageInfoTip(data);
										$("#upload_file_div").dialog('close');
										$(datagridJQueryFind).datagrid('reload');
									} else {
//										$(this).css({"display": "block"});
										$.fn.messageInfoTip(data);
										alert(JSON.stringify(obj));
									}
								}
							});
						}
					}, {
						text : '关闭',
						iconCls : 'icon-remove',
						handler : function() {
							$("#upload_file_div").dialog('close');
						}
					} ]
				});
				clearFrom("#uploadDataForm");
				$("#upload_file_div").show();
			}
		} ],
		width : '80%',
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
			field : 'id',
			title : 'ID',
			width : 65,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'tComName',
			title : '公司名称 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'tComPro',
			title : '公司性质 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'tComTrade',
			title : '公司行业 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'tComSize',
			title : '公司规模',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'location',
			title : '所在地区',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'phoneNum',
			title : '联系电话',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'email',
			title : '公司邮箱',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'contacts',
			title : '联系人',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'siteAddr',
			title : '公司网址',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'createTime',
			title : '创建时间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'tComDesc',
			title : '公司简介',
			width : 360,
			align : 'center',
			sortable : true
		} ] ]
	});
}


function clearFrom(cform){
	$(cform).form("clear");
}

function submitForm() {
	$('#dataForm').form('submit', {
		url : formsubmitUrl,
		ajax : true,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success : function(data) {
			var obj = eval('(' + data + ')');
			var status = obj.status;
			console.log(JSON.stringify(obj));
			if (status == 1) {
				$.fn.messageInfoTip(data);
				$('#dlgDIV').dialog('close');
				$(datagridJQueryFind).datagrid('reload');
			} else {
				$.fn.messageInfoTip(data);
				$('#dlgDIV').dialog('close');
			}
		}
	});
}
function setDialog(dialogDiv, hrefHtml, title) {
	$(dialogDiv).show();
	$(dialogDiv).dialog({
		title : title,
		width : 600,
		height : 550,
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
				clearFrom(dataFormDiv);
			}
		}, {
			text : '关闭',
			iconCls : 'icon-remove',
			handler : function() {
				$(dialogDiv).dialog('close');
			}
		} ]
	});
}
