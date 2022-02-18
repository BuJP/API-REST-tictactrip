DROP TABLE IF EXISTS justified_text;
DROP TABLE IF EXISTS users;



CREATE TABLE users (
email CHAR(255) NOT NULL PRIMARY KEY);

CREATE TABLE justified_text (
id SERIAL NOT NULL,
user_id CHAR(255) NOT NULL,
text TEXT NOT NULL,
created_at TIMESTAMP NOT NULL,
length INTEGER NOT NULL);

ALTER TABLE justified_text ADD CONSTRAINT justified_text_user FOREIGN KEY (user_id) REFERENCES users(email);