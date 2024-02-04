import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import {notFound} from "next/navigation";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/lib/auth";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Hoppla - Ride with us",
    description:
        "გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის",
};

export default async function RootLayout({
                                             children,
                                             params: {locale},
                                         }: {
    children: ReactNode;
    params: { locale: string };
}) {
    let messages: any;
    try {
        messages = (await import(`../../i18n/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    const session = await auth()

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </Providers>
        </body>
        </html>
    );
}
