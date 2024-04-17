from flask import Flask, request, make_response

app = Flask(__name__)


@app.after_request
def cors_middleware(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response


@app.before_request
def before_request():
    if request.method in ("POST", "PUT", "PATCH", "DELETE"):
        if request.is_json:
            json_data = request.get_json()

            for key, value in json_data.items():
                modified_value = value \
                    .replace("'", "") \
                    .replace("\"", "") \
                    .replace("--", "") \
                    .replace(";", "")

                if modified_value != value:
                    return {"status": "something went wrong"}, 418
