"use client";
import React from "react";
import { localeLabels, locales } from "@/i18n/locales";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Locale = keyof typeof localeLabels;

export const LanguageSelector = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const t = useTranslations("LanguageSwitch");

    const handleClick = (e: any) => {
        router.replace(`${pathname}?${searchParams.toString()}`, {
            locale: e.target.value,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                <Button variant="outline">
                    <span className="hidden sm:block">
                        {localeLabels[locale as Locale]}
                    </span>
                    <span className="block sm:hidden">
                        {localeLabels[locale as Locale].slice(0, 2)}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t("choose-language")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={(val: string) => handleClick(val)}
                >
                    {locales.map((locale: string) => (
                        <DropdownMenuRadioItem key={locale} value={locale}>
                            {localeLabels[locale as Locale]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

LanguageSelector.displayName = "LanguageSelector";
