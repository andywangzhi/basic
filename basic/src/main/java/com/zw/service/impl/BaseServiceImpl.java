package com.zw.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.abel533.mapper.Mapper;
import com.github.pagehelper.PageHelper;
import com.zw.repository.MySqlSequenceMapper;
import com.zw.service.BaseService;

/**
 * 基本服务层实现类
 *@Description:TODO 
 *@author JASSON_XU
 *@2015年5月6日下午3:57:57
 * @param <T>
 */
@Service
public abstract class BaseServiceImpl<T> implements BaseService<T>{

    @Autowired
    protected Mapper<T> mapper;
    
    @Resource
    protected MySqlSequenceMapper seqMapper;

    @Override
    public int save(T entity){
        return mapper.insert(entity);
    }
    
    @Override
    public int update(T entity){
        return mapper.updateByPrimaryKey(entity);
    }
    
    @Override
    public int deleteByPrimaryKey(Object primarykey){
    	return mapper.deleteByPrimaryKey(primarykey);
    }

    /**
     * 单表分页查询
     *
     * @param pageNum
     * @param pageSize
     * @return
     */
    @Override
    public List<T> selectPage(int pageNum,int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        //Spring4支持泛型注入
        return mapper.select(null);
    }
    
    /**
     * 查询所有记录
     */
    @Override
    public List<T> selectAll(){
    	return mapper.select(null);
    };
    

}
