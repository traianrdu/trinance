from util.csv_converter import CSVConverter

if __name__ == "__main__":
    csv_data = CSVConverter("Investment.csv")
    print(csv_data.get_csv_data())

