DROP DATABASE chatApp;
CREATE DATABASE IF NOT EXISTS chatApp;

USE chatApp;

CREATE TABLE users (
  id int NOT NULL auto_increment,
  username varchar(20) NOT NULL,
  email varchar(320) NOT NULL,
  password varchar(20) NOT NULL,
  PRIMARY KEY (id)
  );

CREATE TABLE chats (
   id int NOT NULL auto_increment,
   name varchar(50) NOT NULL,
   createdAt int unsigned NOT NULL,
   users JSON NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE messages (
    id int NOT NULL auto_increment,
    createdAt int unsigned NOT NULL,
    message varchar(1000) NOT NULL,
    chatId int NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (chatId) REFERENCES chats(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO chatApp.users(username, email, password)
VALUES ('matteo', 'matteo@gmail.com', 1234);

INSERT INTO chatApp.users(username, email, password)
VALUES ('tressia', 'tressia@gmail.com', 5678);

INSERT INTO chatApp.chats(name, createdAt, users)
VALUES ('touTrou chat', 1650082300, '[1, 2]');

INSERT INTO chatApp.messages(createdAt, message, chatId, userId)
VALUES (1650082310, 'this is the first message from Tou to Trou', 1, 1);

INSERT INTO chatApp.messages(createdAt, message, chatId, userId)
VALUES (1650082312, 'this is a message back from Trou to Tou', 1, 2);



/*  Execute this file from the command line by typing:
 *    mysql -u root < src/main/db/schema.sql
 *  to create the database and the tables.*/


