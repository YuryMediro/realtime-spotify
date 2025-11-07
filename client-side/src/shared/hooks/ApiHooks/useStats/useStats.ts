import { statsService } from "@/shared/api/service/stats.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetStats() {
    const {data: stats, isLoading} = useQuery({
        queryKey: ['get stats'],
        queryFn: () => statsService.getStatistics()
    })
    return {stats, isLoading}
}