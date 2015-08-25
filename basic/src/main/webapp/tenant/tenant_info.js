/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var tenantRequestUrl = '/basicinfo/tenantinfo';
var systemConfigUrl = '/basicinfo/system/config';
var community_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
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
	$(".tr_c").hide();
	$(".tr_p").hide();
	$("#upload_file_div").hide();
	$("#tenantType").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=basicinfo.tenant.type',
		valueField: 'id',
		textField: 'text',
	    method:'GET',
		 onSelect: function (r) {
		    if(r.id == "1"){
		    	$(".tr_p").slideDown();
		    	$(".tr_c").slideUp();
		    }else if(r.id == "0"){
		    	$(".tr_c").slideDown();
		    	$(".tr_p").slideUp();
		    }else{
		    	$(".tr_c").slideUp();
		    	$(".tr_p").slideUp();
		    }
	     }
	});
	
	$("#q_tenantType").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: systemConfigUrl+'/listConfig4Combox.json?nameSpace=basicinfo.tenant.type',
		valueField: 'id',
		textField: 'text',
	    method:'GET'
	});
	
	$("#compName").autocomplete(tenantRequestUrl+"/findtComByName.json",{
		dataType : "json",
		max:5,
		minChars: 0, //自动完成激活之前填入的最小字符 
		width: 400, //提示的宽度，溢出隐藏 
		scrollHeight: 300, //提示的高度，溢出显示滚动条 
		matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示 
		autoFill: false, //自动填充 
		extraParams: {    
            name: function(){return $("#compName").val();}
        },
		formatItem : function(item) {
			console.log(JSON.stringify(item));
			return "公司："+item.tComName+"[id:"+item.id+"]";
		},formatResult: function(row) {      
            return row.tComName;     //最终得到的结果
        }
	}).result(function(event, item,formatted) {
		console.log("set select value:"+item.id);
		$("#compName").val(item.tComName);
		$("#tenantId").val(item.id);
	});
	
	//处理响应账号检测按钮操作
	$("#test").click(function(){
		var account=$("#account").val();
		$.ajax({
			type:"POST",
			dataType:"html",
			url: tenantRequestUrl+"/testAccountIsExist.json?account="+account,
			success:function(data){
				var obj=eval("("+data+")");
				var status=obj.status;
				$("#show_message").show();
				$("#show_message").empty();
				if(status==1){
					$("#show_message").append(obj.message);
				}else{
					$("#show_message").append(obj.message);
				}
			},
			error: function(textStatus){
				if(console){
					console.error("ajax出现异常："+textStatus);
				}
				alert(textStatus);
			}
		});
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
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : tenantRequestUrl+'/findAllTenants.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = tenantRequestUrl+'/saveTenantInfo'
				setDialog("#dlgDIV", '','新增');
				clearFrom(dataFormDiv);
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
					
					
					if(row.tenantType == "1"){
				    	$(".tr_p").slideDown();
				    	$(".tr_c").slideUp();
				    }else if(row.tenantType == "0"){
				    	//设置公司的编号
						$("#tenantId").val(row.id);
						$("#compName").val(row.tenantName);
						
				    	$(".tr_c").slideDown();
				    	$(".tr_p").slideUp();
				    }else{
				    	$(".tr_c").slideUp();
				    	$(".tr_p").slideUp();
				    }
					
					//设置日期和勾选区域控件
					
					
					formsubmitUrl = tenantRequestUrl+'/updateTenantInfo.json'
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
					var ids = [], types=[];
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].id);
						types.push(rows[i].tenantType);
					}
					$.messager.confirm('确认','您确认想要删除记录吗？',function(r) {
						if (r) {
							$.ajax({
								type : "POST",
								dataType : 'html',
								url : tenantRequestUrl+'/deleteTenantInfo.json?ids='+ids+'&types='+types,
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
		}},{
			text : '查看租赁情况',
			iconCls : 'icon-more',
			handler : function() {
				var row = $(datagridJQueryFind).datagrid("getSelected");
				if (row) {
					//加载租赁情况
					$('#tenatinfo_dataGrid').datagrid({
						loadMsg:"数据加载中，请稍后……",
						url : tenantRequestUrl+'/findDistrictsByTenantId.json?tenantId='+row.id 
						+ '&tenantType='+row.tenantType,
						width:'100%',               
						height:'60%',
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
							field : 'districtCode',
							title : '所租位置代码 ',
							width : 180,
							align : 'center',
							sortable : true
						}, {
							field : 'districtName',
							title : '所租位置',
							width : 180,
							align : 'center',
							sortable : true
						}, {
							field : 'rentTime',
							title : '租用时间',
							width : 180,
							align : 'center',
							sortable : true
						}, {
							field : 'expireTime',
							title : '到期时间 ',
							width : 180,
							align : 'center',
							sortable : true
						}] ]
					});
					var $tenantInfoDiv = $('#tenatInfoDIV');
					$tenantInfoDiv.show();
					$tenantInfoDiv.dialog({
						title : '租户'+row.tenantName+'的租赁情况',
						width : 600,
						height : 400,
						closed : false,
						cache : false,
						modal : true,
						buttons : [ {
							text : '关闭',
							iconCls : 'icon-remove',
							handler : function() {
								$tenantInfoDiv.dialog('close');
							}
						} ]
					});
				} else {
					$.messager.alert("操作提示", "请选择一行", "info");
				}
			}},'-',{
				text:'批量导入',
				iconCls:'icon-redo',
				handler: function(){
					formsubmitUrl = tenantRequestUrl+'/uploadTenant.json';
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
			hidden : true,
			sortable : true
		}, {
			field : 'tenantName',
			title : '租户姓名 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'phoneNum',
			title : '联系电话 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'formatTenantType',
			title : '租户类型',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'createTime',
			title : '创建时间 ',
			width : 180,
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
			var nodes = $('#tt').tree('getChecked');
			var districtCodes='';
			for (var i = 0; i < nodes.length; i++) {
				if (districtCodes != '') districtCodes += ',';
				districtCodes += nodes[i].id;
			}
			console.log("选择的物业位置编码为："+districtCodes);
			$("#districtCodes").val(districtCodes);
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
	$("#show_message").empty();
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
