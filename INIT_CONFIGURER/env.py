from dotenv import load_dotenv
import os

DB_HOST = None
DB_USERNAME = None
DB_PASSWORD = None
DB_NAME = None


def init():
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path)

    global DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME
    DB_HOST = os.environ.get("DB_HOST")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")


