import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FAQSectionProps = {};

const CONTENT = [
  {
    question: "How can I book a ride on Hoppla?",
    answer:
      "Booking your next trip is super easy with our app. Just search for nearby rides, click on the one you like, and you're all set to go!",
  },
  {
    question: "Are the rides on Hoppla affordable?",
    answer:
      "Absolutely! Hoppla offers affordable options for traveling by car or sharing a ride with others. Discover great places to visit without spending too much money!",
  },
  {
    question: "Is safety a priority on Hoppla?",
    answer:
      "Yes, safety is our top priority. We thoroughly check the people who use our service and the people we work with to ensure they're trustworthy. You can relax knowing who you'll be traveling with and book securely through our app.",
  },
];

export default function FAQSection({}: FAQSectionProps) {
  return (
    <section className="page-wrapper flex items-center flex-col gap-5">
      <h2 className="text-center text-3xl font-semibold text-secondary">
        FAQ Hoppla
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {CONTENT.map((item, index) => (
          <AccordionItem key={index} value={`question-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button asChild className="flex">
        <Link href="/discord">Visit Our FAQ Discord</Link>
      </Button>
    </section>
  );
}
