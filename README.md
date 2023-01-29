# trinance
Financial data analytics
### DONE:
* create server &check;
    * add csv to postgresql &check;
* create client &check;
    * add sidebar in react + design &check;
### TO DO:
* Parse bank report and add it to db
    * server:
        * revolut & ing bank report parser (csv/json -> postgresql)
        * data cleaning
        * data api
        * get verified data from client and save it to db
    * client:
        * create editable table &check;
        * view only 10/20 rows in the table
        * create sidebar import option &check;
        * create sidebar export option
        * show data as table &check;
        * parse revolut into table
        * parse ing into table
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