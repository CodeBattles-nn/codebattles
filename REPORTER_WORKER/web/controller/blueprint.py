from flask import Blueprint

internal_api = Blueprint('internal_api', __name__)
external_api = Blueprint('external_api', __name__)
