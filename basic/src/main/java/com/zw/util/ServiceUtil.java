package com.zw.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ServiceUtil {
	public static String[] districtTypeArr = new String[] { "community",
			"area", "building", "floor", "unit", "affiliated" };
	public static String[] communityTypeArr = new String[] { "community",
			"office" };
	public static String[] affiliatedTypeArr=new String[]{"tree","list"};

	/**
	 * 将parasMap里面的ids的多个id转换为list,方便mybaits使用
	 * 
	 * @param parasMap
	 * @return
	 */
	public static Map changeIdsToListForMap(Map paramsMap) {
		String ids = (String) paramsMap.get("ids");
		String[] pids = ids.split(",");
		List idl = new ArrayList();
		for (int j = 0; j < pids.length; j++) {
			idl.add(pids[j]);
		}
		paramsMap.put("ids", idl);
		return paramsMap;
	}

	public static boolean checkColumnNotNull(String checkColumn)
			throws Exception {
		boolean falg = false;
		if (checkColumn != null && !checkColumn.trim().equals("")) {
			falg = true;
		}
		return falg;
	}

	public static boolean checkColumnNotNull(Object checkColumn)
			throws Exception {
		boolean falg = false;
		if (checkColumn != null && !checkColumn.toString().trim().equals("")) {
			falg = true;
		}
		return falg;
	}

	/**
	 * 获得path_code的id
	 * 
	 * @param path_code
	 * @return
	 */
	public static Integer getPathCodeId(String path_code) {
		if (path_code == null || path_code.trim().equals("")) {
			return null;
		}
		Pattern pattern = Pattern.compile("\\d+$");
		Matcher matcher = pattern.matcher(path_code);
		String id = "";
		if (matcher.find()) {
			id = matcher.group();
		} else {
			return null;
		}
		return new Integer(id);
	}

	/**
	 * 检查主体与附属type类型合法性
	 * 
	 * @param keys
	 * @param validateKey
	 * @return
	 */
	public static boolean validateType(String validateKey) {
		boolean flag = false;
		if (districtTypeArr != null && validateKey != null) {
			for (int i = 0; i < districtTypeArr.length; i++) {
				String k = districtTypeArr[i];
				if (k.equals(validateKey)) {
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	/**
	 * 检查是否越级
	 * 
	 * @param path_code
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public static boolean checkPathCodeSkipLevel(String path_code_type,
			String type) throws Exception {
		boolean flag = false;
		String keys = ",community,area,building,floor,unit,affiliated,";
		int type_index = keys.indexOf("," + type + ",");
		int path_type_index = keys.indexOf("," + path_code_type + ",");
		if (path_type_index < 0 || path_type_index > type_index) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 检查是指定类型是否越过path_code的类型
	 * 
	 * @param path_code
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public static boolean checkAppointTypeSkipLevel(String path_code_type,
			String type) throws Exception {
		boolean flag = false;
		String keys = ",community,area,building,floor,unit,affiliated,";
		int type_index = keys.indexOf("," + type + ",");
		int path_type_index = keys.indexOf("," + path_code_type + ",");
		if (type_index < 0 || type_index > path_type_index) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 获得path_code的简称
	 * 
	 * @param path_code
	 * @return
	 * @throws Exception
	 */
	public static String getTypeShort(String path_code) throws Exception {
		String type_short = "";
		if (path_code == null || path_code.trim().equals("")) {
			return "";
		}
		Pattern pattern = Pattern.compile("\\d+$");
		Matcher matcher = pattern.matcher(path_code);
		if (matcher.find()) {
			String str = matcher.group();
			type_short = path_code.substring(0,
					path_code.length() - str.length());
		} else {
			return "";
		}
		return type_short;
	}

	public static boolean checkFloatValidate(String key) {
		boolean flag = true;
		try {
			Float f = new Float(key);
		} catch (Exception e) {
			flag = false;
		}
		return flag;

	}

	public static boolean checkCommunityTypeValidate(String type) {
		boolean flag = false;
		if (communityTypeArr != null && type != null) {
			for (int i = 0; i < communityTypeArr.length; i++) {
				String k = communityTypeArr[i];
				if (k.equals(type)) {
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	
}
