package com.zw.service;

import java.util.List;
import java.util.Map;

import com.zw.entity.SystemConfig;
import com.zw.exception.BaseInfoException;

/**
 * 
 *@Description:系统参数维护 
 *@author andy_wang
 *@2015年6月4日上午10:36:14
 */
public interface SystemConfigService extends BaseService<SystemConfig> {

	public List<SystemConfig> ListPageByEntity(SystemConfig entity,
			int pageNum, int pageSize) throws BaseInfoException;

	public Map<Object, Object> saveByEntity(SystemConfig entity)
			throws BaseInfoException;
	
	public Map<Object, Object> updateByEntity(SystemConfig entity)
			throws BaseInfoException;

	public Map<Object, Object> deleteByIds(Integer[] ids)
			throws BaseInfoException;
	
	/**
	 * 
	 * @Title:ListAllMaps
	 * @Description:以NameSpace为key的配置集合
	 * @param @return
	 * @param @throws BaseInfoException
	 * @return Map<String,List<SystemConfig>>
	 * @throws
	 */
	public Map<String, List<SystemConfig>> ListAllMaps() throws BaseInfoException;
}
