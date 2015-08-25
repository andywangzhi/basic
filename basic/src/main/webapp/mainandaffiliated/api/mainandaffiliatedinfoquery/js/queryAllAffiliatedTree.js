var att_url = "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryAllAffiliatedTree.json";
var searchFrom = "#searchFrom";
$(function() {
	$("#search")
	.click(
			function() {
				var path_code=$("#path_code").textbox("getValue");
				if(path_code==""){
					alert("path_code参数不能为空");
					return;
				}
				var url=att_url+"?path_code="+path_code;
				setTreeJson("#tt", url, null);
				setComboxTreeJson("#tt2", url, null);
				//为了方便，也可以采用下面这种方法
				//也可用type查，这时要指定查楼盘id为36，区域id为23的附属树，则参数为type=area&community_id=36&area_id=23 ,这时不能带path_code参数
				//var url=att_url+"?type=area&community_id=36&area_id=23";
				//setTreeJson("#tt", url, null);
				//setComboxTreeJson("#tt2", url, null);
			});
	$("#clearBtn").click(function() {
	$(searchFrom).form("clear");
	});
	
	$('#tt')
			.tree(
					{

						url : '',
						checkbox : false,// 设置树有选择框
						cascadeCheck : false// 设置树非级联选中
					});
	$('#tt2')
			.combotree(
					{
						url : '',
						multiple : true,// 设置树多选
						cascadeCheck : false// 设置树非级联选中
					});

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

	$('#path_code').textbox({
		required : true
	});
});


f
