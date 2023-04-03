# JSON FORMAT

### General response:
- status: boolean true or false

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

Example:
```JSON
{
  "status": true,
  "statusText": "accepted",
  "data": {
    "currency": "RON",
    "list": [
      {
        "timestamp": "01/01/2023",
        "expenses": "200",
        "income": "300"
      },
      {
      "timestamp": "02/01/2023",
      "expenses": "500",
      "income": "100"
      }
    ]
  },
  "error": "none"
}
```