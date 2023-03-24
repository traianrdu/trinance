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

    def __init__(self, timestamp, date, category, item, account, currency, amount, merchant, country, info, amount_ron,
                 amount_eur, amount_usd):
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
        return (self.timestamp + ", " + self.date + ", " + self.category + ", " + self.item + ", " + self.account
                + ", " + self.currency + ", " + str(self.amount) + ", " + self.merchant + ", " + self.country
                + ", " + self.info + ", " + str(self.amount_ron) + ", " + str(self.amount_eur)
                + ", " + str(self.amount_usd))
