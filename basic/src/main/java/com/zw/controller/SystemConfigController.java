package com.zw.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.zw.cache.SystemConfigCachePool;
import com.zw.common.Constant;
import com.zw.entity.SystemConfig;
import com.zw.service.SystemConfigService;
import com.zw.util.BasicInfoServiceUtil;
import com.zw.util.ResultMsgUtil;
import com.zw.util.ReturnJsonUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/system/config")
public class SystemConfigController extends BaseController {
	@Resource
	private SystemConfigService configService;

	@RequestMapping(value = "findAll")
	public @ResponseBody Object findAll(SystemConfig entity, Integer page,
			Integer rows) throws Exception {
		List<SystemConfig> list = configService.ListPageByEntity(entity, page,
				rows);
		// 返回符合easyUI所需的JSon格式数据
		return ResultMsgUtil.datagridFormat(new PageInfo<SystemConfig>(list));
	}

	@RequestMapping(value = "saveConfig")
	public @ResponseBody ResponseEntity<Map<Object, Object>> saveConfig(
			SystemConfig entity) throws Exception {
		Map<Object, Object> returnMap = configService.saveByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "updateConfig")
	public @ResponseBody ResponseEntity<Map<Object, Object>> updateConfig(
			SystemConfig entity) throws Exception {
		Map<Object, Object> returnMap = configService.updateByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "deleteConfigs")
	public @ResponseBody ResponseEntity<Map<Object, Object>> deleteConfigs(
			@RequestParam(value = "ids") Integer[] ids) throws Exception {
		Map<Object, Object> returnMap = configService.deleteByIds(ids);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "refresh")
	public @ResponseBody ResponseEntity<Map<Object, Object>> refresh()
			throws Exception {
		SystemConfigCachePool
				.refeshSystemConfigCache(SystemConfigCachePool.CONFIG_CACHE_KEY);
		return ReturnJsonUtil.bindResultResponseEntity(BasicInfoServiceUtil
				.OperaSuccessMap(Constant.OPERATION_REFESH));
	}

	@RequestMapping(value = "listConfig4Combox")
	public @ResponseBody Object listConfig4Combox(String nameSpace)
			throws Exception {
		List<SystemConfig> list = SystemConfigCachePool
				.getByNameSpace(nameSpace);
		JSONArray dataArr = new JSONArray();
		for(SystemConfig c: list){
			JSONObject obj = new JSONObject();
			obj.put("id", c.getConfigValue());
			obj.put("text", c.getConfigName());
			dataArr.add(obj);
		}
		return dataArr;
	}
	
	@RequestMapping("/findListByName")
	@ResponseBody
	public Object findListByName(String configName,String nameSpace) throws Exception {
		BasicInfoServiceUtil.checkParam("命名空间", nameSpace);
		if(Strings.isNullOrEmpty(configName)){
			return "";
		}
		configName = new String(configName.getBytes("iso8859-1"), "UTF-8");
		List<SystemConfig> list=SystemConfigCachePool.getByNameSpace(nameSpace);
		List<SystemConfig> returnList=new ArrayList<SystemConfig>();
		for(SystemConfig c:list){
			if(c.getConfigName().contains(configName)){
				returnList.add(c);
			}
		}
		return returnList;
	}

}
