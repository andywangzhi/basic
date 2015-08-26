package com.zw.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zw.entity.MstbSysAccount;
import com.zw.service.MstbSysAccountService;
import com.zw.util.CookieUtil;
import com.zw.util.ReturnJsonUtil;



@Controller
@RequestMapping("/login")
public class LoginController extends BaseController {

	@Resource
	public MstbSysAccountService accountService;

	@RequestMapping("/checkLogin")
	public ResponseEntity<Map<Object, Object>> Login(String loginId,
			String passWord,String redirectURL, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<Object, Object> rm = new HashMap<Object, Object>();
		if (loginId == null || "".equals(loginId.trim()) || passWord == null
				|| "".equals(passWord.trim())) {
			rm.put("status", 0);
			rm.put("content", "用户名，密码不能为空");
		}
		MstbSysAccount user = accountService.findByUsernameOrpassword(loginId,
				passWord);
		if (user != null ) {
			String key =loginId+":"+passWord;
			request.getSession().setAttribute("User", user);
			request.getSession().setAttribute("loginId", user.getId());
			String contextPath=request.getRemoteAddr();
			CookieUtil.setCookie("BASICINFO", key, -1, contextPath, "/", response);
			
			rm.put("status", 1);
			rm.put("token", key);
		} else {
			rm.put("status", 0);
			rm.put("content", "用户不存在或者用户名 密码错误");
		}
		return ReturnJsonUtil.bindResultResponseEntity(rm);
	}

	//如果session里面有ID 就是登陆了
	public static boolean checkLogin(HttpServletRequest request) {
		try {
			Object o= request.getSession().getAttribute("loginId");
			if (o!=null) {
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	
}
