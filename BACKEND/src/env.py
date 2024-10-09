import os

DB_HOST = None
DB_USERNAME = None
DB_PASSWORD = None
DB_NAME = None
CHECKER_PORT = None
HASH_SALT = None
REDIS_HOST = None
ADMIN_LOGIN = None
ADMIN_PASSWORD = None
REQUIRE_CAPTCHA = None


def init():
    global DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, CHECKER_PORT, HASH_SALT, REDIS_HOST, ADMIN_LOGIN, ADMIN_PASSWORD, REQUIRE_CAPTCHA

    DB_HOST = os.environ.get("DB_HOST")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    CHECKER_PORT = os.environ.get("CHECKER_PORT")
    HASH_SALT = os.environ.get("HASH_SALT")
    REDIS_HOST = os.environ.get("REDIS_HOST")
    ADMIN_LOGIN = os.environ.get("ADMIN_LOGIN")
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")
    REQUIRE_CAPTCHA = os.environ.get("REQUIRE_CAPTCHA")

    if REQUIRE_CAPTCHA == "true":
        REQUIRE_CAPTCHA = True
    else:
        REQUIRE_CAPTCHA = False
