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
    "currency": "RON",
    "list": [
      {
        "day": "01/01/2023",
        "expenses": "200",
        "income": "300"
      },
      {
      "day": "02/01/2023",
      "expenses": "500",
      "income": "100"
      }
    ]
  },
  "error": "none"
}
```

implement example by week/month/year