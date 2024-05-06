import psycopg2
import env

from database.createTables import (
    CHAMPS_TABLE,
    PROBLEMS_TABLE,
    SERVERS_TABLE,
    STORAGE_TABLE,
    TEACHER_CHAMPS_TABLE,
    GLOBALUSERS_TABLE
)

__tables = [
    CHAMPS_TABLE,
    PROBLEMS_TABLE,
    SERVERS_TABLE,
    STORAGE_TABLE,
    TEACHER_CHAMPS_TABLE,
    GLOBALUSERS_TABLE
]


def get_connection():
    return psycopg2.connect(
        dbname=env.DB_NAME,
        user=env.DB_USERNAME,
        password=env.DB_PASSWORD,
        host=env.DB_HOST
    )


def init_tables():
    connection = get_connection()
    cur = connection.cursor()

    for sql in __tables:
        cur.execute(sql)

    connection.commit()
