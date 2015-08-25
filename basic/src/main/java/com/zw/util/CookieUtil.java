package com.zw.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class CookieUtil {

	/**
	 * 根据名称读取cookie
	 */
	public static String getCookie(String name,HttpServletRequest request) {
		Cookie[] cookie = request.getCookies();
		String object = null;
		if(cookie !=null){
			for (int i = 0; i < cookie.length; i++) {
				if (cookie[i].getName().equals(name) == true) {
					object = cookie[i].getValue();
					break;
				}
			}
		}
		return object;
	}

	/**
	 * @name 设置cookie名称
	 * @value 设置cookie的值
	 * @cookieTime 设置cookie的存活时间
	 * @domain 设置cookie的域名
	 * @path 设置cookie
	 */
	public static void setCookie(String name, String value, int cookieTime,
			String domain, String path,HttpServletResponse response) {
		Cookie _cookie = new Cookie(name, value);
		_cookie.setMaxAge(cookieTime);
		_cookie.setDomain(domain);
		_cookie.setPath(path);
		response.addCookie(_cookie);
	}
}
