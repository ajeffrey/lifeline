CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  aggregateId VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE INDEX users_aggregateId ON users (aggregateId);
CREATE INDEX users_email ON users (email);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  aggregateId VARCHAR(255),
  creatorId INTEGER,
  name VARCHAR(255)
);

CREATE INDEX tasks_aggregateId ON tasks (aggregateId);
CREATE INDEX tasks_creatorId ON tasks (creatorId);