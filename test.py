from server import PostgresqlManager, get_db_info
from dotenv import load_dotenv


if __name__ == "__main__":
    load_dotenv()
    db, db_user, db_pwd, db_host, db_port = get_db_info()
    postgresql_manager = PostgresqlManager(db, db_user, db_pwd, db_host, db_port)

    """
    empty_price_RON = postgresql_manager.select_empty_price_RON()   # get selected from db

    report_list = [Report(*report) for report in empty_price_RON]   # create tuple of object
    print(report_list)

    small_tuple = []    # create empty list
    for report in report_list:  # for each object
        report.update_price_for_currency(Currency.RON.name)  # update price
        small_tuple.append(report.to_tuple_id_amount(Currency.RON.name))    # add id and price to the list
    print(report_list)
    print(small_tuple)
    #postgresql_manager.alter_auto_increment(1)
    #postgresql_manager.update_empty_price_RON(small_tuple)
    postgresql_manager.close()
    """

    print(postgresql_manager.select_income_by_day())
    print(postgresql_manager.select_fixed_expense_by_day())
    print(postgresql_manager.select_variable_expense_by_day())
    postgresql_manager.close()
