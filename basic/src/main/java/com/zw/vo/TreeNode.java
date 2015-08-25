package com.zw.vo;

import java.util.List;

import com.google.common.collect.Lists;

/**
 * 
 *@Description:由于封装树结构JSON数据 
 *@author JASSON_XU
 *@2015年5月14日下午3:15:02
 */
public class TreeNode {

	//树 JSON字段，由于需要区分节点的类型，改为String
	private String id;
	
	private String text;
	
	private Integer pid;
	
	private List<TreeNode> children = Lists.newArrayList();
	
	
	public TreeNode() {
	}
	
	public TreeNode(String name) {
		this.text = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	
	public void addChildNode(String name) {
		children.add(new TreeNode(name));
	}
	
	public void addChildNode(TreeNode node) {
		children.add(node);
	}
	
}
