-- Up

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    permissions TEXT NOT NULL
);

CREATE UNIQUE INDEX unique_usernames ON users (username);

-- Passwords correspond to "default-password" as that is hardcoded into the
-- server. There are no passwords in the app as of now because it's intended to
-- be hosted on a private network anyways but the ability is there anyways.
INSERT INTO users (username, password, name, permissions)
VALUES
    ("master", "$2b$12$rim5R2n75fcVjbKaLnhM6.UhIj31DDBvAoCtwuGe4Tnu6OXi00Dqa",  "Master", json_array(1, 2)),
    ("emmeria", "$2b$12$tLz5qpF/XI4uzYwT1Cx3ku8q1FJCugRLpjT5feoNLa8uq4ZNI93PG", "Republic of Emmeria", json_array()),
    ("estovakia", "$2b$12$1YfdRnAzF3QLlESDD4LUcePYDHZ5fWNpiY8vsNW4qcGTfvktyARWy", "Federal Republic of Estovakia", json_array()),
    ("yuktobania", "$2b$12$0.pTgIMRWERKH05.j2VUMeByjR6azeyIyLvJ1Ml9YCElguZo9ahcO", "Union of Yuktobanian Republics", json_array()),
    ("isaf", "$2b$12$mq9H.CBstj40uBQyuy61BO.84vM332fhALLhQ0zOdxkLGdObvJu5.", "Independent States Allied Forces", json_array()),
    ("aurelia", "$2b$12$27x.VGXI8WFmhIf2Sp9DQukxvA.kgIqfrOhoQqT7AviQ2MmI7Neh6", "Federal Republic of Aurelia", json_array()),
    ("belka", "$2b$12$QpzggkbFZCSXU2.wSXibl.017IlJBnt1YFBc0LUr0qlfb5.Bic/gO", "Principality of Belka", json_array());

ALTER TABLE markers ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Markers on existing tacmap are all for Emmeria currently. Will merge master
-- instance and its data into the regular instance manually.
UPDATE markers SET user_id = 2;

-- Down

DROP TABLE users;

ALTER TABLE markers DROP COLUMN user_id;
