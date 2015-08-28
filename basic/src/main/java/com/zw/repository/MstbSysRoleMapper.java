package com.zw.repository;

import java.util.List;
import java.util.Map;

import com.github.abel533.mapper.Mapper;
import com.zw.entity.MstbSysRole;

public interface MstbSysRoleMapper extends Mapper<MstbSysRole> {
	
	
	public List<MstbSysRole> listByExample(Map<Object, Object> map);
}