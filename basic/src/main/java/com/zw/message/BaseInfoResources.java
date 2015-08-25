package com.zw.message;

import java.text.MessageFormat;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import com.google.common.base.Strings;

/**
 * 
 * @Description:资源文件读取器
 * @author JASSON_XU
 * @2015年5月7日上午10:50:11
 */
public class BaseInfoResources {

	protected static Logger logger = Logger.getLogger(BaseInfoResources.class
			.toString());

	private final static String MESSAGE_BUNDLE_NAME = "BaseInfoResources";

	private ResourceBundle res;

	// singleton
	protected static BaseInfoResources instance = new BaseInfoResources();

	public static BaseInfoResources getInstance() {
		return instance;
	}

	// 无参构造方法
	private BaseInfoResources() {
		loadResourceBundle();
	}

	public void loadResourceBundle() {
		res = ResourceBundle.getBundle(MESSAGE_BUNDLE_NAME);
		if (res == null) {
			logger.warn("No resource bundle is found: " + MESSAGE_BUNDLE_NAME);
		}
	}

	public String getMessage(String key, String defVal) {
		if (!Strings.isNullOrEmpty(res.getString(key))) {
			return res.getString(key);
		} else {
			return defVal;
		}
	}

	public String getMessage(String key) {
		if (!Strings.isNullOrEmpty(res.getString(key))) {
			return res.getString(key);
		} else {
			return String.format("请在%s中定义异常信息%s", MESSAGE_BUNDLE_NAME, key);
		}
	}
	
	public String getFormateMessage(String key, String param){
		return this.getFormateMessage(key, new String[]{param});
	}

	public String getFormateMessage(String key, String[] params){
		String msg = getMessage(key);
		if(!Strings.isNullOrEmpty(msg)){
			MessageFormat messageFormat = new MessageFormat(msg);
			msg =  messageFormat.format(params);
		}
		return msg;
	}
}
