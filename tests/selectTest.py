from database import get_connection

conn = get_connection()
cur = conn.cursor()

out = list(cur.execute("SELECT * FROM champs WHERE id LIKE 1"))

print()
