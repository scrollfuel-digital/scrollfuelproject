const faqData = [
    {
        question: "What does a digital marketing agency in Nagpur do?",
        answer:
            "A digital marketing agency helps your business get found and chosen online. At ScrollFuel, we handle SEO, social media marketing, paid ads, branding, website development and video production, so your business gets more visibility, enquiries and sales.",
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
        question: "How will I know my marketing is working?",
        answer:
            "We track important numbers such as website traffic, leads, calls and ad performance, and share clear monthly reports. You always know what is working, what is being improved and where your money is going.",
    },
    {
        question: "How do I get started with ScrollFuel?",
        answer:
            "Call us at +91 87884 30110, message us on WhatsApp or fill out the contact form. We will understand your business, suggest the right plan and give you a free consultation.",
    },
];

const FAQ = () => {
    return (
        <section
            id="faq"
            className="bg-black py-16 sm:py-20 lg:py-24"
            aria-labelledby="faq-heading"
        >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* =========================
            HEADER
        ========================== */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Frequently Asked Questions
                    </span>

                    <h2
                        id="faq-heading"
                        className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                    >
                        Digital Marketing FAQs
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        Find answers to common questions about digital marketing,
                        SEO, paid advertising and working with ScrollFuel.
                    </p>
                </div>

                {/* =========================
            FAQ LIST
        ========================== */}
                <div className="space-y-5">
                    {faqData.map((faq, index) => (
                        <article
                            key={faq.question}
                            className="rounded-2xl border border-gray-800 bg-black px-5 py-6 transition-all duration-300 hover:border-primary sm:px-7 sm:py-7"
                        >
                            {/* QUESTION */}
                            <div className="flex items-start gap-4">
                                <span className="shrink-0 text-sm font-semibold text-primary">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3 className="font-serif text-lg font-semibold leading-7 text-white sm:text-xl">
                                    {faq.question}
                                </h3>
                            </div>

                            {/* ANSWER */}
                            <div className="mt-4 pl-8">
                                <p className="text-sm leading-7 text-gray-400 sm:text-base">
                                    {faq.answer}
                                </p>
                            </div>

                            {/* CTA ON LAST FAQ */}
                            {index === faqData.length - 1 && (
                                <div className="mt-6 flex flex-wrap gap-3 pl-8">
                                    <a
                                        href="tel:+918788430110"
                                        className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-primary"
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
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQ;