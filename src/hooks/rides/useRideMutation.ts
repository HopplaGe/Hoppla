import {useMutation} from "@tanstack/react-query";
import {createRide} from "@/lib/actions/rides";

export const useRideMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            return await createRide(data)
        }
    });
};