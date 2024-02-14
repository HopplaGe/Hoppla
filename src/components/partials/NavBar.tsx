"use client";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import AuthBlock from "@/components/shared/AuthBlock";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Carpool", href: "/carpool" },
  { name: "MiniBuses", href: "/minibuses" },
  { name: "Buses", href: "/buses" },
];

const NavBar = () => {
  const session = useSession();

  const { data } = session;

  const isLoggedIn = !!data;

  const pathName = usePathname();
  const locale = useLocale();

  const t = useTranslations("NavBar");
  return (
    <Navbar maxWidth="xl" className="fira-go bg-white">
      <div className="w-full flex justify-between items-center">
        <NavbarContent
          className="sm:flex gap-4 ml-2 items-center !basis-full"
         
        >
          <NavbarBrand className="flex-none">
            <Logo />
          </NavbarBrand>
          <div className="hidden flex-initial w-full lg:flex ml-2 fira-go">
            {navItems.map((item, index) => (
              <NavbarItem key={index} className="">
                <Link href={item.href} className={cn(
                  "text-secondary lg:py-6 px-4 hover:bg-default-50",
                  pathName === "/" + locale + item.href && "bg-default-50 text-primary",
                  "hover:text-primary hoppla-animation"
                  )}>
                  {t(`${item.name}`)}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
        <NavbarContent justify="end" className="mr-2">
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="/offer-seats"
              variant="light"
              className="hidden lg:flex gap-2 items-center font-medium"
              startContent={<Plus />}
            >
              {t("PublishToRide")}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <AuthBlock isLoggedIn={isLoggedIn} user={data?.user} t={t} />
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavBar;
