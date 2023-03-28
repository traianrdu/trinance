import psycopg2.extras


class PostgresqlManager:

    def __init__(self, database, user, password, host, port):
        self.conn = psycopg2.connect(database=database,
                                     user=user, password=password,
                                     host=host, port=port)
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()

    def insert_row(self):
        """Insert row into db"""

    def insert_multiple_rows(self, data):
        """Insert row into db"""
        insert_query = 'INSERT INTO personal_investment ("timestamp", payment_date, category, item, bank_account, ' \
                       'currency, price_original, merchant, country, info, price_ron, price_eur, price_usd) VALUES %s;'
        psycopg2.extras.execute_values(self.cursor, insert_query, data, template=None)

    def insert_from_csv(self, csv_row):
        """Insert row from csv value"""
        sql = "INSERT INTO personal_investment VALUES (DEFAULT,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        self.cursor.execute(sql, tuple(csv_row.values[0]))

    def update_row(self):
        """Update row into db"""

    def close(self):
        """Closes connection with db"""
        self.cursor.close()
        self.conn.close()

    def select_all(self):
        sql = '''select * from personal_investment;'''
        self.cursor.execute(sql)
        for i in self.cursor.fetchall():
            print(i)
