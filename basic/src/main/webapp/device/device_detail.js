/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var baseDeviceInfoRequestUrl = '/basicinfo/deviceinfo';
var baseCusTypeRequestUrl = '/basicinfo/devicecustype';
var systemConfigUrl = '/basicinfo/system/config';
var formsubmitUrl;
var community_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
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
	
	//初始化设备选择表
	$("#deviceCode_comboGrid").combogrid({
        panelWidth:300,   
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
        panelWidth:200,   
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
	
	$("#owner").autocomplete("/basicinfo/owner/findListByName.json",{
		dataType : "json",
		max:5,
		minChars: 0, //自动完成激活之前填入的最小字符 
		width: 400, //提示的宽度，溢出隐藏 
		scrollHeight: 300, //提示的高度，溢出显示滚动条 
		matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示 
		autoFill: false, //自动填充 
		extraParams: {    
            name: function(){return $("#owner").val();}
        },
		formatItem : function(item) {
			console.log(JSON.stringify(item));
			return "姓名："+item.name+"[id:"+item.id+"]";
		},formatResult: function(row) {      
            return row.name;     //最终得到的结果
        }
	}).result(function(event, item,formatted) {
		console.log("set select value:"+item.id);
		$("#owner").val(item.name);
		$("#ownerId").val(item.id);
	});
	
	$("#q_owner").autocomplete("/basicinfo/owner/findListByName.json",{
		dataType : "json",
		max:5,
		minChars: 0, //自动完成激活之前填入的最小字符 
		width: 400, //提示的宽度，溢出隐藏 
		scrollHeight: 300, //提示的高度，溢出显示滚动条 
		matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示 
		autoFill: false, //自动填充 
		extraParams: {    
            name: function(){return $("#q_owner").val();}
        },
		formatItem : function(item) {
			console.log(JSON.stringify(item));
			return "姓名："+item.name+"[id:"+item.id+"]";
		},formatResult: function(row) {      
            return row.name;     //最终得到的结果
        }
	}).result(function(event, item,formatted) {
		console.log("set select value:"+item.id);
		$("#q_owner").val(item.name);
		$("#q_ownerId").val(item.id);
	});
	
	//初始化厂家下拉框
	$("#q_vender").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=basicinfo.device.vender',
		valueField: 'id',
		textField: 'text',
	    method:'GET'
	 
	});
	
	$(".tr_xr").hide();
	$(".tr_osm").hide();
	//初始化厂家下拉框
	$("#vender").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=basicinfo.device.vender',
		valueField: 'id',
		textField: 'text',
	    method:'GET',
	    onSelect:function(r){
	    	 if(r.id == "XR"){
			    	$(".tr_xr").slideDown();
			    	$(".tr_osm").slideUp();
			    }else{
			    	$(".tr_osm").slideDown();
			    	$(".tr_xr").slideUp();
			    }
	    }
	});
	
	
	//OSM IP
	/*$("#osmServiceName").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=OSM.SERVER',
		valueField: 'id',
		textField: 'text',
	    method:'GET',
	    onSelect:function(r){
	    	 if(r.id == "XR"){
			    	$(".tr_xr").slideDown();
			    	$(".tr_osm").slideUp();
			    }else{
			    	$(".tr_osm").slideDown();
			    	$(".tr_xr").slideUp();
			    }
	    }
	});*/
	$("#osmServiceName").autocomplete(systemConfigUrl+"/findListByName?nameSpace=OSM.SERVER",{
		dataType : "json",
		max:5,
		minChars: 0, //自动完成激活之前填入的最小字符 
		width: 400, //提示的宽度，溢出隐藏 
		scrollHeight: 300, //提示的高度，溢出显示滚动条 
		matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示 
		autoFill: false, //自动填充
		extraParams:{
			configName: function(){
				return $("#osmServiceName").val();
			}
		},
		formatItem : function(item) {
			console.log(JSON.stringify(item));
			return "网关服务器:"+item.configName+" [IP:"+item.configValue+"]";
		},
		formatResult: function(row) {
            return row.configName;     //最终得到的结果
        }
	}).result(function(event, item,formatted) {
//		console.log("set select value:"+item.id);
		$("#osmServiceName").val(item.configName);
		$("#osmServerIp").val(item.configValue);
	});
	
    opcTree = $('#opcpathTree').tree({  
	    url: null,
	    method:'GET'
	}); 
	
	//值类型选择下拉框
	$("#xrIp_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=XR.SERVER',
		valueField: 'id',
		textField: 'text',
	    method:'GET',
		onSelect:function(r){
			if(r.id){
				var url = baseDeviceInfoRequestUrl+'/getOpcTree.json?serverIp='+r.id;
				$.ajax({
					url : url,
					type : "POST",
					dataType : 'JSON',
					xhrFields : {
						withCredentials : true
					},
					crossDomain : true,
					success : function(data) {
						//console.log(JSON.stringify(data));
						$("#opcTreeDiv").slideDown();
						opcTree.tree('loadData', data);
						
					},
					failure : function(data) {
						alert("查询失败!");
					}
				});
			}else{
				$("#opcTreeDiv").slideUp();
			}
			
			
		}
	});
	
	//初始化楼盘名下拉框
	$("#community_id").combobox({
		multiple : false,
		panelHeight : '100px',
		url : community_url,
		valueField : 'path_code',
		textField : 'name',
		method : 'GET',
	});
	
	$('#qrCodedlg').dialog('close')
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : baseDeviceInfoRequestUrl+'/findAllDeviceInfoDetail.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = baseDeviceInfoRequestUrl+'/saveDeviceInfoDetail.json'
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
					
					//设置区域位置信息
					
					//设置厂家信息
					$("#vender").combobox("select",row.vender);
					//$("#vender").onselect();
					
					 console.log("osm:"+JSON.stringify(row.osmMapping));
					 console.log("opc:"+JSON.stringify(row.opcMapping));
					 
					//设置映射的值
					if(row.vender == "XR"){
				    	$(".tr_xr").slideDown();
				    	$(".tr_osm").slideUp();
				    }else{
				    	 $(".tr_osm").slideDown();
				    	 $(".tr_xr").slideUp();
				    	 
					   	 $("#osmServiceName").val(row.osmMapping.osmServerIp);
						 $("#floorNum").val(row.osmMapping.floorNum);
						 $("#roomNum").val(row.osmMapping.roomNum);
						 $("#logicIndex").val(row.osmMapping.logicIndex);
				    }
					 
					formsubmitUrl = baseDeviceInfoRequestUrl+'/updateDeviceInfoDetail.json'
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
								url : baseDeviceInfoRequestUrl+'/deleteDeviceInfoDetail.json?ids='+ids,
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
		}},'-',{
			text : '刷新OPC_SERVICE缓存',
			iconCls : 'icon-reload',
			handler : function() {
				$.ajax({
					type : "POST",
					dataType : 'html',
					url : baseDeviceInfoRequestUrl+'/refreshDeviceInfo.json',
					beforeSend: $.fn.ajaxLoading("刷新opc缓存中请稍后....."),
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
			}},'-',{
				text : '生成二维码',
				iconCls : 'icon-print',
				handler : function() {
					var row = $(datagridJQueryFind).datagrid("getSelected");
					if (row) {
						 var id = row.id+":"+row.deviceName+":"+row.deviceInfo.deviceName;
						 //
						 $('#qrCodedlg').dialog({title: "设备"+row.deviceName+"二维码"});
						 $('#qrCodedlg').dialog('open').dialog('clear');
						 
						 var img = '<img src="'+baseDeviceInfoRequestUrl+'/generaCode.json?id='+id+'"/>';
						 $('#qrCodedlg').append(img);
					} else {
						$.messager.alert("操作提示", "请选择一行", "info");
					}
				}
			},'-',{
				text:'批量导入',
				iconCls:'icon-redo',
				handler: function(){
					formsubmitUrl = baseDeviceInfoRequestUrl+'/uploadFile.json';
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
//								$(this).css({"background": "grey"});
//								$(this).css({"display": "none"});
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
//											$(this).css({"display": "block"});
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
			hidden : false,
			sortable : true
		}, {
			field : 'deviceId',
			title : '设备编号',
			width : 280,
			align : 'center',
			hidden : false,
			sortable : true
		}, {
			field : 'deviceName',
			title : '设备名称 ',
			width : 240,
			align : 'center',
			sortable : true
		}, {
			field : 'deviceInfo',
			title : '所属设备名称 ',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.deviceName){
						return value.deviceName;
					}else{
						return value;
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'deviceCode',
			title : '所属设备代码 ',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'districtCode',
			title : '区域代码 ',
			width : 280,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'districtName',
			title : '位置详情 ',
			width : 480,
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
			var selected = $('#tt').tree('getSelected');
			var opcNode = $('#opcpathTree').tree('getSelected');
			//获取根节点的ip地址
			var rootNode = $('#opcpathTree').tree("getRoot");
			
			$("#districtCode").val(selected.id);
			
			if(rootNode){
				$("#opcPath").val(opcNode.id);
			}
			
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
		width : 700,
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
