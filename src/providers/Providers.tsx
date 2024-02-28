"use client";
import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {Analytics} from '@vercel/analytics/react';
import {NextIntlClientProvider} from "next-intl";
import {SessionProvider} from "next-auth/react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type ProvidersProps = {
    children: React.ReactNode;
    locale: string;
    messages: any;
};

const Providers = ({children, locale, messages}: ProvidersProps) => {

    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    // staleTime: 6 * 1000,
                    // refetchInterval: 6 * 1000,
                }
            }
        }
    )

    return (
        <QueryClientProvider client={queryClient}>
            {/*<ReactQueryDevtools/>*/}
            <NextIntlClientProvider
                onError={() => {
                }}
                locale={locale}
                messages={messages}
            >
                <NextUIProvider>
                    <SessionProvider>
                        {children}
                        <Analytics mode={'production'}/>
                    </SessionProvider>
                </NextUIProvider>
            </NextIntlClientProvider>
        </QueryClientProvider>
    );
};

export default Providers;
