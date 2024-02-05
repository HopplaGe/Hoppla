"use client";
import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {NextIntlClientProvider} from "next-intl";
import {SessionProvider} from "next-auth/react";

type ProvidersProps = {
    children: React.ReactNode;
    locale: string;
    messages: any;
};

const Providers = ({children, locale, messages}: ProvidersProps) => {
    return (
        <NextIntlClientProvider
            onError={() => {
            }}
            //   getMessageFallback
            locale={locale}
            messages={messages}
        >
            <NextUIProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextUIProvider>
        </NextIntlClientProvider>
    );
};

export default Providers;
