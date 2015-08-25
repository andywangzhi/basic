/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseDeviceTypeRequestUrl = '/basicinfo/propertyDistrictRel';
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
	//初始化下拉框
	$("#com_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: baseDeviceTypeRequestUrl+'/../propertyorg/listComps4ComBox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseDeviceTypeRequestUrl+'/findAllDistrictRel.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseDeviceTypeRequestUrl+'/saveDistrictRel.json'
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
					formsubmitUrl = baseDeviceTypeRequestUrl+'/updateDistrictRel.json'
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
								url : baseDeviceTypeRequestUrl+'/deleteDistrictRel.json?ids='+ids,
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
			field : 'com',
			title : '公司名称 ',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				console.log(JSON.stringify(value));
				if(value){
					if(value.compName){
						return value.compName;
					}else{
						return value;
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'com',
			title : '公司代码 ',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value){
				console.log(JSON.stringify(value));
				if(value){
					if(value.compCode){
						return value.compCode;
					}else{
						return value;
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'districCode',
			title : '位置代码',
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
			field : 'updateTime',
			title : '更新时间',
			width : 180,
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
			var selected = $('#tt').tree('getSelected');
			$("#districCode").val(selected.id);
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

var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?type=community";
$(function() {
	$('#tt')
			.tree(
					{

						url : '',
						checkbox : false,// 设置树有选择框
						cascadeCheck : false,// 设置树非级联选中
						onBeforeExpand : function(node, param) {
							// 加载子节点 为了避免重复加载 ，用load_flag变量来控制，0为未加载，1为已加载
							if (node.load_flag == 0) {
								var str = "path_code=" + node.id + "&type="+ node.child_type;
								var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?"
										+ str;
								// 节点加载
								setTreeJson("#tt", att_url, node);
							}
						}

					});
	// 初始化tree
	setTreeJson("#tt", att_url, null);

	// 清空tree选中
	$("#treeClear").click(function() {
		treeClear("#tt");
	});

});

