"use client";
import React, {useState} from "react";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import {Menu, Plus} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useSession} from "next-auth/react";
import AuthBlock from "@/components/shared/AuthBlock";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import MobileNav from "@/components/partials/MobileNav";
import {navItems} from "@/config/nav.config";
import {track} from "@vercel/analytics";


const NavBar = () => {
    const session = useSession();

    const {data} = session;

    const isLoggedIn = !!data;

    const pathName = usePathname();
    const locale = useLocale();

    const t = useTranslations("NavBar");

    const [open, setOpen] = useState(false);

    return (
      <>
        <Navbar
          maxWidth="xl"
          classNames={{
            base: "fira-go bg-white",
            wrapper: "px-0 sm:px-6 lg:px-4 xl:px-6",
            content: "",
          }}
        >
          <div className="w-full flex justify-between items-center">
            <NavbarContent className="sm:flex gap-4 ml-2 items-center !basis-full">
              <NavbarBrand className="flex-none">
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    size="sm"
                    variant="light"
                    color="default"
                    className="px-0! min-w-0 block lg:hidden"
                    startContent={<Menu />}
                    onClick={() => setOpen(!open)}
                  />
                  <Logo />
                </div>
              </NavbarBrand>
              <div className="hidden flex-initial w-full lg:flex ml-2 fira-go">
                {navItems.map((item, index) => (
                  <NavbarItem key={index} className="">
                    <Link
                      href={item.href}
                      className={cn(
                        "text-secondary lg:py-5 px-4 hover:bg-default-50 border-transparent",
                        pathName === "/" + locale + item.href &&
                          "bg-default-50 text-primary border-primary",
                        "hover:text-primary border-b-3  hoppla-animation",
                      )}
                    >
                      {t(`${item.name}`)}
                    </Link>
                  </NavbarItem>
                ))}
              </div>
            </NavbarContent>
            <NavbarContent justify="end" className="mr-2 items-center">
              <NavbarItem>
                <Button
                  as={Link}
                  color="default"
                  href="/offer-seats"
                  variant="light"
                  className="hidden lg:flex gap-2 items-center font-medium"
                  startContent={<Plus />}
                  onClick={() => {
                    track("offer_seats_button_click", {
                      locale: locale,
                      location: pathName,
                      query: isLoggedIn
                        ? `User ${data?.user?.email}`
                        : "logged_out",
                    });
                  }}
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
        <MobileNav
          open={open}
          setOpen={setOpen}
          items={navItems}
          t={t}
          isLoggedIn={isLoggedIn}
          pathName={pathName}
          locale={locale}
        />
      </>
    );
};

export default NavBar;
