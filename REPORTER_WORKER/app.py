import pathlib
from datetime import datetime

import jwt
from flask import Flask, send_file, request
from werkzeug.utils import secure_filename

app = Flask(__name__)


@app.route("/storage")
def sendfile():
    token = request.values["token"]

    decoded = jwt.decode(token, "secret", algorithms=["HS256"])
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


@app.route("/storage/list")
def listoffiles():
    token = request.values["reportid"]

    # decoded = jwt.decode(token, "secret", algorithms=["HS256"])
    # secure_path = secure_filename(decoded["reportID"]) + "/" + secure_filename(decoded["filename"])

    # decoded_expired_time = datetime.fromtimestamp(decoded["valid"])

    # if datetime.now() > decoded_expired_time:
    #     print(datetime.now(), ">", decoded_expired_time)
    #     print()
    #
    #     return "Not found", 404
    # else:
    #     print(datetime.now(), "<", decoded_expired_time)
    # print(token)
    # print(secure_path)
    # return send_file(f"localstorage/{secure_path}", as_attachment=True)
    from os import listdir
    from os.path import isfile, join

    mypath = f"localstorage/{secure_filename(token)}"

    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    onlyfiles = filter(lambda filename: filename.endswith("pdf"), onlyfiles)
    return list(onlyfiles)


if __name__ == '__main__':
    app.run(debug=True)
