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
 * Http Util 接口调用工具类
 * @author Jayden Han
 * @date 2015-04-29
 * @version 1.0 
 */
public class HttpUtil{
	
	private static final String DPS_SERVICE_SERVER_HOST = "http://192.168.10.252:8080";	//测试服务器
	
	public static final String DPS_SECURITY_PUBLIC_SERVICE_URL = DPS_SERVICE_SERVER_HOST + "/dashu-security/public/callService.do";  //统一用户认证与授权管理中心
	public static final String DPS_LOGGER_PUBLIC_SERVICE_URL = DPS_SERVICE_SERVER_HOST + "/dashu-logger/public/callService.do";  	 //统一日志管理中心
    public static final int HS_ADD_LOG_RECORD = 101;	//添加日志记录
    public static final int HS_GET_LOG_RECORDS = 102;	//查询日志记录
    
	public static String sendJson(int serviceId) {
		
		return sendJson(serviceId, null);
		
	}
		
	public static String sendJson(int serviceId, String content){

		Map<String, String> map = new HashMap<String, String>();
		map.put("serviceId", String.valueOf(serviceId));
		
		if (content != null && content.trim().length()>0){
			JSONObject json = JSONObject.parseObject(content);
			Set<String>  keys = json.keySet();
			for (String key:keys){
				map.put(key, json.getString(key));
			}			
		}
		
		if (serviceId >= 100 && serviceId < 200){
			return postWithJson(DPS_LOGGER_PUBLIC_SERVICE_URL, map);			
		}else{	
			return postWithJson(map);
		}
	}
		
	private static String postWithJson(Map<String, String> map){
		return postWithJson(DPS_SECURITY_PUBLIC_SERVICE_URL, map);
	}

	private static String postWithJson(String url, Map<String, String> map){
		String respMessage = "";
		HttpClient httpClient = null;
		PostMethod postMethod = null;
		
		try {
			int i = 0;
			httpClient = new HttpClient();
			postMethod = new PostMethod(url);
			postMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

			NameValuePair[] data = null;
			if (map != null && map.size()>0){
				data = new NameValuePair[map.size()];
				for (Map.Entry<String, String> entry : map.entrySet()) {
					data[i++] = new NameValuePair(entry.getKey(), entry.getValue());
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
			}else{
				String resultText = postMethod.getStatusLine().toString();
				respMessage = "{\"resultCode\":10,\"resultText\":\"" + resultText + "\",\"resultContent\":null}";				
			}
			
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			if (postMethod != null){
				postMethod.releaseConnection();
			}
		}
		
		return respMessage;		
	}

	public static String callService(String servicePath, String jsonParams){
		
		Map<String, String> map = null;
		
		if (jsonParams != null && jsonParams.trim().length()>0){
			map = new HashMap<String, String>();
			JSONObject json = JSONObject.parseObject(jsonParams);
			Set<String>  keys = json.keySet();
			for (String key:keys){
				map.put(key, json.getString(key));
			}			
		}
		
		return callService(servicePath, map);
	}

	public static String callService(String servicePath, Map<String, String> mapParams){
			
		return doPostWithMap(DPS_SERVICE_SERVER_HOST + (servicePath.substring(0,1).equals("/")?"":"/") + servicePath, mapParams);
	}

	private static String doPostWithMap(String url, Map<String, String> map){
		String respData = "";
		HttpClient httpClient = null;
		PostMethod postMethod = null;
		
		try {
			int i = 0;
			httpClient = new HttpClient();
			postMethod = new PostMethod(url);
			postMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

			NameValuePair[] data = null;
			if (map != null && map.size()>0){
				data = new NameValuePair[map.size()];
				for (Map.Entry<String, String> entry : map.entrySet()) {
					data[i++] = new NameValuePair(entry.getKey(), entry.getValue());
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
				respData = stringBuffer.toString();
			}
			
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally{
			if (postMethod != null){
				postMethod.releaseConnection();
			}
		}
		
		return respData;		
	}


}