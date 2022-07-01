CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE currencies (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	symbol TEXT NOT NULL
);

CREATE TABLE wishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  sort INTEGER DEFAULT 0,
  archive BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  category_id INTEGER NOT NULL
  REFERENCES categories(id),

  currency_id INTEGER NOT NULL
  REFERENCES currencies(id)
);

CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),

  wish_id INTEGER NOT NULL
  REFERENCES wishes(id)
);

CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE session
ADD CONSTRAINT session_pkey
PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON wishes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
