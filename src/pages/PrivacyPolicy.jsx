import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-primary min-h-screen text-text py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-text-muted mb-12">Last Updated: December 2024</p>

                <div className="space-y-12 text-gray-300 font-sans leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to <strong>LaunchedIn10</strong> ("we," "our," or "us"). We provide done-for-you website design services to businesses in the UK and EU.
                            We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (launchedin10.co.uk) or use our services, and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">2. The Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier, and title.</li>
                            <li><strong>Contact Data:</strong> Includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Project Data:</strong> Includes specific business details, content, and files you provide for your website build.</li>
                            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                            <li><strong>Transaction Data:</strong> Includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Performance of Contract:</strong> To deliver the website design, hosting, and management services you have purchased.</li>
                            <li><strong>Legitimate Interests:</strong> To manage our business, prevent fraud, and improve our services (provided your rights do not override these interests).</li>
                            <li><strong>Legal Obligation:</strong> To comply with a legal or regulatory obligation (e.g., tax reporting).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">4. How We Share Your Information</h2>
                        <p className="mb-4">We may share your data with trusted third parties to provide our services:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Payment Processors:</strong> We use Stripe to process payments securely. We do not store your full card details.</li>
                            <li><strong>Hosting Providers:</strong> Your website files and data are stored on secure cloud servers (e.g., AWS, Vercel, Netlify) located in the UK, EU, or US (with appropriate safeguards).</li>
                            <li><strong>Analytics:</strong> All analytics data is anonymised where possible.</li>
                        </ul>
                        <p className="mt-4 font-semibold text-white">We verify that all third parties are compliant with GDPR standards.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Data Retention</h2>
                        <p>
                            We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Client Project Data:</strong> Retained for the duration of your active service + 6 years (for tax/legal purposes).</li>
                            <li><strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">6. Your Rights</h2>
                        <p className="mb-4">Under data protection laws (UK GDPR), you have rights including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Your right of access</strong> - You have the right to ask us for copies of your personal information.</li>
                            <li><strong>Your right to rectification</strong> - You have the right to ask us to rectify personal information you think is inaccurate.</li>
                            <li><strong>Your right to erasure</strong> - You have the right to ask us to erase your personal information in certain circumstances.</li>
                            <li><strong>Your right to restriction of processing</strong> - You have the right to ask us to restrict the processing of your personal information in certain circumstances.</li>
                            <li><strong>Your right to object to processing</strong> - You have the the right to object to the processing of your personal information in certain circumstances.</li>
                        </ul>
                        <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:hello@launchedin10.co.uk" className="text-accent hover:underline">hello@launchedin10.co.uk</a>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">7. Contact Us</h2>
                        <p>
                            <strong>LaunchedIn10</strong><br />
                            61 Bridge Street<br />
                            Kington, Herefordshire<br />
                            HR5 3DJ<br />
                            United Kingdom<br />
                            <br />
                            Email: <a href="mailto:hello@launchedin10.co.uk" className="text-accent hover:underline">hello@launchedin10.co.uk</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
