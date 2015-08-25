package com.zw.repository;

import java.util.List;
import java.util.Map;

import com.github.abel533.mapper.Mapper;
import com.zw.entity.SystemConfig;

public interface SystemConfigMapper extends Mapper<SystemConfig> {
	public List<SystemConfig> listByExample(Map<Object, Object> params);
}