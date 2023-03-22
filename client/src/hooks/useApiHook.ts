import { useState, useEffect } from 'react';
import {Status} from "../enum/Status";
import {ReportColumns} from "../enum/Report";

// initial EX
export type ApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
};

export type Response = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: any;
    useAPI: any;
};

// INITIAL EX
export const UseApiGet = (url: string): ApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const GetAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch(url, {
                method: 'GET'
            });
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
            setData(json);
            console.log("absa");
        } catch (error) {
            setError(error);
        }
        setLoading(false)
    };

    useEffect(() => {
        GetAPIData();
    }, []);

    return { status, statusText, data, error, loading };
};

// default get request
export function useApiGet(url: string) {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const getAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch(url, {
                method: 'GET'
            });
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
            setData(json);
        } catch (error) {
            setError(error);
        }
        setLoading(false)
    };

    return [status, statusText, data, error, loading, getAPIData] as const;
}

// default post request
export function useApiPost(url: string, postData = {}): Response {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const postAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(postData)
            });
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
            setData(json);
        } catch (error) {
            setError(error);
        }
        setLoading(false)
    };

    return {status, statusText, data, error, loading, useAPI: postAPIData};
}

// file upload post request
export function useUploadFileApiPost(url: string, file: any): Response {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const postAPIData = async () => {
        setLoading(true);
        if (file != null) {
            const fileData = new FormData();
            fileData.append('file', file);
            try {
                const apiResponse = await fetch(url, {
                    method: 'POST',
                    //headers: {'Content-Type':'application/json'},
                    body: fileData
                });
                const json = await apiResponse.json();
                setStatus(apiResponse.status);
                setStatusText(apiResponse.statusText);
                setData(json);
            } catch (error) {
                setError(error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        postAPIData();
    }, []);

    return {status, statusText, data, error, loading, useAPI: postAPIData};
}

// form upload post request
export function useUploadFormApiPost(url: string, form: any): Response {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<string>(Status[Status.init]);

    const postAPIData = async () => {
        setLoading(Status[Status.loading]);
        if (form != null) {
            if (form.length !== 0) {
                let testJson = convertToJSON(form);
                try {
                    const apiResponse = await fetch(url, {
                        method: 'POST',
                        headers: {'Accept': 'application/json',
                            'Content-Type':'application/json'},
                        body: testJson
                    });
                    const json = await apiResponse.json();
                    setStatus(apiResponse.status);
                    setStatusText(apiResponse.statusText);
                    setData(json);
                } catch (error) {
                    setError(error);
                }
            }
        }
        setLoading(Status[Status.loaded]);
    };

    return {status, statusText, data, error, loading, useAPI: postAPIData};
}

function convertToJSON(form: any) {
    let json = '{"items":['
    form.map((val: any, cIndex:any) => {
        if (cIndex != 0) {  // we add "," after every item, except the first iteration
            json = `${json},`;
        }
        for (let i = 0; i < 13; i++) {
            switch (i) {
                case 0:
                    let timestamp = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json}{${timestamp}`;
                    break;
                case 1:
                    let date = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${date}`;
                    break;
                case 2:
                    let category = `"${ReportColumns[i]}": ${val[i]}`;
                    json = `${json},${category}`;
                    break;
                case 3:
                    let item = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${item}`;
                    break;
                case 4:
                    let account = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${account}`;
                    break;
                case 5:
                    let currency = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${currency}`;
                    break;
                case 6:
                    let amount = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${amount}`;
                    break;
                case 7:
                    let merchant = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${merchant}`;
                    break;
                case 8:
                    let country = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${country}`;
                    break;
                case 9:
                    let info = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${info}`;
                    break;
                case 10:
                    let amountRON = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${amountRON}`;
                    break;
                case 11:
                    let amountEUR = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${amountEUR}`;
                    break;
                case 12:
                    let amountUSD = `"${ReportColumns[i]}": "${val[i]}"`;
                    json = `${json},${amountUSD}}`;
                    break;
            }
        }
    })
    json = `${json}]}`

    return JSON.stringify(json);
}