package com.zw.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zw.common.custom.CustomTimestampEditor;
import com.zw.exception.BaseInfoException;
import com.zw.util.ReturnJsonUtil;

public class BaseController {
	
	private static final Logger logger = Logger.getLogger(BaseController.class);
	
	/**
	 * SpringMvc 统一的异常信息处理方法
	 * @Title:handExcpetion
	 * @Description:TODO
	 * @param @return
	 * @return Object
	 * @throws
	 */
	@ExceptionHandler
	public @ResponseBody ResponseEntity<Map<Object, Object>> handExcpetion(HttpServletRequest request, Exception ex){
		Map<Object, Object> returnMap = new HashMap<Object, Object>();
		logger.error("##############发生异常："+ex.getCause());
		returnMap.put("status", "0");
		returnMap.put("request", request.getRequestURL());
		if(ex instanceof BaseInfoException){
			returnMap.put("code", ((BaseInfoException) ex).getMessageCode());
			returnMap.put("message", ((BaseInfoException) ex).getMessage());
			logger.error("##############业务异常："+((BaseInfoException) ex).getMessage());
		}else{
			BaseInfoException bie=new BaseInfoException("204105", "");
			returnMap.put("code", bie.getMessageCode());
			returnMap.put("message", bie.getMessage());
			logger.error("##############业务异常："+ex.getMessage());
		}
		
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		dateFormat.setLenient(true);
		binder.registerCustomEditor(Date.class, new CustomTimestampEditor(
				dateFormat, true));
	}
	
	
}
