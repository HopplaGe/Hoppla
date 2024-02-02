import React from 'react';

const RideLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="h-auto">
            {children}
        </div>
    );
};

export default RideLayout;
