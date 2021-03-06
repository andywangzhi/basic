// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	initDataGrid();
	$("#search").click(function() {
		var param = $.fn.getFormParams(searchFrom);
		$(datagridJQueryFind).datagrid('options').queryParams = param;
		$(datagridJQueryFind).datagrid('reload');
	});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	/**
	 * $(datagridJQueryFind).datagrid('options').url='/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryAffiliatedType.json';
	 */
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=unit&detail_location_flag="true"';
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');
	var community_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=community&queryConditionFlag=true";
	var area_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=area&queryConditionFlag=true";
	var building_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=building&queryConditionFlag=true";
	var floor_url = "/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomation.json?type=floor&queryConditionFlag=true";
	$("#community_id").combobox({
		multiple : false,
		panelHeight : '100px',
		url : community_url,
		valueField : 'id',
		textField : 'text',
		method : 'GET',
		onSelect : function(rec) {
			$("#area_id").combobox('clear');
			$("#building_id").combobox('clear');
			$("#floor_id").combobox('clear');
			$("#area_id").combobox("loadData", "");
			$("#building_id").combobox("loadData", "");
			$("#floor_id").combobox("loadData", "");
		}
	});
	$("#area_id").combobox({
		multiple : false,
		panelHeight : '100px',
		url : null,
		valueField : 'id',
		textField : 'text',
		method : 'GET',
		onShowPanel : function(rec) {
			var data = $('#area_id').combobox("getData");
			if (data.length > 0) {
				return;
			}
			var community_id = $("#community_id").combobox('getValue');
			if (community_id == null || community_id == "") {
				$("#area_id").combobox('hidePanel');
				$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇->楼层！", "info");
			} else {
				var community_id = $("#community_id").combobox('getValue');
				var url = area_url + "&community_id=" + community_id
				$("#area_id").combobox('options').url = url;
				$("#area_id").combobox('reload');
			}
		},
		onSelect : function(rec) {
			$("#building_id").combobox('clear');
			$("#floor_id").combobox('clear');
			$("#building_id").combobox("loadData", "");
			$("#floor_id").combobox("loadData", "");
		}
	});
	$("#building_id").combobox(
			{
				multiple : false,
				panelHeight : '100px',
				url : null,
				valueField : 'id',
				textField : 'text',
				method : 'GET',
				onShowPanel : function(rec) {
					var data = $('#building_id').combobox("getData");
					if (data.length > 0) {
						return;
					}
					var data = $('#building_id').combobox("getData");
					if (data.length > 0) {
						return;
					}
					var community_id = $("#community_id").combobox('getValue');
					var area_id = $("#area_id").combobox('getValue');
					if (community_id == null || community_id == ""
							|| area_id == null || area_id == "") {
						$("#building_id").combobox('hidePanel');
						$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇->楼层！",
								"info");
					} else {
						var community_id = $("#community_id").combobox(
								'getValue');
						var area_id = $("#area_id").combobox('getValue');
						var url = building_url + "&community_id="
								+ community_id + "&area_id=" + area_id
						$("#building_id").combobox('options').url = url;
						$("#building_id").combobox('reload');
					}
				},
				onSelect : function(rec) {
					$("#floor_id").combobox('clear');
					$("#floor_id").combobox("loadData", "");
				}
			});

	$("#floor_id").combobox(
			{
				multiple : false,
				panelHeight : '100px',
				url : null,
				valueField : 'id',
				textField : 'text',
				method : 'GET',
				onShowPanel : function(rec) {
					var data = $('#floor_id').combobox("getData");
					if (data.length > 0) {
						return;
					}
					var community_id = $("#community_id").combobox('getValue');
					var area_id = $("#area_id").combobox('getValue');
					var building_id = $("#building_id").combobox('getValue');
					if (community_id == null || community_id == ""
							|| area_id == null || area_id == ""
							|| building_id == null || building_id == "") {
						$("#floor_id").combobox('hidePanel');
						$.messager.alert("操作提示", "主体条件选择顺序为:楼盘->分区->楼宇->楼层！",
								"info");
					} else {
						var community_id = $("#community_id").combobox(
								'getValue');
						var area_id = $("#area_id").combobox('getValue');
						var building_id = $("#building_id")
								.combobox('getValue');
						var url = floor_url + "&community_id=" + community_id
								+ "&area_id=" + area_id + "&building_id="
								+ building_id;
						$("#floor_id").combobox('options').url = url;
						$("#floor_id").combobox('reload');
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
		pagination : true,
		pageSize : 10,
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
			field : 'building_name',
			title : '楼宇名',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'floor_name',
			title : '楼层名',
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
			field : 'building_id',
			title : '楼宇ID',
			width : 120,
			align : 'center',
			hidden : true,
			sortable : true
		}, {
			field : 'floor_id',
			title : '楼层ID',
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
