from flask import Flask

from web.controller import *
from web.controller.blueprint import internal_api
from web.service.envService import envService

app = Flask(__name__)

app.register_blueprint(internal_api, url_prefix=f'/{envService.INTERNAL_ENDPOINTS_PATH}')
app.register_blueprint(external_api, url_prefix=f'/{envService.PUBLIC_ENDPOINTS_PATH}')

if __name__ == '__main__':
    app.run(debug=True)
