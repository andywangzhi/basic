/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseDeviceInfoRequestUrl = '/basicinfo/deviceinfo';
var baseCusTypeRequestUrl = '/basicinfo/devicecustype';
var baseOPCRequestUrl = '/basicinfo/deviceopc';
var systemConfigUrl = '/basicinfo/system/config';

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
	
	//初始化设备选择表
	$("#deviceCode_comboGrid").combogrid({
        panelWidth:260,   
        idField:'deviceCode', //ID字段   
        textField:'deviceName', //显示的字段   
        url:baseDeviceInfoRequestUrl+'/findAllDeviceInfo.json',   
        fitColumns: true,   
        striped: true,   
        editable:true,   
        pagination : true,//是否分页   
        rownumbers:true,//序号   
        collapsible:false,//是否可折叠的   
        fit: true,//自动大小   
        pageSize: 10,//每页显示的记录条数，默认为10   
        pageList: [10],//可以设置每页记录条数的列表   
        method:'post',   
        columns:[[   
            {field:'deviceName',title:'设备名称',width:150},   
            {field:'deviceCode',title:'设备编码',width:150}
        ]]   
    });
	//初始化设备选择表
	$("#q_deviceCode_comboGrid").combogrid({
        panelWidth:260,   
        idField:'deviceCode', //ID字段   
        textField:'deviceName', //显示的字段   
        url:baseDeviceInfoRequestUrl+'/findAllDeviceInfo.json',   
        fitColumns: true,   
        striped: true,   
        editable:true,   
        pagination : true,//是否分页   
        rownumbers:true,//序号   
        collapsible:false,//是否可折叠的   
        fit: true,//自动大小   
        pageSize: 10,//每页显示的记录条数，默认为10   
        pageList: [10],//可以设置每页记录条数的列表   
        method:'post',   
        columns:[[   
            {field:'deviceName',title:'设备名称',width:150},   
            {field:'deviceCode',title:'设备编码',width:150}
        ]]   
    });
	
	//值类型选择下拉框
	$("#val_type_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=baseinfo.opc.val.type',
		valueField: 'id',
		textField: 'text',
	    method:'GET'
	});
	
	//读写选择下拉框
	$("#opera_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=baseinfo.opc.read.type',
		valueField:'id',    
	    textField:'text',
	    method:'GET',
	});
	
	$(".tr_hidder").hide();
	//读写选择下拉框
	$("#isAlarm_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=baseinfo.dic.yesno',
		valueField:'id',    
	    textField:'text',
	    method:'GET',
		 onSelect: function (r) {
		    if(r.id == "1"){
		    	$(".tr_hidder").slideDown();
		    }else{
		    	$(".tr_hidder").slideUp();
		    }
	     }
	});

});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseOPCRequestUrl+'/findAllFunc.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseOPCRequestUrl+'/saveDeviceFunc.json'
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
					
					if(row.formateIsAlarm == "1"){
				    	$(".tr_hidder").slideDown();
				    }else{
				    	$(".tr_hidder").slideUp();
				    }
					
					formsubmitUrl = baseOPCRequestUrl+'/updateDeviceFunc.json'
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
								url : baseOPCRequestUrl+'/deleteDeviceFunc.json?ids='+ids,
								success : function(data) {
									var obj = eval('('+ data+ ')');
									console.log(JSON.stringify(obj));
									$.fn.messageInfoTip(data);
									if (obj.status == 1) {
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
			text : '刷新OPC_SERVICE缓存',
			iconCls : 'icon-reload',
			handler : function() {
				$.ajax({
					type : "POST",
					dataType : 'html',
					beforeSend: $.fn.ajaxLoading("刷新缓存中请稍后....."),
					url : baseOPCRequestUrl+'/refreshOPCService.json',
					success : function(data) {
						var obj = eval('('+ data+ ')');
						console.log(JSON.stringify(obj));
						$.fn.ajaxLoaded();
						$.fn.messageInfoTip(data);
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
			field : 'deviceInfo',
			title : '所属设备',
			width : 280,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.deviceName){
						return value.deviceName 
					}else{
						return value
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'funcName',
			title : '功能名称',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'funcCode',
			title : '功能代码 ',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'id',
			title : 'ID',
			width : 180,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'funcValueType',
			title : '功能值类型 ',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'formatFuncReadWrite',
			title : '支持读写 ',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'formateIsAlarm',
			title : '是否需要告警',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'fault',
			title : '异常值 ',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'maxThreshold',
			title : '最大阀值 ',
			width : 280,
			align : 'center',
			sortable : true
		}, {
			field : 'minThreshold',
			title : '最小阀值 ',
			width : 280,
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
			title : '修改时间 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'funcRemark',
			title : '备注 ',
			width : 280,
			align : 'center',
			sortable : true
		}] ]
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
		width : 690,
		height : 500,
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
