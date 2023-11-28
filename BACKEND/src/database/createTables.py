CHAMPS_TABLE = '''
    CREATE TABLE IF NOT EXISTS champs (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        started TIMESTAMP,
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
        K INTEGER
    ); 

'''
PROBLEMS_TABLE = '''
   CREATE TABLE IF NOT EXISTS problems (
        id  SERIAL PRIMARY KEY,
        name  TEXT,
        description  TEXT,
        "in"  TEXT,
        "out"  TEXT,
        tests  TEXT,
        examples  TEXT
    ); 
'''

SERVERS_TABLE = '''
CREATE TABLE IF NOT EXISTS servers
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    lang_name TEXT,
    address TEXT,
    enabled boolean DEFAULT true
)
'''

STORAGE_TABLE = '''
CREATE TABLE IF NOT EXISTS storage
(
    id SERIAL PRIMARY KEY,
    key TEXT,
    value TEXT
)
'''


def get_query_users_table(champ_id):
    return f"""
CREATE TABLE champUsers_{champ_id} (
    id SERIAL PRIMARY KEY,
    login TEXT,
    password TEXT,
    name TEXT NOT NULL,
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
    score INTEGER GENERATED ALWAYS AS (COALESCE(A, 0) + COALESCE(B, 0) + COALESCE(C, 0) + COALESCE(D, 0)
        + COALESCE(E, 0) + COALESCE(F, 0) + COALESCE(G, 0) + COALESCE(H, 0)
        + COALESCE(I, 0) + COALESCE(J, 0) + COALESCE(K, 0)) STORED
); 

    """


def get_query_sends_table(champ_id):
    return f"""
       CREATE TABLE champSends_{champ_id} (
        id SERIAL PRIMARY KEY,
        problem_letter TEXT,
        problem_name TEXT NOT NULL,
        problem_id INTEGER,
        user_id INTEGER,
        send_time TIMESTAMP,
        state TEXT,
        description TEXT,
        program TEXT,
        score INTEGER,
        lang TEXT
    ); 
    """
