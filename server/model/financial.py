class Financial:
    """
    A class used to represent the Financial data
    ...
    Attributes
    ----------
    date : str
        a formatted string that contains the starting date of transaction
    income : Decimal
        a formatted string that contains the starting date of transaction
    expenses : Decimal

    Methods
    -------
    """

    def __init__(self, date, income, expenses, fixed, variable):
        self.date = str(date)
        self.income = str(income)
        self.expenses = str(expenses)
        self.fixed = str(fixed)
        self.variable = str(variable)

    def __repr__(self):
        return F"<Financial: {self.date}, {self.income}, {self.expenses}, {self.fixed}, {self.variable}>"
