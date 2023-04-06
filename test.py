from server import PostgresqlManager, CurrencyManager, get_db_info, Report
from dotenv import load_dotenv
import os
import datetime


if __name__ == "__main__":
    """
    load_dotenv()   # load env file
    csv_converter = CSVConverter("ceva.csv")
    csv_data = csv_converter.get_csv_data()
    pm = PostgresqlManager(os.getenv("POSTGRES_DB_TEST"), os.getenv("POSTGRES_DB_USER"), os.getenv("POSTGRES_DB_PWD"), '127.0.0.1', '5432')
    pm.select_all()
    csv_row = csv_converter.get_csv_row(1)
    print(csv_row.values[0])
    #pm.insert_from_csv(csv_row)
    """
    #cm = CurrencyManager()
    #if datetime.datetime(2022, 12, 5).weekday() < 5:
    #    print(cm.convert_to_RON(float(9.6), 'EUR', 2022, 12, 1))
    db, db_user, db_pwd, db_host, db_port = get_db_info()
    empty_price_RON = postgresql_manager.select_empty_price_RON()
    postgresql_manager.close()
    report_list = [Report(*report) for report in empty_price_RON]
    nr = Report(944, datetime.datetime(2023, 4, 2), datetime.datetime(2023, 2, 2), "fuel", "diesel", "Revolut HUF", "RON", 4310.00, "Omv 2077", "Ungaria", None, 12.22, None, None)
    print(report_list)
    print(nr.amount_ron)
    nr.update_price_for_currency("RON")
    print("RON:", nr.amount_ron)
    print("EUR:",nr.amount_eur)
    print("USD:",nr.amount_usd)

