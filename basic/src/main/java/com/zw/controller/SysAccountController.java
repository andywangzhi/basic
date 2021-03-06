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
import com.zw.entity.MstbSysAccount;
import com.zw.service.MstbSysAccountService;
import com.zw.util.ResultMsgUtil;
import com.zw.util.ReturnJsonUtil;

@Controller
@RequestMapping("/system/account")
public class SysAccountController {
	
	@Resource
	private MstbSysAccountService accountService;

	@RequestMapping(value = "findAll")
	public @ResponseBody Object findAll(MstbSysAccount entity, Integer page,
			Integer rows) throws Exception {
		List<MstbSysAccount> list = accountService.listPageByEntity(entity, page,
				rows);
		// 返回符合easyUI所需的JSon格式数据
		return ResultMsgUtil.datagridFormat(new PageInfo<MstbSysAccount>(list));
	}

	@RequestMapping(value = "saveTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> save(
			MstbSysAccount entity) throws Exception {
		Map<Object, Object> returnMap = accountService.saveByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "updateTemplate")
	public @ResponseBody ResponseEntity<Map<Object, Object>> update(
			MstbSysAccount entity) throws Exception {
		Map<Object, Object> returnMap = accountService.updateByEntity(entity);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}

	@RequestMapping(value = "deleteTemplates")
	public @ResponseBody ResponseEntity<Map<Object, Object>> deletes(
			@RequestParam(value = "ids") Integer[] ids) throws Exception {
		Map<Object, Object> returnMap = accountService.deleteByIds(ids);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}
	
	@RequestMapping(value = "updatePassword")
	public @ResponseBody ResponseEntity<Map<Object, Object>> updatePassword(
			Integer id,String password) throws Exception {
		Map<Object, Object> returnMap = accountService.updatePassword(id,password);
		return ReturnJsonUtil.bindResultResponseEntity(returnMap);
	}
}
