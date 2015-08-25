package com.zw.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.zw.common.Constant;
import com.zw.entity.SystemConfig;
import com.zw.exception.BaseInfoException;
import com.zw.repository.SystemConfigMapper;
import com.zw.service.SystemConfigService;
import com.zw.util.BasicInfoServiceUtil;

@Service
public class SystemConfigServiceImpl extends BaseServiceImpl<SystemConfig>
		implements SystemConfigService {

	@Resource
	private SystemConfigMapper configMapper;

	@Override
	public List<SystemConfig> ListPageByEntity(SystemConfig entity,
			int pageNum, int pageSize) throws BaseInfoException {
		PageHelper.startPage(pageNum, pageSize);

		Map<Object, Object> params = Maps.newHashMap();
		// 获取状态为0的正常数据
		params.put("configStatus", Constant.DATA_STATUS_NORMAL);

		if (null != entity) {
			params.put("nameSpace", entity.getNameSpace());
			params.put("configKey", entity.getConfigKey());
			params.put("configName", entity.getConfigName());
			params.put("configEname", entity.getConfigEname());
		}
		// 根据创建时间排序
		params.put("orderBy", "create_time");
		params.put("sort", "desc");

		// entity.setConfigStatus(Constant.DATA_STATUS_NORMAL);
		// return mapper.select(entity);
		return configMapper.listByExample(params);
	}

	@Override
	public Map<Object, Object> saveByEntity(SystemConfig entity)
			throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("配置所在命名空间", entity.getNameSpace());
		BasicInfoServiceUtil.checkParam("配置Key", entity.getConfigKey());
		BasicInfoServiceUtil.checkParam("配置值", entity.getConfigValue());

		// 清空id防止复制新增的时候带id过来。
		entity.setId(null);

		// 检查是否存在相同命名空间，key，value的数据
		if (mapper.selectCount(entity) != 0) {
			throw new BaseInfoException("204015");
		}

		entity.setConfigStatus(Constant.DATA_STATUS_NORMAL);
		entity.setCreateTime(new Date());

		int ret = mapper.insert(entity);

		if (ret == 1) {
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_SAVE);
		} else {
			return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_SAVE);
		}

	}

	@Override
	public Map<Object, Object> updateByEntity(SystemConfig entity)
			throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("ID", entity.getId());
		BasicInfoServiceUtil.checkParam("配置所在命名空间", entity.getNameSpace());
		BasicInfoServiceUtil.checkParam("配置Key", entity.getConfigKey());
		BasicInfoServiceUtil.checkParam("配置值", entity.getConfigValue());

		entity.setUpdateTime(new Date());
		entity.setConfigStatus(Constant.DATA_STATUS_NORMAL);

		int ret = mapper.updateByPrimaryKey(entity);

		if (ret == 1) {
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_UPDATE);
		} else {
			return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_UPDATE);
		}
	}

	@Override
	public Map<Object, Object> deleteByIds(Integer[] ids)
			throws BaseInfoException {
		if (ids.length > 0) {
			for (Integer id : ids) {
				SystemConfig record = mapper.selectByPrimaryKey(id);
				record.setConfigStatus(Constant.DATA_STATUS_DELETE);
				mapper.updateByPrimaryKey(record);
			}
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_DELETE);
		}
		return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_DELETE);
	}

	@Override
	public Map<String, List<SystemConfig>> ListAllMaps()
			throws BaseInfoException {
		/*
		 * SystemConfig config = new SystemConfig();
		 * config.setConfigStatus(Constant.DATA_STATUS_NORMAL);
		 * List<SystemConfig> list = mapper.select(config);
		 */
		Map<Object, Object> params = Maps.newHashMap();
		// 获取状态为0的正常数据
		params.put("configStatus", Constant.DATA_STATUS_NORMAL);
		// 根据排序字段排序
		params.put("orderBy", "sort");
		params.put("sort", "asc");
		List<SystemConfig> list = configMapper.listByExample(params);

		Map<String, List<SystemConfig>> retMap = Maps.newHashMap();
		List<SystemConfig> tpList = Lists.newArrayList();
		for (SystemConfig c : list) {
			if (null != c) {
				// 如果包含该key
				if (retMap.containsKey(c.getNameSpace())) {
					tpList = retMap.get(c.getNameSpace());
					tpList.add(c);
				} else {
					tpList = Lists.newArrayList();
					tpList.add(c);
					retMap.put(c.getNameSpace(), tpList);
				}

			}
		}
		return retMap;
	}

}
