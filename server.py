from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
CORS(app)
app.config["DEBUG"] = True


@app.route("/test1", methods=['GET', 'POST'])
def test1():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


@app.route("/", methods=['GET', 'POST'])
def home():
    """Home page"""
    return app.send_static_file('index.html')  # Return index.html from the static folder


if __name__ == "__main__":
    app.run(host='0.0.0.0')
