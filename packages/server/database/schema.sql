CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE INDEX email ON users (email);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255)
);
