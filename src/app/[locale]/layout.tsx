import { ReactNode } from "react";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hoppla - Ride with us",
    description:
        "გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის",
    icons: []
};

export default async function RootLayout({
    children,
    params: { locale },
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

    return (
        <html lang={locale}>
            <body className={cn("fira-go")}>
                <Providers locale={locale} messages={messages}>

                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
