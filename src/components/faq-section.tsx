import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does the typing test work?</AccordionTrigger>
        <AccordionContent>
          The typing test measures your typing speed and accuracy by having you type a series of words within a time limit. Your performance is measured in WPM (Words Per Minute) and accuracy percentage.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What are the different difficulty levels?</AccordionTrigger>
        <AccordionContent>
          There are three difficulty levels: Easy (common short words), Intermediate (moderate length words), and Hard (longer, more complex words). Choose the level that matches your typing proficiency.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I improve my typing speed?</AccordionTrigger>
        <AccordionContent>
          Regular practice is key. Start with the easy level and gradually move to higher difficulties. Focus on accuracy first, and speed will naturally follow. Practice proper finger positioning and try to maintain a steady rhythm.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How can I contribute to this project?</AccordionTrigger>
        <AccordionContent>
          We welcome contributions! You can contribute by submitting bug reports, suggesting new features, or creating pull requests on our GitHub repository. Check out our contribution guidelines for more information.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}