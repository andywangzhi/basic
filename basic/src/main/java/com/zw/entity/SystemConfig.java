package com.zw.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "system_config")
public class SystemConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 命名空间用于区分一类配置
     */
    @Column(name = "name_space")
    private String nameSpace;

    /**
     * 配置key
     */
    @Column(name = "config_key")
    private String configKey;

    /**
     * 配置名称
     */
    @Column(name = "config_name")
    private String configName;

    /**
     * 配置英文名称
     */
    @Column(name = "config_ename")
    private String configEname;

    /**
     * 配置值
     */
    @Column(name = "config_value")
    private String configValue;

    /**
     * 默认值
     */
    @Column(name = "default_val")
    private String defaultVal;

    /**
     * 描述
     */
    @Column(name = "config_desc")
    private String configDesc;

    /**
     * 排序值
     */
    private Integer sort;

    /**
     * 状态：0正常
     */
    @Column(name = "config_status")
    private String configStatus;

    /**
     * 生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时
     */
    private String activate;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 更新时间
     */
    @Column(name = "update_time")
    private Date updateTime;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取命名空间用于区分一类配置
     *
     * @return name_space - 命名空间用于区分一类配置
     */
    public String getNameSpace() {
        return nameSpace;
    }

    /**
     * 设置命名空间用于区分一类配置
     *
     * @param nameSpace 命名空间用于区分一类配置
     */
    public void setNameSpace(String nameSpace) {
        this.nameSpace = nameSpace;
    }

    /**
     * 获取配置key
     *
     * @return config_key - 配置key
     */
    public String getConfigKey() {
        return configKey;
    }

    /**
     * 设置配置key
     *
     * @param configKey 配置key
     */
    public void setConfigKey(String configKey) {
        this.configKey = configKey;
    }

    /**
     * 获取配置名称
     *
     * @return config_name - 配置名称
     */
    public String getConfigName() {
        return configName;
    }

    /**
     * 设置配置名称
     *
     * @param configName 配置名称
     */
    public void setConfigName(String configName) {
        this.configName = configName;
    }

    /**
     * 获取配置英文名称
     *
     * @return config_ename - 配置英文名称
     */
    public String getConfigEname() {
        return configEname;
    }

    /**
     * 设置配置英文名称
     *
     * @param configEname 配置英文名称
     */
    public void setConfigEname(String configEname) {
        this.configEname = configEname;
    }

    /**
     * 获取配置值
     *
     * @return config_value - 配置值
     */
    public String getConfigValue() {
        return configValue;
    }

    /**
     * 设置配置值
     *
     * @param configValue 配置值
     */
    public void setConfigValue(String configValue) {
        this.configValue = configValue;
    }

    /**
     * 获取默认值
     *
     * @return default_val - 默认值
     */
    public String getDefaultVal() {
        return defaultVal;
    }

    /**
     * 设置默认值
     *
     * @param defaultVal 默认值
     */
    public void setDefaultVal(String defaultVal) {
        this.defaultVal = defaultVal;
    }

    /**
     * 获取描述
     *
     * @return config_desc - 描述
     */
    public String getConfigDesc() {
        return configDesc;
    }

    /**
     * 设置描述
     *
     * @param configDesc 描述
     */
    public void setConfigDesc(String configDesc) {
        this.configDesc = configDesc;
    }

    /**
     * 获取排序值
     *
     * @return sort - 排序值
     */
    public Integer getSort() {
        return sort;
    }

    /**
     * 设置排序值
     *
     * @param sort 排序值
     */
    public void setSort(Integer sort) {
        this.sort = sort;
    }

    /**
     * 获取状态：0正常
     *
     * @return config_status - 状态：0正常
     */
    public String getConfigStatus() {
        return configStatus;
    }

    /**
     * 设置状态：0正常
     *
     * @param configStatus 状态：0正常
     */
    public void setConfigStatus(String configStatus) {
        this.configStatus = configStatus;
    }

    /**
     * 获取生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时
     *
     * @return activate - 生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时
     */
    public String getActivate() {
        return activate;
    }

    /**
     * 设置生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时
     *
     * @param activate 生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时
     */
    public void setActivate(String activate) {
        this.activate = activate;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")  
   	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取更新时间
     *
     * @return update_time - 更新时间
     */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")  
   	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}