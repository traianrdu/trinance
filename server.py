import json
from ast import literal_eval

from flask import Flask, request, make_response, current_app
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__, static_url_path='')
cors = CORS(app, resources={r'/*': {"origins": '*'}})
app.config["DEBUG"] = True


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


# request form data test
@app.route("/test2", methods=['GET', 'POST', 'OPTIONS'])
def test2():
    if request.method == 'POST':
        try:
            #file = request.form['formData']
            #print(file.json)
            #print(file[2])
            """
            print(request.data)
            parsedata = request.data.decode('utf8')
            data = json.loads(parsedata)
            s = json.dumps(data, indent=4, sort_keys=True)
            print(s)
            """
            """
            data = literal_eval(request.data.decode('utf8'))
            print(data)
            print('- ' * 20)

            s = json.dumps(data, indent=4, sort_keys=True)
            print(s)
            """
            # get json data as string
            data = request.get_json()
            # load string as json
            data_json = json.loads(data)
            print(type(data_json))
            print(data_json)
            # read items from dict
            for i in data_json['items']:
                print(i)
            #json_object = request.json.items
            #print(json_object)

            #json_parser = json.load(json_object)
            """print(json_object['items'])
            for i in json_object['items']:
                print(i)
                print("---------------")"""
            #print(request.json)
            #print(json.dumps(file))
        except Exception as e:
            print(f"Couldn't read data {e}")
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


@app.route("/", methods=['GET', 'POST'])
def home():
    """Home page"""
    return app.send_static_file('index.html')  # Return index.html from the static folder


if __name__ == "__main__":
    app.run(host='0.0.0.0')
