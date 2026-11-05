import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
    {
        question: "Is the ad budget included in your Package?",
        answer:
            "No. For paid ads on Google or Meta, there are two separate costs: our fee for planning, setting up and managing the campaigns, and your ad budget, which goes directly to the platform. We explain both clearly before you start, so there are no surprises.",
    },
    {
        question: "How much do digital marketing services cost in Nagpur?",
        answer:
            "The cost depends on your goals, industry and the services you need. A small local business and a growing brand need different plans. ScrollFuel creates custom packages for different budgets. Contact us for a free quote.",
    },
    {
        question: "How long does SEO take to show results?",
        answer:
            "Most businesses start seeing improvement in 3 to 6 months. The exact time depends on your competition, your website's current condition and how consistently the work is done. SEO is a long-term investment that keeps bringing traffic.",
    },
    {
        question: "Why do I need SEO if I can run ads?",
        answer:
            "Ads bring quick results but stop when your budget stops. SEO builds steady, long-term traffic that keeps working for you. The best approach for most businesses is to use both together, and ScrollFuel manages them as one plan.",
    },
    {
        question: "Will my business rank first on Google?",
        answer:
            "We cannot promise that, and be careful with anyone who does. Google decides the rankings, and results depend on your competition and your website. What we promise is a clear plan, steady work and honest monthly reports, so you always know what is working."
    },
    {
        question: "How do I get started with ScrollFuel?",
        answer:
            "Call us at +91 87884 30110, message us on WhatsApp or fill out the contact form. We will understand your business, suggest the right plan and give you a free consultation.",
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="dark:bg-black py-16 sm:py-20 lg:py-24"
            aria-labelledby="faq-heading"
        >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Frequently Asked Questions
                    </span>

                    <h2
                        id="faq-heading"
                        className="font-serif text-3xl font-bold leading-tight dark:text-white sm:text-4xl lg:text-5xl"
                    >
                        Digital Marketing FAQs
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        Find answers to common questions about digital marketing,
                        SEO, paid advertising and working with ScrollFuel.
                    </p>
                </div>

                {/* FAQ ACCORDION */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <article
                                key={faq.question}
                                className={`rounded-2xl border px-5 sm:px-7 transition-all duration-300
                                ${isOpen
                                    ? "border-primary bg-primary/[0.04]"
                                    : "border-primary hover:border-primary/50"
                                }`}
                            >
                                {/* QUESTION */}
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="shrink-0 text-sm font-semibold text-primary">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <h3 className="font-serif text-base font-semibold leading-7 dark:text-white sm:text-xl">
                                            {faq.question}
                                        </h3>
                                    </div>

                                    <span className={`shrink-0 rounded-full p-2 transition-all duration-300
                                        ${isOpen
                                            ? "bg-primary text-white rotate-180"
                                            : "bg-white/5 text-primary"
                                        }`}
                                    >
                                        {isOpen ? (
                                            <Minus size={18} />
                                        ) : (
                                            <Plus size={18} />
                                        )}
                                    </span>
                                </button>

                                {/* ANSWER */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeInOut"
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-gray-800/70 pb-6 pt-4 pl-8">
                                                <p className="text-sm leading-7 dark:text-white sm:text-base">
                                                    {faq.answer}
                                                </p>

                                                {/* CTA ON LAST FAQ */}
                                                {index === faqData.length - 1 && (
                                                    <div className="mt-5 flex flex-wrap gap-3">
                                                        <a
                                                            href="tel:+918788430110"
                                                            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
                                                        >
                                                            Call Us
                                                        </a>

                                                        <a
                                                            href="https://wa.me/918788430110"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                                                        >
                                                            WhatsApp Us
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FAQ;