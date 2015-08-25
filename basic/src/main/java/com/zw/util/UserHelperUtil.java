package com.zw.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;





public class UserHelperUtil {

	@SuppressWarnings("unchecked")
	public static Map<String, String> getUserInfoByUserId(String UserId) {
		Map<String, String> user = new HashMap<String, String>();
		String json = HttpUtil.sendJson(11, "{userId:\"" + UserId + "\"}");
		Map<Object, Object> jsonMap = JsonUtil.jsonStr2Map(json);
		if (jsonMap != null && !jsonMap.isEmpty()) {
			if (jsonMap.get("resultCode").toString().equalsIgnoreCase("0")) {
				Map<Object, Object> result = (Map<Object, Object>) jsonMap
						.get("resultContent");
				if (result != null && !result.isEmpty()) {
					String telephoneNo = result.get("phoneNo") == null ? ""
							: result.get("phoneNo").toString();
					String username = result.get("userName") == null ? ""
							: result.get("userName").toString();
					user.put("telephoneNo", telephoneNo);
					user.put("userName", username);
					user.put("userId", UserId);
				}
				user.put("message", "success");
			} else {
				user.put("message", "error");
			}
		}else{
			user = null;
		}
		return user;
	}
	
	@SuppressWarnings("unchecked")
	public static Map<Object, Object> getUserByUserId(String UserId) {
		Map<Object, Object> user = new HashMap<Object, Object>();
		String json = HttpUtil.sendJson(11, "{userId:\"" + UserId + "\"}");
		Map<Object, Object> jsonMap = JsonUtil.jsonStr2Map(json);
		if (jsonMap != null && !jsonMap.isEmpty()) {
			if (jsonMap.get("resultCode").toString().equalsIgnoreCase("0")) {
				Map<Object, Object> result = (Map<Object, Object>) jsonMap.get("resultContent");
				if (result != null && !result.isEmpty()) {
					user.putAll(result);
				}
				user.put("message", "success");
			} else {
				user.put("message", "error");
			}
		}else{
			user = null;
		}
		return user;
	}
	
	
	
	
	@SuppressWarnings("unchecked")
	public static Map<Object, Object> getUserInfoBy(String UserId,String password) {
		String json = SecurityLoginHttpUtil.getUserJson(1, "{userId:\"" + UserId + "\",password:\""+password+"\"}");
		Map<Object, Object> jsonMap = JsonUtil.jsonStr2Map(json);
		if (jsonMap != null && !jsonMap.isEmpty()) {
			if (jsonMap.get("resultCode").toString().equalsIgnoreCase("0")) {
				Map<Object, Object> result = (Map<Object, Object>) jsonMap
						.get("resultContent");
				return result;
			}
		}
		return null;
	}
	
	
	/**
	 *  单点登录
	 *  
	 * @param userId
	 * @param password
	 * @param cookieMaxAge
	 * @return
	 */
	public static Map<Object,Object> signIn(String userId, String password,Long cookieMaxAge) {
		String content = "{loginId:'"+userId+"',password:'"+password+"',cookieMaxAge:'"+cookieMaxAge+"'}";
		String returnMsg = SecurityLoginHttpUtil.signInJson(content);
		Map<Object, Object> result = JsonUtil.jsonStr2Map(returnMsg);
		return result;
	}
	
	/**
	 * 单点登出
	 * @return
	 */
	public static Map<Object,Object> signOut() {
		String returnMsg =  SecurityLoginHttpUtil.signOutJson("");
		return JsonUtil.jsonStr2Map(returnMsg);
	}
	
	
	/**
	 * 验证凭证
	 * @param content
	 * @return
	 */
	public static String checkToken(String content) {
		String token =content;// "{loginId:'"+userId+"',password:'"+password+"',cookieMaxAge:'"+cookieMaxAge+"'}";
		String returnMsg = SecurityLoginHttpUtil.checkToken(token);
		return returnMsg;
	}
	
	/**
	 * 获取验证信息
	 * @param content
	 * @return
	 */
	public static Map<Object,Object> getAuthInfo(String content) {
		String token =content;// "{loginId:'"+userId+"',password:'"+password+"',cookieMaxAge:'"+cookieMaxAge+"'}";
		String returnMsg = SecurityLoginHttpUtil.getAuthInfo(token);
		Map<Object, Object> result = JsonUtil.jsonStr2Map(returnMsg);
		return result;
	}
	
	/**
	 * 从session中获取登录人信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<Object,Object> getLoginUser(){
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest().getSession();
		Map<Object,Object> user = null;
		if(session !=null){
			user =  (Map<Object, Object>) session.getAttribute("User");
		}
		return user;
	}
	
	/**
	 * 从session中获取登录人信息
	 * @return
	 */
	public static void setLoginUser(Map<Object,Object> user){
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest().getSession();
		if(session !=null){
			session.setAttribute("User",user);
			session.setAttribute("userId",user.get("userId"));
			session.setAttribute("userName",user.get("userName"));
		}
	}
	
	
	/**
	 * 从session中获取登录人的帐号
	 * @return
	 */
	public static String getLoginUserId(){
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest().getSession();
		String userId = "";
		if(session !=null){
			userId = (String) session.getAttribute("userId");
		}
		return userId;
	}
	
	/**
	 * 从session中获取登录人名字
	 * @return
	 */
	public static String getLoginUserName(){
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest().getSession();
		String userId = "";
		if(session !=null){
			userId = (String) session.getAttribute("userName");
		}
		return userId;
	}
	
}
