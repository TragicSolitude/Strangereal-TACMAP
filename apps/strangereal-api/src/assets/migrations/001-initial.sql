-- Up

-- Need to ignore creating the table because migrations weren't setup for the
-- initial version of the db
CREATE TABLE IF NOT EXISTS markers (
    x NUMBER NOT NULL,
    y NUMBER NOT NULL,
    type TEXT NOT NULL,
    name TEXT
);

-- Down

DROP TABLE markers;
