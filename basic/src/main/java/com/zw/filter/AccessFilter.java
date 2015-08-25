package com.zw.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zw.controller.LoginController;

public class AccessFilter implements Filter {
	/**
	 * @author chaoyin
	 */
	private static final String[] IGNORE_URI = { 
		"/login.html", "/Login", "/login", "/Login/"};
	public void destroy() {
	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)arg0; 
		HttpServletResponse response = (HttpServletResponse)arg1; 
	    boolean flag = false;
		String url = request.getRequestURL().toString();
		for (String s : IGNORE_URI) {
			if (url.contains(s)) {
				flag = true;
				break;
			}
		}
		if(flag){
			filterChain.doFilter(arg0, arg1);
		}else{
			boolean bln = LoginController.checkLogin(request);
			if (bln) {
				filterChain.doFilter(arg0, arg1);
			} else {
				response.sendRedirect(request.getContextPath()+"/login/login.html");
			}
		}
	}

	public void init(FilterConfig arg0) throws ServletException {
	}
}