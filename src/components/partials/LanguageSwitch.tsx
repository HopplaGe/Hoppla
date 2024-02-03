"use client";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {localeLabels, locales} from "@/i18n/locales";
import {useLocale, useTranslations} from "next-intl";
import {useRouter, usePathname} from "@/i18n/navigation";
import {useSearchParams} from "next/navigation";

import {useMounted} from "@/hooks/useMounted";

type Locale = keyof typeof localeLabels;

export default function LanguageSwitch() {
    const mounted = useMounted();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const t = useTranslations("LanguageSwitch");

    if (!mounted) return null;

    const handleClick = (locale: string) => {
        router.replace(`${pathname}?${searchParams.toString()}`, {
            locale,
        });
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-none">
                    <Button variant="default">
                        <span className="hidden sm:block">
                          {localeLabels[locale as Locale]}
                        </span>
                        <span className="block sm:hidden">
                          {localeLabels[locale as Locale].slice(0, 2)}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="fira-go">
                    <DropdownMenuLabel>{t("choose-language")}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuRadioGroup
                        value={locale}
                        onValueChange={(val: string) => handleClick(val)}
                    >
                        {locales.map((locale: string) => (
                            <DropdownMenuRadioItem key={locale} value={locale} className="cursor-pointer">
                                {localeLabels[locale as Locale]}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
