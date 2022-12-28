import { useState, useEffect } from 'react';

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
    loading: Boolean;
    method: any;
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

    return {status, statusText, data, error, loading, method: postAPIData};
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
        try {
            const apiResponse = await fetch(url, {
                method: 'POST',
                body: file
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

    return {status, statusText, data, error, loading, method: postAPIData};
}