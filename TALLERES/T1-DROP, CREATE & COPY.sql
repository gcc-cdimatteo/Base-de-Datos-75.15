DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
	team 			VARCHAR(20) 	NOT NULL,
	players_used 	INT 			NOT NULL,
	avg_age 		FLOAT 			NOT NULL,
	possession 		FLOAT 			NOT NULL,
	games 			INT 			NOT NULL,
	goals 			INT 			NOT NULL,
	assists 		INT 			NOT NULL,
	cards_yellow 	INT 			NOT NULL,
	cards_red 		INT 			NOT NULL
);

COPY 
	teams 
FROM 
	'/Users/cdimatteo/Library/CloudStorage/GoogleDrive-cdimatteo@fi.uba.ar/My Drive/🍏 Base de Datos (75.15)/TALLERES/T1-DATASET/teams.csv'
DELIMITER
	';'
CSV HEADER -- IGNORE FIRST LINE
ENCODING 'LATIN1';
