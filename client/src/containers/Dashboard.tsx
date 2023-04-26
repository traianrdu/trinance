import React, {useEffect, useState} from 'react';
import {Response, useApiGet} from "../hooks/UseApi";
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

    // graph options
    const options = {
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
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: "expenses",
                data: expensesList,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const response: Response  = useApiGet('http://192.168.0.66:5000/dashboard/get-dashboard-data');

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
                    // parse data list into sublist
                    for (let index = 0; index < parsedJsonDataList.length; index ++) {
                        // update arrays with data
                        date.push(parsedJsonDataList[index].date);
                        income.push(parsedJsonDataList[index].income);
                        expenses.push(parsedJsonDataList[index].expenses);
                    }
                    // set list of dates
                    setDateList(date);
                    // set list of incomes
                    setIncomeList(income);
                    // set list of expenses
                    setExpensesList(expenses);
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