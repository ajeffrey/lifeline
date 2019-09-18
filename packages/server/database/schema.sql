CREATE TABLE users (
  id VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE INDEX users_id ON users (id);
CREATE INDEX users_email ON users (email);

CREATE TABLE cards (
  id VARCHAR(255),
  type VARCHAR(10),
  creatorId INTEGER,
  name VARCHAR(255),
  kind VARCHAR(255)
);

CREATE INDEX cards_id ON cards (id);
CREATE INDEX cards_creatorId ON cards (creatorId);