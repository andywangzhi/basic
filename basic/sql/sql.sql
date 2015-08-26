create table system_config (
  id int(11) not null auto_increment,
  name_space varchar(50) not null comment '命名空间用于区分一类配置',
  config_key varchar(50) not null comment '配置key',
  config_name varchar(50) not null comment '配置名称',
  config_value varchar(100) not null comment '配置值',
  config_desc varchar(300) comment '描述',
  config_status varchar(1) comment '状态：0正常' default '0',
  create_time datetime comment '创建时间' default current_timestamp,
  update_time datetime comment '更新时间',
  primary key (id),
  unique key(name_space,config_key) 
) engine=innodb auto_increment=1 default charset=utf8 comment='系统配置表';

alter table system_config
add column config_ename varchar(50) comment '配置英文名称'  after config_name

alter table system_config
add column sort int(11) comment '排序值'  after config_desc

alter table system_config
add column default_val varchar(100) comment '默认值'  after config_value

alter table system_config
add column activate varchar(1) comment '生效情况：0:手动刷新，1：重启系统后生效，2：重新登录，3.即时'  after config_status