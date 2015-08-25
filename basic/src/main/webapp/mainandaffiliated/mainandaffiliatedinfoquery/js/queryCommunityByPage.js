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
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationByPage.json?type=community&detail_location_flag="true"';
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

    //初始化类型
	$("#community_type")
	.combobox(
			{
				multiple : false,
				panelHeight : '100px',
				data : [ {
					text : '社区',
					id : 'community'
				}, {
					text : '写字楼',
					id : 'office'
				} ],
				valueField : 'id',
				textField : 'text'
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
		},{
			field : 'community_type',
			title : '类型',
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
			field : 'developer',
			title : '开发商',
			width : 120,
			align : 'center',
			sortable : true
		}, {
			field : 'address',
			title : '楼盘地址',
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
		}, {
			field : 'detail_location',
			title : '详细位置',
			width : 120,
			align : 'center',
			sortable : true
		} ] ]

	});

}
