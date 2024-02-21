"use client";
import React from 'react';
import {useGetAreas} from "@/hooks/maps/useGetAreas";

type AreasProps = {
    params: { regionId: string }

}

const Areas = ({params}: AreasProps) => {
    const {data: areas, error, isLoading} = useGetAreas(params.regionId);

    if (error) return <p>Error: {error.message}</p>
    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            <h1>Areas</h1>
            <pre>
                {
                    areas?.map((area: any) => (
                        <div key={area.id}>
                            <h2>{area.name}</h2>
                            <p>{area.code}</p>
                        </div>
                    ))
                }
            </pre>
        </div>
    );
};

export default Areas;
