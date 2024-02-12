import { useTranslations } from "next-intl";
import Hero from "@/components/partials/Hero";
import OfferingsSection from "./(ride)/_components/OfferingsSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";

export default function Index() {
  // const t = useTranslations("Index");
  return (
    <>
      <Hero />
    </>
  );
}
