import os


is_stage = True     # stage status


def get_db_info():
    if is_stage:
        postgres_db = os.getenv("POSTGRES_DB_STAGE")
        postgres_user = os.getenv("POSTGRES_DB_USER")
        postgres_pwd = os.getenv("POSTGRES_DB_PWD")
        postgres_host = '127.0.0.1'
        postgres_port = '5432'
        return postgres_db, postgres_user, postgres_pwd, postgres_host, postgres_port
    else:
        postgres_db = os.getenv("POSTGRES_DB_PROD")
        postgres_user = os.getenv("POSTGRES_DB_USER")
        postgres_pwd = os.getenv("POSTGRES_DB_PWD")
        postgres_host = '127.0.0.1'
        postgres_port = '5432'
        return postgres_db, postgres_user, postgres_pwd, postgres_host, postgres_port
