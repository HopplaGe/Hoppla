import type {Metadata} from "next";
import {ReactNode} from "react";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'Hoppla - Ride with us',
    description: 'გაემგზავრე Hoppla-ს დახმარებით სასურველ ადგილას.',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
