package com.zw.repository;

import java.util.List;
import java.util.Map;

import com.github.abel533.mapper.Mapper;
import com.zw.entity.MstbSysMenu;

public interface MstbSysMenuMapper extends Mapper<MstbSysMenu> {
	
	public List<MstbSysMenu> listByExample(Map<Object, Object> map);
	
	
}