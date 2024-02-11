"use client";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import AuthBlock from "@/components/shared/AuthBlock";
import Logo from "@/components/shared/Logo";

const navItems = [
  { name: "Carpool", href: "/carpool" },
  { name: "MiniBuses", href: "/minibuses" },
  { name: "Buses", href: "/buses" },
];

const NavBar = () => {
  const session = useSession();

  const { data } = session;

  const isLoggedIn = !!data;

  const t = useTranslations("NavBar");
  return (
    <Navbar maxWidth="xl" className="fira-go bg-white py-2">
      <NavbarContent
        className="sm:flex gap-4 ml-2 items-center"
        justify="start"
      >
        <NavbarBrand className="flex-none">
          <Logo />
        </NavbarBrand>
        <div className="hidden flex-initial w-full lg:flex gap-4">
          {navItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link href={item.href} className="text-secondary">
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
            color="secondary"
            href="/offer-seats"
            variant="flat"
            className="flex gap-2 items-center font-medium "
            startContent={<Plus />}
          >
            {t("PublishToRide")}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <AuthBlock isLoggedIn={isLoggedIn} user={data?.user} t={t} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
