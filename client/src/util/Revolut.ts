import {DateFormat, dateFormatter} from "./DateUtils";

/**
 * Parse revolut data.
 * @param data revolut data
 */
export function filterRevolutCSV(data: any) {
    let object = [];
    let timestamp = dateFormatter(new Date(), DateFormat.DayMonthYearHourMinute);
    let date = dateFormatter(new Date(data[2]), DateFormat.DayMonthYear);
    let category = "";
    let item = "";
    let account = accountFormat("Revolut", data[7]);
    let currency = data[7];
    let amount = removeNegative(data[5]);
    let merchant = data[4];
    let country = "Romania";
    let info = "";
    let amountRON = "";
    let amountEUR = "";
    let amountUSD = "";
    object.push(timestamp, date, category, item, account, currency, amount, merchant, country, info, amountRON, amountEUR, amountUSD);
    return object;
}

/**
 * Format account name.
 * @param accountName account name string
 * @param currency currency string
 */
export function accountFormat(accountName: string, currency: string): string {
    return accountName + " " + currency;
}

/**
 * Remove - sign from currency value.
 * @param amount amount string
 */
export function removeNegative(amount: string) {
    while (amount.charAt(0) === '-') {
        amount = amount.substring(1);
    }
    return amount;
}

