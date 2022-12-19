import pandas as pd

class CSVConverter:
    """Converts .csv to db"""
    def __init__(self, file_name):
        """"""
        self.file_name = file_name

    def get_csv_data(self):
        data = pd.read_csv(self.file_name, index_col=False, delimiter=',')
        data.head()
        return data
