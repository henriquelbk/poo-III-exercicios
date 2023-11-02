-- Active: 1698889931077@@127.0.0.1@3306
CREATE TABLE superHeroes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    super_power TEXT NOT NULL,
    overall REAL NOT NULL
);

INSERT INTO superHeroes
VALUES 
('S001', 'Spiderman', 'web', 84),
('S002', 'Superman', 'fly', 96),
('S003', 'Batman', 'none', 86),
('S004', 'Aquaman', 'tsunami', 91);
