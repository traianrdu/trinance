import psycopg2.extras
from ..enum.category import Category


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

    def update_empty_price_RON(self, values):
        """Update multiple rows with the price in RON"""
        update_query = 'UPDATE personal_investment AS t SET price_ron = e.price_ron FROM (VALUES %s) ' \
                       'AS e(id, price_ron) WHERE e.id = t.id;'
        psycopg2.extras.execute_values(self.cursor, update_query, values, template=None)

    def alter_auto_increment(self, value):
        """Alter auto increment to value"""
        alter = F'ALTER SEQUENCE personal_investment_id_seq RESTART WITH {value};'
        self.cursor.execute(alter)

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

    def select_income_fixed_variable(self):
        """Select day, income, fixed expenses and variable expenses ordered by day"""
        # income category
        income_sql = f"category LIKE '{Category.salary.name}' OR category LIKE '{Category.freelancing.name}'" \
                     f" OR category LIKE '{Category.extra.name}' OR category LIKE '{Category.person.name}'"
        # fixed cost category
        fixed_sql = f"category LIKE '{Category.home.name}' OR category LIKE '{Category.fuel.name}'" \
                    f" OR category LIKE '{Category.utilities.name}' OR category LIKE '{Category.groceries.name}'" \
                    f" OR category LIKE '{Category.subscriptions.name}' OR category LIKE '{Category.phone.name}'" \
                    f" OR category LIKE '{Category.donations.name}' OR category LIKE '{Category.sport.name}'"
        # variable cost category
        variable_sql = f"category LIKE '{Category.shopping.name}' OR category LIKE '{Category.entertainment.name}'" \
                       f" OR category LIKE '{Category.holiday.name}' OR category LIKE '{Category.gifts.name}'" \
                       f" OR category LIKE '{Category.restaurant.name}' OR category LIKE '{Category.friends.name}'" \
                       f" OR category LIKE '{Category.parking.name}' OR category LIKE '{Category.miscellaneous.name}'"
        # full query
        select_sql = f"SELECT cast(payment_date as date) as payment_day, " \
                     f"SUM(CASE WHEN {income_sql} THEN price_ron ELSE 0 END) income, " \
                     f"SUM(CASE WHEN {fixed_sql} OR {variable_sql} THEN price_ron ELSE 0 END) expenses, " \
                     f"SUM(CASE WHEN {fixed_sql} THEN price_ron ELSE 0 END) fixed, " \
                     f"SUM(CASE WHEN {variable_sql} THEN price_ron ELSE 0 END) variable " \
                     f"FROM public.personal_investment group by cast(payment_date as date) order by payment_day;"
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()

    def select_income_by_day(self):
        """Select day, category and sum of income ordered by day"""
        # income category
        income_sql = f"WHERE category LIKE '{Category.salary.name}' OR category LIKE '{Category.freelancing.name}'" \
                     f" OR category LIKE '{Category.extra.name}' OR category LIKE '{Category.person.name}'"
        # full query
        select_sql = f"SELECT cast(payment_date as date) as payment_day, SUM(price_ron) FROM " \
                     f"public.personal_investment {income_sql} group by cast(payment_date as date) " \
                     f"order by payment_day;"
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()

    def select_fixed_expense_by_day(self):
        """Select day, category and sum of fixed expenses ordered by day"""
        # fixed cost category
        fixed_sql = f"WHERE category LIKE '{Category.home.name}' OR category LIKE '{Category.fuel.name}'" \
                     f" OR category LIKE '{Category.utilities.name}' OR category LIKE '{Category.groceries.name}'" \
                     f" OR category LIKE '{Category.subscriptions.name}' OR category LIKE '{Category.phone.name}'" \
                     f" OR category LIKE '{Category.donations.name}' OR category LIKE '{Category.sport.name}'"
        # full query
        select_sql = f"SELECT cast(payment_date as date) as payment_day, SUM(price_ron) FROM " \
                     f"public.personal_investment {fixed_sql} group by cast(payment_date as date) " \
                     f"order by payment_day;"
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()

    def select_variable_expense_by_day(self):
        """Select day, category and sum of variable expenses ordered by day"""
        # variable cost category
        variable_sql = f"WHERE category LIKE '{Category.shopping.name}' OR category LIKE '{Category.entertainment.name}'" \
                     f" OR category LIKE '{Category.holiday.name}' OR category LIKE '{Category.gifts.name}'" \
                     f" OR category LIKE '{Category.restaurant.name}' OR category LIKE '{Category.friends.name}'" \
                     f" OR category LIKE '{Category.parking.name}' OR category LIKE '{Category.miscellaneous.name}'"
        # full query
        select_sql = f"SELECT cast(payment_date as date) as payment_day, SUM(price_ron) FROM " \
                     f"public.personal_investment {variable_sql} group by cast(payment_date as date) " \
                     f"order by payment_day;"
        self.cursor.execute(select_sql)
        return self.cursor.fetchall()
