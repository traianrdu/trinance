from flask import Flask, request

app = Flask(__name__, static_url_path='')
app.config["DEBUG"] = True


@app.route("/", methods=['GET', 'POST'])
def home():
    """Home page"""
    return app.send_static_file('index.html')  # Return index.html from the static folder


if __name__ == "__main__":
    app.run(host='0.0.0.0')
