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
	var param = $.fn.getFormParams(searchFrom);
	$(datagridJQueryFind).datagrid('options').url = '/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree';
	$(datagridJQueryFind).datagrid('options').queryParams = param;
	$(datagridJQueryFind).datagrid('reload');

	/***************************************************************************
	 * $('#parent_id').combotree({ url:
	 * '/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&parent_id=0',
	 * onBeforeExpand:function(node,param) {
	 * $('#parent_id').combotree("tree").tree("options").url =
	 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&id=&parent_id="+
	 * node.id; //$('#parent_id').combotree("tree").tree("options").url =
	 * "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&id="; }
	 * });
	 **************************************************************************/
	$('#parent_id')
			.combotree(
					{
						onBeforeExpand : function(node, param) {
							$('#parent_id').combotree("tree").tree("options").url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id="
									+ node.id;
						},
						onShowPanel : function(rec) {
							var root = $('#parent_id').combotree("tree").tree(
									"getRoot");
							if (root != null) {
								return;
							}
							var url = "/basicinfo/admin/affiliatedTypeQuery/queryAffiliatedType.json?type=tree&queryConditionFlag=true&operate_flag=child_node&id=&parent_id=0"
							$("#parent_id").combotree('options').url = url;
							$("#parent_id").combotree('reload');
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
		} ] ]

	});
}
