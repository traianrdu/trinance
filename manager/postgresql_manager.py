import psycopg2
import os


class PostgresqlManager:

    def __init__(self):
        self.conn = psycopg2.connect(database=os.getenv("POSTGRES_DB_TEST"),
                                user=os.getenv("POSTGRES_DB_USER"), password=os.getenv("POSTGRES_DB_PWD"),
                                host='127.0.0.1', port='5432')
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()

    def test(self):
        sql3 = '''select * from personal_investment;'''
        self.cursor.execute(sql3)
        for i in self.cursor.fetchall():
            print(i)