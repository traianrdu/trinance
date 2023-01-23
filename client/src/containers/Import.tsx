import React, {ChangeEvent, useEffect, useState} from 'react';
import {useApiPost, Response, useUploadFileApiPost} from "../hooks/useApiHook";
import RadioButton from "../components/RadioButton";
import Papa, { ParseResult } from "papaparse";

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
    const [importType, setImportType] = useState("");

    // This state will store the parsed data
    const [parsedData, setParsedData] = useState([]);
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
    //State to store the values
    const [values, setValues] = useState<any[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]); // set the file
            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray: any[] = [];
                    const valuesArray: any[] = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                      // @ts-ignore
                        rowsArray.push(Object.keys(d));
                      // @ts-ignore
                        valuesArray.push(Object.values(d));
                    });

                    // Parsed Data Response in array format
                    // @ts-ignore
                    setParsedData(results.data);

                    // Filtered Column Names
                    setTableRows(rowsArray[0]);

                    // Filtered Values
                    // @ts-ignore
                    setValues(valuesArray);
                },
            });
        }
    };

    const importTypeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setImportType(e.target.value);
    };

    const response: Response  = useUploadFileApiPost('http://192.168.0.66:5000/test1', file);
    const afterSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    if (!response.loading) {
        console.log(response.status, response.statusText, response.data, response.error, response.loading);
    }

    return (
        <div className='import'>
            <h1>Import CSV</h1>
            <form onSubmit={afterSubmission}>
                <RadioButton id={"1"} changed={importTypeChangeHandler} value={"revolut"} isSelected={importType === "revolut"}>Revolut</RadioButton>
                <RadioButton id={"2"} changed={importTypeChangeHandler} value={"ing"} isSelected={importType === "ing"}>ING</RadioButton>
                <RadioButton id={"3"} changed={importTypeChangeHandler} value={"investment_report"} isSelected={importType === "investment_report"}>Investment report</RadioButton>
                <input type="file" name="file" accept=".csv" onChange={handleFileChange}/>
                <button onClick={response.useAPI}>IMPORT CSV</button>
            </form>

            <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {values.map((value, index) => {
              return (
              <tr key={index}>
                {value.map((val:any, i:any) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
    );
}