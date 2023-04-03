import React, {ChangeEvent, useEffect, useState} from 'react';
import {Response, useUploadFormApiPost} from "../hooks/useApiHook";
import RadioButton from "../components/RadioButton";
import Papa from "papaparse";
import {RevolutManager} from "../manager/RevolutManager";
import {Category} from "../enum/Category";
import {InvestmentManager} from "../manager/InvestmentManager";
import {Status} from "../enum/Status";
import {ReportManager} from "../manager/ReportManager";
import {DateFormat, dateFormatter} from "../util/DateUtils";

export default function Import() {
    const [file, setFile] = useState<File>();
    const [importType, setImportType] = useState("");
    const [isImportFileDisabled, setIsImportFileDisabled] = useState(true);
    const [isSubmitClick, setIsSubmitClick] = useState(false);

    // table title
    const tableTitle = ["Timestamp", "Date", "Category", "Item", "Account", "Currency", "Amount",
        "Merchant", "Country", "Info", "Amount_RON", "Amount_EUR", "Amount_USD"];
    // This state will store the parsed data
    const [parsedData, setParsedData] = useState<any[]>([]);
    //State to store table Column name
    const [tableRows, setTableRows] = useState<any[]>([]);
    //State to store the values
    const [values, setValues] = useState<any[]>([]);
    //State to store final sending values
    const [sendValues, setSendValues] = useState<any[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]); // set the file
            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const valuesArray: any[] = [];
                    // Iterating data to get column name and their values
                    results.data.map((d: any) => {
                        if (importType === "revolut") {
                            let revolutManager = new RevolutManager(Object.values(d)).getReportManagerObject();
                            valuesArray.push(revolutManager);
                        } else if (importType === "ing") {
                            valuesArray.push(Object.values(d));
                        } else if (importType === "investment_report") {
                            let investmentManager = new InvestmentManager(Object.values(d)).getReportManagerObject();
                            valuesArray.push(investmentManager);
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
     * Handle change data from table input element.
     * @param e event
     * @param rowIndex row index
     * @param columnIndex column index
     */
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
        const {value} = e.target;

        const editData = values.map((mValue, rIndex) =>
            mValue.map((val:any, cIndex:any) =>
                rIndex === rowIndex && cIndex === columnIndex ? value : val
        ));
        setValues(editData)
    }

    /**
     * Handle change data from table select element.
     * @param event event
     * @param rowIndex row index
     * @param columnIndex column index
     */
    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, rowIndex: number, columnIndex: number) => {
        const {value} = event.target;

        const editData = values.map((mValue, rIndex) =>
            mValue.map((val:any, cIndex:any) =>
                rIndex === rowIndex && cIndex === columnIndex ? value : val
        ));
        setValues(editData)
    };

    const response: Response  = useUploadFormApiPost('http://192.168.0.66:5000/import/csv', sendValues);
    const afterSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    /**
     * Call API only on submit btn click.
     */
    const submitClick = () => {
        setSendValues(values);
        setIsSubmitClick(true);
    }

    /**
     * Add a new empty row to the table.
     */
    const onNewRowBtnClick = () => {
        // save old values to array
        const valuesArray: any[] = values;
        // add default values
        let timestamp = dateFormatter(new Date(), DateFormat.DayMonthYearHourMinute);
        let category = Category.miscellaneous.toString();
        let account = "ING";
        let currency = "RON";
        let country = "Romania";
        // create new report manager
        let reportManager = new ReportManager(timestamp, "", category, "", account, currency,
            "", "", country, "", "", "", "").getReportManagerObject();
        // update the array
        valuesArray.push(reportManager);
        // set values
        setTableRows(tableTitle)
        setValues(valuesArray);

    }

    useEffect(() => {
        if (isSubmitClick) {
            setIsSubmitClick(false);
            response.loading = Status[Status.init];  // reset response
            response.useAPI();
        }

        // api response
        if (response.loading === Status[Status.loaded]) {
            response.loading = Status[Status.init];
            console.log(response.status, response.statusText, response.data, response.error, response.loading);
        }

    }, [isSubmitClick, response]);

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

            <br/>
            <br/>
            <div>
                <button type="button" onClick={onNewRowBtnClick}>
                    New row
                </button>
            </div>
            <br/>
            <br/>
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
                                    {value.map((val: any, cIndex:any) => {
                                        if(cIndex === 2 && (importType === "revolut" ||
                                            importType === "investment_report" || importType === "ing")) {
                                            return (
                                                <td key={cIndex}>
                                                    <select value={val} onChange={(e) => onSelectChange(e, rIndex, cIndex)}>
                                                        {Object.keys(Category).map((key: any) => {
                                                            let isValueProperty = Number(key) >= 0
                                                            if (isValueProperty) {
                                                                return (
                                                                    <option key={key} value={key}>
                                                                        {Category[key]}
                                                                    </option>)
                                                            }
                                                        })}
                                                    </select>
                                                </td>
                                            );
                                        }
                                        return (
                                            <td key={cIndex}>
                                                <input value={val} type="text" onChange={(e) => onChangeInput(e, rIndex, cIndex)}/>
                                            </td>
                                        );
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