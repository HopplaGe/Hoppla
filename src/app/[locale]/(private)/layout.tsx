import React from 'react';
import {LayoutProps} from "@/types/layoutProps";

const PrivateLayout = ({children}: LayoutProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default PrivateLayout;
