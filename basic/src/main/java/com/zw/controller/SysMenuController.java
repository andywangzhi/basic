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
import com.zw.entity.MstbSysMenu;
import com.zw.service.MstbSysMenuService;
import com.zw.util.ResultMsgUtil;
import com.zw.util.ReturnJsonUtil;

@Controller
@RequestMapping("/system/menu")
public class SysMenuController {
	
	@Resource
	private MstbSysMenuService menuService;

	@RequestMapping(value = "findAll")
	public @ResponseBody Object findAll(MstbSysMenu entity, Integer page,
			Integer rows) throws Exception {
		List<MstbSysMenu> list = menuService.listPageByEntity(entity, page,
				rows);
		// 返回符合easyUI所需的JSon格式数据
		return ResultMsgUtil.datagridFormat(new PageInfo<MstbSysMenu>(list));
	}

	@RequestMapping(value = "saveTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> save(
			MstbSysMenu entity) throws Exception {
		Map<Object, Object> returnMap = menuService.saveByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "updateTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> update(
			MstbSysMenu entity) throws Exception {
		Map<Object, Object> returnMap = menuService.updateByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "deleteTemplates")
	public @ResponseBody ResponseEntity<Map<Object, Object>> deletes(
			@RequestParam(value = "ids") Integer[] ids) throws Exception {
		Map<Object, Object> returnMap = menuService.deleteByIds(ids);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "listbyItem")
	public @ResponseBody Object listbyItem(Integer item) throws Exception {
		return menuService.listbyItem(item);
	}
}
