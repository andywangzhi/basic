package com.zw.exception;

import java.text.MessageFormat;

import com.zw.message.BaseInfoResources;

/**
 * 
 * @Description:自定义公共平台异常
 * @author JASSON_XU
 * @2015年5月7日上午10:02:25
 */
public class BaseInfoException extends Exception {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4971883064557160511L;

	private String msgCode;
	private String[] params;
	private String msg;

	public BaseInfoException() {
		super();
	}

	public BaseInfoException(String code) {
		this(code, "");
	}

	public BaseInfoException(String code, String param) {
		this(code, new String[] { param });
	}

	public BaseInfoException(String code, String param1, String param2) {
		this(code, new String[] { param1, param2 });
	}

	public BaseInfoException(String code, String[] params) {
		super(code);
		this.msgCode = code;
		this.params = params;

		// 获取资源代码对应描述
		this.msg = getMsgFromCfg(code, params);
	}

	/**
	 * 从配置文件中获取错误信息
	 * 
	 * @param errcode
	 * @param params
	 * @return
	 */
	public static String getMsgFromCfg(String errcode, String[] params) {
		String message = BaseInfoResources.getInstance().getMessage(errcode);
		return params == null ? message : MessageFormat.format(message,
				 params);
	}

	public String getMessageCode() {
		return this.msgCode;
	}

	public String[] getParams() {
		return params;
	}

	public String getMessage() {
		return msg;
	}

}
