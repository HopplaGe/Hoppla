import {useQuery} from "@tanstack/react-query";
import {getAllRules} from "@/lib/actions/rules";

export const useRules = () => {
    return useQuery({
        queryKey: ['rules'],
        queryFn: async () => getAllRules()
    })
}