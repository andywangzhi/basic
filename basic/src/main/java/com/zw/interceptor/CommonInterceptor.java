package com.zw.interceptor;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonInterceptor extends HandlerInterceptorAdapter {

	private static Logger logger = Logger.getLogger(CommonInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURL().toString();
		logger.debug("请求Url =============>: " + url);
		//输出JSON请求的请求参数,以便及时定位问题所在。
		if(url.indexOf("json") != -1){
			logger.debug("请求参数 >>>>>>>>>>>>>>>>>>>>>>>");
			Map<String, String[]> paramsMap = request.getParameterMap();
			Iterator<Map.Entry<String, String[]>> it = paramsMap.entrySet()
					.iterator();
			while (it.hasNext()) {
				Map.Entry<String, String[]> entry = it.next();
				StringBuffer keyValBuff = new StringBuffer();
				keyValBuff.append(entry.getKey()).append("-->");
				for (String i : entry.getValue()) {   
					keyValBuff.append(i);   
				}
				logger.debug(keyValBuff.toString());

			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}
}
