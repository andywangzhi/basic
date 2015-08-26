package com.zw.common;

public interface Constant {
	
	/**
	 * 操作
	 */
	public static final String OPERATION_SAVE = "保存";

	public static final String OPERATION_DELETE = "删除";

	public static final String OPERATION_UPDATE = "更新";

	public static final String OPERATION_QUERY = "查询";
	
	public static final String OPERATION_REFESH = "刷新";
	
	public static final String EXPORT_TEMPLATE = "下载模板";

	/** 数据状态 */
	// 已删除 无效
	public static final String DATA_STATUS_DELETE = "0";
	// 正常 有效
	public static final String DATA_STATUS_NORMAL = "1";

	// like 查询的数据库标识符
	public static final String FEILD_LIKE_SYMBOL = "%";

	// 系统类型编号在与自定类型一起的树结构下的编号前缀
	public static final String SYSTYPE_ID_PREFIX = "root";

	// 设备编号 sequence 名称
	public static final String SEQ_NAME_DEVICE_ID = "seq_device_id";

	// 员工编号 sequence 名称
	public static final String SEQ_NAME_STAFF_ID = "seq_staff_id";
	
	// 业主 sequence 名称
	public static final String SEQ_OWNER_STAFF_ID = "seq_owner_id";
	
	// 租户个人 sequence 名称
	public static final String SEQ_TENANT_PERSONAL_ID = "seq_tenant_personal_id";

	/** 设备功能 **/
	// 只读
	public static final String FUNC_READONLY = "0";
	// 只写
	public static final String FUNC_WRITEONLY = "1";
	//读写
	public static final String FUNC_READ_WRITE = "3";
	
	/**
	 * 生成设备编号分隔符
	 */
	public static final String DEVICE_ID_SPLIT = "_";
	
	public static final String SERVICE_SUCCESS = "0";
}
