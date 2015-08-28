package com.zw.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.Maps;
import com.zw.common.Constant;
import com.zw.entity.MstbSysRole;
import com.zw.exception.BaseInfoException;
import com.zw.repository.MstbSysRoleMapper;
import com.zw.service.MstbSysRoleService;
import com.zw.util.BasicInfoServiceUtil;

@Service
public class MstbSysRoleServiceImpl extends BaseServiceImpl<MstbSysRole> implements MstbSysRoleService{

	@Resource
	public MstbSysRoleMapper roleMapper;
	
	@Override
	public List<MstbSysRole> listPageByEntity(MstbSysRole entity, int pageNum, int pageSize) throws BaseInfoException {
		PageHelper.startPage(pageNum, pageSize);
		Map<Object, Object> params = Maps.newHashMap();
		if (null != entity) {
			params.put("id", entity.getId());
			params.put("isValid", entity.getIsValid());
			params.put("name", entity.getName());
		}
		//有效数据
		params.put("status", Constant.DATA_STATUS_NORMAL);
		// 根据创建时间排序
		params.put("orderBy", "create_time");
		params.put("sort", "desc");
		return roleMapper.listByExample(params);
	}

	@Override
	public Map<Object, Object> saveByEntity(MstbSysRole entity) throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("菜单名称", entity.getName());

		// 清空id防止复制新增的时候带id过来。
		entity.setId(null);
		entity.setIsValid(Constant.DATA_STATUS_NORMAL);//新建数据默认有效 
		entity.setStatus(Constant.DATA_STATUS_NORMAL);

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
	public Map<Object, Object> updateByEntity(MstbSysRole entity) throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("ID", entity.getId());
		BasicInfoServiceUtil.checkParam("菜单名称", entity.getName());

		entity.setUpdateTime(new Date());

		int ret = mapper.updateByPrimaryKey(entity);

		if (ret == 1) {
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_UPDATE);
		} else {
			return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_UPDATE);
		}
	}

	@Override
	public Map<Object, Object> deleteByIds(Integer[] ids) throws BaseInfoException {
		if (ids.length > 0) {
			for (Integer id : ids) {
				MstbSysRole record = mapper.selectByPrimaryKey(id);
				record.setStatus(Constant.DATA_STATUS_DELETE);
				mapper.updateByPrimaryKey(record);
			}
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_DELETE);
		}
		return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_DELETE);
	}
	
	
	
}
