package com.zw.util;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ControllerUtil {
     /**
      * 将request里面的参数封装到map
      * @param request
      * @param response
      * @return
      * @throws Exception
      */
	public static Map getParmMap(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<Object, Object> param = new HashMap<Object, Object>();
		Enumeration<String> paraNames = request.getParameterNames();
		for (Enumeration e = paraNames; e.hasMoreElements();) {
			String name = e.nextElement().toString();
			String value = request.getParameter(name);
			param.put(name, value);
		}
		return param;

	}
	
	 public static String stringToJson(String s) {    
         StringBuffer sb = new StringBuffer ();     
         for (int i=0; i<s.length(); i++) {     
       
             char c = s.charAt(i);     
             switch (c) {     
             case '\"':     
                 sb.append("\\\"");     
                 break;     
//             case '\\':   //如果不处理单引号，可以释放此段代码，若结合下面的方法处理单引号就必须注释掉该段代码
//                 sb.append("\\\\");     
//                 break;     
             case '/':     
                 sb.append("\\/");     
                 break;     
             case '\b':      //退格
                 sb.append("\\b");     
                 break;     
             case '\f':      //走纸换页
                 sb.append("\\f");     
                 break;     
             case '\n':     
                 sb.append("\\n"); //换行    
                 break;     
             case '\r':      //回车
                 sb.append("\\r");     
                 break;     
             case '\t':      //横向跳格
                 sb.append("\\t");     
                 break;     
             default:     
                 sb.append(c);    
             }}
         return sb.toString();     
      }
	 
	   public static String StringDanYinToJSON(String ors) {
           ors = ors == null ? "" : ors;
           StringBuffer buffer = new StringBuffer(ors);
           int i = 0;
           while (i < buffer.length()) {
            if (buffer.charAt(i) == '\'' || buffer.charAt(i) == '\\') {
             buffer.insert(i, '\\');
             i += 2;
            } else {
             i++;
            }
          }
           return buffer.toString();
     }
}
