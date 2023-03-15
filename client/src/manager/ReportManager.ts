export class ReportManager {
    private _timestamp: string = "";
    private _date: string = "";
    private _category: string = "";
    private _item: string = "";
    private _account: string = "";
    private _currency: string = "";
    private _amount: string = "";
    private _merchant: string = "";
    private _country: string = "";
    private _info: string = "";
    private _amountRON: string = "";
    private _amountEUR: string = "";
    private _amountUSD: string = "";

    public constructor(timestamp: string, date: string, category: string, item: string, account: string, currency: string,
                       amount: string, merchant: string, country: string, info: string, amountRON: string, amountEUR: string,
                       amountUSD: string) {
        this._timestamp = timestamp;
        this._date = date;
        this._category = category;
        this._item = item;
        this._account = account;
        this._currency = currency;
        this._amount = amount;
        this._merchant = merchant;
        this._country = country;
        this._info = info;
        this._amountRON = amountRON;
        this._amountEUR = amountEUR;
        this._amountUSD = amountUSD;
    }

    /**
     * Returns object based on column index;
     * @param index
     * @return string value
     */
    getObjectValue(index: number): string {
        switch (index) {
            case 0: return this.timestamp;
            case 1: return this.date;
            case 2: return this.category;
            case 3: return this.item;
            case 4: return this.account;
            case 5: return this.currency;
            case 6: return this.amount;
            case 7: return this.merchant;
            case 8: return this.country;
            case 9: return this.info;
            case 10: return this.amountRON;
            case 11: return this.amountEUR;
            case 12: return this.amountUSD;
            default: return "";
        }
    }

    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get item(): string {
        return this._item;
    }

    set item(value: string) {
        this._item = value;
    }

    get account(): string {
        return this._account;
    }

    set account(value: string) {
        this._account = value;
    }

    get currency(): string {
        return this._currency;
    }

    set currency(value: string) {
        this._currency = value;
    }

    get amount(): string {
        return this._amount;
    }

    set amount(value: string) {
        this._amount = value;
    }

    get merchant(): string {
        return this._merchant;
    }

    set merchant(value: string) {
        this._merchant = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get info(): string {
        return this._info;
    }

    set info(value: string) {
        this._info = value;
    }

    get amountRON(): string {
        return this._amountRON;
    }

    set amountRON(value: string) {
        this._amountRON = value;
    }

    get amountEUR(): string {
        return this._amountEUR;
    }

    set amountEUR(value: string) {
        this._amountEUR = value;
    }

    get amountUSD(): string {
        return this._amountUSD;
    }

    set amountUSD(value: string) {
        this._amountUSD = value;
    }
}