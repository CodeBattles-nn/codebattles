import sqlite3
import psycopg2


from database.createTables import CHAMPS_TABLE, PROBLEMS_TABLE


def get_connection():
    return psycopg2.connect(dbname='cb', user='postgres', password='admin', host='localhost')


def init_tables():
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(CHAMPS_TABLE)
    cur.execute(PROBLEMS_TABLE)

    connection.commit()
