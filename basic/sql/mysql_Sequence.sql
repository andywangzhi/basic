
DROP TABLE IF EXISTS sequence;  
CREATE TABLE sequence (  
         name VARCHAR(50) NOT NULL,  
         current_value INT NOT NULL,  
         increment INT NOT NULL DEFAULT 1,  
         PRIMARY KEY (name)  
) ENGINE=innodb;



DROP FUNCTION IF EXISTS currval;  
DELIMITER $  
CREATE FUNCTION currval (seq_name VARCHAR(50))  
         RETURNS INTEGER  
         LANGUAGE SQL  
         DETERMINISTIC  
         CONTAINS SQL  
         SQL SECURITY DEFINER  
         COMMENT ''  
BEGIN  
         DECLARE value INTEGER;  
         SET value = 0;  
         SELECT current_value INTO value  
                   FROM sequence  
                   WHERE name = seq_name;  
         RETURN value;  
END  
$  
DELIMITER ;



DROP FUNCTION IF EXISTS nextval;  
DELIMITER $  
CREATE FUNCTION nextval (seq_name VARCHAR(50))  
         RETURNS INTEGER  
         LANGUAGE SQL  
         DETERMINISTIC  
         CONTAINS SQL  
         SQL SECURITY DEFINER  
         COMMENT ''  
BEGIN  
         UPDATE sequence  
                   SET current_value = current_value + increment  
                   WHERE name = seq_name;  
         RETURN currval(seq_name);  
END  
$  
DELIMITER ;


DROP FUNCTION IF EXISTS setval;  
DELIMITER $  
CREATE FUNCTION setval (seq_name VARCHAR(50), value INTEGER)  
         RETURNS INTEGER  
         LANGUAGE SQL  
         DETERMINISTIC  
         CONTAINS SQL  
         SQL SECURITY DEFINER  
         COMMENT ''  
BEGIN  
         UPDATE sequence  
                   SET current_value = value  
                   WHERE name = seq_name;  
         RETURN currval(seq_name);  
END  
$  
DELIMITER;

--初始化设备编号的seq
INSERT INTO sequence VALUES ('seq_device_id', 0, 1);

