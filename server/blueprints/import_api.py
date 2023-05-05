from flask import Blueprint, request
import json
from server import Category, Report, get_db_info, PostgresqlManager
from decimal import Decimal
from re import sub

import_api = Blueprint("import", __name__)


# request form data
@import_api.route("/csv", methods=['GET', 'POST', 'OPTIONS'])
def import_csv_api():
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
                    report = Report(None, timestamp, date, category, bought_item, account, currency, amount, merchant,
                                    country, info, amount_ron, amount_eur, amount_usd)
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
