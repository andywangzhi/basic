package com.zw.cache;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.common.base.Strings;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.zw.common.MessageCode;
import com.zw.entity.SystemConfig;
import com.zw.exception.BaseInfoException;
import com.zw.repository.SpringContextHolder;
import com.zw.service.SystemConfigService;

/**
 * 
 * @Description:系统配置参数缓存池
 * @author JASSON_XU
 * @2015年6月4日下午12:09:06
 */
public class SystemConfigCachePool {

	public static final String CONFIG_CACHE_KEY = "system.config";

	private static LoadingCache<String, Map<String, List<SystemConfig>>> configCache = CacheBuilder
			.newBuilder().maximumSize(1)
			.build(new CacheLoader<String, Map<String, List<SystemConfig>>>() {
				@Override
				public Map<String, List<SystemConfig>> load(String key)
						throws Exception {
					SystemConfigService configService = SpringContextHolder
							.getApplicationContext().getBean(
									SystemConfigService.class);
					return configService.ListAllMaps();
				}
			});

	public static Map<String, List<SystemConfig>> getSystemConfigCache(
			String key) throws ExecutionException {
		return configCache.get(key);
	}

	public static void refeshSystemConfigCache(String key)
			throws ExecutionException {
		configCache.refresh(key);
	}

	/**
	 * @throws BaseInfoException
	 * 
	 * @Title:getByNameSpace
	 * @Description:通过nameSpace拿集合
	 * @param @param nameSpace
	 * @param @return
	 * @param @throws ExecutionException
	 * @return List<SystemConfig>
	 * @throws
	 */
	public static List<SystemConfig> getByNameSpace(String nameSpace)
			throws ExecutionException, BaseInfoException {
		// check parameter
		if (Strings.isNullOrEmpty(nameSpace)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "nameSpace");
		}
		List<SystemConfig> list = SystemConfigCachePool.getSystemConfigCache(
				CONFIG_CACHE_KEY).get(nameSpace);

		if (list.size() == 0) {
			throw new BaseInfoException("204008", "nameSpace:" + nameSpace);
		}

		return list;
	}

	/**
	 * @throws Exception
	 * 
	 * @Title:getByNameSpaceAndKey
	 * @Description:通过命名空间和Key获取唯一的系统配置
	 * @param @param nameSpace
	 * @param @param configKey
	 * @param @return
	 * @param @throws ExecutionException
	 * @return SystemConfig
	 * @throws
	 */
	public static SystemConfig getByNameSpaceAndKey(String nameSpace,
			String configKey) throws Exception {

		// check parameter
		if (Strings.isNullOrEmpty(nameSpace)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "nameSpace");
		}
		if (Strings.isNullOrEmpty(configKey)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "configKey");
		}

		List<SystemConfig> list = SystemConfigCachePool.getSystemConfigCache(
				CONFIG_CACHE_KEY).get(nameSpace);
		SystemConfig config = null;
		for (SystemConfig c : list) {
			if (configKey.equals(c.getConfigKey())) {
				config = c;
			}
		}
		if (null == config) {
			throw new BaseInfoException("204008", "nameSpace:" + nameSpace
					+ ",configKey:" + configKey);
		}
		return config;
	}
	
	
	/**
	 * 
	 * @Title:getValue
	 * @Description:获取值
	 * @param @param nameSpace
	 * @param @param configKey
	 * @param @return
	 * @param @throws Exception
	 * @return String
	 * @throws
	 */
	public static String getValue(String nameSpace,
			String configKey) throws Exception {

		// check parameter
		if (Strings.isNullOrEmpty(nameSpace)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "nameSpace");
		}
		if (Strings.isNullOrEmpty(configKey)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "configKey");
		}

		List<SystemConfig> list = SystemConfigCachePool.getSystemConfigCache(
				CONFIG_CACHE_KEY).get(nameSpace);
		SystemConfig config = null;
		for (SystemConfig c : list) {
			if (configKey.equals(c.getConfigKey())) {
				config = c;
			}
		}
		if (null == config) {
			throw new BaseInfoException("204008", "nameSpace:" + nameSpace
					+ ",configKey:" + configKey);
		}
		return config.getConfigValue();
	}
	
	/**
	 * 
	 * @Title:getName
	 * @Description:获取显示名称
	 * @param @param nameSpace
	 * @param @param configKey
	 * @param @return
	 * @param @throws Exception
	 * @return String
	 * @throws
	 */
	public static String getName(String nameSpace,
			String configKey) throws Exception {

		// check parameter
		if (Strings.isNullOrEmpty(nameSpace)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "nameSpace");
		}
		if (Strings.isNullOrEmpty(configKey)) {
			throw new BaseInfoException(
					MessageCode.ERROR_PARAMS_NULL.toString(), "configKey");
		}

		List<SystemConfig> list = SystemConfigCachePool.getSystemConfigCache(
				CONFIG_CACHE_KEY).get(nameSpace);
		SystemConfig config = null;
		for (SystemConfig c : list) {
			if (configKey.equals(c.getConfigKey())) {
				config = c;
			}
		}
		if (null == config) {
			throw new BaseInfoException("204008", "nameSpace:" + nameSpace
					+ ",configKey:" + configKey);
		}
		return config.getConfigName();
	}

}
