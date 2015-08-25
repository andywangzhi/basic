// datagrid查询器
var communityText = "#community";
var areaText = "#area";
var buildingText = "#building";
var floorText = "#floor";
var unitText = "#unit";
var affiliatedText = "#affiliated";
var searchFrom = "#searchFrom";
$(function() {
	$("#search")
			.click(
					function() {
						$.messager.progress({ 
							title:'温馨提示', 
							msg:'正在查询数据，请稍后...'
							});
						var param = $.fn.getFormParams(searchFrom);
						$
								.ajax({
									url : "/basicinfo/api/mainAndAffiliatedInfomationQuery/queryMainAndAffiliatedInfomationCount.json?multiple_path_code_flag=true",
									data : param,
									type : "POST",
									dataType : 'JSON',
									success : function(data) {
										 $.messager.progress('close');
										// var obj = eval('(' + data + ')');
										var obj = data;
										var status = obj.status;
										if (status == 1) {
											var result = data.result;
											var res = result.community;
											if (res == "" || res == null) {
												$(communityText).textbox("setValue","");
											} else {
												$(communityText).textbox("setValue",res);
											}
											res = result.area;
											if (res == "" || res == null) {
												$(areaText).textbox("setValue","");
											} else {
												$(areaText).textbox("setValue",res);
											}
											res = result.building;
											if (res == "" || res == null) {
												$(buildingText).textbox("setValue","");
											} else {
												$(buildingText).textbox("setValue",res);
											}
											res = result.floor;
											if (res == "" || res == null) {
												$(floorText).textbox("setValue","");
											} else {
												$(floorText).textbox("setValue",res);
											}
											res = result.unit;
											if (res == "" || res == null) {
												$(unitText).textbox("setValue","");
											} else {
												$(unitText).textbox("setValue",res);
											}
											res = result.affiliated;
											if (res == "" || res == null) {
												$(affiliatedText).textbox("setValue","");
											} else {
												$(affiliatedText).textbox("setValue",res);
											}
										} else {
											var msg = obj.message;
											alert(msg);
										}
									},
									failure : function(data) {
										$.messager.progress('close');
										alert("查询失败!");
									}
								});
					});
	$("#clearBtn").click(function() {
		$(searchFrom).form("clear");
	});
	
});
