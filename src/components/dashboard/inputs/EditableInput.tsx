"use client"
import * as React from "react"
import {Button} from "@/components/ui/button";
import {Check, Edit, X} from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

// eslint-disable-next-line react/display-name
const EditableInput = React.forwardRef<HTMLInputElement, InputProps>(({label, type, ...props}, ref) => {
    const [editing, setEditing] = React.useState(false);

    return (
        <div className="pt-6 sm:flex items-center">
            <dt className="font-medium text-gray-900 sm:w-40 sm:flex-none flex-shrink sm:pr-6">{label}:</dt>
            <dd className="mt-1 flex flex-grow justify-between items-center gap-x-6 sm:mt-0 sm:flex-auto">

                <input
                    type={type}
                    ref={ref}
                    {...props}
                    className="block w-full h-12 rounded-md border focus:border-0 focus:shadow-md outline-none py-1.5 px-6 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 fira-go disabled:bg-transparent disabled:border-0"
                    disabled={!editing}
                />
                <div className="flex gap-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex gap-x-1 items-center disabled:invisible"
                        onClick={() => setEditing(false)}
                        disabled={!editing}
                        //clear form
                        // @ts-ignore
                        onClickCapture={() => props.onChange({target: {value: props.defaultValue}})}
                    >
                        <X size={16}/>
                    </Button>
                    {editing ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(false)}
                            className="flex gap-x-1 items-center"
                        >
                            <Check size={16}/>
                            <span>შენახვა</span>
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(true)}
                            className="flex gap-x-1 items-center"
                        >
                            <Edit size={16}/>
                            <span>რედაქტირება</span>
                        </Button>
                    )}
                </div>
            </dd>
        </div>
    );
});

export default EditableInput;
