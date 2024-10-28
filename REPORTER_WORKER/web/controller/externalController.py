from datetime import datetime

import jwt
from flask import send_file, request
from werkzeug.utils import secure_filename

from web.controller.blueprint import external_api
from web.service.envService import envService


@external_api.route("/")
def sendfile():
    token = request.values["token"]

    decoded = jwt.decode(token, envService.JWT_SECRET, algorithms=["HS256"])
    secure_path = secure_filename(decoded["reportID"]) + "/" + secure_filename(decoded["filename"])

    decoded_expired_time = datetime.fromtimestamp(decoded["valid"])

    if datetime.now() > decoded_expired_time:
        print(datetime.now(), ">", decoded_expired_time)
        print()

        return "Not found", 404
    else:
        print(datetime.now(), "<", decoded_expired_time)
    print(token)
    print(secure_path)
    return send_file(f"localstorage/{secure_path}", as_attachment=True)