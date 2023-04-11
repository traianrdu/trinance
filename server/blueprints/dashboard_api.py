from flask import Blueprint, request, jsonify
from server import Financial, PostgresqlManager, get_db_info
import json


dashboard_api = Blueprint("dashboard", __name__)


@dashboard_api.route("/update-forex-to-ron", methods=['GET', 'OPTIONS'])
def update_forex_to_ron():
    if request.method == 'GET':
        print("abcd")
    return {"status": False, "statusText": "rejected", "data": "none", "error": "GET request not met"}, 404


@dashboard_api.route("/get-dashboard-data", methods=['GET', 'OPTIONS'])
def get_dashboard_data():
    if request.method == 'GET':
        # get db info based on config and env file
        db, db_user, db_pwd, db_host, db_port = get_db_info()
        # connect to db
        postgresql_manager = PostgresqlManager(db, db_user, db_pwd, db_host, db_port)
        # create list json of objects
        data_list = json.dumps([obj.__dict__ for obj in [Financial(*financial) for financial in
                                                         postgresql_manager.select_income_expenses_fixed_variable()]])
        postgresql_manager.close()  # close db connection
        data_json = {"currency": "RON", "list": data_list}  # create data json
        # create response json

        #return {"status": True, "statusText": "accepted", "data": jsonify(data_json), "error": "none"}, 200
        return jsonify(status=True, statuText="accepted", data=data_json, error="none")
    return {"status": False, "statusText": "rejected", "data": "none", "error": "GET request not met"}, 404
