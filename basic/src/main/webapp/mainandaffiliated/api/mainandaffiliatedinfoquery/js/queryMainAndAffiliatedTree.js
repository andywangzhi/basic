var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?type=community";
$(function() {
	$('#tt')
			.tree(
					{

						url : '',
						checkbox : false,// 设置树有选择框
						cascadeCheck : false,// 设置树非级联选中
						onBeforeExpand : function(node, param) {
							// 加载子节点 为了避免重复加载 ，用load_flag变量来控制，0为未加载，1为已加载
							if (node.load_flag == 0) {
								var str = "path_code=" + node.id + "&type="+ node.child_type;
								var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?"
										+ str;
								// 节点加载
								setTreeJson("#tt", att_url, node);
							}
						}

					});
	// 初始化tree
	setTreeJson("#tt", att_url, null);

	$('#tt2')
			.combotree(
					{
						url : '',
						multiple : true,// 设置树多选
						cascadeCheck : false,// 设置树非级联选中
						onBeforeExpand : function(node, param) {
							// 加载子节点 为了避免重复加载 ，用load_flag变量来控制，0为未加载，1为已加载
							if (node.load_flag == 0) {
								var str = "path_code=" + node.id + "&type="+ node.child_type;
								var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?"+ str;
								// 节点加载
								setComboxTreeJson("#tt2", att_url, node);
							}
						}
					});

	// 初始化comboxTree
	setComboxTreeJson("#tt2", att_url, null);

	// 获得combotree的值
	$("#combotreeValue").click(function() {
		// 获得值
		var value = getCombotreeValue("#tt2");
		alert(value);
	});

	// 获得tree的值
	$("#treeValue").click(function() {
		// 获得值
		var value = getTreeValue("#tt");
		alert(value);
	});

	// 获得combotree的文本
	$("#combotreeText").click(function() {
		var text = getCombotreeText("#tt2");
		alert(text);
	});

	// 获得tree的文本
	$("#treeText").click(function() {
		var value = getTreeText("#tt");
		alert(value);
	});
   //清空combotree选中
	$("#combotreeClear").click(function() {
		combotreeClear("#tt2");
	});

	// 清空tree选中
	$("#treeClear").click(function() {
		treeClear("#tt");
	});

});
