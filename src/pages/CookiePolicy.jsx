import React, { useEffect } from 'react';

const CookiePolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-primary min-h-screen text-text py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Cookie Policy</h1>
                <p className="text-text-muted mb-12">Last Updated: December 2024</p>

                <div className="space-y-12 text-gray-300 font-sans leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">2. How We Use Cookies</h2>
                        <p className="mb-4">We use cookies for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., secure payment processing, login sessions). These cannot be switched off.</li>
                            <li><strong>Performance & Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. We use tools like Google Analytics for this. All data is aggregated and anonymous.</li>
                            <li><strong>Functionality Cookies:</strong> These enable the website to provide enhanced functionality and personalisation (e.g., remembering your preferences).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">3. Specific Cookies We Use</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-white/10 mt-4 text-sm">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="p-4 border border-white/10 text-white font-bold">Cookie Name</th>
                                        <th className="p-4 border border-white/10 text-white font-bold">Purpose</th>
                                        <th className="p-4 border border-white/10 text-white font-bold">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border border-white/10">_ga / _gid</td>
                                        <td className="p-4 border border-white/10">Google Analytics (Statistics)</td>
                                        <td className="p-4 border border-white/10">2 years / 24 hours</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border border-white/10">stripe_mid</td>
                                        <td className="p-4 border border-white/10">Stripe (Fraud Prevention)</td>
                                        <td className="p-4 border border-white/10">1 year</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border border-white/10">session_id</td>
                                        <td className="p-4 border border-white/10">Essential Session Management</td>
                                        <td className="p-4 border border-white/10">Session</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">4. Managing Your Cookies</h2>
                        <p>
                            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.allaboutcookies.org</a>.
                        </p>
                        <p className="mt-4">
                            To opt out of being tracked by Google Analytics across all websites, visit <a href="http://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">http://tools.google.com/dlpage/gaoptout</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions about our use of cookies, please email us at <a href="mailto:hello@launchedin10.co.uk" className="text-accent hover:underline">hello@launchedin10.co.uk</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
