package com.zw.service;

import java.util.List;

/**
 * 基本服务接口
 *@Description:TODO 
 *@author JASSON_XU
 *@2015年5月6日下午3:14:05
 * @param <T>
 */
public interface BaseService<T> {

	/**
	 * 
	 * @Title:save
	 * @Description:通过实体对象新增数据
	 * @param @param entity
	 * @param @return
	 * @return int
	 * @throws
	 */
    public int save(T entity);
    
    /**
     * 
     * @Title:update
     * @Description:通过实体修改数据
     * @param @param entity
     * @param @return
     * @return int
     * @throws
     */
    public int update(T entity);

    /**
     * 
     * @Title:deleteByPrimaryKey
     * @Description:根据主键删除
     * @param @param id
     * @param @return
     * @return int
     * @throws
     */
    public int deleteByPrimaryKey(Object primarykey);

    /**
     * 
     * @Title:selectPage
     * @Description:分页查询
     * @param @param pageNum
     * @param @param pageSize
     * @param @return
     * @return List<T>
     * @throws
     */
    public List<T> selectPage(int pageNum,int pageSize);
    
    /**
     * 
     * @Title:selectAll
     * @Description:查询所有
     * @param @return
     * @return List<T>
     * @throws
     */
    public List<T> selectAll();
    
}
