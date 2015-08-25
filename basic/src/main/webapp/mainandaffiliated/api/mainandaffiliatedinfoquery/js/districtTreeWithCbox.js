$(function() {
	$('#tt')
			.tree(
					{
						url : '',
						checkbox:true,
						animate:true,
						onBeforeExpand : function(node, param) {
							// 加载子节点 为了避免重复加载 ，用load_flag变量来控制，0为未加载，1为已加载
							if (node.load_flag == 0) {
								var str = "path_code=" + node.id + "&type="
										+ node.child_type;
								var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?"
										+ str;
								// 节点加载
								setTreeJson("#tt", att_url, node);
							}
						}
					});

	// 初始化tree
	var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?type=community";
	setTreeJson("#tt", att_url, null);
	


	
	$('#tt2')
	.combotree(
			{
				url : '',
				onBeforeExpand : function(node, param) {
					// 加载子节点 为了避免重复加载 ，用load_flag变量来控制，0为未加载，1为已加载
					if (node.load_flag == 0) {
						var str = "path_code=" + node.id + "&type="
								+ node.child_type;
						var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedForTree.json?"
								+ str;
						// 节点加载
						setComboxTreeJson("#tt2", att_url, node);
					}
				}
			});
	
// 初始化tree
	setComboxTreeJson("#tt2", att_url, null);
});
