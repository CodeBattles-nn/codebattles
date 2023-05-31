import sqlite3

conn = sqlite3.connect("db.db")
cur = conn.cursor()

out = list(cur.execute("SELECT * FROM champs WHERE id LIKE 1"))

print()