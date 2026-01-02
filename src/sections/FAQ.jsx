import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-xl bg-white overflow-hidden transition-all duration-300 hover:shadow-lg">
            <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-bold text-primary font-display pr-8">{question}</span>
                {isOpen ? <ChevronUp className="text-accent shrink-0" size={24} /> : <ChevronDown className="text-text-muted shrink-0" size={24} />}
            </button>
            <div className={clsx(
                "px-6 text-text-muted leading-relaxed transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
            )}>
                {/*  Render answer as HTML to support paragraphs if needed, otherwise just text */}
                <div dangerouslySetInnerHTML={{ __html: answer.replace(/\n\n/g, '<br/><br/>') }} />
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            q: "What if I don't like the design?",
            a: "Two protections. First: we deliver in 10 business days or refund 100% of your activation fee—and you keep the site. Second: if you're unhappy within 30 days of launch, we revise up to 5 pages free, or cancel and refund your first month. We're confident, so we put the risk on ourselves."
        },
        {
            q: "Am I locked into a long contract?",
            a: "12-month minimum, then month-to-month with 30 days' notice. But here's the key: you own everything. Domain, files, content—all yours. If you leave after 12 months, you take it all. No hostage situation. Clean exit guaranteed."
        },
        {
            q: "Do I own my website?",
            a: "Yes. Completely. Your domain, your files, your content. If we registered your domain, we transfer it to you on request. If you leave, everything comes with you. We don't believe in holding clients hostage—that's not how you earn loyalty."
        },
        {
            q: "How is this different from Wix or Squarespace?",
            a: "Wix and Squarespace are DIY tools—you're the website designer, unpaid. We're done-for-you website design services. You send content, we build a professional site in 10 days. You never touch a template, drag a block, or debug a plugin. That's the difference."
        },
        {
            q: "How is this different from AI website builders?",
            a: "AI builders generate generic sites in seconds—and they look like it. Our website designers build from scratch, for your specific business, with human creativity and strategic thinking. AI can't understand your market positioning. We can."
        },
        {
            q: "What happens if I want to cancel?",
            a: "Within 12 months: pay remaining months × 50% of your monthly fee. After 12 months: 30 days' notice, no penalty. Your domain and files transfer to you either way. We make leaving easy because we'd rather earn your stay."
        },
        {
            q: "I have an existing website. Is migration included?",
            a: "Yes. Every tier includes migration of your existing content — pages, posts, products, images, the lot. Starter covers up to 25 posts and 10 products. Growth covers up to 100 posts and 25 products. Scale covers up to 200 posts and 75 products. If you're over your tier limit, we charge £2 per extra item."
        },
        {
            q: "What exactly gets migrated from my old site?",
            a: "Everything that matters. Your pages get redesigned from scratch. Blog posts, products, categories, tags, and your entire media library come across to the new site. Scale tier also includes custom fields (like product specifications) and full URL redirect mapping to protect your search rankings."
        },
        {
            q: "How do I know which tier fits my existing site?",
            a: "Count your blog posts and products. If you have under 25 posts and 10 products, Starter works. Under 100 posts and 25 products, Growth is your fit. Anything larger, go Scale. Not sure? Send us your URL and we'll tell you in 24 hours."
        },
        {
            q: "Can I migrate from any platform?",
            a: "Yes. WordPress, Wix, Squarespace, Shopify, Webflow, GoDaddy, Jimdo — we've migrated from all of them. The platform doesn't affect pricing. Your content volume does."
        },
        {
            q: "Who are your website design services for?",
            a: "UK and EU businesses with 1-50 employees who need a professional website but don't have time for DIY, budget for £5k+ agencies, or patience for 12-week timelines. If you want agency quality at startup speed, you're in the right place."
        },
        {
            q: "Why should I trust a website designer I found online?",
            a: "You shouldn't—blindly. That's why we guarantee delivery in 10 days or full refund, plus 30-day satisfaction assurance. We put our money where our claims are. Ask your current agency if they'll do the same."
        },
    ];

    return (
        <section id="faq" className="py-24 bg-white relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-subtle -z-10 skew-x-12 opacity-50"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-primary mb-6">
                        Questions? Answered.
                    </h2>
                    <p className="text-xl text-text-muted">
                        Everything you need to know about our process, guarantee, and pricing.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <FAQItem key={index} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
