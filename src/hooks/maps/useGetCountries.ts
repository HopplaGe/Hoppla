import {useQuery} from "@tanstack/react-query";
import {getCountries, getCountry} from "@/lib/actions/countries";

export const useGetCountries = () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => getCountries()
    })
}

export const useGetCountry = (id: string) => {
    return useQuery({
        queryKey: ['country', id],
        queryFn: async () => getCountry(id)
    })
}