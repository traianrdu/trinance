from server import CurrencyManager


class Report:
    """
    A class used to represent the Report data
    ...
    Attributes
    ----------
    timestamp : str
        a formatted string that contains the timestamp
    date : str
        a formatted string that contains the starting date of transaction

    Methods
    -------
    """

    def __init__(self, report_id, timestamp, date, category, item, account, currency, amount, merchant, country, info,
                 amount_ron, amount_eur, amount_usd):
        self.report_id = report_id
        self.timestamp = timestamp
        self.date = date
        self.category = category
        self.item = item
        self.account = account
        self.currency = currency
        self.amount = amount
        self.merchant = merchant
        self.country = country
        self.info = info
        self.amount_ron = amount_ron
        self.amount_eur = amount_eur
        self.amount_usd = amount_usd

    def __repr__(self):
        return F"<Report: {self.report_id}, {self.timestamp}, {self.date}, {self.category}, {self.item}," \
               F" {self.account}, {self.currency}, {self.amount}, {self.merchant}, {self.country}, {self.info}," \
               F" {self.amount_ron}, {self.amount_eur}, {self.amount_usd}>"

    def to_tuple(self):
        """Return object as tuple"""
        return self.timestamp, self.date, self.category, self.item, self.account, self.currency, self.amount, \
            self.merchant, self.country, self.info, self.amount_ron, self.amount_eur, self.amount_usd

    def empty_to_none(self):
        """Overwrite empty value to None"""
        if self.info == "":
            self.info = None
        if self.amount_ron == "":
            self.amount_ron = None
        if self.amount_eur == "":
            self.amount_eur = None
        if self.amount_usd == "":
            self.amount_usd = None

    def update_price_for_currency(self, to_currency):
        """Updates price for selected currency"""
        match to_currency:  # switch cases
            case "RON":
                price = self.update_price(self.amount_ron, to_currency)
                if price != -1:     # checks price
                    self.amount_ron = price     # update price ron
            case "EUR":
                price = self.update_price(self.amount_eur, to_currency)
                if price != -1:
                    self.amount_eur = price
            case "USD":
                price = self.update_price(self.amount_usd, to_currency)
                if price != -1:
                    self.amount_usd = price

    def update_price(self, case_amount, to_currency):
        """Returns the price with the updated version"""
        if case_amount is None:     # empty amount_ron/amount_usd/amount_eur
            if self.currency == to_currency:    # the currency is the same => we return the amount value
                return self.amount
            else:
                cm = CurrencyManager()  # convert the amount to the date
                return cm.convert_to_currency(self.amount, self.currency, to_currency, self.date.year,
                                              self.date.month, self.date.day)
        return -1
