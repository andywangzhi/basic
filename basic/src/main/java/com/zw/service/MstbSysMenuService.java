package com.zw.service;

import java.util.List;
import java.util.Map;

import com.zw.entity.MstbSysMenu;
import com.zw.exception.BaseInfoException;

public interface MstbSysMenuService extends BaseService<MstbSysMenu>{

	public List<MstbSysMenu> listPageByEntity(MstbSysMenu entity,
			int pageNum, int pageSize) throws BaseInfoException;

	public Map<Object, Object> saveByEntity(MstbSysMenu entity)
			throws BaseInfoException;
	
	public Map<Object, Object> updateByEntity(MstbSysMenu entity)
			throws BaseInfoException;

	public Map<Object, Object> deleteByIds(Integer[] ids)
			throws BaseInfoException;
	
	public Object listbyItem(int item) 
			throws BaseInfoException;
}
