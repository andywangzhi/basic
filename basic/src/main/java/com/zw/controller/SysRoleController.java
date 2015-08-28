package com.zw.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.zw.entity.MstbSysRole;
import com.zw.service.MstbSysRoleService;
import com.zw.util.ResultMsgUtil;
import com.zw.util.ReturnJsonUtil;

@Controller
@RequestMapping("/system/role")
public class SysRoleController {
	
	@Resource
	private MstbSysRoleService roleService;

	@RequestMapping(value = "findAll")
	public @ResponseBody Object findAll(MstbSysRole entity, Integer page,
			Integer rows) throws Exception {
		List<MstbSysRole> list = roleService.listPageByEntity(entity, page,
				rows);
		// 返回符合easyUI所需的JSon格式数据
		return ResultMsgUtil.datagridFormat(new PageInfo<MstbSysRole>(list));
	}

	@RequestMapping(value = "saveTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> save(
			MstbSysRole entity) throws Exception {
		Map<Object, Object> returnMap = roleService.saveByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "updateTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> update(
			MstbSysRole entity) throws Exception {
		Map<Object, Object> returnMap = roleService.updateByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "deleteTemplates")
	public @ResponseBody ResponseEntity<Map<Object, Object>> deletes(
			@RequestParam(value = "ids") Integer[] ids) throws Exception {
		Map<Object, Object> returnMap = roleService.deleteByIds(ids);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

}
