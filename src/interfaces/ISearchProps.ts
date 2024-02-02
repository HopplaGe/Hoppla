export interface ISearchProps {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        sort?: string;
        filter?: string;
    }
}