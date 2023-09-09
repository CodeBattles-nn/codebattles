import os

CHECK_SERVER_ENDPOINT = None


def init():
    global CHECK_SERVER_ENDPOINT
    CHECK_SERVER_ENDPOINT = os.environ.get("CHECK_SERVER_ENDPOINT")
