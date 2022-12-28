import React, {ChangeEvent, useEffect, useState} from 'react';
import {useApiPost, Response, useUploadFileApiPost} from "../hooks/useApiHook";

export default function Import() {

    // example 1
    /*const handleClick = async() => {
        console.log("abc");
        const data: ApiResponse = UseApiGet('http://192.168.0.66:5000/test1');
        console.log(data.loading);
    };*/

    //const data: ApiResponse = UseApiGet('http://192.168.0.66:5000/test1');
    //console.log(data)

    // example 2
    /*const [status, statusText, data, error, loading, getAPIData] = useApiGet('http://192.168.0.66:5000/test1');
    const afterSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*if (!loading) {
            console.log(data)
        } else {

        }//end here * /
        console.log(status, statusText, data, error, loading);
    }*/

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]); // set the file
        }
    };

    const response: Response  = useUploadFileApiPost('http://192.168.0.66:5000/test1', file);
    const afterSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!response.loading) {
            console.log("abc");
        }
        console.log(response.status, response.statusText, response.data, response.error, response.loading);
    }

    useEffect(() => {
        response.method();
    }, []);

    return (
        <div className='import'>
            <h1>Import CSV</h1>
            <form onSubmit={afterSubmission}>
                <input type="file" accept=".csv" onChange={handleFileChange}/>
                <button onClick={response.method}>IMPORT CSV</button>
            </form>
        </div>
    );
}