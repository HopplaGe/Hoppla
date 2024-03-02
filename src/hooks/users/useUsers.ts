import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/lib/actions/users/get";

export const useUsers = (take?: number) => {
    return useQuery({
        queryKey: ['users', take],
        queryFn: async () => await getUsers(take)
    })
}