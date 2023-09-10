import psycopg2
import env

from database.createTables import CHAMPS_TABLE, PROBLEMS_TABLE


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

    cur.execute(CHAMPS_TABLE)
    cur.execute(PROBLEMS_TABLE)

    connection.commit()
