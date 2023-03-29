import json
from ast import literal_eval
from decimal import Decimal
from re import sub
from flask import Flask, request, make_response, current_app
from flask_cors import CORS
from io import BytesIO
from server import Category, Report, get_db_info, PostgresqlManager

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
            # get json data as string
            data = request.get_json()
            # load string as json
            data_json = json.loads(data)
            # checks if data is ok
            is_data_ok = True
            # items list
            items_list = []
            # read items from dict
            for item in data_json['items']:
                timestamp = item['timestamp']
                date = item['date']
                category = item['category']
                bought_item = item['item']
                account = item['account']
                currency = item['currency']
                amount = item['amount']
                merchant = item['merchant']
                country = item['country']
                info = item['info']
                amount_ron = item['amountRON']
                amount_eur = item['amountEUR']
                amount_usd = item['amountUSD']

                # checks if data is empty
                is_empty, empty_val = is_data_empty(timestamp, data, category, bought_item, account, currency, amount,
                                                    merchant)

                # exit for if data is empty
                if is_empty:
                    is_data_ok = False
                    break
                else:  # continue to parse data
                    category = Category(category).name
                    amount = Decimal(sub(r'[^\d.]', '', amount))
                    if amount_ron != "":
                        amount_ron = Decimal(sub(r'[^\d.]', '', amount_ron))
                    if amount_eur != "":
                        amount_eur = Decimal(sub(r'[^\d.]', '', amount_eur))
                    if amount_usd != "":
                        amount_usd = Decimal(sub(r'[^\d.]', '', amount_usd))
                    report = Report(timestamp, date, category, bought_item, account, currency, amount, merchant, country, info,
                                    amount_ron, amount_eur, amount_usd)
                    report.empty_to_none()  # add none to empty data
                    print(report)
                    items_list.append(report.to_tuple())    # append tuple object

            if is_data_ok:
                # if we have items
                if len(items_list) > 0:
                    # get db info based on config and env file
                    db, db_user, db_pwd, db_host, db_port = get_db_info()
                    # connect to db
                    postgresql_manager = PostgresqlManager(db, db_user, db_pwd, db_host, db_port)
                    # insert rows
                    postgresql_manager.insert_multiple_rows(items_list)
                    # close connection
                    postgresql_manager.close()
                else:
                    print("we don't have items in the list")
            else:
                print("not ok")
        except Exception as e:
            print(f"Couldn't read data {e}")
    return {"status": 0, "statusText": "good", "data": "good data", "error": "none"}


def is_data_empty(*args):
    for arg in args:
        if arg == "":
            return True, arg
    return False, None


@app.route("/", methods=['GET', 'POST'])
def home():
    """Home page"""
    return app.send_static_file('index.html')  # Return index.html from the static folder


if __name__ == "__main__":
    app.run(host='0.0.0.0')
