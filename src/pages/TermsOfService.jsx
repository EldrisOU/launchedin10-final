import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-primary min-h-screen text-text py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-text-muted mb-12">Last Updated: December 2024</p>

                <div className="space-y-12 text-gray-300 font-sans leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">1. Introduction & Acceptance</h2>
                        <p>
                            These Terms of Service ("Terms") govern your use of the website design, build, and management services ("Services") provided by <strong>LaunchedIn10</strong> ("we," "us," or "our"), located at 61 Bridge Street, Kington, Herefordshire, HR5 3DJ.
                            By purchasing our Services, you ("Client" or "You") agree to be bound by these Terms. If you do not agree, strictly do not use our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">2. Services Description</h2>
                        <p className="mb-4">We provide "done-for-you" website services based on three tiers:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Starter:</strong> Up to 5 pages, template-based, standard delivery.</li>
                            <li><strong>Growth:</strong> Up to 12 pages, semi-custom design, advanced features.</li>
                            <li><strong>Scale:</strong> Up to 25 pages, custom design, complex integrations.</li>
                        </ul>
                        <p className="mt-4">
                            All tiers include monthly hosting, maintenance, security updates, and standard support as defined on our Pricing page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">3. Delivery Guarantee & Timeline</h2>
                        <p className="mb-4">
                            <strong>10-Day Guarantee:</strong> We guarantee to deliver your live website within 10 business days (15 days for Scale Tier) of receiving your <em>complete</em> content.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>The "clock" starts only when we confirm receipt of all required text, images, and logos.</li>
                            <li>If delays are caused by the Client (e.g., slow feedback, missing files), the guarantee clock pauses.</li>
                            <li><strong>Penalty:</strong> If we miss the deadline due to our own fault, we will refund 100% of your Activation Fee. You keep the website and proceed on the monthly plan.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Payment Terms</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Activation Fee:</strong> 50% due upon sign-up to secure your slot. 50% due upon design approval/launch.</li>
                            <li><strong>Monthly Fees:</strong> Recurring billing starts 30 days after sign-up or upon launch, whichever is earlier.</li>
                            <li><strong>Late Payment:</strong> We reserve the right to suspend services (take your site offline) if payment is more than 7 days overdue.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Contract, Cancellation & Ownership</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">Contract Term</h3>
                                <p>Our Services have a minimum initial term of <strong>12 months</strong>.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Early Cancellation</h3>
                                <p>If you cancel within the first 12 months, a cancellation fee applies: 50% of the remaining monthly fees for the term.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">After 12 Months</h3>
                                <p>The contract rolls onto a month-to-month basis. You may cancel anytime with 30 days' written notice.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Ownership</h3>
                                <p><strong>You own your content, domain, and files. Always.</strong> Unlike many agencies, we do not hold your assets hostage. Upon cancellation (and settlement of any outstanding fees), we will transfer your domain and provide a zip file of your website assets upon request.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">6. Revisions & Satisfaction</h2>
                        <p className="mb-4">
                            <strong>30-Day Satisfaction Assurance:</strong> If you are unhappy within 30 days of launch, you may choose:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>Free revisions for up to 5 pages to fix the issues.</li>
                            <li>Cancel the contract immediately with a full refund of your <strong>first month's fee</strong> (Activation Fees are non-refundable as they cover labour delivered).</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">7. Intellectual Property</h2>
                        <p>
                            You represent that you have full rights to all text, images, and logos you provide to us to use on your website. You agree to indemnify us against any claims arising from the content you provide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, LaunchedIn10 shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues given your use of our services. Our maximum liability shall be limited to the amount you paid us in the past 12 months.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">9. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of England and Wales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">10. Contact</h2>
                        <p>
                            Questions about these Terms? Contact us at <a href="mailto:hello@launchedin10.co.uk" className="text-accent hover:underline">hello@launchedin10.co.uk</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
