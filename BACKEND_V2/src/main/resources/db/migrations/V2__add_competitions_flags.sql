ALTER TABLE competitions
    ADD show_input BOOLEAN;

ALTER TABLE competitions
    ADD show_output BOOLEAN;

ALTER TABLE competitions
    ALTER COLUMN show_input SET NOT NULL;

ALTER TABLE competitions
    ALTER COLUMN show_output SET NOT NULL;