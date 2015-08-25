package com.zw.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.zw.util.CookieUtil;
import com.zw.util.JsonUtil;
import com.zw.util.ReturnJsonUtil;
import com.zw.util.UserHelperUtil;



@Controller
public class LoginController extends BaseController {
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/login")
	public ModelAndView Login(HttpServletRequest request , HttpServletResponse response){
		ModelAndView mav = new ModelAndView("/register");
		try {
			Map<Object, Object> user= (Map<Object, Object>) request.getSession().getAttribute("User");
			if(user !=null && !user.isEmpty()){
				  mav = new ModelAndView("/index");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mav;
	}

	@RequestMapping("/loginCheck")
	public ResponseEntity<Map<Object, Object>> Login(String userId,
			String password,String redirectURL, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<Object, Object> rm = new HashMap<Object, Object>();
		if (userId == null || "".equals(userId.trim()) || password == null
				|| "".equals(password.trim())) {
			rm.put("status", 0);
			rm.put("content", "用户名，密码不能为空");
		}
		Map<Object, Object> user = UserHelperUtil.getUserInfoBy(userId,
				password);
		if (user != null && !user.isEmpty()) {
			String key = userId+password;
			request.getSession().setAttribute(key, user);
			request.getSession().setAttribute("User", user);
			request.getSession().setAttribute("userName", user.get("userName"));
			request.getSession().setAttribute("userId", user.get("userId"));
			String contextPath=request.getRemoteAddr();
			CookieUtil.setCookie("loginkey", key, -1, contextPath, "/", response);
			
			rm.put("status", 1);
			rm.put("loginkey", key);
		} else {
			rm.put("status", 0);
			rm.put("content", "用户不存在或者用户名 密码错误");
		}
		return ReturnJsonUtil.bindResultResponseEntity(rm);
	}

	public static boolean checkLogin(HttpServletRequest request) {
		try {
			String token =  CookieUtil.getCookie("DASHUAUTHINFO", request);
			try {
				token = JsonUtil.jsonStr2Map(token).get("token").toString();
			} catch (Exception e) {
			}
			String returnMsg = UserHelperUtil.checkToken(token);
			if ("true".equals(returnMsg)) {
				Map<Object, Object> user = UserHelperUtil.getLoginUser();
				if(user==null || user.isEmpty()){
					Map<Object, Object> authInfo = UserHelperUtil.getAuthInfo(token);
					if(authInfo !=null && !authInfo.isEmpty()){
						String loginId = (String) authInfo.get("loginId");
						user = UserHelperUtil.getUserByUserId(loginId);
						UserHelperUtil.setLoginUser(user);
					}
				}
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static Map<Object, Object> getLoginUser(HttpServletRequest request) {
		try {
//			String key =  CookieUtil.getCookie("loginkey", request);
			@SuppressWarnings("unchecked")
			Map<Object, Object> user = (Map<Object, Object>) request
					.getSession().getAttribute("User");
			if (user != null && !user.isEmpty()) {
				return user;
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
