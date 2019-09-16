CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  aggregateId VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE INDEX users_aggregateId ON users (aggregateId);
CREATE INDEX users_email ON users (email);

CREATE TABLE cards (
  id INTEGER PRIMARY KEY,
  type VARCHAR(10).
  aggregateId VARCHAR(255),
  creatorId INTEGER,
  name VARCHAR(255)
);

CREATE INDEX cards_aggregateId ON cards (aggregateId);
CREATE INDEX cards_creatorId ON cards (creatorId);