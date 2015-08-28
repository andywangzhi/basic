package com.zw.entity;

import java.util.Date;
import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "mstb_sys_competence")
public class MstbSysCompetence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 权限类型：1用户,2角色，3组织
     */
    @Column(name = "c_type")
    private String cType;

    /**
     * 被赋对象的ID
     */
    @Column(name = "oid")
    private Integer oid;

    /**
     * 权限值
     */
    @Column(name = "val")
    private Integer val;

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
     * 获取权限类型：1用户,2角色，3组织
     *
     * @return c_type - 权限类型：1用户,2角色，3组织
     */
    public String getcType() {
        return cType;
    }

    /**
     * 设置权限类型：1用户,2角色，3组织
     *
     * @param cType 权限类型：1用户,2角色，3组织
     */
    public void setcType(String cType) {
        this.cType = cType;
    }

    /**
     * 获取被赋对象的ID
     *
     * @return oid - 被赋对象的ID
     */
    public Integer getOid() {
        return oid;
    }

    /**
     * 设置被赋对象的ID
     *
     * @param oid 被赋对象的ID
     */
    public void setOid(Integer oid) {
        this.oid = oid;
    }

    /**
     * @return val
     */
    public Integer getVal() {
        return val;
    }

    /**
     * @param val
     */
    public void setVal(Integer val) {
        this.val = val;
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