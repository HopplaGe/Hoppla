import moment from "moment/moment";

export const compareLastMonthEarnings = (earnings: any) => {

    const currentMonth = moment().startOf('month').format('M');
    const lastMonth = moment().subtract(1, "month").format('M');

    const currentMonthEarnings = earnings.filter((ride: any) => moment(ride.createdAt).format('M') === currentMonth);
    const lastMonthEarnings = earnings.filter((ride: any) => moment(ride.createdAt).format('M') === lastMonth);

    const percent = `${Math.round((currentMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) / earnings.reduce((a: any, b: any) => a + b.price, 0)) * 100)}%` || "0%";
    const status = currentMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) > lastMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) ? "increase" : "decrease";

    return {percent, status};
}