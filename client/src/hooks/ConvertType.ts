import {ReportColumns} from "../enum/Report";

export function convertToJSON(form: any) {
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