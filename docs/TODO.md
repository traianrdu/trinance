### TO DO:
* Bugs:
    * adding new row auto fetches data (or after submit click)
* server settings:
  * ~~add csv to postgresql~~ &check;
  * ~~create blueprint for import~~ &check;
  * ~~create blueprint for dashboard~~ &check;
* client settings:
  * ~~add sidebar in react + design~~ &check;
  * add stage/prod url config
* Update eur/usd based on external api or own forex table
* Parse bank report and add it to db
    * server:
        * ~~revolut & ing bank report parser (csv/json -> postgresql)~~ &check;
        * ~~data cleaning~~ &check;
        * ~~data api~~ &check;
        * ~~get verified data from client and save it to db~~ &check;
    * client:
        * ~~create editable table~~ &check;
        * view only 10/20 rows in the table
        * ~~create sidebar import option~~ &check;
        * create sidebar export option
        * ~~show data as table~~ &check;
        * ~~parse revolut into table~~ &check;
        * ~~parse ing into table~~ (not implementable?)
        * clear page content after submit
        * new row, delete row buttons
        * table hints (date, account, amount, etc example)
        * view mode, edit, save or reset options
        * buttons design
* Dashboard
    * ~~fetch data from the server (after cleaning)~~ &check;
    * ~~view of expenses & income by day from current month~~ &check;
* Table
    * view data as table (as excel table)
* Graphs
    * server:
        * expenses & income by month
        * total expense by year
        * algebraic mean
        * most transactions partner
        * return all data if needed
    * client:
        * create graphs tab
        * create graphs from server query
        * show data by day