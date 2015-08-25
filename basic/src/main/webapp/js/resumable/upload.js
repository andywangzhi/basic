/**
 * 发送消息
 */
function setReceviceMsg(file_path, file_name) {
	if (window.opener) {
		var msg = ""
        var saveMsg="";
		if (file_path != null) {
			if ((upload_type == "image") && isPicture(file_name)) {
				//如果是图片
				msg = "<img src='/chat"
						+ file_path
						+ "' height='100' width='100' onclick=showMaxImage('/chat"
						+ file_path + "') />";
				saveMsg=replaceMsgTagForSave(file_path, file_name,"image");
				//msg="<img src='/chat/common/resumable/resume.png' title='Resume upload' />"
			} else {
				//其它文件
				//file_path=file_path.replace("/chat","");
				msg = "<img src='/chat/common/resumable/file.png' width='20' height='20' /><a href='#' onclick=downloadFun('" + file_path
						+ "') style='text-decoration:underline;'>" + file_name
						+ "</a>"
				saveMsg=replaceMsgTagForSave(file_path, file_name,"file");
				//保存文件记录
				window.opener.saveFileRecord(file_path, file_name);
				
			}
			window.opener.sendMsgFun2(msg,saveMsg);

		}
		//发送消息
		//window.opener.sendMsgFun(msg);
		
	}
}
/**
 * 判断是否是图片
 */
function isPicture(file_path) {
	var flag = false;
	if (file_path.indexOf(".") < 0) {
		return flag;
	}
	var type = file_path.substring(file_path.lastIndexOf("."));
	type = type.toLowerCase();
	var fileTypeStr = ".jpeg|.gif|.jpg|.png|.bmp|.pic";
	var fileTypeArr = fileTypeStr.split("|");
	for (var i = 0; i < fileTypeArr.length; i++) {
		if (fileTypeArr[i] == type) {
			flag = true;
			break;
		}
	}
	return flag;

}

/**
          获得url参数
 **/
function getUrlParm(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return (r[2]);
	return null;
}