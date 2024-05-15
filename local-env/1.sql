CREATE SCHEMA IF NOT EXISTS `spring-example3`;
USE `spring-example3`;

DROP TABLE IF EXISTS EVENTS;
CREATE TABLE EVENTS (
    ID int PRIMARY KEY AUTO_INCREMENT,
    event_message varchar(255)
);