import React, {ReactNode} from 'react';

const Button = ({children, className, onClick, disabled}: {
    children: ReactNode,
    className: string,
    onClick?: any,
    disabled?: boolean
}) => {
    return (
        <button type="submit"
                className={`group relative flex justify-center py-2  items-center gap-x-1.5 rounded-md px-3 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 fira-go disabled:opacity-50 ${className}`}
                onClick={onClick}
                disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
