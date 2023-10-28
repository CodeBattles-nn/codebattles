import os
import psycopg2
import env
from colorama import Fore, Back, Style
import colorama

env.init()
colorama.init()

DIRECTORY = "./data/"

fileByValue = {}

for filename in os.listdir(DIRECTORY):
    with open(DIRECTORY + filename) as file:
        fileByValue[filename] = file.read()


def keyToDbFormat(val):
    return "INIT: " + val


with psycopg2.connect(
        dbname=env.DB_NAME,
        user=env.DB_USERNAME,
        password=env.DB_PASSWORD,
        host=env.DB_HOST) as connection:
    cursor = connection.cursor()

    cursor.execute("""
        SELECT key FROM storage
        WHERE key LIKE 'INIT: %'
    """)

    keys = cursor.fetchall()[0]
    print(Fore.MAGENTA +  "FOUND FILES: ")
    print(Fore.BLUE + " ".join(fileByValue.keys()))
    print("\n\n")
    print(Fore.MAGENTA + "Executing queries..."  + Style.RESET_ALL)
    print()

    for filename in fileByValue.keys():
        status = Fore.YELLOW + "_" + Style.RESET_ALL
        sql = fileByValue[filename]

        err = None

        if keyToDbFormat(filename) not in keys:
            try:
                cursor.execute(sql)
                cursor.execute(f"""INSERT INTO storage ("key") VALUES ('{keyToDbFormat(filename)}')""")
                status = Fore.GREEN + "+" + Style.RESET_ALL
                connection.commit()
            except Exception as e:
                err = e
                status = Fore.RED + "E" + Style.RESET_ALL
                connection.rollback()

        print(f"[{status}] {filename}")
        if err is not None:
            print(Fore.LIGHTCYAN_EX + "============= ERROR =============")
            print(Fore.LIGHTRED_EX + str(err.__class__))
            print(Fore.LIGHTCYAN_EX + "=================================")
            print(Fore.LIGHTRED_EX + str(err))
            print(Fore.LIGHTCYAN_EX + "=================================" + Style.RESET_ALL)
            print()

    print()
    print(Fore.MAGENTA +  "DONE")
