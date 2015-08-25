package com.zw.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

import com.alibaba.fastjson.JSONObject;

/**
 * Http Util
 * 
 * @author Jayden Han
 * @date 2015-03-16
 * @version 1.0
 */
public class SecurityLoginHttpUtil {

	private static final String getUserUrl = "http://192.168.10.252:8080/dashu-security/public/callService.do"; // 调用用户认证与授权中心服务(测试)

	private static final String signLoginUrl="http://192.168.10.252:8080/dashu-security/login/signIn.do";
	
	private static final String loginOutUrl="http://192.168.10.252:8080/dashu-security/login/signOut.do";
	
	private static final String checkTokenUrl="http://192.168.10.252:8080/dashu-security/authentication/checkToken.do";
	
	private static final String getAuthInfoUrl="http://192.168.10.252:8080/dashu-security/authentication/getAuthInfo.do";
	
	public static String sendJson(int serviceId) {
		
		return getUserJson(serviceId, null);
		
	}

	/**
	 * 
	 * 获取用户
	 * 
	 * @param serviceId
	 * @param content
	 * @return
	 */
	public static String getUserJson(int serviceId, String content) {

		Map<String, String> map = new HashMap<String, String>();
		map.put("serviceId", String.valueOf(serviceId));
		
		if (content != null && content.trim().length()>0){
			JSONObject json = JSONObject.parseObject(content);
			Set<String>  keys = json.keySet();
			for (String key:keys){
				map.put(key, json.getString(key));
			}			
		}
		return postWithJson(map,getUserUrl);
	}
	
	/**
	 * 单点登录
	 * @param serviceId
	 * @param content
	 * @return
	 */
	public static String signInJson(String content) {
		Map<String, String> map = new HashMap<String, String>();
		if (content != null && content.trim().length()>0){
			JSONObject json = JSONObject.parseObject(content);
			Set<String>  keys = json.keySet();
			for (String key:keys){
				map.put(key, json.getString(key));
			}			
		}
		return postWithJson(map,signLoginUrl);
	}
	
	/**
	 * 单点登出
	 * @param serviceId
	 * @param content
	 * @return
	 */
	public static String signOutJson(String content) {

		Map<String, String> map = new HashMap<String, String>();
		if (content != null && content.trim().length()>0){
			JSONObject json = JSONObject.parseObject(content);
			Set<String>  keys = json.keySet();
			for (String key:keys){
				map.put(key, json.getString(key));
			}			
		}
		return postWithJson(map,loginOutUrl);
	}
	
	
	/**
	 * 单点登出
	 * @param serviceId
	 * @param content
	 * @return
	 */
	public static String checkToken(String content) {
		Map<String, String> map = new HashMap<String, String>();
		if (content != null && content.trim().length()>0){
				map.put("token", content);
		}
		return postWithJson(map,checkTokenUrl);
	}
	
	/**
	 * 单点登出
	 * @param serviceId
	 * @param content
	 * @return
	 */
	public static String getAuthInfo(String content) {
		Map<String, String> map = new HashMap<String, String>();
		if (content != null && content.trim().length()>0){
				map.put("token", content);
		}
		return postWithJson(map,getAuthInfoUrl);
	}
	
	
	
	/**
	 * 
	 *	调用统一登录系统接口
	 * 
	 * @param map
	 * @param url
	 * @return
	 */
	private static String postWithJson(Map<String, String> map,String url) {
		String respMessage = "";
		HttpClient httpClient = null;
		PostMethod postMethod = null;
		try {
			int i = 0;
			httpClient = new HttpClient();
			postMethod = new PostMethod(url);
			postMethod.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

			NameValuePair[] data = null;
			if (map != null && map.size() > 0) {
				data = new NameValuePair[map.size()];
				for (Map.Entry<String, String> entry : map.entrySet()) {
					data[i++] = new NameValuePair(entry.getKey(),
							entry.getValue());
				}
				postMethod.setRequestBody(data);
			}

			int status = httpClient.executeMethod(postMethod);
			if (status == HttpStatus.SC_OK) {
				InputStream inputStream = postMethod.getResponseBodyAsStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(
						inputStream, "UTF-8"));
				String str = "";
				StringBuffer stringBuffer = new StringBuffer();
				while ((str = br.readLine()) != null) {
					stringBuffer.append(str);
				}
				respMessage = stringBuffer.toString();
			} else {
				String resultText = postMethod.getStatusLine().toString();
				respMessage = "{\"resultCode\":10,\"resultText\":\""
						+ resultText + "\",\"resultContent\":null}";
			}

		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (postMethod != null) {
				postMethod.releaseConnection();
			}
		}
		return respMessage;
	}

}