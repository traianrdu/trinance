from flask import Flask, request
from flask_cors import CORS
from io import BytesIO
from server import import_api


app = Flask(__name__, static_url_path='')
cors = CORS(app, resources={r'/*': {"origins": '*'}})
app.config["DEBUG"] = True


# define blueprints
app.register_blueprint(import_api, url_prefix="/import")


# request file test
@app.route("/test1", methods=['GET', 'POST', 'OPTIONS'])
def test1():
    if request.method == 'POST':
        try:
            file = request.files['file']
            filename = file.filename
            print(f"Uploading file {filename}")
            file_bytes = file.read()
            file_content = BytesIO(file_bytes).readlines()
            print(file_content)
        except Exception as e:
            print(f"Couldn't upload file {e}")
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


@app.route("/get-dashboard-data", methods=['GET', 'POST', 'OPTIONS'])
def get_dashboard_data():
    if request.method == 'GET':
        # do smth
        print("abc")
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


@app.route("/update-forex-to-ron", methods=['GET', 'POST', 'OPTIONS'])
def update_forex_to_ron():
    if request.method == 'GET':
        print("abcd")
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


@app.route("/import", methods=['GET', 'POST'])
def import_csv():
    """Import page"""
    return app.send_static_file('index.html')


@app.route("/dashboard", methods=['GET', 'POST'])
def dashboard():
    """Dashboard page"""
    return app.send_static_file('index.html')


@app.route("/", methods=['GET', 'POST'])
def home():
    """Home page"""
    return app.send_static_file('index.html')  # Return index.html from the static folder


if __name__ == "__main__":
    app.run(host='0.0.0.0')
