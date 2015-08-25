/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var staffRequestUrl = '/basicinfo/tenantinfo';
var orgRequestUrl = '/basicinfo/propertyorg';
var customOrgRequestUrl = '/basicinfo/propertycustorg';
var positionRequestUrl = '/basicinfo/position';
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
	
	//自定义组织下拉树
	$('#cOrgId').combotree({
		url: customOrgRequestUrl+'/getCustomOrgTree.json'
	}); 
	
	//职位
	$("#positionId").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: positionRequestUrl+'/findAll4Combox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET'
	});
	
	
	//部门
	var deptCombox = $("#deptId").combobox({
		multiple:false,
		editable:false,
		valueField:'ida',    
	    textField:'texta',
		panelHeight:'100px',
	    method:'GET'
	});
	
	//仿百度关键词搜索提示
	$("#compName").autocomplete(staffRequestUrl+'/findTenantComsBytComName.json',{
		dataType:'json',
		max:5,
		minChars:0, //自动完成激活之前填入的最小字符 
		width:400, //提示的宽度，溢出隐藏
		scorllHeight:300, //提示的高度，溢出显示滚动条 
		matchContains:true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill:false, //自动填充
		extraParams:{
			tComName: function(){
				return $("#compName").val();
			}
		},
		formatItem: function(item){
			return "所属公司名称:"+item.tComName;
		},
		formatResult: function(row){
			return row.tComName; //最终得到的结果
		}
	}).result(function(event,item,formatted){
		$("#compId").val(item.id);
		$("#compName").val(item.tComName);
	});
	$("#upload_file_div").hide();
	
	//处理响应账号检测按钮操作
	$("#test").click(function(){
		var account=$("#account").val();
		$.ajax({
			type:"POST",
			dataType:"html",
			url:staffRequestUrl+"/testAccountIsExist.json?account="+account,
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
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : staffRequestUrl+'/findTeStaffsPage.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = staffRequestUrl+'/saveTeStaffInfo.json'
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
					//职位
//					$("#positionId").combobox("select",row.positionInfo.id);
					//公司
					if(row.compId){
						$("#compId").combobox("select",row.compId);
						$("#compId").trigger("onselect");
					}
					//部门
//					if(row.dept){
//						$("#deptId").combobox("select",row.dept.id);
//					}
					//自定义组织结构
//					 console.log(JSON.stringify(row.customOrg));

					 //生日
					 $('#birthday').datebox('setValue', row.birthday);
					 
					//加载数据
					$(dataFormDiv).form('load',row);
					if(row.customOrg && row.customOrg.id){
						$('#cOrgId').combotree("setValue",row.customOrg.id);
					}else{
						$('#cOrgId').combotree("setValue",null);
					}
					formsubmitUrl = staffRequestUrl+'/updateTeStaffInfo.json'
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
						ids.push(rows[i].staffNo);
					}
					$.messager.confirm('确认','您确认想要删除记录吗？',function(r) {
						if (r) {
							$.ajax({
								type : "POST",
								dataType : 'html',
								url : staffRequestUrl+'/deleteTeStaffInfo.json?ids='+ids,
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
				formsubmitUrl = staffRequestUrl+'/uploadStaffInfo.json';
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
		}],
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
			field : 'staffNo',
			title : '员工编号',
			width : 65,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'compId',
			title : '所属公司编号',
			width : 180,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'name',
			title : '名称',
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
			title : '邮箱',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'gender',
			title : '性别',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'birthday',
			title : '生日',
			width : 180,
			align : 'center',
			sortable : true
		}, {
			field : 'dept',
			title : '所属部门 ',
			width : 180,
			align : 'center',
			hidden : true,
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.deptName){
						return value.deptName;
					}else{
						return value;
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'positionInfo',
			title : '职位 ',
			width : 180,
			align : 'center',
			hidden : true,
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.positionName){
						return value.positionName 
					}else{
						return value
					}
				}else{
					return '';
				}
				
			}
		}, {
			field : 'tenantCom',
			title : '所属公司',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.tComName){
						return value.tComName; 
					}else{
						return value;
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
