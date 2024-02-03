import { useTranslations } from "next-intl";

type CarpoolPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CarpoolPage({
  params,
  searchParams,
}: CarpoolPageProps) {
  const t = useTranslations("CarpoolPage");

  return <>{t("title")}</>;
}
