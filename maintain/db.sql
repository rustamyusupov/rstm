CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	password TEXT NOT NULL
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
  price INTEGER NOT NULL,
  sort INTEGER DEFAULT 0,
  archive BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  categories_id INTEGER NOT NULL
  REFERENCES categories(id),

  currencies_id INTEGER NOT NULL
  REFERENCES currencies(id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON wishes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
