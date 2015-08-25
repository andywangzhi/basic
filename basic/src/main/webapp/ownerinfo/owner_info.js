/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var ownerRequestUrl = '/basicinfo/owner';
var orgRequestUrl = '/basicinfo/propertyorg';
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
	$("#show_message").hide();
	
	//初始化下拉框
	$("#com_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: orgRequestUrl+'/listComps4ComBox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
	
	
	//初始化下拉框
	$("#q_com_combox").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: orgRequestUrl+'/listComps4ComBox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
	
	//处理响应账号检测按钮操作
	$("#test").click(function(){
		var account=$("#account").val();
		$.ajax({
			type:"POST",
			dataType:"html",
			url:ownerRequestUrl+"/testAccountIsExist.json?account="+account,
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
	
	//公司下拉
	$("#companyId").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: orgRequestUrl+'/listComps4ComBox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'

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
	$("#upload_file_div").hide();
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : ownerRequestUrl+'/findAllOwnerInfo.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = ownerRequestUrl+'/saveOwnerInfo';
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
					$("#com_combox").combobox("select",row.propertyCom.id);
					console.log(JSON.stringify(row.propertyCom));
					//生日
					$('#birthday').datebox('setValue', row.birthday);
					formsubmitUrl = ownerRequestUrl+'/updateOwnerInfo.json';
					//查询物业登记信息
//					$.ajax({
//						type:'POST',
//						dataType:"html",
//						url:ownerRequestUrl+"/findOwnerDistrictInfoByOwnerId?ownerId="+row.id,
//						success: function(data){
//							var obj=eval("("+data+")");
//							for(var index in obj){
//								var node = $('#tt').tree('find', obj[index].districCode);
//								$('#tt').tree('check', node.target);
//							}
//						}
//					});
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
								url : ownerRequestUrl+'/deleteOwnerInfo.json?ids='+ids,
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
		}},'_',{
			text : '查看物业登记',
			iconCls : 'icon-more',
			handler: function(){
				var row = $(datagridJQueryFind).datagrid("getSelected");
				if (row) {
					//加载物业登记情况
					$("#districtinfo_dataGrid").datagrid({
						loadMsg:"数据加载中，请稍后……",
						url :ownerRequestUrl+"/findOwnerDistrictInfoByOwnerId?ownerId="+row.id,
						width : '100%',
						height:'60%',
						pagination : true,
						pageSize : 10,
						singleSelect : false,
						striped : true,
						sortOrder : 'asc',
						rownumbers : true,
						columns : [ [ {
							field : 'id',
				  			title : 'ID',
				  			width : 65,
				  			align : 'center',
				  			hidden : true,
				  			sortable : true,
						}, {
							field:'districCode',
				        	title:'区域编码',
				        	width : 180,
				  			align : 'center',
				  			sortable : true,
						}, {
							field:'districtName',
				        	title:'区域名称',
				        	width : 180,
				  			align : 'center',
				  			sortable : true,
						},{
							field : 'createTime',
							title : '创建时间 ',
							width : 180,
							align : 'center',
							sortable : true
						}] ]
					});
					var $districtInfoDiv = $('#districtInfoDIV');
					$districtInfoDiv.show();
					$districtInfoDiv.dialog({
						title : '业主['+row.name+']的物业登记',
						width : 600,
						height : 400,
						closed : false,
						cache : false,
						modal : true,
						buttons : [ {
							text : '关闭',
							iconCls : 'icon-remove',
							handler : function() {
								$districtInfoDiv.dialog('close');
							}
						} ]
					});
				}else{
					$.messager.alert("操作提示", "请至少选择一行", "info");
				}
			}
		} ,'-',{
			text:'批量导入',
			iconCls:'icon-redo',
			handler: function(){
				formsubmitUrl = ownerRequestUrl+'/uploadFile.json';
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
			field : 'name',
			title : '业主姓名 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'account',
			title : '大树社区平台账号',
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
			field : 'email',
			title : '邮箱地址 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'birthday',
			title : '出生日期 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'idCarNum',
			title : '身份证 ',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'ownerAddr',
			title : '家庭住址',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'ownerWorkAddr',
			title : '单位地址',
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
			field : 'propertyCom',
			title : '所属物业公司',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
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
			var checkeds = $('#tt').tree('getChecked');
			var districtCodes='';
			for (var i = 0; i < checkeds.length; i++) {
				districtCodes = checkeds[i].id + ','+districtCodes;
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
//				$('#dlgDIV').dialog('close');
			}
		}
	});
}
function setDialog(dialogDiv, hrefHtml, title) {
	$("#show_message").empty();
	var checkeds = $('#tt').tree('getChecked');
	for (var i = 0; i < checkeds.length; i++) {
		var node = $('#tt').tree('find', checkeds[i].id);
		$('#tt').tree('uncheck', node.target);
	}
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
