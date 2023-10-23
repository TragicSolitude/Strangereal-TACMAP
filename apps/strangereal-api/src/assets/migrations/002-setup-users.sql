-- Up

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    permissions TEXT NOT NULL
);

CREATE UNIQUE INDEX unique_usernames ON users (username);

INSERT INTO users (username, name, permissions)
VALUES
    ("master", "Master", json_array(1, 2)),
    ("emmeria", "Republic of Emmeria", json_array());

ALTER TABLE markers ADD COLUMN user_id INTEGER REFERENCES users(id);

UPDATE markers SET user_id = 2;

-- Down

DROP TABLE users;

ALTER TABLE markers DROP COLUMN user_id;
