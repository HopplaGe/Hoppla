import {
    QueryClient,
    HydrationBoundary,
    dehydrate
} from "@tanstack/react-query";
import Areas from "./_components/Areas";
import {getAreasByRegionId} from "@/lib/actions/populated-areas";


type RegionDetailProps = {
    params: { regionId: string }
}

const RegionDetail = async ({params}: RegionDetailProps) => {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['areas', params.regionId],
        queryFn: async () => getAreasByRegionId(params.regionId)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <h1>Region Detail</h1>
            <Areas params={params}/>
        </HydrationBoundary>
    );
};

export default RegionDetail;
