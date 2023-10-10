-- Up

CREATE TABLE users (
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    permissions TEXT NOT NULL
);

CREATE UNIQUE INDEX unique_usernames ON users (username);

INSERT INTO users (username, name, permissions)
VALUES
    ("master", "Master", json_array(1, 2)),
    ("emmeria", "Republic of Emmeria", json_array());

-- Down

DROP TABLE users;
