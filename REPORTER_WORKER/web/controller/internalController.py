from datetime import datetime, timedelta
from os import listdir
from os.path import isfile, join

import jwt
from flask import request, url_for
from werkzeug.utils import secure_filename

from web.controller.blueprint import internal_api
from web.service.envService import envService


@internal_api.route("/request", methods=['POST'])
def request_file():
    token = request.json["token"]
    filename = secure_filename(request.json["file"])
    report_id = secure_filename(request.json["reportID"])

    if token != envService.API_SECRET:
        return "Authorization failed", 401

    date_and_time = datetime.now()
    # Calling the timedelta() function
    time_change = timedelta(minutes=1)
    new_time = date_and_time + time_change

    encoded = jwt.encode({"reportID": report_id, "filename": filename, "valid": new_time.timestamp()},
                         envService.JWT_SECRET,
                         algorithm="HS256")

    getfile_url = f"{url_for('external_api.sendfile')}"

    return {"token": encoded, "endpoint": getfile_url, "url": getfile_url + "?token=" + encoded}


@internal_api.route("/list")
def listoffiles():
    reportid = request.json["reportID"]
    token = request.json["token"]

    if token != envService.API_SECRET:
        return "Authorization failed", 401

    mypath = f"localstorage/{secure_filename(reportid)}"

    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    onlyfiles = filter(lambda filename: filename.endswith("pdf"), onlyfiles)
    return list(onlyfiles)
