/**
 * 添加树子节点
 * 
 * @param idStr
 * @param node
 * @param data
 */
function appenTreeNode(idStr, node, data) {
	if (node.load_flag == 0) {
		node.load_flag = 1;
		$(idStr).tree('append', {
			parent : node.target,
			data : data
		});
		// 因添加子节点不能自动展开，所以先收缩，然后再展开
		$(idStr).tree('collapse', node.target);
		$(idStr).tree('expand', node.target);
	}
}

/**
 * 请求树子节点数据
 * 
 * @param idStr
 * @param id
 */
function setTreeJson(idStr, url, node) {
	$.ajax({
		url : url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				var result = obj.result;
				var jsonDataTree = transData(result, 'id', 'parent_id',
						'children');
				if (node == null) {
					$(idStr).tree("loadData", jsonDataTree);
				} else {
					appenTreeNode(idStr, node, jsonDataTree)
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
}

/**
 * 添加ComboxTree子节点
 * 
 * @param idStr
 * @param node
 * @param data
 */
function appendComboxTreeNode(idStr, node, data) {
	if (node.load_flag == 0) {
		node.load_flag = 1;
		$(idStr).combotree("tree").tree('append', {
			parent : node.target,
			data : data
		});
		// 因添加子节点不能自动展开，所以先收缩，然后再展开
		$(idStr).combotree("tree").tree('collapse', node.target);
		$(idStr).combotree("tree").tree('expand', node.target);
	}
}

/**
 * json格式转树状结构
 * 
 * @param {json}
 *            json数据
 * @param {String}
 *            id的字符串
 * @param {String}
 *            父id的字符串
 * @param {String}
 *            children的字符串
 * @return {Array} 数组
 */
function transData(a, idStr, pidStr, chindrenStr) {
	var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
	for (; i < len; i++) {
		hash[a[i][id]] = a[i];
	}
	for (; j < len; j++) {
		var aVal = a[j], hashVP = hash[aVal[pid]];
		if (hashVP) {
			!hashVP[children] && (hashVP[children] = []);
			hashVP[children].push(aVal);
		} else {
			r.push(aVal);
		}
	}
	return r;
}

/**
 * 请求ComboxTree子节点数据
 * 
 * @param idStr
 * @param id
 */
function setComboxTreeJson(idStr, url, node) {
	$.ajax({
		url : url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				var result = obj.result;
				if (result == "" || result == null) {
					$(idStr).combotree("clear");
				} else {
					var jsonDataTree = transData(result, 'id', 'parent_id',
							'children');
					if (node == null) {
						// 更新tree数据
						$(idStr).combotree("tree").tree("loadData",
								jsonDataTree);
					} else {
						appendComboxTreeNode(idStr, node, jsonDataTree)
					}
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
}

/**
 * 设置combox的设置默认值
 * 
 * @param idStr
 * @param id
 */
function setComboxJson(idStr, url) {
	$.ajax({
		url : url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			var obj = data;
			var status = obj.status;
			if (status == 1) {
				var result = obj.result;
				if (result == "" || result == null) {
					$(idStr).combobox("clear");
				} else {
					// 更新combox数据
					$(idStr).combobox("loadData", result);
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
}

/**
 * combox 选择数据
 * 
 * @param idStr
 * @param value
 */
function setInintSelect(idStr, value) {
	var data = $(idStr).combobox('getData');
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == value) {
			$(idStr).combobox('select', data[i].id);
		}
	}

}

/**
 * 获得combotree选中的值
 * 
 * @param idStr
 * @returns {String}
 */
function getCombotreeValue(idStr) {
	// 获得值
	var treeValue = "";
	var check=$(idStr).combotree("options").multiple;
	if(check){
		var nodes = $(idStr).combotree("tree").tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			treeValue = treeValue + nodes[i].id + ",";
		}
		if (nodes.length > 0) {
			treeValue = treeValue.substring(0, treeValue.length - 1);
		}
	}else{
		var node =$(idStr).combotree("tree").tree("getSelected");
		if(node!=null){
			treeValue = treeValue + node.id;
		}
	}
	return treeValue;
}

/**
 * 获得tree的选中的值
 * 
 * @param idStr
 * @returns {String}
 */
function getTreeValue(idStr) {
	// 获得值
	var treeValue = "";
	var check=$(idStr).tree("options").checkbox;
	if(check){
		var nodes = $(idStr).tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			treeValue = treeValue + nodes[i].id + ",";
		}
		if (nodes.length > 0) {
			treeValue = treeValue.substring(0, treeValue.length - 1);
		}	
	}else{
		var node = $(idStr).tree("getSelected");
		if(node!=null){
			treeValue = treeValue + node.id;
		}
	}
	return treeValue;
}

/**
 * 获得combotree选中的文本
 * 
 * @param idStr
 * @returns {String}
 */
function getCombotreeText(idStr) {
	// 获得值
	var treeText = "";
	var check= $(idStr).combotree("options").multiple;
	if(check){
		var nodes = $(idStr).combotree("tree").tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			treeText = treeText + nodes[i].text + ",";
		}
		if (nodes.length > 0) {
			treeText = treeText.substring(0, treeText.length - 1);
		}
	}else{
		var node =  $(idStr).combotree("tree").tree("getSelected");
		if(node!=null){
			treeText = treeText + node.text;
		}
	}
	return treeText;
}

/**
 * 获得tree的选中的文本
 * 
 * @param idStr
 * @returns {String}
 */
function getTreeText(idStr) {
	// 获得值
	var treeText = "";
	var check=$(idStr).tree("options").checkbox;
	if(check){
		var nodes = $(idStr).tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			treeText = treeText + nodes[i].text + ",";
		}
		if (nodes.length > 0) {
			treeText = treeText.substring(0, treeText.length - 1);
		}
	}else{
		var node = $(idStr).tree("getSelected");
		if(node!=null){
			treeText = treeText + node.text;
		}
	}
	return treeText;
}

/**
 * 清除combotree选中
 * 
 * @param idStr
 * @returns {String}
 */
function combotreeClear(idStr) {
	// 清除选中
	var check= $(idStr).combotree("options").multiple;
	if(check){
		var nodes = $(idStr).combotree("tree").tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			$(idStr).combotree("tree").tree("uncheck", nodes[i].target);
		}
	}else{
		$(idStr).combotree("clear");
		
	}

}

/**
 * 清除tree的选中
 * 
 * @param idStr
 * @returns {String}
 */
function treeClear(idStr) {
	// 清除选中
	var check=$(idStr).tree("options").checkbox;
	if(check){
		var nodes = $(idStr).tree("getChecked");
		for (var i = 0; i < nodes.length; i++) {
			$(idStr).tree("uncheck", nodes[i].target);
		}
	}else{
		 $(idStr).tree("select",null);
	}

}
