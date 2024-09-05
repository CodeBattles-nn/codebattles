_0_ADD_TYPE_OF_PROBLEM = """
ALTER TABLE problems
ADD COLUMN IF NOT EXISTS is_question BOOLEAN;
"""

_1_ADD_TOTP_CODE = """
ALTER TABLE globalusers
ADD COLUMN IF NOT EXISTS totp TEXT;
"""

sql_migrations = [
    _0_ADD_TYPE_OF_PROBLEM,
    _1_ADD_TOTP_CODE
]
