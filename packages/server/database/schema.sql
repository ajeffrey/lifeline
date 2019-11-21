CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  eventType VARCHAR(40),
  tenantId VARCHAR(255),
  createdAt UNSIGNED BIGINT,
  payload TEXT
);

CREATE TABLE users (
  id VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE INDEX users_id ON users (id);
CREATE INDEX users_email ON users (email);
CREATE INDEX events_sift ON events (tenantId, createdAt);