package com.zw.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * javabean对象的操作工具类
 * 
 * @author charles email:baitly002@gmail.com
 *
 */
public class BeanUtil {

	/**
	 * 将javabean转换成map对象
	 * 
	 * @param o1
	 * @return
	 */
	public static Map<String, Object> basebean2map(Object o1) {
		Map<String, Object> m = new HashMap<String, Object>();
		Method[] m1 = o1.getClass().getDeclaredMethods();
		for (Method mm1 : m1) {
			if (mm1.getName().startsWith("get")) {
				try {
					m.put(mm1.getName().substring(3).toLowerCase(),
							mm1.invoke(o1));
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		return m;
	}

	/**
	 * 
	 * bean to map
	 * 
	 * @param obj
	 * @return
	 */
	public static Map<String, Object> transBean2Map(Object obj) {
		if (obj == null) {
			return null;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo
					.getPropertyDescriptors();
			for (PropertyDescriptor property : propertyDescriptors) {
				String key = property.getName();
				// 过滤class属性
				if (!key.equals("class")) {
					// 得到property对应的getter方法
					Method getter = property.getReadMethod();
					Object value = getter.invoke(obj);
					String type = property.getPropertyType().getName();
					if(type.equals("java.util.Date") && value!=null){
						Date date = (Date) value;
						value = DateFormatUtil.dateToStrLong(date);
					}
					map.put(key, value);
				}
			}
		} catch (Exception e) {
			System.out.println("transBean2Map Error " + e);
		}
		return map;
	}
	
	/**
	 * 
	 * List<bean> to map
	 * @param <T>
	 * 
	 * @param obj
	 * @return
	 */
	public static <T> List<Map<String, Object>> transListBean2Map(List<T> list) {
		if (list == null) {
			return null;
		}
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		for(Object obj :list){
			Map<String, Object> result =transBean2Map(obj);
			resultList.add(result);
		}
		return resultList;
	}
}
