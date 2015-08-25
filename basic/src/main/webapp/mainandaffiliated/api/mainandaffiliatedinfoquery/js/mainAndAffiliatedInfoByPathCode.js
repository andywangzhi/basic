// datagrid查询器
var datagridJQueryFind = "#dataGrid";
var searchFrom = "#searchFrom";
$(function() {
	$("#search")
			.click(
					function() {
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/checkMainAndAffiliatedPathCodeExist.json",
									data : param,
									type : "POST",
									dataType : 'JSON',
									success : function(data) {
										// var obj = eval('(' + data + ')');
										var obj = data;
										var status = obj.status;
										if (status == 1) {
											var result=data.result;
			                                if(result>0){
			                                	alert("存在");
			                                }else{
			                                	alert("不存在");
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
					});
	$("#search2")
	.click(
			function() {
				var param = $.fn.getFormParams(searchFrom);
				$
						.ajax({
							url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedDetailLocationByPathCode.json",
							data : param,
							type : "POST",
							dataType : 'JSON',
							success : function(data) {
								// var obj = eval('(' + data + ')');
								var obj = data;
								var status = obj.status;
								if (status == 1) {
									var result=data.result;
	                                alert(result);
								} else {
									var msg = obj.message;
									alert(msg);
								}
							},
							failure : function(data) {
								alert("查询失败!");
							}
						});
			});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
});
