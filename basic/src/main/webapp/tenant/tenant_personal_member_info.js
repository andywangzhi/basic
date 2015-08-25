//定义变量
var dataGrid="#dataGrid";
var baseDIV="#baseDIV";
var baseForm="#baseForm";
var baseRequestURL='/basicinfo/tenantMember';
var tenantRequestURL='/basicinfo/tenantinfo';
var searchForm="#searchForm";
var formsubmitUrl;

$(function(){
	initDataGrid();
	$("#search").click(function(){
		var param= $.fn.getFormParams(searchForm);
		$(dataGrid).datagrid("options").queryParams=param;
		$(dataGrid).datagrid('reload');
	});
	$("#reSet").click(function(){
		$(searchForm).form("clear");
	});
	$(baseDIV).hide();
	
	//手机号码格式验证
	$("#phoneNum").validatebox({
        tipOptions: {	
          showEvent: 'mouseenter',
          hideEvent: 'mouseleave',
          showDelay: 0,
          hideDelay: 0,
          zIndex: '',
          onShow: function(){
            if (!$(this).hasClass('validatebox-invalid')){
              if ($(this).tooltip('options').prompt){
                $(this).tooltip('update', $(this).tooltip('options').prompt);
              } else {
                $(this).tooltip('tip').hide();
              }
            } else {
              $(this).tooltip('tip').css({
                color: '#000',
                borderColor: '#CC9933',
                backgroundColor: '#FFFFCC'
              });
            }
          },
          onHide: function(){
            if (!$(this).tooltip('options').prompt){
              $(this).tooltip('destroy');
            }
          }
        }
      }).tooltip({
        position: 'right',
        content: function(){
          var opts = $(this).validatebox('options');
          return opts.prompt;
        },
        onShow: function(){
          $(this).tooltip('tip').css({
            color: '#000',
            borderColor: '#CC9933',
            backgroundColor: '#FFFFCC'
          });
        }
      });
	
	//仿百度关键词搜索提示
	$("#tenantName").autocomplete(tenantRequestURL+'/findTenantsBytenantName.json',{
		dataType:'json',
		max:5,
		minChars:0, //自动完成激活之前填入的最小字符 
		width:400, //提示的宽度，溢出隐藏
		scorllHeight:300, //提示的高度，溢出显示滚动条 
		matchContains:true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill:false, //自动填充
		extraParams:{
			tenantName: function(){
				return $("#tenantName").val();
			}
		},
		formatItem: function(item){
			return "租户姓名:"+item.tenantName;
		},
		formatResult: function(row){
			return row.tenantName; //最终得到的结果
		}
	}).result(function(event,item,formatted){
		$("#tenantName").val(item.tenantName);
		$("#tenantId").val(item.id);
	});
	
	//仿百度关键词搜索提示
	$("#q_tenantName").autocomplete(tenantRequestURL+'/findTenantsBytenantName.json',{
		dataType:'json',
		max:5,
		minChars:0, //自动完成激活之前填入的最小字符 
		width:400, //提示的宽度，溢出隐藏
		scorllHeight:300, //提示的高度，溢出显示滚动条 
		matchContains:true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill:false, //自动填充
		extraParams:{
			tenantName: function(){
				return $("#q_tenantName").val();
			}
		},
		formatItem: function(item){
			return "租户姓名:"+item.tenantName;
		},
		formatResult: function(row){
			return row.tenantName; //最终得到的结果
		}
	}).result(function(event,item,formatted){
		$("#q_tenantName").val(item.tenantName);
		$("#q_tenantId").val(item.id);
	});
	
	//处理响应账号检测按钮操作
	$("#test").click(function(){
		var account=$("#account").val();
		$.ajax({
			type:"POST",
			dataType:"html",
			url: tenantRequestURL+"/testAccountIsExist.json?account="+account,
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

function initDataGrid(){
	$(dataGrid).datagrid({
		loadMsg:"数据加载中,请稍后......",
		url:baseRequestURL+"/findAllTenantMember.json",
		toolbar:[
		         {
		        	 text:"添加",
		        	 iconCls:"icon-add",
		        	 handler: function(){
		        		 formsubmitUrl=baseRequestURL+'/addTenantMember.json';
		        		 setDialog(baseDIV,"新增");
		        		 $(baseForm).form("clear");
		        		 $(baseDIV).show();
		        	 }
		         },{
		        	 text:"修改",
		        	 iconCls:"icon-edit",
		        	 handler: function(){
		        		 var row=$(dataGrid).datagrid("getSelected");
		        		 if(row){
		        			 setDialog(baseDIV, "修改");
		        			 $(baseDIV).show();
		        			 $(baseForm).form("clear");
		        			 $(baseForm).form("load",row);
		        			 $("#tenantName").val(row.mstbPropertyTenant.tenantName);
		        			 $("#tenantId").val(row.mstbPropertyTenant.id);
		        			 formsubmitUrl=baseRequestURL+'/updateTenantMember.json?id='+row.id;
		        		 }else{
		        			 $.messager.alert("操作提示", "请选择一行", "info");
		        		 }
		        	 }
		         },{
		        	text:"删除",
		        	iconCls:"icon-cancel",
		        	handler: function(){
		        		var rows=$(dataGrid).datagrid("getSelections");
		        		if(rows.length>0){
		        			var ids=[];
		        			for(var i=0;i<rows.length;i++){
		        				ids.push(rows[i].id);
		        			}
		        			$.messager.confirm("确认","您确认想要删除该记录吗?",function(r){
		        				if(r){
		        					$.ajax({
		        						type:"POST",
		        						dataType:"html",
		        						url:baseRequestURL+'/deleteTenantMemberByIds.json?ids='+ids,
		        						success:function(data){
		        							var obj=eval("("+data+")");
		        							var status=obj.status;
		        							if(status==1){
		        								$.fn.messageInfoTip(data);
		        								$(dataGrid).datagrid("reload");
		        							}else{
		        								$.fn.messageInfoTip(data);
		        							}
		        						},
		        						error:function(textStatus){
		        							alert(JSON.stringify(textStatus));
		        						}
		        					});
		        				}
		        			});
		        		}else{
		        			$.messager.alert("操作提示", "请至少选择一行", "info");
		        		}
		        	}
		         }
		],
		width:'80%',
		pagination:true,
		pageSize:10,
		singleSelect:false,
		striped:true,
		sortOrder:'asc',
		rownumbers:true,
		onLoadSuccess:function(){
			$(dataGrid).datagrid('clearSelections');
		},
		onLoadError : function() {
		},
		columns:[[
		          {
		        	  field:'checkbox',
		        	  checkbox:true,
		          },{
		        	  field:'id',
		        	  title:'ID',
		        	  width:65,
		        	  align:'center',
		        	  hidden:true,
		        	  sortable:true,
		          },{
		        	  field:'tenantMemberName',
		        	  title:'成员姓名',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		          },{
		        	  field:'phoneNum',
		        	  title:'联系方式',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		          },{
		        	  field:'account',
		        	  title:'大澍系统账户',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		          },{
		        	  field:'mstbPropertyTenant',
		        	  title:'所属租户',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		        	  formatter: function(value,row,index){
		        		  if(value){
		        			  if(value.tenantName){
		        				  return value.tenantName;
		        			  }else{
		        				  return value;
		        			  }
		        		  }else{
		        			  return "";
		        		  }
		        	  }
		          },{
		        	  field:'createTime',
		        	  title:'创建时间',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		          },{
		        	  field:'updateTime',
		        	  title:'修改时间',
		        	  width:180,
		        	  align:'center',
		        	  sortable:true,
		          }
		        ]]
	});
}

function setDialog(dialogDIV,title){
	$("#show_message").empty();
	$(dialogDIV).show();
	$(dialogDIV).dialog({
		title:title,
		width:600,
		height:400,
		closed:false,
		cache:false,
		modal:true,
		buttons:[
		         {
		        	 text:'保存',
		        	 iconCls:"icon-ok",
		        	 handler:function(){
		        		 submitForm();
		        	 }
		         },{
		        	 text:'重置',
		        	 iconCls:'icon-clear',
		        	 handler:function(){
		        		 $(baseForm).form("clear");
		        	 }
		         },{
		        	 text:'关闭',
		        	 iconCls:'icon-remove',
		        	 handler:function(){
		        		 $(dialogDIV).dialog("close");
		        	 }
		         }
		        ]
	});
}

function submitForm(){
	$(baseForm).form('submit',{
		url:formsubmitUrl,
		ajax:true,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(data){
			var obj=eval("("+data+")");
			var status=obj.status;
			if(status==1){
				$.fn.messageInfoTip(data);
				$(baseDIV).dialog('close');
				$(dataGrid).datagrid('reload');
			}else{
				$.fn.messageInfoTip(data);
			}
		}
	});
}