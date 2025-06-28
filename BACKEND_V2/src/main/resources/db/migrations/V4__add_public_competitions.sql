ALTER TABLE competitions
    ADD public BOOLEAN DEFAULT FALSE;

ALTER TABLE competitions
    ALTER COLUMN public SET NOT NULL;