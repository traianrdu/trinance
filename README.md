# trinance
Financial data analytics
### DONE:
* create server
    * add csv to postgresql
* create client
    * add sidebar in react + design
### TO DO:
* Parse bank report and add it to db
    * server:
        * revolut & ing bank report parser (csv -> postgresql)
        * data cleaning
        * data api
        * get verified data from client and save it to db
    * client:
        * create sidebar import/export option
        * fetch data from the server (after cleaning)
        * show data as table (save & reset options)
* Data tab (view all data in client)
* Graphs
    * server:
        * table view of expenses & income by month
        * total expense by year
        * algebraic mean
        * most transactions partner
    * client:
        * create graphs tab
        * create graphs from server query