import sqlite3

from database.createTables import CHAMPS_TABLE, PROBLEMS_TABLE


def get_connection():
    return sqlite3.connect("data/db.db")


def init_tables():
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(CHAMPS_TABLE)
    cur.execute(PROBLEMS_TABLE)

    connection.commit()
