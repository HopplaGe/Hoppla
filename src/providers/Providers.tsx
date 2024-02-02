"use client"
import React from 'react';
import {NextUIProvider} from "@nextui-org/react";

type ProvidersProps = {
    children: React.ReactNode;
};

const Providers = ({children}: ProvidersProps) => {
    return (
        <NextUIProvider>{children}</NextUIProvider>
    );
};

export default Providers;
