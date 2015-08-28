package com.zw.service;

import java.util.List;
import java.util.Map;

import com.zw.entity.MstbSysRole;
import com.zw.exception.BaseInfoException;

public interface MstbSysRoleService {
	public List<MstbSysRole> listPageByEntity(MstbSysRole entity,
			int pageNum, int pageSize) throws BaseInfoException;

	public Map<Object, Object> saveByEntity(MstbSysRole entity)
			throws BaseInfoException;
	
	public Map<Object, Object> updateByEntity(MstbSysRole entity)
			throws BaseInfoException;

	public Map<Object, Object> deleteByIds(Integer[] ids)
			throws BaseInfoException;
}
