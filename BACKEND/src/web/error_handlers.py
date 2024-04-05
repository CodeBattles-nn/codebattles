from app import app


@app.errorhandler(404)
@app.errorhandler(403)
@app.errorhandler(405)
@app.errorhandler(500)
def resource_not_found(e):
    return {'success': False, 'status': e.code, 'error': str(e)}, e.code
