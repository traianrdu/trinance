import React, {ChangeEvent, useState} from 'react';
import {Response, useUploadFileApiPost} from "../hooks/useApiHook";
import RadioButton from "../components/RadioButton";
import Papa from "papaparse";
import {RevolutManager} from "../manager/RevolutManager";

export default function Import() {
    const [file, setFile] = useState<File>();
    const [importType, setImportType] = useState("");
    const [isImportFileDisabled, setIsImportFileDisabled] = useState(true);
    const [isSubmitClick, setIsSubmitClick] = useState(false);

    // number of columns
    const noOfColumns = 13;
    // table title
    const tableTitle = ["Timestamp", "Date", "Category", "Item", "Account", "Currency", "Amount",
        "Merchant", "Country", "Info", "Amount_RON", "Amount_EUR", "Amount_USD"];
    // This state will store the parsed data
    const [parsedData, setParsedData] = useState<any[]>([]);
    //State to store table Column name
    const [tableRows, setTableRows] = useState<any[]>([]);
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
                    results.data.map((d: any) => {
                        rowsArray.push(Object.keys(d));
                        if (importType === "revolut") {
                            let revolutManager = new RevolutManager(Object.values(d)).getRevolutManagerObject();
                            valuesArray.push(revolutManager);
                        } else {
                            valuesArray.push(Object.values(d));
                        }
                    });
                    // Parsed Data Response in array format
                    setParsedData(results.data);
                    // Filtered Column Names
                    // setTableRows(rowsArray[0]);
                    // Filtered Values
                    setValues(valuesArray);

                    // Add table title
                    setTableRows(tableTitle);
                },
            });
        }
    };

    /**
     * Handle import type (disables radio btn).
     * @param e event
     */
    const importTypeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setImportType(e.target.value);
        setIsImportFileDisabled(false);
    };

    /**
     *
     * @param e event
     * @param rowIndex row index
     * @param columnIndex column index
     */
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
        const {value} = e.target

        const editData = values.map((mValue, rIndex) =>
            mValue.map((val:any, cIndex:any) =>
                rIndex === rowIndex && cIndex === columnIndex ? value : val
        ));
        setValues(editData)
    }

    const response: Response  = useUploadFileApiPost('http://192.168.0.66:5000/test1', file);
    const afterSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const submitClick = () => {
        setIsSubmitClick(true);
        response.useAPI();
    }

    if (isSubmitClick) {
        if (!response.loading) {
            setIsSubmitClick(false);
            console.log(response.status, response.statusText, response.data, response.error, response.loading);
        }
    }

    return (
        <div className='import'>
            <h1>Import CSV</h1>
            <form onSubmit={afterSubmission}>
                {/* Radio button init */}
                <RadioButton id={"1"} changed={importTypeChangeHandler} value={"revolut"}
                             isSelected={importType === "revolut"} isDisabled={!isImportFileDisabled}>
                    Revolut
                </RadioButton>
                <RadioButton id={"2"} changed={importTypeChangeHandler} value={"ing"}
                             isSelected={importType === "ing"} isDisabled={!isImportFileDisabled}>
                    ING
                </RadioButton>
                <RadioButton id={"3"} changed={importTypeChangeHandler} value={"investment_report"}
                             isSelected={importType === "investment_report"} isDisabled={!isImportFileDisabled}>
                    Investment report
                </RadioButton>

                <input type="file" name="file" accept=".csv" onChange={handleFileChange} disabled={isImportFileDisabled}/>
                <button onClick={submitClick}>IMPORT CSV</button>
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
                    {
                        values.map((value, rIndex) => {
                            return (
                                <tr key={rIndex}>
                                    {value.map((val: any, cIndex: any) => {
                                        return <td key={cIndex}>
                                            <input value={val} type="text" onChange={(e) => onChangeInput(e, rIndex, cIndex)}/>
                                        </td>;
                                    })}
                                </tr>
                            );
                        })

                    }
                </tbody>
            </table>
        </div>
    );
}