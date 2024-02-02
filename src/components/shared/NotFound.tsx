import React from 'react';

type Props = {
    title?: string;
    message?: string;
};

const NotFound = ({title}: Props) => {
    return (
        <div className="w-full">
            <h2>{title} ვერ მოიძებნა</h2>
        </div>
    );
};

export default NotFound;
