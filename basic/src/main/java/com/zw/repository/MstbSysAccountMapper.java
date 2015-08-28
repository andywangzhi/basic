package com.zw.repository;

import java.util.List;
import java.util.Map;

import com.github.abel533.mapper.Mapper;
import com.zw.entity.MstbSysAccount;

public interface MstbSysAccountMapper extends Mapper<MstbSysAccount> {
	public List<MstbSysAccount> listByExample(Map<Object, Object> params);
	
	public List<MstbSysAccount> getByUsernameAndPassword(Map<Object, Object> params);
	
	public  int updatePassword(Map<Object, Object> params);
}