import datetime
from currency_converter import CurrencyConverter


class CurrencyManager:
    def __init__(self):
        """Init manager"""
        self.currency_converter = CurrencyConverter()

    def convert_to_currency(self, amount, from_currency, to_currency, year, month, day):
        """Converts forex to currency"""
        return round(self.currency_converter.convert(amount, from_currency, to_currency,
                                                     date=self.fix_weekend(year, month, day)), 2)

    @staticmethod
    def fix_weekend(year, month, day):
        """CurrencyConverter has a bug in which the weekend doesn't have forex data"""
        check_date = datetime.datetime(year, month, day)
        if check_date.weekday() == 5:  # saturday
            return check_date - datetime.timedelta(days=1)  # subtract one day
        elif check_date.weekday() == 6:  # sunday
            return check_date - datetime.timedelta(days=2)  # subtract 2 days
        else:
            return datetime.date(year, month, day)
