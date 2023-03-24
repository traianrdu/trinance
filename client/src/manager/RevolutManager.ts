import {DateFormat, dateFormatter} from "../util/DateUtils";
import {ReportManager} from "./ReportManager";
import {Category} from "../enum/Category";

export class RevolutManager extends ReportManager{

    public constructor(data: any) {
        let timestamp = dateFormatter(new Date(), DateFormat.DayMonthYearHourMinute);
        let date = dateFormatter(new Date(data[2]), DateFormat.DayMonthYear);
        let category = Category.miscellaneous.toString();
        let item = "";
        let account = RevolutManager.accountFormat("Revolut", data[7]);
        let currency = data[7];
        let amount = RevolutManager.removeNegative(data[5]);
        let merchant = data[4];
        let country = "Romania";
        let info = "";
        let amountRON = "";
        let amountEUR = "";
        let amountUSD = "";
        super(timestamp, date, category, item, account, currency, amount, merchant, country, info, amountRON, amountEUR, amountUSD);
    }

    /**
     * Format account name.
     * @param accountName account name string
     * @param currency currency string
     * @return string
     */
    private static accountFormat(accountName: string, currency: string): string {
        return accountName + " " + currency;
    }

    /**
     * Remove - sign from currency value.
     * @param amount amount string
     */
    private static removeNegative(amount: string) {
        while (amount.charAt(0) === '-') {
            amount = amount.substring(1);
        }
        return amount;
    }
}