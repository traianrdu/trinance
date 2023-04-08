from flask import Blueprint, request


dashboard_api = Blueprint("dashboard", __name__)


@dashboard_api.route("/update-forex-to-ron", methods=['GET', 'OPTIONS'])
def update_forex_to_ron():
    if request.method == 'GET':
        print("abcd")
    return {"status": False, "statusText": "rejected", "data": "none", "error": "GET request not met"}, 404


@dashboard_api.route("/get-dashboard-data", methods=['GET', 'OPTIONS'])
def get_dashboard_data():
    if request.method == 'GET':
        # get data from bd
        print("abc")
    return {"status": False, "statusText": "rejected", "data": "none", "error": "GET request not met"}, 404
