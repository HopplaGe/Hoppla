"use client"
import React, {useEffect} from 'react';
import {Input} from "@nextui-org/react";

export type EditableCellProps = {
    getValue: () => any;
}

const EditableCell = ({getValue}: EditableCellProps) => {
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue)

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant={"flat"}
            size={"sm"}
            className={"w-full overflow-hidden text-ellipsis whitespace-nowrap"}
        />
    );
};

export default EditableCell;
