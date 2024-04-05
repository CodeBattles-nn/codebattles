import os
from dotenv import load_dotenv

import env
from app import *
from database import init_tables
from database.redis import redis_pool_init

import web


def init_env():
    dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path)

    env.init()
    redis_pool_init()


def webapp():
    init_env()
    init_tables()
    return app


if __name__ == '__main__':
    webapp().run(host="0.0.0.0", port=2500, debug=True)
