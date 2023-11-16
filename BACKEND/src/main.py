import os
from dotenv import load_dotenv

import env
from app import *
from database import init_tables
from database.redis import redis_pool_init

from web.admin.auth import *
from web.admin.panel import *
from web.admin.problems import *

from web.api.auth import *
from web.api.battle import *
from web.api.sends import *

from web.api.send_prog import *

from web.checker_api import *

import web.teacher_api


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
    webapp().run(host="0.0.0.0", port=80, debug=True)
