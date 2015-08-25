package com.zw.repository;

import java.util.Map;


public interface MySqlSequenceMapper{
	
	public Integer getNextVal(String seqName);
	
	public Integer getCurrentVal(String seqName);
	
	public Integer setVal(Map<Object,Object> params);
}