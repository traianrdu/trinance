from datetime import date
from currency_converter import CurrencyConverter


class CurrencyManager:
    def __init__(self):
        """Init manager"""
        self.currency_converter = CurrencyConverter()

    def convert_to_RON(self, amount, currency, year, month, day):
        return round(self.currency_converter.convert(amount, currency, 'RON', date=date(year, month, day)), 2)
