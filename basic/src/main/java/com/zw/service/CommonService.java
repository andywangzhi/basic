package com.zw.service;

import java.util.Map;

import com.zw.exception.BaseInfoException;

public interface CommonService {
	
	/**
	 * 
	 * 检测账号是否已被注册
	 * @param 
	 * @return Map<Object,Object>
	 */
	public Map<Object,Object> testAccountIsExist(String account) throws BaseInfoException;
}
