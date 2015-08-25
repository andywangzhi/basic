/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var staffRequestUrl = '/basicinfo/staff';
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
	
	//公司下拉
	$("#compId").combobox({
		multiple:false,
		editable:false,
		panelHeight:'100px',
		url: orgRequestUrl+'/listComps4ComBox.json',
		valueField:'id',    
	    textField:'text',
	    method:'GET',
	    onSelect: function (r) {
	    	var url = orgRequestUrl+'/listDeptsByComId4ComBox.json?compId='+ r.id;
	    	deptCombox.combobox('reload', url);
        }

	});
	
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
	$("#upload_file_div").hide();
});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : staffRequestUrl+'/findAllStaff.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = staffRequestUrl+'/saveStaffInfo.json'
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
					
					//公司
					if(row.compId){
						$("#compId").combobox("select",row.compId);
						$("#compId").trigger("onselect");
					}
					//部门
					if(row.dept){
						$("#deptId").combobox("select",row.dept.id);
					}
					//职位
					if (row.positionInfo) {
						$("#positionId").combobox("select",row.positionInfo.id);
					}
					//自定义组织结构
					console.log(JSON.stringify(row.customOrg));
					 

					 //生日
					 $('#birthday').datebox('setValue', row.birthday);
					 
					//加载数据
					$(dataFormDiv).form('load',row);
					if(row.customOrg && row.customOrg.id){
						$('#cOrgId').combotree("setValue",row.customOrg.id);
					}else{
						$('#cOrgId').combotree("setValue","");
					}
					formsubmitUrl = staffRequestUrl+'/updateStaffInfo.json'
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
						ids.push(rows[i].empNo);
					}
					$.messager.confirm('确认','您确认想要删除记录吗？',function(r) {
						if (r) {
							$.ajax({
								type : "POST",
								dataType : 'html',
								url : staffRequestUrl+'/deleteStaffInfo.json?ids='+ids,
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
			text:'批量导入',
			iconCls:'icon-redo',
			handler: function(){
				formsubmitUrl = staffRequestUrl+'/uploadFile.json';
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
		}  ],
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
			field : 'empNo',
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
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.deptName){
						return value.deptName 
					}else{
						return value
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
			field : 'customOrg',
			title : '所属自定义组织类别',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.cOrgName){
						return value.cOrgName 
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
				var cOrgId=$("#cOrgId").combotree("getValue");
				if(cOrgId.substring(0,4)=="root"){
					alert("所属自定义组织不能选根节点");
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
