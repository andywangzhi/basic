package com.zw.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class JsonUtil {
	/**
	 * json 字符串转换成集合对象
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static Map<Object, Object> jsonStr2Map(String jsonStr) {
		if (jsonStr == null || jsonStr.length() == 0) {
			return null;
		}
		JSONObject jsonBean = jsonStr2Json(jsonStr);
		Map<Object, Object> map = toMap(jsonBean);
		return map;
	}

	/**
	 * json字符串转换成json对象
	 * 
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static JSONObject jsonStr2Json(String jsonStr) {
		if (jsonStr == null || jsonStr.length() == 0) {
			return null;
		}
		try {
			JSONObject object = JSONObject.fromObject(jsonStr);
			return object;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 封装将json对象转换为java集合对象
	 * 
	 * @param <T>
	 * @param clazz
	 * @param jsons
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	private static <T> List<T> getJavaCollection(T clazz, String jsons) {
		List<T> objs = null;
		JSONArray jsonArray = (JSONArray) JSONSerializer.toJSON(jsons);
		if (jsonArray != null) {
			objs = new ArrayList<T>();
			List list = (List) JSONSerializer.toJava(jsonArray);
			for (Object o : list) {
				JSONObject jsonObject = JSONObject.fromObject(o);
				T obj = (T) JSONObject.toBean(jsonObject, clazz.getClass());
				objs.add(obj);
			}
		}
		return objs;
	}

	/**
	 * 将json对象转换成Map
	 * 
	 * @param jsonObject
	 *            json对象
	 * @return Map对象
	 */
	@SuppressWarnings("unchecked")
	public static Map<Object, Object> toMap(JSONObject jsonObject) {
		Map<Object, Object> result = new HashMap<Object, Object>();
		if(jsonObject == null){
			return null;
		}
		Iterator<String> iterator = jsonObject.keys();
		String key = null;
		String value = null;
		while (iterator.hasNext()) {
			key = iterator.next();
			value = jsonObject.getString(key);
			JSONObject jsonBean = jsonStr2Json(value);
			Object val = null;
			try {
				val = toMap(jsonBean);
			} catch (Exception e) {
				val = value;
			}
			if(jsonBean == null){
				val= value;
			}
			result.put(key, val);
		}
		return result;
	}

	/**
	 * list<T>转 json字符串
	 * 
	 * @param list
	 * @return
	 */
	public static <T> String list2Json(List<T> list) {
		if (list == null || list.size() == 0) {
			return "";
		}
		List<Map<String,Object>> listMap = BeanUtil.transListBean2Map(list);
		JSONArray array = JSONArray.fromObject(listMap);
		return array.toString();
	}
	
	/**
	 * list<Map>转 json字符串
	 * 
	 * @param list
	 * @return
	 */
	public static <T> String listMap2Json(List<Map<Object,Object>> listMap) {
		if (listMap == null || listMap.size() == 0) {
			return "";
		}
		JSONArray array = JSONArray.fromObject(listMap);
		return array.toString();
	}

}
