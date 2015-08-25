package com.zw.util;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageInfo;

public class ResultMsgUtil{
	/**
	 * 封装符合easyui的datagrid表格插件的数据
	 * @param <T>
	 * @param pageInfo 分页查询得到的数据
	 * @return
	 */
	public static <T> Map<String, Object> datagridFormat(PageInfo<T> pageInfo){
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("total", pageInfo.getTotal());
		m.put("rows", pageInfo.getList());
		return m;
	}
	/**
	 * 封装基本的数据提示
	 * @param code 操作码
	 * @param status 操作状态，1：成功 0:失败 2:警告
	 * @param content 提示信息
	 * @param remark 备注说明
	 * @return
	 */
	public static Map<String, Object> baseMsg(int code, int status, String content, String remark){
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("code", code);
		m.put("status", status);
		m.put("content", content);
		m.put("remark", remark);
		return m;
	}
	
	/**
	 * 封闭消息集合
	 * @param <T>
	 * @param code 操作码
	 * @param message 提示信息
	 * @param errors 信息集合内容
	 * @return
	 */
	public static <T> Map<String, Object> baseListMsg(int code, String message, List<T> errors){
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("code", code);
		m.put("message", message);
		m.put("errors", errors);
		return m;
	}
}