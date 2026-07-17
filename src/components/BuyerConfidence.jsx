import { useState } from "react";
import { CheckCircle2, ClipboardCheck, FileCheck2, Ship, ChevronDown } from "lucide-react";

const steps = [
  { number: "01", icon: ClipboardCheck, title: "Choose the right vehicle", text: "Tell us the job, your budget, and where the truck will operate. We help narrow the inventory to the right fit." },
  { number: "02", icon: CheckCircle2, title: "Inspect before you commit", text: "Review vehicle photos, specifications, and the inspection result before the truck is prepared for export." },
  { number: "03", icon: FileCheck2, title: "Handle the paperwork", text: "We guide the export and shipping documentation required for a smooth handover at the port." },
  { number: "04", icon: Ship, title: "Follow it to Ghana", text: "Receive shipment updates from departure in Korea through arrival at Tema Port." },
];

const faqs = [
  ["Can I inspect a truck before it ships?", "Yes. Each listing should include a detailed inspection record, photos, and video on request before you make a final decision."],
  ["Is the listed price the final amount I will pay?", "No. Inventory prices are shown as FOB Busan. Freight, duties, clearance, and delivery can vary, so request a complete landed-cost quote for your location."],
  ["How long does shipping take to Ghana?", "Typical sea transit from South Korea to Tema is around 18–22 days. Port processing and delivery timing should be confirmed on your individual quote."],
  ["Can you source a vehicle that is not listed?", "Yes. Use the quote request to describe the vehicle you need, including make, body type, budget, and preferred year."],
];

export default function BuyerConfidence() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <section className="bg-surface px-6 py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">The Truck Doctors process</span>
            <h2 id="process-heading" className="mt-4 text-primary tracking-tighter leading-none">Clear from first enquiry <span className="text-accent">to port arrival.</span></h2>
            <p className="mt-5 max-w-xl text-sm">Buying a commercial vehicle across borders should feel understandable. Here is the process your customer journey should make visible.</p>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return <li key={step.number} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent"><Icon size={19} aria-hidden="true" /></div><span className="text-xs font-bold tracking-widest text-muted">{step.number}</span></div>
                <h3 className="mt-6 text-base font-bold text-primary">{step.title}</h3><p className="mt-2 text-sm leading-relaxed">{step.text}</p>
              </li>;
            })}
          </ol>
        </div>
      </section>

      <section className="bg-white px-6 py-20" aria-labelledby="faq-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Answers before you buy</span><h2 id="faq-heading" className="mt-4 text-primary tracking-tighter leading-none">Make every cost and step easy to understand.</h2><p className="mt-5 text-sm">This section earns confidence before a buyer ever speaks to sales. Replace the sample answers with your exact policy as operations are finalized.</p></div>
          <div className="divide-y divide-border rounded-2xl border border-border">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return <div key={question}><button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-sm font-bold text-primary hover:text-accent">{question}<ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} /></button>{isOpen && <p className="px-5 pb-5 pr-12 text-sm leading-relaxed">{answer}</p>}</div>;
            })}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-primary px-6 py-16 scroll-mt-24" aria-labelledby="quote-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Need a specific truck?</span><h2 id="quote-heading" className="mt-4 text-white tracking-tighter leading-none">Get a complete quote before you decide.</h2><p className="mt-5 text-sm text-white/65">Include your vehicle type, budget, destination, and phone number in your quote form. You can then return a clear vehicle and landed-cost estimate.</p></div>
          <a href="mailto:your-email@example.com?subject=Truck%20quote%20request" className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-dark">Request a quote</a>
        </div>
      </section>
    </>
  );
}
