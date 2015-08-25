// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	initDataGrid();
	$("#search")
			.click(
					function() {
						var page = $("#page").textbox("getValue");
						if (page == "") {
							alert('页码必须填写！');
							return;
						}
						var rows = $("#rows").textbox("getValue");
						if (rows == "") {
							alert('每页显示条数必须填写！');
							return;
						}
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedTypeByPage.json?type=tree",
									data : param,
									type : "POST",
									dataType : 'JSON',
									xhrFields : {
										withCredentials : true
									},
									crossDomain : true,
									success : function(data) {
										// var obj = eval('(' + data + ')');
										var obj = data;
										var status = obj.status;
										if (status == 1) {
											// alert(JSON.stringify(data));
											// 设置数据
											var result = obj.result;
											$(datagridJQueryFind).datagrid(
													'loadData', result);
										} else {
											var msg = obj.message;
											alert(msg);
										}
									},
									failure : function(data) {
										alert("查询失败!");
									}
								});
					});

	$("#search2")
			.click(
					function() {
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedTypeCountByPage.json?type=tree",
									data : param,
									type : "POST",
									dataType : 'JSON',
									success : function(data) {
										// var obj = eval('(' + data + ')');
										var obj = data;
										var status = obj.status;
										if (status == 1) {
											alert(JSON.stringify(data));
										} else {
											var msg = obj.message;
											alert(msg);
										}
									},
									failure : function(data) {
										alert("查询失败!");
									}
								});
					});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});

	$('#parent_id')
			.combotree(
					{
						onBeforeExpand : function(node, param) {
							if (node.load_flag == 0) {
								var url = "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
										+ node.id;
								setComboxTreeJson("#parent_id", url, node);
							}
						},
						onShowPanel : function(rec) {
							var root = $('#parent_id').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}
							var url = "/basicinfo/api/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0";
						    setComboxTreeJson("#parent_id", url, null);
						}
					});

	$('#page').textbox({
		required : true
	});

	$('#rows').textbox({
		required : true
	});


});

function initDataGrid() {
	$(datagridJQueryFind).datagrid({
		url : null,
		width : '90%',
		/***********************************************************************
		 * pagination : true, pageSize : 10,
		 **********************************************************************/
		singleSelect : true,
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
			sortable : true
		}, {
			field : 'name',
			title : '名称',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'remark',
			title : '备注',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'parent_name',
			title : '父名称',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'parent_id',
			title : '父ID',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'create_time',
			title : '创建时间',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'update_time',
			title : '更新时间',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'create_user_id',
			title : '创建者ID',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'update_user_id',
			title : '更新者ID',
			width : 120,
			align : 'center',
			sortable : true
		} ] ]

	});
}
