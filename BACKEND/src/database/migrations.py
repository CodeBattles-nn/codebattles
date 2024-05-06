_0_ADD_TYPE_OF_PROBLEM = """
ALTER TABLE problems
ADD COLUMN IF NOT EXISTS is_question BOOLEAN;
"""

sql_migrations = [
    _0_ADD_TYPE_OF_PROBLEM,
]
