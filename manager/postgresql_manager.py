import psycopg2


class PostgresqlManager:

    def __init__(self):
        conn = psycopg2.connect(database="trinance_test",
                        user='postgres', password='pass',
                        host='127.0.0.1', port='5432')