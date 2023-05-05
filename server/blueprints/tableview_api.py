from flask import Blueprint, request
from server import Financial, PostgresqlManager, get_db_info
import json


tableview_api = Blueprint("tableview", __name__)


@tableview_api.route("/get-tableview-data", methods=['GET', 'OPTIONS'])
def get_dashboard_data():
    if request.method == 'GET':
        year = request.args.get('year')     # read year parameter
        if year is not None:
            # get db info based on config and env file
            db, db_user, db_pwd, db_host, db_port = get_db_info()
            # connect to db
            postgresql_manager = PostgresqlManager(db, db_user, db_pwd, db_host, db_port)
            # checks if we have empty price in RON
            empty_price_RON_list = postgresql_manager.select_empty_price_RON()
            is_empty_price = False
            if len(empty_price_RON_list) > 0:
                is_empty_price = True
            # create list json of objects
            data_list = json.dumps([obj.__dict__ for obj in [Financial(*financial) for financial in
                                    postgresql_manager.select_income_expenses_fixed_variable_from_year(year)]])
            postgresql_manager.close()  # close db connection
            data_json = {"isEmptyPrice": is_empty_price, "currency": "RON", "list": data_list}  # create data json
            # create json response
            return {"status": True, "statusText": "accepted", "data": data_json, "error": "none"}, 200
        return {"status": False, "statusText": "rejected", "data": "none", "error": "Year or month is none"}, 400
    return {"status": False, "statusText": "rejected", "data": "none", "error": "GET request not met"}, 400