"use client"
import {Radio, RadioGroup} from "@nextui-org/radio";
import {cn} from "@/lib/utils";
import useSort from "@/hooks/useSort";


const sortData = [
    {
        id: 1,
        title: "ფასის მიხედვით",
        value: "price-asc",
        description: "ყველაზე დაბალი ფასის მიხედვით",
    },
    {
        id: 2,
        title: "დროის მიხედვით",
        value: "time-asc",
        description: "ყველაზე მალე გამსვლელი",
    }
];

export const RadioItem = (props: any) => {
    const {children, ...otherProps} = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

const FilterForm = () => {

    const {sort, setSort} = useSort();

    return (
        <>
            <RadioGroup
                className="mt-4"
                value={sort!}
                onValueChange={setSort}
            >
                {sortData.map((s) => (
                    <RadioItem
                        className="text-sm"
                        description={s.description}
                        value={s.value}
                        key={s.id}
                    >
                        {s.title}
                    </RadioItem>
                ))}
            </RadioGroup>
        </>
    );
};

export default FilterForm;
