
import {useQuery} from "@tanstack/react-query";
import {getCompanies} from "@/lib/actions/companies";

export const useCompanies = () => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            return await getCompanies();
        }
    });
}