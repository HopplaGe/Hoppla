"use client";
import React from "react";
import Image from "next/image";
import hopplaLogo from "@/assets/images/logo.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitch from "@/components/partials/LanguageSwitch";
import LocationSwitch from "@/components/shared/LocationSwitch";
import BlogLinks from "@/components/shared/BlogLinks";
import DailyRideLinks from "@/components/shared/DailyRideLinks";
import { footerNavItems } from "@/config/nav.config";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white -z-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="page-wrapper pt-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-8">
            <Image src={hopplaLogo as any} alt="Hoppla" height={44} />
            <p className="text-sm leading-6 text-default-600 fira-go">
              {t("Pronounce")}
            </p>
            <div className="flex space-x-6">
              {footerNavItems.social.map((item) => (
                <Link
                  target={"_blank"}
                  key={item.name}
                  href={item.href}
                  className="text-default-400 hover:text-default-500 hoppla-animation"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="flex flex-row gap-4 justify-center items-center md:justify-start">
              <LanguageSwitch />
              <LocationSwitch />
            </div>
          </div>
          <div className="mt-16 grid md:grid-cols-3 col-span-2 gap-8 lg:mt-0">
            <DailyRideLinks />
            <BlogLinks />
            <div className="mt-10 md:mt-0">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 fira-go">
                {t("LearnMore")}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavItems.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900 fira-go"
                    >
                      {t(`${item.name}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 py-2 flex flex-row justify-between items-center">
          <p className="text-xs leading-5 text-gray-500 uppercase">
            &copy; {new Date().getFullYear()} Hoppla
          </p>
          <div className="flex space-x-6">
            {footerNavItems.agreements.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-default-400 hover:text-default-500 fira-go text-xs leading-5"
              >
                {t(`${item.name}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
