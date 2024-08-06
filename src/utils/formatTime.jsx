import moment from "moment";

export const convertTimeFormat = (inputDate) => {
    const inputDateFormat = moment(inputDate);
    const result = inputDateFormat.format('YYYY-MM-DDTHH:mm');

    return result;
}