import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type FAQSectionProps = {};

export default function FAQSection({}: FAQSectionProps) {
  const t = useTranslations("FAQSection");
  const tc = useTranslations("FAQSection.content");
  const content = [
    {
      question: tc("question1"),
      answer: tc("answer1"),
    },
    {
      question: tc("question2"),
      answer: tc("answer2"),
    },
    {
      question: tc("question3"),
      answer: tc("answer3"),
    },
  ];
  return (
    <section className="page-wrapper flex items-center flex-col gap-5 w-full">
      <h2 className="text-center text-3xl font-semibold text-secondary">
        {t("title")}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {content.map((item, index) => (
          <AccordionItem key={index} value={`question-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button className="flex" variant="ghost" color="primary" size="lg">
        <Link href="/discord">{t("joinFAQ")}</Link>
      </Button>
    </section>
  );
}
