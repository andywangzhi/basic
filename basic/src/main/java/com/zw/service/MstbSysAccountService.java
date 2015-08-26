package com.zw.service;

import java.util.List;
import java.util.Map;

import com.zw.entity.MstbSysAccount;
import com.zw.exception.BaseInfoException;

public interface MstbSysAccountService extends BaseService<MstbSysAccount>{
	public List<MstbSysAccount> ListPageByEntity(MstbSysAccount entity,
			int pageNum, int pageSize) throws BaseInfoException;

	public Map<Object, Object> saveByEntity(MstbSysAccount entity)
			throws BaseInfoException;
	
	public Map<Object, Object> updateByEntity(MstbSysAccount entity)
			throws BaseInfoException;

	public Map<Object, Object> deleteByIds(Integer[] ids)
			throws BaseInfoException;
	
	public MstbSysAccount findByUsernameOrpassword(String username,String password)
			throws BaseInfoException;
}
