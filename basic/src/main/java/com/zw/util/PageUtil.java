package com.zw.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class PageUtil {

	@SuppressWarnings("unchecked")
	public static <T> String findWithoutCount(List<T> list, final int pageNum,
			final int pageSize,final int total) {
		String pageJson = "{total:'"+total;
		pageJson += "',rows:'{";
		JSONArray ja = null;
		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				T json = list.get(i);
				ja = JSONArray.fromObject(json);
				JSONObject jsonObject = ja.getJSONObject(0);
				Iterator<String> iterator = jsonObject.keys();
				String key = null;
				String value = null;
				pageJson += "[{";
				while (iterator.hasNext()) {
					key = iterator.next();
					value = jsonObject.getString(key);
					if (i == list.size()) {
						pageJson += key + ":'" + value + "'";
					} else {
						pageJson += key + ":'" + value + "',";
					}
				}
				pageJson += "}],";
			}
		}
		return pageJson + "}}";
	}

	public static <T> Map<Object, Object> toPageMap(List<T> list,
			final int pageNum, final int pageSize ,final int total) {
		Map<Object, Object> pageMap = new HashMap<Object, Object>();
		pageMap.put("rows", list);
		pageMap.put("total",total);
//		if (list != null) {
//			if (list.size() < pageSize) {
//				pageMap.put("total", (pageNum - 1) * pageSize + list.size());
//			} else {
//				pageMap.put("total", pageNum * pageSize + 1);
//			}
//		} else {
//			pageMap.put("total", (pageNum - 1) * pageSize);
//		}
		return pageMap;
	}
}
