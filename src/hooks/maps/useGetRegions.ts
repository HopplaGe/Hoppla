import {useQuery} from "@tanstack/react-query";
import {getRegions, getRegionsByCountryId} from "@/lib/actions/regions";


export const useGetRegions = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: async () => getRegions()
    })
}

// export const useGetRegion = (id: string) => {
//     return useQuery({
//         queryKey: ['region', id],
//         queryFn: async () => getRegion(id)
//     })
// }

export const useGetRegionByCountryId = (countryId: string) => {
    return useQuery({
        queryKey: ['region', countryId],
        queryFn: async () => getRegionsByCountryId(countryId)
    })
}