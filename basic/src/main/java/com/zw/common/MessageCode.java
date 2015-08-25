package com.zw.common;

/**
 * 
 *@Description:信息定义
 *@author JASSON_XU
 *@2015年5月8日下午1:59:13
 */
public enum MessageCode {
	
	SUCCESSFUL_CODE("opera.common.successful.code"),
	
	FAIL_CODE("opera.common.fail.code"),//create by hzh
	
	COMMON_OPERA_SUCCESSFUL("opera.common.successful"),
	
	COMMON_OPERA_FAIL("opera.common.fail"),
	
	ERROR_PARAMS_NULL("common.error.params.null");
	
	private String code;

	private MessageCode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return this.code;
	}
}
