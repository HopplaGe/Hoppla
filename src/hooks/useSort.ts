import {useCallback} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useQueryState} from "nuqs";

const useSort = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
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

    return {sort, setSort};
};

export default useSort;
