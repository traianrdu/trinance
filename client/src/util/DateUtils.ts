export enum DateFormat {
    DayMonthYear,
    DayMonthYearHourMinute
}

/**
 * Format the date based on DateFormat.
 * @param date date type
 * @param dateFormat enum DateFormat
 */
export function dateFormatter(date: Date, dateFormat: DateFormat): string {
    let formattedDate = "";
    if (date != null) {
        if (dateFormat === DateFormat.DayMonthYear) {
            formattedDate = addZero(date.getDate()) + "/" + addToMonth(date.getMonth()) + "/" + date.getFullYear();
            console.log(formattedDate);
            console.log(date);
            console.log("------------");
        } else if (dateFormat === DateFormat.DayMonthYearHourMinute) {
            formattedDate = addZero(date.getDate()) + "/" + addToMonth(date.getMonth()) + "/" + date.getFullYear() + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes());
        }
    }
    return formattedDate;
}

export function formatRevolutDate(date: string): string {
    let dateArray = date.split("/");
    let month = dateArray[0];
    let day = dateArray[1];
    let year = dateArray[2];
    return day + "/" + month + "/" +year;
}

/**
 * Add +1 to month if it is <10.
 * @param month month number
 */
function addToMonth(month: number): string {
    let newMonth = month + 1;
    if (newMonth < 10)
        return 0 + newMonth.toString();
    return newMonth.toString();
}

/**
 * Add a 0 to hour/minute if it is <10.
 * @param hourOrMinute hour/minute number
 */
function addZero(hourOrMinute: number): string {
    if (hourOrMinute < 10) {
        return 0 + hourOrMinute.toString();
    }
    return hourOrMinute.toString();
}