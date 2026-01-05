import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import Process from '../sections/Process';
import Guarantee from '../sections/Guarantee';
import SocialProof from '../sections/SocialProof';
import Pricing from '../sections/Pricing';
import BlogFeed from '../sections/BlogFeed';
import Comparison from '../sections/Comparison';
import Calculator from '../sections/Calculator';
import AuditTicker from '../sections/AuditTicker';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import CTA from '../sections/CTA';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle incoming hash links (e.g. from blog pages)
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Short delay to ensure DOM is fully ready and images/layout shifted
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.hash]);

    // Elite Organization, Website & FAQ Schema Graph
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
        }
    ];

    const homeSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://launchedin10.co.uk/#organization",
                "name": "LaunchedIn10",
                "url": "https://launchedin10.co.uk",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://launchedin10.co.uk/vite.svg"
                },
                "sameAs": [
                    "https://x.com/launchedin10",
                    "https://linkedin.com/company/launchedin10"
                ],
                "description": "High-performance web design agency delivering revenue-generating digital assets in 10 days."
            },
            {
                "@type": "WebSite",
                "@id": "https://launchedin10.co.uk/#website",
                "url": "https://launchedin10.co.uk",
                "name": "LaunchedIn10",
                "publisher": { "@id": "https://launchedin10.co.uk/#organization" },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://launchedin10.co.uk/blog?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Service",
                "serviceType": "High-Performance Web Design",
                "provider": { "@id": "https://launchedin10.co.uk/#organization" },
                "areaServed": "GB",
                "description": "Professional custom websites built for conversion and speed, delivered in exactly 10 days."
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }
        ]
    };

    return (
        <main>
            <Helmet>
                <title>High-Performance Web Design in 10 Days | LaunchedIn10</title>
                <meta name="description" content="We build elite, revenue-generating web assets for ambitious businesses. Custom high-performance websites delivered in 10 days. Disrupt your market today." />
                <link rel="canonical" href="https://launchedin10.co.uk" />

                {/* OpenGraph / Social */}
                <meta property="og:title" content="Elite Web Design & Performance | LaunchedIn10" />
                <meta property="og:description" content="Stop building standard sites. Start building digital assets. Custom websites delivered in 10 days." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://launchedin10.co.uk" />
                <meta property="og:image" content="https://launchedin10.co.uk/og-image.jpg" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Web Design Reimagined | LaunchedIn10" />
                <meta name="twitter:description" content="Professional custom websites delivered in 10 days. High speed, high performance." />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(homeSchema)}
                </script>
            </Helmet>

            <Hero />
            <Problem />
            <Process />
            <Guarantee />
            <SocialProof />
            <Pricing />
            <Comparison />
            <AuditTicker />
            <Calculator />
            <BlogFeed />
            <FAQ />
            <Contact />
            <CTA />
        </main>
    );
};

export default Home;
