import {useQuery} from "@tanstack/react-query";
import {getUserStats} from "@/lib/actions/statistics/user-stats";


export const useUserStats = (user: any) => {
    return useQuery({
        queryKey: ['userStats', user],
        queryFn: async () => getUserStats(user?.id!)
    })
}