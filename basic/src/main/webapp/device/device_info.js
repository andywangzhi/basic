/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseDeviceInfoRequestUrl = '/basicinfo/deviceinfo';
var baseCusTypeRequestUrl = '/basicinfo/devicecustype';
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
	
	//初始化品牌下拉框
	$("#brandType_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: baseDeviceInfoRequestUrl+'/listBrandCombox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
	
	//自定义类型下拉树
	$('#cTypeId').combotree({
		url: baseCusTypeRequestUrl+'/getCustomTypeTree.json',
		required: false,
		onSelect:function(node){
			
		}
	}); 
	
	
	//初始化品牌下拉框
	$("#q_brandType_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: baseDeviceInfoRequestUrl+'/listBrandCombox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
	
	//自定义类型下拉树
	$('#q_cTypeId').combotree({
		url: baseCusTypeRequestUrl+'/getCustomTypeTree.json',
		required: false,
	}); 
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseDeviceInfoRequestUrl+'/findAllDeviceInfo.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseDeviceInfoRequestUrl+'/saveDeviceInfo.json'
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
					//加载数据
					$(dataFormDiv).form('load',row);
					if(row.brandType && row.brandType.id){
						$("#brandType_combox").combobox("select",row.brandType.id);
					}
					if (row.customType && row.customType.id) {
						$("#cTypeId").combotree("setValue",row.customType.id);
					}else{
						$("#cTypeId").combotree("setValue","");
					}
				
					formsubmitUrl = baseDeviceInfoRequestUrl+'/updateDeviceInfo.json'
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
					$.messager.confirm('确认','您确认想要删除该类型及该类型(设备信息->功能定义|设备详细信息(厂家信息))所有子类吗？',function(r) {
						if (r) {
							$.ajax({
								type : "POST",
								dataType : 'html',
								url : baseDeviceInfoRequestUrl+'/deleteDeviceInfo.json?ids='+ids,
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
			field : 'deviceCode',
			title : '设备代码 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'deviceName',
			title : '设备名称 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'brandType',
			title : '所属品牌分类 ',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.brandName){
						return value.brandName 
					}else{
						return value
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'customType',
			title : '所属自定义分类 ',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.cTypeName){
						return value.cTypeName 
					}else{
						return value
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'createTime',
			title : '创建时间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'updateTime',
			title : '修改时间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'deviceRemark',
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
				var cTypeId=$("#cTypeId").combotree("getValue");
				if(cTypeId.substring(0,4)=="root"){
//					var str=cTypeId.substring(0,4);
//					cTypeId=cTypeId.replace(str,"");
//					$("#cTypeId").combotree("setValue",cTypeId.substring(0,4));
					alert("根节点不能选择");
				}else{
					submitForm();
				}
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
