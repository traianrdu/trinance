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
} from 'chart.js';
import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
    const [isLoadedDashboard, setIsLoadedDashboard] = useState(false);
    const [isAPICall, setIsAPICall] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [isEmptyPrice, setIsEmptyPrice] = useState(false);
    const [dataList, setDataList] = useState<any[]>([]);
    const [dateList, setDateList] = useState<any[]>([]);
    const [incomeList, setIncomeList] = useState<any[]>([]);
    const [expensesList, setExpensesList] = useState<any[]>([]);

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
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

    const response: Response  = useApiGet('http://192.168.0.66:5000/dashboard/get-dashboard-data');

    useEffect(() => {
        if (!isLoadedDashboard) {
            setIsLoadedDashboard(true);
            response.loading = Status[Status.init];  // reset response
            response.useAPI();
            setIsAPICall(true);
        }
        // api response
        if (response.loading === Status[Status.loaded] && isAPICall) {
            setIsAPICall(false);
            response.loading = Status[Status.init];
            console.log(response.status, response.statusText, response.data, response.error, response.loading);
            if (response.status === 200) {
                //console.log(response.data);
                //console.log(JSON.parse(decodeURI(response.data)));
                //const ceva: string = response.data.toString().replace(/\\"/g, '"');
                //const ceva2 = JSON.parse(ceva);
                let stringResponse = JSON.stringify(response.data);
                let parsedJsonResponse = JSON.parse(stringResponse);
                if (parsedJsonResponse.status === true) {
                    let stringDataList = JSON.stringify(parsedJsonResponse.data.list);
                    let parsedBuffer = JSON.parse(stringDataList);
                    let parsedJsonDataList = JSON.parse(parsedBuffer);
                    setSelectedCurrency(parsedJsonResponse.data.currency);
                    setIsEmptyPrice(parsedJsonResponse.data.isEmptyPrice);
                    setDataList(parsedJsonDataList);
                    let date: any[] = [];
                    let income: any[] = [];
                    var expenses: any[] = [];
                    for (let index = 0; index < parsedJsonDataList.length; index ++) {
                        date.push(parsedJsonDataList[index].date);
                        income.push(parsedJsonDataList[index].income);
                        expenses.push(parsedJsonDataList[index].expenses);
                    }
                    setDateList(date);
                    setIncomeList(income);
                    setExpensesList(expenses);
                }
            }
        }
    }, [response]);

    return (
        <div className='dashboard'>
            <h1>Welcome to the main Dashboard</h1>

        </div>
  );
}