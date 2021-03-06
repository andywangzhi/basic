// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	initDataGrid();
	$("#search")
			.click(
					function() {
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=building&detail_location_flag=true",
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
											// 设置数据
											var result = obj.result;
											if (result == "" || result == null) {
												// $(datagridJQueryFind).datagrid('clear');
												$(datagridJQueryFind).datagrid(
														'loadData', {
															total : 0,
															rows : []
														});
											} else {
												$(datagridJQueryFind).datagrid(
														'loadData', result);
											}
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
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationCount.json?type=building",
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

	var community_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
	var area_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=area&queryConditionFlag=true";
	$("#community_id").combobox({
		multiple : false,
		panelHeight : '100px',
		// url:community_url,
		valueField : 'id',
		textField : 'name',
		method : 'GET',
		onSelect : function(rec) {
			$("#area_id").combobox('clear');
			$("#area_id").combobox("loadData", "");
		}
	});
	setComboxJson("#community_id", community_url);
	$("#area_id").combobox({
		multiple : false,
		panelHeight : '100px',
		url : null,
		valueField : 'id',
		textField : 'name',
		method : 'GET',
		onShowPanel : function(rec) {
			var data = $('#area_id').combobox("getData");
			if (data.length > 0) {
				return;
			}
			var community_id = $("#community_id").combobox('getValue');
			if (community_id == null || community_id == "") {
				$("#area_id").combobox('hidePanel');
				$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区！", "info");
			} else {
				var community_id = $("#community_id").combobox('getValue');
				var url = area_url + "&community_id=" + community_id
				// $("#area_id").combobox('options').url=url;
				// $("#area_id").combobox('reload');
				setComboxJson("#area_id", url);
			}
		},
		onSelect : function(rec) {
		}
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
			hidden : true,
			sortable : true
		}, {
			field : 'path_code',
			title : '路径代码',
			width : 120,
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
			field : 'community_name',
			title : '楼盘名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'area_name',
			title : '分区名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'community_id',
			title : '楼盘ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'area_id',
			title : '分区ID',
			width : 120,
			align : 'center',
			hidden : true,
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
		}, {
			field : 'detail_location',
			title : '详细位置',
			width : 120,
			align : 'center',
			sortable : true
		} ] ]

	});

}
