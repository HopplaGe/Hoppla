import moment from "moment/moment";

export const compareLastMonthRides = (rides: any) => {

    const currentMonth = moment().startOf('month').format('M');
    const lastMonth = moment().subtract(1, "month").format('M');

    const currentMonthRides = rides.filter((ride: any) => moment(ride.createdAt).format('M') === currentMonth);
    const lastMonthRides = rides.filter((ride: any) => moment(ride.createdAt).format('M') === lastMonth);

    const percent = `${Math.round((currentMonthRides.length / rides.length) * 100)}%` || "0%";
    const status = currentMonthRides.length > lastMonthRides.length ? "increase" : "decrease";

    return {percent, status};
}