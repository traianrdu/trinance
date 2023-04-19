import React, {useEffect, useState} from 'react';
import {Response, useApiGet} from "../hooks/UseApi";
import {Status} from "../enum/Status";

export default function Dashboard() {
    const [isLoadedDashboard, setIsLoadedDashboard] = useState(false);

    const response: Response  = useApiGet('http://192.168.0.66:5000/dashboard/get-dashboard-data');

    useEffect(() => {
        if (!isLoadedDashboard) {
            setIsLoadedDashboard(true);
            response.loading = Status[Status.init];  // reset response
            response.useAPI();
        }
        // api response
        if (response.loading === Status[Status.loaded]) {
            response.loading = Status[Status.init];
            console.log(response.status, response.statusText, response.data, response.error, response.loading);
            if (response.status === 200) {
                //console.log(response.data);
                //console.log(JSON.parse(decodeURI(response.data)));
                //const ceva: string = response.data.toString().replace(/\\"/g, '"');
                //const ceva2 = JSON.parse(ceva);
                let responseData = JSON.stringify(response.data);
                let parsedJsonResponseData = JSON.parse(responseData);
                console.log(parsedJsonResponseData.data.currency);
            }
        }
    }, [response]);

    return (
        <div className='dashboard'>
            <h1>Welcome to the main Dashboard</h1>
        </div>
  );
}