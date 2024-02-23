import {useMutation} from "@tanstack/react-query";
import {createCompany} from "@/lib/actions/companies";

export const useCompanyMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            return await createCompany(data);
        }
    });
};