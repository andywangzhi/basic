package com.zw.entity;

import java.util.Date;
import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "mstb_sys_role")
public class MstbSysRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 角色名称
     */
    @Column(name = "name")
    private String name;

    /**
     * 状态：1启用
     */
    @Column(name = "is_valid")
    private String isValid;

    /**
     * 状态：1正常
     */
    @Column(name = "status")
    private String status;

    /**
     * 备注
     */
    @Column(name = "remark")
    private String remark;

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
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取状态：1启用
     *
     * @return is_valid - 状态：1启用
     */
    public String getIsValid() {
        return isValid;
    }

    /**
     * 设置状态：1启用
     *
     * @param isValid 状态：1启用
     */
    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    /**
     * 获取状态：1正常
     *
     * @return status - 状态：1正常
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置状态：1正常
     *
     * @param status 状态：1正常
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * 获取备注
     *
     * @return remark - 备注
     */
    public String getRemark() {
        return remark;
    }

    /**
     * 设置备注
     *
     * @param remark 备注
     */
    public void setRemark(String remark) {
        this.remark = remark;
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