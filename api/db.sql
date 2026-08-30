CREATE DATABASE todo;
\c todo;

CREATE TABLE IF NOT EXISTS taches (
<<<<<<< HEAD
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255) NOT NULL
=======
  id SERIAL PRIMARY KEY,
  designation VARCHAR(255) NOT NULL
>>>>>>> main
);