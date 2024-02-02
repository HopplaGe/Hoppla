import {ReactNode} from "react";
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Providers from "@/providers/Providers";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Hoppla - Ride with us',
    description: 'გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის',
}

export default async function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="ka">
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
