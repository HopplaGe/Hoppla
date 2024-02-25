import {useQuery} from "@tanstack/react-query";
import {getUrgentInfo} from "@/lib/actions/infos";

export const useUrgentInfo = () => {
    return useQuery({
        queryKey: ['urgentInfo'],
        queryFn: async () => await getUrgentInfo()
    })
}