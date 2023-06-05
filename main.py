import os

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


if __name__ == '__main__':
    create_data_directory()
    init_tables()
    app.run(host="0.0.0.0")
