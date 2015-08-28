package com.zw.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.google.common.collect.Maps;
import com.zw.common.Constant;
import com.zw.entity.MstbSysAccount;
import com.zw.exception.BaseInfoException;
import com.zw.repository.MstbSysAccountMapper;
import com.zw.service.MstbSysAccountService;
import com.zw.util.BasicInfoServiceUtil;

@Service
public class MstbSysAccountServiceImpl extends BaseServiceImpl<MstbSysAccount> implements MstbSysAccountService{

	@Resource
	public  MstbSysAccountMapper accountMapper;
	
	@Override
	public List<MstbSysAccount> listPageByEntity(MstbSysAccount entity, int pageNum, int pageSize)
			throws BaseInfoException {
		PageHelper.startPage(pageNum, pageSize);

		Map<Object, Object> params = Maps.newHashMap();
		if (null != entity) {
			params.put("id", entity.getId());
			params.put("gender", entity.getGender());
			params.put("isValid", entity.getIsValid());
			params.put("loginCode", entity.getLoginCode());
		}
		// 根据创建时间排序
		params.put("orderBy", "create_time");
		params.put("sort", "desc");
		return accountMapper.listByExample(params);
	}

	@Override
	public Map<Object, Object> saveByEntity(MstbSysAccount entity) throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("登陆账号", entity.getLoginCode());
		BasicInfoServiceUtil.checkParam("密码", entity.getPassword());

		// 清空id防止复制新增的时候带id过来。
		entity.setId(null);
		entity.setIsValid(Constant.DATA_STATUS_NORMAL);//新建数据默认有效 
		// 检查是否存在相同的登陆名
		if (mapper.selectCount(entity) != 0) {
			throw new BaseInfoException("204001",entity.getLoginCode());
		}

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
	public Map<Object, Object> updateByEntity(MstbSysAccount entity) throws BaseInfoException {
		// 检查入参是否为空
		BasicInfoServiceUtil.checkParam("ID", entity.getId());
		BasicInfoServiceUtil.checkParam("登陆账号", entity.getLoginCode());
		BasicInfoServiceUtil.checkParam("密码", entity.getPassword());

		// 检查是否存在相同的登陆名
		if (mapper.selectCount(entity) != 0) {
			throw new BaseInfoException("204001",entity.getLoginCode());
		}

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
				mapper.deleteByPrimaryKey(id);
			}
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_DELETE);
		}
		return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_DELETE);
	}

	@Override
	public MstbSysAccount findByUsernameOrpassword(String username, String password) throws BaseInfoException {
		HashMap<Object, Object> map = new HashMap<Object, Object>();
		map.put("loginCode", username);
		map.put("password", password);
		List<MstbSysAccount> list = accountMapper.getByUsernameAndPassword(map);
		if (list!=null&&list.size()>0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public Map<Object, Object> updatePassword(Integer id, String password) throws BaseInfoException {
		BasicInfoServiceUtil.checkParam("ID", id);
		BasicInfoServiceUtil.checkParam("密码", password);
		HashMap<Object, Object> map = new HashMap<Object, Object>();
		map.put("id", id);
		map.put("password", password);
		int i = accountMapper.updatePassword(map);
		if (i==1) {
			return BasicInfoServiceUtil
					.OperaSuccessMap(Constant.OPERATION_UPDATE);
		}
		return BasicInfoServiceUtil.OperaFailMap(Constant.OPERATION_UPDATE);
	}

}
