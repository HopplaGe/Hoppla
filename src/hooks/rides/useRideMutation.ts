import {useMutation} from "@tanstack/react-query";
import {createRide} from "@/lib/actions/rides/create";

export const useRideMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            return await createRide(data)
        }
    });
};