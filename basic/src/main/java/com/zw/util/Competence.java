package com.zw.util;

/**
 * 权限数字的运算
 * @author andy.wang
 *
 */
public class Competence {

	/**
	 * 根据权限点得到权限的总和
	 * @param i
	 * @return
	 */
	public static Integer getProduct(Integer[] i){
		Integer x=0;
		if (i==null||i.length==0) {
			return x;
		}
		for (int j : i) {
			x=x+(int)Math.pow(2,j);
		}
		return x;
	}
	
	/**
	 * 添加一个权限点
	 * @param i
	 * @return
	 */
	public static Integer addProduct(Integer i,Integer y){
		return(i)|((int)Math.pow(2,y));
	}
	
	/**
	 * 移除一个权限点
	 * @param i
	 * @return
	 */
	public static Integer rmProduct(Integer i,Integer y){
		return(i)-((int)Math.pow(2,y));
	}
	
	/**
	 * 合并两个权限值
	 * @param i
	 * @return
	 */
	public static Integer ergerProduct(Integer i,Integer y){
		return i|y;
	}
	
	/**
	 * 检查权限点是否在权限值中
	 * @param i
	 * @return
	 */
	public static boolean checkProduct(Integer i,Integer y){
		Integer x = (int)Math.pow(2,y);
		return x==(i&y);
	}
	
}
