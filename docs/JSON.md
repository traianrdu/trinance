# JSON FORMAT

### General response:
- status: boolean true or false
- statusText: message text as "accepted" or "rejected"
- data: received data or "none"
- error: potential error text or "none"

Example:
```JSON
{
  "status": true,
  "statusText": "accepted",
  "data": "none",
  "error": "none"
}
```

### Dashboard response:
- status: boolean true or false
- statusText: message text as "accepted" or "rejected"
- data: received data or "none"
- currency: currency type "RON", "EUR" or "USD"
- list: list by day
- error: potential error text or "none"

Example by day:
```JSON
{
  "status": true,
  "statusText": "accepted",
  "data": {
    "isEmptyPrice": true,
    "currency": "RON",
    "list": [
      {
        "day": "01/01/2023",
        "income": "300",
        "expenses": "200",
        "fixed": "50",
        "variable": "150"
      },
      {
        "day": "02/01/2023", 
        "income": "100",
        "expenses": "450",
        "fixed": "150",
        "variable": "300"
      }
    ]
  },
  "error": "none"
}
```

implement example by week/month/year