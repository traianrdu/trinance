import React, {useEffect, useState} from 'react';
import {Response, useApiGet, useApiGetArgs} from "../hooks/UseApi";
import {Status} from "../enum/Status";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard() {
    const [isLoadedDashboard, setIsLoadedDashboard] = useState(false);  // dashboard first loading
    const [isAPICall, setIsAPICall] = useState(false);  // api call
    const [selectedCurrency, setSelectedCurrency] = useState("");   // selected currency
    const [isEmptyPrice, setIsEmptyPrice] = useState(false);    // empty price check
    const [dataList, setDataList] = useState<any[]>([]);    // full list of data
    const [dateList, setDateList] = useState<any[]>([]);    // list of timestamps
    const [incomeList, setIncomeList] = useState<any[]>([]);    // income list
    const [expensesList, setExpensesList] = useState<any[]>([]);    // expenses list
    const [fixedList, setFixedList] = useState<any[]>([]);    // fixed expenses list
    const [variableList, setVariableList] = useState<any[]>([]);    // variable expenses list
    const currentDate = new Date();
    const currentMonth = "month=7";
    const currentYear = "year=2022";
    //const currentMonth = "month=" + currentDate.getMonth();
    //const currentYear = "year=" + currentDate.getFullYear();

    // graph options
    const options = {
        tension: 0.4,
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Income-Expenses',
            },
        },
    };

    // set graph data
    const graphData = {
        labels: dateList,
        datasets: [
            {
                label: "income",
                data: incomeList,
                fill: true,
                borderColor: '#35A2EB',
                backgroundColor: '#35A2EB80',
            },
            {
                label: "expenses",
                data: expensesList,
                fill: true,
                borderColor: '#E12901',
                backgroundColor: '#E1290180',
            },
            {
                label: "fixed",
                data: fixedList,
                fill: true,
                borderColor: '#FF1A8C',
                backgroundColor: '#FF1A8C80',
            },
            {
                label: "variable",
                data: variableList,
                fill: true,
                borderColor: '#C653C6',
                backgroundColor: '#C653C680',
            },
        ],
    };

    const response: Response  = useApiGetArgs('http://192.168.0.66:5000/dashboard/get-dashboard-data', currentMonth, currentYear);

    useEffect(() => {
        if (!isLoadedDashboard) {
            setIsLoadedDashboard(true);  // dashboard was loaded
            response.loading = Status[Status.init];  // reset response
            response.useAPI();  // api call
            setIsAPICall(true); // set api call check
        }
        // api response
        if (response.loading === Status[Status.loaded] && isAPICall) {
            setIsAPICall(false);    // reset api call check
            response.loading = Status[Status.init]; // reset status
            console.log(response.status, response.statusText, response.data, response.error, response.loading);
            if (response.status === 200) {
                let stringResponse = JSON.stringify(response.data); // get response as string
                let parsedJsonResponse = JSON.parse(stringResponse);    // parse response
                if (parsedJsonResponse.status === true) {   // check ok response
                    let stringDataList = JSON.stringify(parsedJsonResponse.data.list);  // get string data
                    // for some reason we have to use parsing 2 times
                    let parsedBuffer = JSON.parse(stringDataList);  // parse into buffer
                    let parsedJsonDataList = JSON.parse(parsedBuffer);  // parse buffer as json
                    // set currency
                    setSelectedCurrency(parsedJsonResponse.data.currency);
                    // set price
                    setIsEmptyPrice(parsedJsonResponse.data.isEmptyPrice);
                    // set full data list for later use
                    setDataList(parsedJsonDataList);
                    // init arrays
                    let date: any[] = [];
                    let income: any[] = [];
                    let expenses: any[] = [];
                    let fixed: any[] = [];
                    let variable: any[] = [];
                    // parse data list into sublist
                    for (let index = 0; index < parsedJsonDataList.length; index ++) {
                        // update arrays with data
                        date.push(parsedJsonDataList[index].date);
                        income.push(parsedJsonDataList[index].income);
                        expenses.push(parsedJsonDataList[index].expenses);
                        fixed.push(parsedJsonDataList[index].fixed);
                        variable.push(parsedJsonDataList[index].variable)
                    }
                    // set list of dates
                    setDateList(date);
                    // set list of incomes
                    setIncomeList(income);
                    // set list of expenses
                    setExpensesList(expenses);
                    // set list of fixed expenses
                    setFixedList(fixed);
                    // set list of variable expenses
                    setVariableList(variable);
                    //setGraphData();
                }
            }
        }
    }, [response]);

    return (
        <div className='dashboard'>
            <h1>Welcome to the main Dashboard</h1>
            <Line redraw={true} data={graphData} options={options}/>
        </div>
  );
}