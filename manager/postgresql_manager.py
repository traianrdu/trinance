import psycopg2


class PostgresqlManager:

    def __init__(self, database, user, password, host, port):
        self.conn = psycopg2.connect(database=database,
                                     user=user, password=password,
                                     host=host, port=port)
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()

    def insert_row(self):
        """Insert row into db"""

    def insert_from_csv(self, csv_row):
        """Insert row from csv value"""
        sql = "INSERT INTO personal_investment VALUES (DEFAULT,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        self.cursor.execute(sql, tuple(csv_row.values[0]))

    def update_row(self):
        """Update row into db"""

    def select_all(self):
        sql = '''select * from personal_investment;'''
        self.cursor.execute(sql)
        for i in self.cursor.fetchall():
            print(i)
