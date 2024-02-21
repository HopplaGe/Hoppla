import {useQuery} from "@tanstack/react-query";
import {getAreasByRegionId} from "@/lib/actions/populated-areas";

export const useGetAreas = (regionId: string) => {
    return useQuery({
        queryKey: ['areas', regionId],
        queryFn: async () => getAreasByRegionId(regionId)
    })
}