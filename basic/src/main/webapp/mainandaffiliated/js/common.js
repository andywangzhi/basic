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
 * 设置tree的设置默认值
 * 
 * @param idStr
 * @param id
 */
function setTreeJson(idStr, id, url) {
	$.ajax({
		url : url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			//alert(JSON.stringify(data));
			var jsonDataTree = transData(data, 'id', 'parent_id', 'children');
			// 更新tree数据
			$(idStr).combotree("tree").tree("loadData", jsonDataTree);
			// 设置默认值
			$(idStr).combotree("setValue", id);
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
function setComboxJson(idStr, id, url) {
	$.ajax({
		url : url,
		type : "POST",
		dataType : 'JSON',
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		success : function(data) {
			// var jsonDataTree = transData(data, 'id', 'parent_id',
			// 'children');
			// 更新combox数据
			$(idStr).combobox("loadData", data);
			// 设置默认值
			$(idStr).combobox("setValue", id);
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
 * 初始化comboxTree
 * 
 * @param idStr
 * @param id
 */
function inniComboxTree2(idStr, url) {
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
					// 更新tree数据
					$(idStr).combotree("tree").tree("loadData", jsonDataTree);
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