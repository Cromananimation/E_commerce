-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
USE ecommerce_db;
CREATE TABLE
category (
    id int unsigned NOT NULL AUTO_INCREMENT,
    category_name varchar(75) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
product (
    id int unsigned NOT NULL AUTO_INCREMENT,
    product_name varchar(55)NOT NULL,
    price float NOT NULL,
    stock int NOT NULL,
    category_id int DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
product_tag (
    id int unsigned NOT NULL AUTO_INCREMENT,
    product_id int DEFAULT NULL,
    tag_id int DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
tag (
    id int unsigned NOT NULL AUTO_INCREMENT,
    tag_name varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
SHOW DATABASES;
USE ecommerce_db;
SHOW TABLES;