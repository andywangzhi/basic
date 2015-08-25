var att_url = "/basicinfo/api/affiliatedTypeQuery/queryAllAffiliatedTypeTree.json";
$(function() {
	$('#tt')
			.tree(
					{

						url : '',
						checkbox : false,// 设置树有选择框
						cascadeCheck : false// 设置树非级联选中
					});
	// 初始化tree
	setTreeJson("#tt", att_url, null);
	$('#tt2')
			.combotree(
					{
						url : '',
						multiple : true,// 设置树多选
						cascadeCheck : false// 设置树非级联选中
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
