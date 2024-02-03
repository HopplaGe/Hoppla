"use client";
import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {NextIntlClientProvider} from "next-intl";
import _ from "lodash";
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
            <SessionProvider>
                <NextUIProvider>{children}</NextUIProvider>
            </SessionProvider>
        </NextIntlClientProvider>
    );
};

export default Providers;
