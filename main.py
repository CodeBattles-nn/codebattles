import os
from dotenv import load_dotenv

import env
from app import *
from database import init_tables

from web.accounts import *
from web.battle import *
from web.api import *
from web.sends import *
from web.admin.auth import *
from web.admin.panel import *
from web.admin.problems import *


def create_data_directory():
    os.makedirs("data", exist_ok=True)


def init_env():
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path)

    env.init()


if __name__ == '__main__':
    init_env()

    create_data_directory()
    init_tables()
    app.run(host="0.0.0.0")
