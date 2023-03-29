# trinance
Financial data analytics
### DONE:
* create server &check;
    * ~~add csv to postgresql~~ &check;
* create client &check;
    * ~~add sidebar in react + design~~ &check;
### TO DO:
* Bugs:
    * adding new row auto fetches data
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
        * new row, delete row buttons
        * table hints (date, account, amount, etc example)
        * view mode, edit, save or reset options
        * buttons design
* Data tab (view all data in client)
* Dashboard
    * fetch data from the server (after cleaning)
* Graphs
    * server:
        * table view of expenses & income by month
        * total expense by year
        * algebraic mean
        * most transactions partner
    * client:
        * create graphs tab
        * create graphs from server query