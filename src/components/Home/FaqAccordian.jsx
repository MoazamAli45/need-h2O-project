import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PrimaryButton } from "../shared/Button";

const answers = [
  "Albany",
  "Coatesville",
  "Dairy Flat",
  "Helensville",
  "Huapai",
  "Kaukapakapa",
  "Kumeu",
  "Muriwai",
  "Paremoremo",
  "Riverhead",
  "Silverdale",
  "Stillwater",
  "Taupaki",
  "Waimauku",
  "Wainui",
  "Waitoki",
  "Whenuapai",
  "Woodhill",
];

export function FaqAccordian() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex-col space-y-4 mt-6"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What area&apos;s do we service?</AccordionTrigger>
        <AccordionContent>
          We provide bulk water delivery to the following areas: ,
          <ul>
            {answers.map((item, id) => (
              <li key={id} className="mt-[2px]">
                <span className="text-gray-600 text-[12px]">● </span>
                {item}
              </li>
            ))}
          </ul>
          But we service outside of these areas for residential and commercial
          customers as well. You just need to call us rather than book online,
          and we can schedule it in!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How much water do you deliver?</AccordionTrigger>
        <AccordionContent>
          We deliver a minimum of 11,000 litres at a time. We can deliver more
          than 11,000 litres doing multiple loads, but we don’t do partial
          loads.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are your payment options?</AccordionTrigger>
        <AccordionContent>
          If you book online you make payment at the time of booking. If you
          order over the phone our driver will take payment upon delivery,
          unless we make other arrangements directly. A docket and receipt will
          be supplied upon delivery, regardless of the way payment is made.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Will a water delivery disturb sediment in my tank?
        </AccordionTrigger>
        <AccordionContent>
          Yes it will. We will do our best to minimise any sediment stir up, but
          if it occurs we recommend waiting 2-3 hours to allow the sediment to
          settle. If it has been a while since your tank has been cleaned, we
          recommend getting it cleaned by Healthy Water Tanks Ltd, another local
          business. Please let them know we recommended you.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          Why does my water delivery taste like chlorine?
        </AccordionTrigger>
        <AccordionContent>
          If you choose water that comes from the town water supply, it is
          chlorinated. If you aren&aps;t used to this it can taste a little
          funny at first. We recommend you have water delivered before your tank
          is too empty, so it is diluted by the rainwater already in your tank.
          Alternatively try our pure water, which comes from a natural spring
          source in the Ararimu Valley. This water source is non-chlorinated, is
          rich in natural minerals, and is highly alkaline.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
