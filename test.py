from server import CSVConverter, PostgresqlManager, CurrencyManager
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
    cm = CurrencyManager()
    if datetime.datetime(2022, 12, 5).weekday() < 5:
        print(cm.convert_to_RON(float(9.6), 'EUR', 2022, 12, 1))

