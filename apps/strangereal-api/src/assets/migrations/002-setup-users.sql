-- Up

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    permissions TEXT NOT NULL
);

CREATE UNIQUE INDEX unique_usernames ON users (username);

INSERT INTO users (username, password, name, permissions)
VALUES
    ("master", "$2b$12$rim5R2n75fcVjbKaLnhM6.UhIj31DDBvAoCtwuGe4Tnu6OXi00Dqa",  "Master", json_array(1, 2)),
    ("emmeria", "$2b$12$tLz5qpF/XI4uzYwT1Cx3ku8q1FJCugRLpjT5feoNLa8uq4ZNI93PG", "Republic of Emmeria", json_array());

ALTER TABLE markers ADD COLUMN user_id INTEGER REFERENCES users(id);

UPDATE markers SET user_id = 2;

-- Down

DROP TABLE users;

ALTER TABLE markers DROP COLUMN user_id;
