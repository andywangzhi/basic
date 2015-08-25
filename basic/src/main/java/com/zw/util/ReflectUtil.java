package com.zw.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * 通过反射机制获取类的所有属性及其值
 * @author little-zhuo
 * @时间 2015-7-3
 */
public class ReflectUtil {
	
	/**
	 * 
	 * 根据对象获取该对象的所有属性及对应的类型
	 * @param 
	 * @return List<Map<String,String>>
	 */
	public static List<Map<String,String>> getFieldNameAndType(Object object){
		Field[] fields=object.getClass().getDeclaredFields();
		List<Map<String,String>> returnList=new ArrayList<Map<String,String>>();
		for(Field field:fields){
			Map<String,String> map=new HashMap<String,String>();
			map.put(field.getName(), field.getGenericType().toString());
			returnList.add(map);
		}
		return returnList;
	}
	
	/**
	 * 
	 * 通过反射机制获取属性值
	 * @param object 对象
	 * @param fieldName 属性名称
	 * @param fieldType 属性类型
	 * @return Object
	 */
	public static Object getValue(Object object,String fieldName,String fieldType) throws Exception{
		fieldName=fieldName.substring(0,1).toUpperCase()+fieldName.substring(1);
		Object value = null;
		if(fieldType.equals("class java.lang.String")){
			Method method=object.getClass().getMethod("get"+fieldName);
			value=(String) method.invoke(object);
		}
		if(fieldType.equals("class java.lang.Integer")){
			Method method=object.getClass().getMethod("get"+fieldName);
			value=(Integer) method.invoke(object);
		}
		if(fieldType.equals("class java.util.Date")){
			Method method=object.getClass().getMethod("get"+fieldName);
			Date date=(Date) method.invoke(object);
			if(date!=null){
				value=date.getTime();
			}
		}
		if(fieldType.equals("class java.lang.Boolean")){
			Method method=object.getClass().getMethod("get"+fieldName);
			value=(Boolean) method.invoke(object);
		}
		if(fieldType.equals("class java.lang.Float")){
			Method method=object.getClass().getMethod("get"+fieldName);
			value=(Float) method.invoke(object);
		}
		return value;
	}
}
