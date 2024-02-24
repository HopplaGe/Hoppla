import {useQuery} from "@tanstack/react-query";
import {getArticles} from "@/lib/actions/articles";

export const useArticles = () => {
    return useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            return await getArticles();
        }
    });
}