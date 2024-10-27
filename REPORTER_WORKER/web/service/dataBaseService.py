# ==============================================
# 1. Подключаем библиотеки Python
# ==============================================
import psycopg2
import csv


class DataBaseService():
    pass


databaseService = DataBaseService()

# ==============================================
# 2. Подключаемся к базе данных PGSQL
# ==============================================
conn = psycopg2.connect(dbname='cb', user='postgres',
                        password='admin', host='localhost')
# ==============================================
# 3. Получаем данные, кладем их в курсор
# ==============================================
cursor = conn.cursor()
cursor.execute('select * from champsends_10')
# --- Получаем наименования колонок
column_names = []
for row in cursor.description:
    column_names.append(row[0])
# ==============================================
# 4. Пишем файл CSV с колонками
# ==============================================
with open('filename.csv', 'w', newline='', encoding="utf-8") as filename:
    write_filename = csv.writer(filename, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    write_filename.writerow(column_names)
    for row in cursor:
        write_filename.writerow(row)
# ==============================================
# 5. Закрываем курсор
#    Закрываем соединение с Базой данных
# ==============================================
cursor.close()
conn.close()
