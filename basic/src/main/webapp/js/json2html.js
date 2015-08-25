var json2html = {
	radio:function(data, name, key, value){
		var obj = eval('(' + data + ')');
		var html = "";
		$.each(obj, function(index, item){
			var k = "";
			var v = "";
			$.each(item, function(i, n){
				if(key == i){
					k = n;
				}
				if(value == i){
					v = n;
				}
			});
			html += "<li><label><input type=\"radio\" name=\""+name+"\" value=\""+k+"\">"+v+"</label></li>";
		});
		return "<ul>"+html+"</ul>";
	},
	checkbox:function(data, name, key, value){
		var obj = eval('(' + data + ')');
		var html = "";
		$.each(obj, function(index, item){
			var k = "";
			var v = "";
			$.each(item, function(i, n){
				if(key == i){
					k = n;
				}
				if(value == i){
					v = n;
				}
			});
			html += "<li><label><input type=\"checkbox\" name=\""+name+"[]\" value=\""+k+"\">"+v+"</label></li>";
		});
		return "<ul>"+html+"</ul>";
	},
	select:function(data, elmid, key, value){
		var obj = eval('(' + data + ')');
		$('#'+elmid).combobox({
			data: obj,
		    valueField:	key,
		    textField:	value
		});
	}
};