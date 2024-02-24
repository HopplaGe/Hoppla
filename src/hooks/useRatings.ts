import {useQuery} from "@tanstack/react-query";
import {getUserRatings} from "@/lib/actions/ratings/user-ratings";

export const useUserRatings = (userId: string) => {
    return useQuery({
        queryKey: ['ratings', userId],
        queryFn: async () => getUserRatings(userId)
    })
}