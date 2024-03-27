import { useQuery } from "@tanstack/react-query";
import { getAllStats } from "@/lib/actions/statistics/all-stats";

export const useAllStats = () => {
  return useQuery({
    queryKey: ["allStats"],
    queryFn: async () => getAllStats(),
  });
};
