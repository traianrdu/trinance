import { useState, useEffect } from 'react';
import {Status} from "../enum/Status";

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
                const formData = new FormData();
                formData.append('formData', form);
                try {
                    const apiResponse = await fetch(url, {
                        method: 'POST',
                        //headers: {'Content-Type':'application/json'},
                        body: formData
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