"use client";
import {useCallback} from 'react';
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useQueryState} from "nuqs";

const useSort = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    // console.log(searchParams.getAll("date"))

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(document.location.search)
            params.set(name, value)

            return params.toString()
        },
        []
    )

    const onChangeHandler = async (name: string, value: any) => {
        router.push(`/search?${createQueryString(name, value)}`)
    }

    const [sort, setSort] = useQueryState("sort", {
        defaultValue: "price-asc",
        parse: (value) => {
            return value;
        },
        serialize: (value) => {
            onChangeHandler("sort", value).then((res) => res);
            return value;
        },
    });

    const [filter, setFilter] = useQueryState("filter", {

        parse: (value) => {
            return value;
        },
        serialize: (value) => {
            onChangeHandler("filter", value).then((res) => res);
            return value;
        },
    });

    return {sort, setSort, filter, setFilter};
};

export default useSort;