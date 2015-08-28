package com.zw.entity;

import java.util.Date;
import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "mstb_sys_menu")
public class MstbSysMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 菜单名称
     */
    @Column(name = "name")
    private String name;

    /**
     * 上级ID
     */
    @Column(name = "parent_id")
    private Integer parentId;

    /**
     * 地址
     */
    @Column(name = "url")
    private String url;
    
    /**
     * 图标
     */
    @Column(name = "icon")
    private String icon;

    /**
     * 状态：1启用
     */
    @Column(name = "is_valid")
    private String isValid;

    /**
     * 状态：1正常
     */
    private String status;

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
     * 获取上级ID
     *
     * @return parent_id - 上级ID
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 设置上级ID
     *
     * @param parentId 上级ID
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取地址
     *
     * @return url - 地址
     */
    public String getUrl() {
        return url;
    }

    /**
     * 设置地址
     *
     * @param url 地址
     */
    public void setUrl(String url) {
        this.url = url;
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

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	public static void main(String[] args) {  
//	    int x[]={1,2,3,4,5,6,7};//权限id  
//	    //总的权限，即有3和6的权限(2^3+2^6)  
	    int cx=(int)Math.pow(2,1)+(int)Math.pow(2,4);
	    int cc=(2<<(1-1))+(2<<(2-1));
	    System.out.println(cx+":"+cc);
	    int x =cx|cc;
	    System.out.println(x);
//	    int xx=2<<1;
//	    System.out.println(xx);
//	    System.out.println(cx);
	    int c=(int)Math.pow(2,5); //要检查的权限  
	    System.out.println(c);
	    int v = x & c; //结果(cx & 2^?)  
	    System.out.println(c==v);//如果相同，则有此权限  
	}  
    
}