package com.zw.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 格式校验工具 
 * @author little-zhuo
 * @时间 2015-8-18
 */
public class FormatValidateUtil {
	
	/**
	 * 
	 * 校验手机号格式
	 * @param 
	 * @return boolean
	 */
	public static boolean validateMobileNum(String phoneNum){
		boolean flag=false;
		String regex="^1[3,4,5,8][0-9]{9}$";
		Pattern pattern=Pattern.compile(regex);
		Matcher matcher=pattern.matcher(phoneNum);
		flag=matcher.find();
		return flag;
	}
	
	/**
	 * 
	 * 校验固定电话格式
	 * @param 
	 * @return boolean
	 */
	public static boolean validateTelephoneNum(String telephoneNum){
		boolean flag=false;
		String regex1="^0[1-9]{2,3}-[0-9]{5,10}$"; //带区号
		Pattern pattern1=Pattern.compile(regex1);
		Matcher matcher1=pattern1.matcher(telephoneNum);
		String regex2="^[1-9]{1}[0-9]{5,8}$"; //不带区号
		Pattern pattern2=Pattern.compile(regex2);
		Matcher matcher2=pattern2.matcher(telephoneNum);
		if(telephoneNum.length()>9){
			flag=matcher1.find();
		}else {
			flag=matcher2.find();
		}
		return flag;
	}
	
	/**
	 * 
	 * 校验邮箱格式
	 * @param 
	 * @return boolean
	 */
	public static boolean validateEmail(String email){
		boolean flag=false;
		String regex="^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
		Pattern pattern=Pattern.compile(regex);
		Matcher matcher=pattern.matcher(email);
		flag=matcher.find();
		return flag;
	}
	
	/**
	 * 
	 * 校验日期格式
	 * @param 
	 * @return boolean
	 */
	public static boolean validateDate(String date){
		boolean flag=false;
		String regex="^[1-9][0-9]{3}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$";
		Pattern pattern=Pattern.compile(regex);
		Matcher matcher=pattern.matcher(date);
		flag=matcher.find();
		return flag;
	}
	
	public static void main(String[] args) {
		System.out.println(validateMobileNum("13432753681"));
		System.out.println(validateEmail("kk@11.com"));
		System.out.println(validateDate("0015-12-29"));
	}
}
