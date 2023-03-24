import {ReportManager} from "./ReportManager";
import {Category} from "../enum/Category";

export class InvestmentManager extends ReportManager{

    public constructor(data: any) {
        let timestamp = data[0];
        let date = data[1];
        let category = InvestmentManager.getCategoryValue(data[2]);
        let item = data[3];
        let account = data[4];
        let currency = data[5];
        let amount = data[6];
        let merchant = data[7];
        let country = data[8];
        let info = data[9];
        let amountRON = data[10];
        let amountEUR = data[11];
        let amountUSD = data[12];
        super(timestamp, date, category, item, account, currency, amount, merchant, country, info, amountRON, amountEUR, amountUSD);
    }


    private static getCategoryValue(index: string): string {
        switch (index) {
            case "Salary": return Category.salary.toString();
            case "Freelancing": return Category.freelancing.toString();
            case "Extra": return Category.extra.toString();
            case "Natural person": return Category.person.toString();
            case "Home": return Category.home.toString();
            case "Fuel": return Category.fuel.toString();
            case "Utilities": return Category.utilities.toString();
            case "Groceries": return Category.groceries.toString();
            case "Subscriptions": return Category.subscriptions.toString();
            case "Phone": return Category.phone.toString();
            case "Donations": return Category.donations.toString();
            case "Sport": return Category.sport.toString();
            case "Shopping": return Category.shopping.toString();
            case "Entertainment": return Category.entertainment.toString();
            case "Holiday": return Category.holiday.toString();
            case "Gifts": return Category.gifts.toString();
            case "Restaurant": return Category.restaurant.toString();
            case "Friends": return Category.friends.toString();
            case "Parking": return Category.parking.toString();
            case "Miscellaneous": return Category.miscellaneous.toString();
            default: return Category.miscellaneous.toString();
        }
    }
}