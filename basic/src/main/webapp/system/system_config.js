/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseParamsUrl = '/basic/system/config';
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
	
	//生效情况
	$("#activate_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: baseParamsUrl+'/listConfig4Combox.json?nameSpace=basicinfo.config.activate',
		valueField: 'id',
		textField: 'text',
	    method:'GET'
	});
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseParamsUrl+'/findAll.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseParamsUrl+'/saveConfig'
				setDialog("#dlgDIV", '','新增');
				clearFrom(dataFormDiv);
				$("#dlgDIV").show();
			}
		},'-',{
			text : '复制',
			iconCls : 'icon-cut',
			handler : function() {
				var row = $(datagridJQueryFind).datagrid("getSelected");
				if (row) {
					formsubmitUrl = baseParamsUrl+'/saveConfig'
					setDialog("#dlgDIV", '','新增');
					clearFrom(dataFormDiv);
					//加载数据
					$(dataFormDiv).form('load',row);
					$("#dlgDIV").show();
				} else {
					$.messager.alert("操作提示", "请选择要复制的一行", "info");
				}
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
					//加载数据
					$(dataFormDiv).form('load',row);
					//默认值不可以修改
					formsubmitUrl = baseParamsUrl+'/updateConfig.json'
				} else {
					$.messager.alert("操作提示", "请选择一行", "info");
				}
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
								url : baseParamsUrl+'/deleteConfigs.json?ids='+ids,
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
		}},'-',{
			text : '刷新缓存',
			iconCls : 'icon-reload',
			handler : function() {
				$.ajax({
					type : "POST",
					dataType : 'html',
					url : baseParamsUrl+'/refresh.json',
					success : function(data) {
						var obj = eval('('+ data+ ')');
						console.log(JSON.stringify(obj));
						if (obj.status == 1) {
							$.fn.messageInfoTip(data);
						}
					},
					error: function(textStatus){
						if(console){
							console.error("ajax出现异常："+textStatus);
						}
						alert(textStatus);
					}
				});
			}} ],
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
			field : 'nameSpace',
			title : '命名空间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'configKey',
			title : 'Key值',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'configName',
			title : '名称 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'configEname',
			title : '英文名称 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'configValue',
			title : '值',
			width : 380,
			align : 'center',
			sortable : true
		}, {
			field : 'defaultVal',
			title : '默认值',
			width : 380,
			align : 'center',
			sortable : true
		}, {
			field : 'sort',
			title : '排序',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			field : 'activate',
			title : '生效情况',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			field : 'createTime',
			title : '创建时间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'configDesc',
			title : '备注',
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
