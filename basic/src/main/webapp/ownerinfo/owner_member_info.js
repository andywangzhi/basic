/************************************************************/
/***************************定义变量*************************/
/** ********************************************************* */
// jQueryEasyUI对象变量
var jQueryEasyUI;
var datagridJQueryFind = "#dataGrid";
var dataFormDiv = "#dataForm";
var ownerRequestUrl = '/basicinfo/owner';
var orgRequestUrl = '/basicinfo/propertyorg';
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
	
	
	$("#owner").autocomplete(ownerRequestUrl+"/findListByName.json",{
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
	
	$("#q_owner").autocomplete(ownerRequestUrl+"/findListByName.json",{
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

});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		loadMsg:"数据加载中，请稍后……",
		url : ownerRequestUrl+'/findAllOwnerMemberInfo.json',
		toolbar : [{
			text : '添加',
			iconCls : 'icon-add',
			handler : function() {
				formsubmitUrl = ownerRequestUrl+'/saveOwnerMemberInfo.json'
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
					$("#owner").val(row.owner.name)
					console.log(JSON.stringify(row.owner));
					formsubmitUrl = ownerRequestUrl+'/updateOwnerMemberInfo.json'
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
								url : ownerRequestUrl+'/deleteOwnerMemberInfo.json?ids='+ids,
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
			field : 'name',
			title : '姓名 ',
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
			field : 'idCarNum',
			title : '身份证 ',
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
			field : 'owner',
			title : '所属业主名称',
			width : 180,
			align : 'center',
			sortable : true,
			//用于输出子属性
			formatter: function(value,row,index){
				if(value){
					if(value.name){
						return value.name 
					}else{
						return value
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
