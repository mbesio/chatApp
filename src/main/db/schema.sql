DROP DATABASE chatApp;
CREATE DATABASE IF NOT EXISTS chatApp;

USE chatApp;

CREATE TABLE Users (
  id int NOT NULL auto_increment,
  username varchar(20) NOT NULL,
  email varchar(320) NOT NULL,
  password varchar(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Chats (
   id int NOT NULL auto_increment,
   name varchar(50) NOT NULL,
   createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (id)
);

CREATE TABLE Messages (
    id int NOT NULL auto_increment,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    messageText varchar(1000) NOT NULL,
    chatId int NOT NULL,
    fromUser int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (chatId) REFERENCES Chats(id),
    FOREIGN KEY (fromUser) REFERENCES Users(id)
);

CREATE TABLE UsersOnChats (
  userId int NOT NULL,
  chatId int NOT NULL,
  joinedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leftAt TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (chatId) REFERENCES Chats(id)
);

CREATE UNIQUE INDEX UsersOnChats_user_chat_unique ON UsersOnChats(userId, chatId);


INSERT INTO chatApp.Users(username, email, password)
VALUES ('matteo', 'matteo@gmail.com', 1234);

INSERT INTO chatApp.Users(username, email, password)
VALUES ('tressia', 'tressia@gmail.com', 5678);

INSERT INTO chatApp.Chats(name)
VALUES ('touTrou chat');

INSERT INTO chatApp.Messages(messageText, chatId, fromUser)
VALUES ('this is the first message from Tou to Trou', 1, 1);

INSERT INTO chatApp.Messages(messageText, chatId, fromUser)
VALUES ('this is a message back from Trou to Tou', 1, 2);

INSERT INTO chatApp.UsersOnChats(userId, chatId)
VALUES (1, 1);

INSERT INTO chatApp.UsersOnChats(userId, chatId)
VALUES (2, 1);



/*  Execute this file from the command line by typing:
 *    mysql -u root < src/main/db/schema.sql
 *  to create the database and the tables.*/


