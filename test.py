from util import CSVConverter
from manager import PostgresqlManager
from dotenv import load_dotenv
import os


if __name__ == "__main__":
    load_dotenv()   # load env file
    csv_converter = CSVConverter("Investment.csv")
    csv_data = csv_converter.get_csv_data()
    pm = PostgresqlManager(os.getenv("POSTGRES_DB_TEST"), os.getenv("POSTGRES_DB_USER"), os.getenv("POSTGRES_DB_PWD"), '127.0.0.1', '5432')
    pm.select_all()
    csv_row = csv_converter.get_csv_row(1)
    print(csv_row.values[0])
    #pm.insert_from_csv(csv_row)

