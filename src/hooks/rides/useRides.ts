import {useQuery} from "@tanstack/react-query";
import {getRideByFromAndToAndDateAndSeats, getRidesByDate} from "@/lib/actions/rides/get";
import moment from "moment/moment";

export const useRides = (searchParams: any) => {
    return useQuery({
        queryKey: ['rides', searchParams],
        queryFn: async () => getRideByFromAndToAndDateAndSeats(searchParams)
    })
}

export const useDailyRides = () => {
    return useQuery({
        queryKey: ['dailyRides'],
        queryFn: async () => getRidesByDate(new Date(moment().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss')))
    })
}