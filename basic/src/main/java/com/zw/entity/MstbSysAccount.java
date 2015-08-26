package com.zw.entity;

import java.util.Date;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "mstb_sys_account")
public class MstbSysAccount {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 地址
     */
    @Column(name = "ADDRESS")
    private String address;

    /**
     * 电子邮箱
     */
    @Column(name = "EMAIL")
    private String email;

    /**
     * 性别
     */
    @Column(name = "GENDER")
    private String gender;

    /**
     * 语言
     */
    @Column(name = "LANG")
    private String lang;

    /**
     * 登陆账号
     */
    @Column(name = "LOGIN_CODE")
    private String loginCode;

    /**
     * 中文名
     */
    @Column(name = "NAME_CN")
    private String nameCn;

    /**
     * 英文名
     */
    @Column(name = "NAME_EN")
    private String nameEn;

    /**
     * 密码
     */
    @Column(name = "PASSWORD")
    private String password;

    /**
     * 备注
     */
    @Column(name = "REMARK")
    private String remark;

    /**
     * 电话
     */
    @Column(name = "TEL")
    private String tel;

    /**
     * 是否有效
     */
    @Column(name = "IS_VALID")
    private String isValid;

    /**
     * @return ID
     */
    public Integer getId() {
        return id;
    }
    
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
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取地址
     *
     * @return ADDRESS - 地址
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置地址
     *
     * @param address 地址
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * 获取电子邮箱
     *
     * @return EMAIL - 电子邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置电子邮箱
     *
     * @param email 电子邮箱
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取性别
     *
     * @return GENDER - 性别
     */
    public String getGender() {
        return gender;
    }

    /**
     * 设置性别
     *
     * @param gender 性别
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * 获取语言
     *
     * @return LANG - 语言
     */
    public String getLang() {
        return lang;
    }

    /**
     * 设置语言
     *
     * @param lang 语言
     */
    public void setLang(String lang) {
        this.lang = lang;
    }

    
    
    /**
     * @return LOGIN_CODE
     */
    public String getLoginCode() {
        return loginCode;
    }

    /**
     * @param loginCode
     */
    public void setLoginCode(String loginCode) {
        this.loginCode = loginCode;
    }

    /**
     * 获取中文名
     *
     * @return NAME_CN - 中文名
     */
    public String getNameCn() {
        return nameCn;
    }

    /**
     * 设置中文名
     *
     * @param nameCn 中文名
     */
    public void setNameCn(String nameCn) {
        this.nameCn = nameCn;
    }

    /**
     * 获取英文名
     *
     * @return NAME_EN - 英文名
     */
    public String getNameEn() {
        return nameEn;
    }

    /**
     * 设置英文名
     *
     * @param nameEn 英文名
     */
    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    /**
     * 获取密码
     *
     * @return PASSWORD - 密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置密码
     *
     * @param password 密码
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取备注
     *
     * @return REMARK - 备注
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
     * 获取电话
     *
     * @return TEL - 电话
     */
    public String getTel() {
        return tel;
    }

    /**
     * 设置电话
     *
     * @param tel 电话
     */
    public void setTel(String tel) {
        this.tel = tel;
    }

    /**
     * 获取是否有效
     *
     * @return IS_VALID - 是否有效
     */
    public String getIsValid() {
        return isValid;
    }

    /**
     * 设置是否有效
     *
     * @param isValid 是否有效
     */
    public void setIsValid(String isValid) {
        this.isValid = isValid;
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