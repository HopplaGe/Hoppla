import React from 'react';

const Tooltip = ({message, children}: { message: string, children: React.ReactNode }) => {
    return (
        <div className="group relative flex">
            {children}
            <span
                className="absolute -top-12 scale-0 transition-all rounded-md bg-secondary p-2 text-xs text-white group-hover:scale-100">{message}</span>
        </div>
    )
};

export default Tooltip;
