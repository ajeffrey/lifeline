#!/bin/sh
if [ ! -f keys/jwt ]; then
  mkdir -p keys && ssh-keygen -trsa -b4096 -m pem -N \"\" -f keys/jwt && openssl rsa -in keys/jwt -pubout -outform PEM -out keys/jwt.pub
fi

cp .env.example .env
rm -f database/db.sqlite3
sqlite3 database/db.sqlite3 < database/schema.sql && sqlite3 database/db.sqlite3 < database/seed.sql