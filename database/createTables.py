CHAMPS_TABLE = '''
    CREATE TABLE IF NOT EXISTS "champs" (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "started"	datetime,
        "A"	INTEGER,
        "B"	INTEGER,
        "C"	INTEGER,
        "D"	INTEGER,
        "E"	INTEGER,
        "F"	INTEGER,
        "G"	INTEGER,
        "H"	INTEGER,
        "I"	INTEGER,
        "J"	INTEGER,
        "K"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
    );
'''
PROBLEMS_TABLE = '''
    CREATE TABLE IF NOT EXISTS "problems" (
        "id"	INTEGER NOT NULL,
        "name"	TEXT,
        "description"	INTEGER,
        "in"	TEXT,
        "out"	TEXT,
        "tests"	TEXT,
        "examples"	BLOB,
        PRIMARY KEY("id" AUTOINCREMENT)
    );
'''


def getQueryUsersTable(champId):
    return f"""
        CREATE TABLE champUsers__{champId} (
            "id"	INTEGER NOT NULL,
            login   TEXT,
            password   TEXT,
            name	TEXT NOT NULL,
            A INTEGER,
            B INTEGER,
            C INTEGER,
            D INTEGER,
            E INTEGER,
            F INTEGER,
            G INTEGER,
            H INTEGER,
            I INTEGER,
            J INTEGER,
            K INTEGER,
            score int as (COALESCE(A, 0) + COALESCE(B, 0) + COALESCE(C, 0) + COALESCE(D, 0) + COALESCE(E, 0) + COALESCE(F, 0) + COALESCE(G, 0) + COALESCE(H, 0) + COALESCE(I, 0) + COALESCE(J, 0) + COALESCE(K, 0)),
            PRIMARY KEY("id" AUTOINCREMENT)
        )
    """


def getQuerySendsTable(champId):
    return f"""
        CREATE TABLE "champSends__{champId}" (
            "id"	INTEGER NOT NULL,
            "problem_letter"	INTEGER,
            "problem_name"	TEXT NOT NULL,
            "problem_id"	INTEGER,
            "user_id"	INTEGER,
            "send_time"	datetime,
            "state"	TEXT,
            "description"	TEXT,
            "program"	TEXT,
            "score"	INTEGER,
            "lang"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        )
    """
