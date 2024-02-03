import React from 'react';

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="py-16 h-auto">
            {children}
        </div>
    );
};

export default DashboardLayout;
