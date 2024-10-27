_0_ADD_TYPE_OF_PROBLEM = """
ALTER TABLE problems
ADD COLUMN IF NOT EXISTS is_question BOOLEAN;
"""

_1_ADD_TOTP_CODE = """
ALTER TABLE globalusers
ADD COLUMN IF NOT EXISTS totp TEXT;
"""

_2_CREATE_REPORTS_CHAMPS_TABLE = """
CREATE TABLE IF NOT EXISTS reports_champs (
        report_id SERIAL PRIMARY KEY,
        champ_id INTEGER,
        status INTEGER
        )
"""

sql_migrations = [
    _0_ADD_TYPE_OF_PROBLEM,
    _1_ADD_TOTP_CODE,
    _2_CREATE_REPORTS_CHAMPS_TABLE,
]
