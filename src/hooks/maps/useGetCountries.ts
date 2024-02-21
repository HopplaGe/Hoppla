import {useQuery} from "@tanstack/react-query";
import {getCountries} from "@/lib/actions/countries";

export const useGetCountries = () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => getCountries()
    })
}