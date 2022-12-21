from util import CSVConverter
from manager import PostgresqlManager
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()   # load env file
    csv_data = CSVConverter("Investment.csv")
    print(csv_data.get_csv_data())
    pm = PostgresqlManager()
    pm.test()

