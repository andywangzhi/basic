package com.zw.util;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

public class StringUtil {

	public static boolean isValidDate(String str) {
		boolean convertSuccess = true;
		// 指定日期格式为四位年/两位月份/两位日期，注意yyyy/MM/dd区分大小写；
		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
		try {
			// 设置lenient为false.
			// 否则SimpleDateFormat会比较宽松地验证日期，比如2007/02/29会被接受，并转换成2007/03/01
			format.setLenient(false);
			format.parse(str);
		} catch (Exception e) {
			// e.printStackTrace();
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			convertSuccess = false;
		}
		return convertSuccess;
	}
	public static String Replace(String str,String char1,String char2) {
		return str.toString().replace(char1, char2);
	}
	
	
	public static boolean isNotBlank(String param){
		if(param ==null){
			return false;
		}else if("".equals(param.trim())){
			return false;
		}else{
			return true;
		}
		
	}
	
	public static String encode(String str,String strType){
		String encodestr = "";
		if(!isNotBlank(strType)){
			strType = "UTF-8";
		}
		if(isNotBlank(str)){
			try {
				encodestr = new String(str.getBytes("ISO8859-1"),strType);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				return str;
			}
		}
		return encodestr;
	}
	
	
	public static StringBuffer clearAndAddNewValue(StringBuffer b,String newValue){
		if(b!=null){
			b.delete(0, b.length());
			b.append(newValue);
		}
		return b;
	}
	
	public static StringBuffer clear(StringBuffer b){
		if(b!=null){
			b.delete(0, b.length());
		}
		return b;
	}
	
}
