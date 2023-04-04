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
        pass

    def insert_multiple_rows(self, data):
        """Insert multiple rows into db"""
        insert_query = 'INSERT INTO personal_investment ("timestamp", payment_date, category, item, bank_account, ' \
                       'currency, price_original, merchant, country, info, price_ron, price_eur, price_usd) VALUES %s;'
        psycopg2.extras.execute_values(self.cursor, insert_query, data, template=None)

    def update_row(self):
        """Update row into db"""
        pass

    def update_empty_price_RON(self):
        """Update multiple rows with the price in RON"""
        update_query = 'UPDATE personal_investment AS t SET price_ron = e.price_ron FROM (VALUES %s) ' \
                       'AS e(price_ron, id) WHERE e.id = t.id;'
        psycopg2.extras.execute_values(self.cursor, update_query, values, template=None)

    def close(self):
        """Closes connection with db"""
        self.cursor.close()
        self.conn.close()

    def select_all(self):
        """Returns all data from the table"""
        select_sql = 'select * from personal_investment;'
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()

    def select_empty_price_RON(self):
        """Selects only the rows with empty 'price_ron'"""
        select_sql = 'select * from personal_investment where price_ron is NULL'
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()