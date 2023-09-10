import os

CHECK_SERVER_ENDPOINT = None
DB_HOST = None
DB_USERNAME = None
DB_PASSWORD = None
DB_NAME = None


def init():
    global CHECK_SERVER_ENDPOINT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME
    CHECK_SERVER_ENDPOINT = os.environ.get("CHECK_SERVER_ENDPOINT")
    DB_HOST = os.environ.get("DB_HOST")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")

