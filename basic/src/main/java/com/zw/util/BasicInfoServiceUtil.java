package com.zw.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.common.base.Strings;
import com.zw.common.MessageCode;
import com.zw.exception.BaseInfoException;
import com.zw.message.BaseInfoResources;

/**
 * 
 * @Description:公共信息平台服务层代码工具
 * @author JASSON_XU
 * @2015年5月8日下午1:27:24
 */
public class BasicInfoServiceUtil {

	private static final String SUCCESS_KEY = "status";
	private static final String MSG_KEY = "message";

	/**
	 * 
	 * @Title:OperaSuccessMap
	 * @Description:新增、修改、删除操作成功统一的返回map
	 * @param @return
	 * @return Map<Object,Object>
	 * @throws
	 */
	public static Map<Object, Object> OperaSuccessMap(String operatioName) {
		Map<Object, Object> opSunccessMap = new HashMap<Object, Object>();

		opSunccessMap.put(SUCCESS_KEY, BaseInfoResources.getInstance()
				.getMessage(MessageCode.SUCCESSFUL_CODE.toString()));
		opSunccessMap.put(
				MSG_KEY,
				BaseInfoResources.getInstance().getFormateMessage(
						MessageCode.COMMON_OPERA_SUCCESSFUL.toString(),
						operatioName));

		return opSunccessMap;

	}

	/**
	 * 
	 * @Title:OperaSuccessMap
	 * @Description:新增、修改、删除操作成功统一的返回map
	 * @param @return
	 * @return Map<Object,Object>
	 * @throws
	 */
	public static Map<Object, Object> OperaFailMap(String operatioName) {
		Map<Object, Object> opSunccessMap = new HashMap<Object, Object>();

//		opSunccessMap.put(SUCCESS_KEY, BaseInfoResources.getInstance()
//				.getMessage(MessageCode.SUCCESSFUL_CODE.toString()));
		opSunccessMap.put(SUCCESS_KEY, BaseInfoResources.getInstance()
				.getMessage(MessageCode.FAIL_CODE.toString()));
		opSunccessMap
				.put(MSG_KEY,
						BaseInfoResources.getInstance().getFormateMessage(
								MessageCode.COMMON_OPERA_FAIL.toString(),
								operatioName));

		return opSunccessMap;

	}
	
	
	/**
	 * 
	 * selfDefineMessageMap
	 * @Description:自定义消息集合
	 * @param @param msgCode
	 * @param @param params
	 * @param @return
	 * @return Map<Object,Object>
	 * @throws
	 */
	public static Map<Object, Object> selfDefineMessageMap(String msgCode, String[] params) {
		Map<Object, Object> opSunccessMap = new HashMap<Object, Object>();

		opSunccessMap.put(SUCCESS_KEY, BaseInfoResources.getInstance()
				.getMessage(MessageCode.SUCCESSFUL_CODE.toString()));
		opSunccessMap.put(
				MSG_KEY,
				BaseInfoResources.getInstance().getFormateMessage(msgCode,
						params));
		return opSunccessMap;
	}

	public static void checkParam(String fieldName, Object value)
			throws BaseInfoException {
		if(value == null){
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), fieldName);
		}
		if(value instanceof String){
			if (Strings.isNullOrEmpty((String)value)) {
				throw new BaseInfoException(
						MessageCode.ERROR_PARAMS_NULL.toString(), fieldName);
			}
		}
		
	}
	
	public static Boolean IsNotNullOrEmpty4EasyUI(String val){
		if(Strings.isNullOrEmpty(val)){
			return false;
		}else{
			if(val.equals("null")){
				return false;
			}
			return true;
		}
	}
	
	public static int getNumFromString(String numStr){
		String regex = "\\d*";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(numStr);
        while(m.find()) {
            if(!"".equals(m.group())){
            	return Integer.parseInt(m.group());
            }
        }
        return 0;
	}
	
	
	public static void checkPNodetIsSelf(int pNodeId, int nodeId, String nodeName)
			throws BaseInfoException {
		if(pNodeId == nodeId){
			throw new BaseInfoException("204002", nodeName);
		}
	}
}
