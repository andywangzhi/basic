package com.zw.service.impl;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.dashu.common.util.HttpUtil;
import com.google.common.base.Strings;
import com.zw.common.Constant;
import com.zw.exception.BaseInfoException;
import com.zw.service.CommonService;

@Service
public class CommonServiceImpl implements CommonService{

	@Override
	public Map<Object, Object> testAccountIsExist(String account)
			throws BaseInfoException {
		Map<Object,Object> returnMap=new HashMap<Object, Object>();
		JSONObject jsonObject=new JSONObject();
		jsonObject.put("userId", account);
		String retStr=HttpUtil.sendJson(HttpUtil.HS_GET_USER_WITH_USER_ID, jsonObject.toString());
		Integer result=1;
		if(!Strings.isNullOrEmpty(retStr)){
			JSONObject json=JSONObject.fromObject(retStr);
			result=Integer.parseInt(json.get("resultCode").toString());
		}
		if(result.toString().equals(Constant.SERVICE_SUCCESS)){
			returnMap.put("status", "1");
			returnMap.put("message", "账号已被注册,请另选账号");
		}else if ("1".equals(result.toString()) || "2".equals(result.toString())) {
			returnMap.put("status", "0");
			returnMap.put("message", "账号可用!!!");
		}else {
			// 抛出异常
			throw new BaseInfoException("204011", new String[] { "检测用户是否存在",
					result.toString() });
		}
		return returnMap;
	}

}
