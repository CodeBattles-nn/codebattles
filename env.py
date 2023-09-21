import os


CHECK_SERVER = None
DB_HOST = None
DB_USERNAME = None
DB_PASSWORD = None
DB_NAME = None
CHECKER_PORT = None

def init():
    global CHECK_SERVER, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, CHECKER_PORT
    CHECK_SERVER = os.environ.get("CHECK_SERVER")
    DB_HOST = os.environ.get("DB_HOST")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    CHECKER_PORT = os.environ.get("CHECKER_PORT")

