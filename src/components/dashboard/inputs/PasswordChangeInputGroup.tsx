"use client"
import * as React from "react"
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

// eslint-disable-next-line react/display-name
const PasswordChangeInputGroup = React.forwardRef<HTMLInputElement, InputProps>(({type, ...props}, ref) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className="sm:flex items-center">
            {/*<dt className="font-medium text-gray-900 sm:w-40 sm:flex-none flex-shrink sm:pr-6">{label}:</dt>*/}
            <dd className="mt-1 flex flex-grow justify-between items-center gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="relative w-full flex items-center">
                    <input
                        type={isPasswordVisible ? "text" : type}
                        ref={ref}
                        {...props}
                        placeholder="******"
                        className="block w-full h-12 rounded-md border focus:border-0 focus:shadow-md outline-none py-1.5 px-6 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 fira-go disabled:bg-transparent disabled:border-transparent"
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 hover:text-gray-500 disabled:invisible"
                        onClick={togglePasswordVisibility}
                        disabled={props.disabled || !props.value}
                    >
                        {isPasswordVisible ? <EyeOff width={16}/> : <Eye width={16}/>}
                    </button>
                </div>

            </dd>
        </div>
    );
});

export default PasswordChangeInputGroup;
