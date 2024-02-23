import {useQuery} from "@tanstack/react-query";
import {getAreasByRegionId} from "@/lib/actions/populated-areas";
import {getRideByFromAndToAndDateAndSeats} from "@/lib/actions/rides";

export const useRides = (searchParams: any) => {
    return useQuery({
        queryKey: ['rides', searchParams],
        queryFn: async () => getRideByFromAndToAndDateAndSeats(searchParams)
    })
}