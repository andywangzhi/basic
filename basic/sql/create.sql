--数据库mysql 5.6.0 以上
CREATE database basic;

CREATE USER 'basic'@'%'  IDENTIFIED BY '123456'; 

GRANT USAGE ON *.* TO 'basic'@'%' WITH MAX_QUERIES_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT SELECT, INSERT, UPDATE, REFERENCES, DELETE, CREATE, DROP, ALTER, INDEX, TRIGGER, CREATE VIEW, SHOW VIEW, EXECUTE, ALTER ROUTINE, CREATE ROUTINE, CREATE TEMPORARY TABLES, LOCK TABLES, EVENT ON `basic`.* TO 'basic'@'%';

GRANT GRANT OPTION ON `basic`.* TO 'basic'@'%';