from app import *

from web.accounts import *
from web.battle import *
from web.api import *
from web.sends import *
from web.admin.auth import *
from web.admin.panel import *
from web.admin.problems import *

if __name__ == '__main__':
    app.run(host="0.0.0.0")
