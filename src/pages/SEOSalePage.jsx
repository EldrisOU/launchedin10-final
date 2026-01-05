import React, { useState } from 'react';
import './SEOSalePage.css';

const SEOSalePage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleEmailSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!email || !email.includes('@')) return;

        setIsSubmitting(true);
        try {
            await fetch('https://n8n.eldris.ai/webhook/5aa92bb4-af01-4056-930e-81501f476802', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    action: 'lead',
                    service: 'seo_automation',
                    source: 'seo_sales_page'
                })
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Email submission error:', error);
            setSubmitted(true); // Fallback success
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="seo-page-wrapper">
            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <span className="hero-label">The SEO Market Disruptor</span>
                    <h1 className="hero-title">Outrank Your Competitors <span>Before They Wake Up</span></h1>
                    <p className="hero-subtitle">Google rewards consistent, quality content. Most businesses can't keep up. Yours will. Our autonomous content engine publishes authority-building posts every single day—while your competitors scramble to catch up.</p>

                    <h1 className="hero-title">
                        Instant Quote for <span>SEO Optimization</span>
                    </h1>
                    <p className="hero-subtitle">
                        Dominate search rankings. Get a professional, data-driven SEO audit and optimization plan for your website in seconds.
                    </p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">Daily</div>
                            <div className="hero-stat-label">Fresh Content Published</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">1,200+</div>
                            <div className="hero-stat-label">Words Per Post</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">12hrs</div>
                            <div className="hero-stat-label">First Post Live</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="problem-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">The Hard Truth</div>
                        <h2 className="section-title">Google Changed the Rules. Most Businesses Are Drowning.</h2>
                        <p className="section-subtitle">The algorithm now demands consistent, high-quality content at scale. Without it, you're invisible.</p>
                    </div>

                    <div className="problem-grid">
                        <div className="problem-card">
                            <div className="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h3>Your Competitors Are Moving</h3>
                            <p>While you're planning your content calendar, they're publishing. Every day you wait is another day they're building authority you'll have to fight for.</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <h3>Content Costs Are Killing You</h3>
                            <p>Freelancers charge £50-£100 per post. Agencies want retainers. By the time you've budgeted, your competitors have published 30 more articles.</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                </svg>
                            </div>
                            <h3>You Can't Scale Manually</h3>
                            <p>Google's new quality signals favour volume and consistency. One post a week doesn't cut it anymore. You need daily output to compete.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="solution-section">
                <div className="container">
                    <div className="solution-grid">
                        <div className="solution-content">
                            <h2>Show Up Before Them. Every. Single. Day.</h2>
                            <p>While your competitors are still briefing freelancers, your content is already live and ranking. Our agentic system scans Google Trends for breakout keywords, writes comprehensive posts targeting what people are searching for right now, and publishes directly to your site—automatically.</p>

                            <ul className="solution-list">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>Breakout keyword targeting</strong> — We find what's trending before your competitors do</span>
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>Authority stacking</strong> — Posts interlink automatically to build topical dominance</span>
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>SEO-optimised from the start</strong> — Metadata, schema, internal links—all handled</span>
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>Custom imagery included</strong> — AI-generated visuals with optimised alt text</span>
                                </li>
                            </ul>
                        </div>

                        <div className="solution-visual">
                            <div className="visual-stat">
                                <div className="visual-stat-value">90</div>
                                <div className="visual-stat-label">posts per month on Orbit</div>
                            </div>
                            <div className="visual-features">
                                <div className="visual-feature">
                                    <div className="visual-feature-value">Daily</div>
                                    <div className="visual-feature-label">Publish frequency</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">1,200+</div>
                                    <div className="visual-feature-label">Words per post</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">Trending</div>
                                    <div className="visual-feature-label">Keyword targeting</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">Monthly</div>
                                    <div className="visual-feature-label">Performance reports</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">How It Works</div>
                        <h2 className="section-title">Live in 12 Hours. Outranking Competitors by Day 30.</h2>
                        <p className="section-subtitle">No technical setup. No content planning. No waiting.</p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Select Your Plan</h3>
                            <p>Choose your output level based on how fast you want to dominate</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Install Our Plugin</h3>
                            <p>One-click integration. Works with WordPress, Shopify, WooCommerce</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>We Handle the Rest</h3>
                            <p>Our AI identifies breakout keywords from Google Trends and builds your content strategy</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Watch Posts Go Live</h3>
                            <p>Fresh content publishes daily. Monthly performance reports land in your inbox</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="pricing-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Pricing</div>
                        <h2 className="section-title">Outpace Your Competition for Less Than a Freelancer</h2>
                        <p className="section-subtitle">Month-to-month. No contracts. Cancel anytime.</p>
                    </div>

                    <div className="tiers-grid">
                        {/* Launch */}
                        <div className="tier-card">
                            <h3 className="tier-name">Launch</h3>
                            <p className="tier-tagline">Start building authority</p>

                            <div className="tier-price">
                                <span className="tier-currency">£</span><span className="tier-amount">99.95</span>
                                <span className="tier-period">/month</span>
                            </div>

                            <div className="tier-output">
                                <div className="tier-output-main">30 posts</div>
                                <div className="tier-output-label">1 per day · 1,200+ words each</div>
                            </div>

                            <ul className="tier-features">
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Google Trends keyword targeting</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>AI-generated imagery</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Automatic internal linking</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Full SEO optimisation</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Live within 12 hours</span>
                                </li>
                            </ul>
                        </div>

                        {/* Boost */}
                        <div className="tier-card popular">
                            <span className="tier-badge">Most Popular</span>
                            <h3 className="tier-name">Boost</h3>
                            <p className="tier-tagline">Accelerate past competitors</p>

                            <div className="tier-price">
                                <span className="tier-currency">£</span><span className="tier-amount">149.95</span>
                                <span className="tier-period">/month</span>
                            </div>

                            <div className="tier-output">
                                <div className="tier-output-main">60 posts</div>
                                <div className="tier-output-label">2 per day · 1,200+ words each</div>
                            </div>

                            <ul className="tier-features">
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Everything in Launch</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Competitor gap analysis</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Breakout trend targeting</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Priority publishing queue</span>
                                </li>
                            </ul>
                        </div>

                        {/* Orbit */}
                        <div className="tier-card">
                            <h3 className="tier-name">Orbit</h3>
                            <p className="tier-tagline">Market domination mode</p>

                            <div className="tier-price">
                                <span className="tier-currency">£</span><span className="tier-amount">195</span>
                                <span className="tier-period">/month</span>
                            </div>

                            <div className="tier-output">
                                <div className="tier-output-main">90 posts</div>
                                <div className="tier-output-label">3 per day · 1,200+ words each</div>
                            </div>

                            <ul className="tier-features">
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Everything in Boost</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Multi-site deployment</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Authority stacking sequences</span>
                                </li>
                                <li className="tier-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Dedicated account manager</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="onboarding-note">
                        <p className="onboarding-note-text">One-time setup fee of <span className="onboarding-note-amount">£195</span> — includes plugin installation, site audit, and first content batch live within 12 hours.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">Your Competitors Won't Wait. Neither Should You.</h2>
                    <p className="cta-subtitle">Every day without consistent content is a day they're building authority you'll have to fight for. Start publishing today.</p>

                    <div className="cta-options">
                        {/* Website + SEO */}
                        <div className="cta-card">
                            <div className="cta-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="3" y1="9" x2="21" y2="9"></line>
                                    <line x1="9" y1="21" x2="9" y2="9"></line>
                                </svg>
                            </div>
                            <h3>Website + SEO Bundle</h3>
                            <p>Getting a new website built? Add SEO automation and launch with content momentum from day one.</p>
                            <a href="https://portal.launchedin10.co.uk" className="cta-btn">Explore Website Packages</a>
                        </div>

                        {/* SEO Only */}
                        <div className="cta-card">
                            <div className="cta-card-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                </svg>
                            </div>
                            <h3>SEO Automation Only</h3>
                            <p>Already have a website? Email and we'll onboard you in 5 minutes.</p>

                            {/* Updated to Simple Email Button */}
                            <div className="email-capture">
                                {!submitted ? (
                                    <form className="email-form" onSubmit={handleEmailSubmit}>
                                        <input
                                            type="email"
                                            className="email-input"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="email-submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Sending...' : 'Get Started'}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="email-success visible">
                                        ✓ We'll be in touch within 5 minutes
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">FAQ</div>
                        <h2 className="section-title">Common Questions</h2>
                    </div>

                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3 className="faq-question">Will AI content actually rank?</h3>
                            <p className="faq-answer">Yes. Google rewards consistent, quality content—regardless of how it's created. Our posts are optimised for readability, keyword targeting, and the technical signals that matter. We're seeing clients rank for competitive terms within 30-60 days.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">What about duplicate content?</h3>
                            <p className="faq-answer">Every post is unique. Our system scans your existing content and the web to avoid overlaps. No templates, no spinning—original content every time.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">How do you know what topics to write about?</h3>
                            <p className="faq-answer">We use Google Trends to identify breakout keywords in your industry before they peak. This means you're publishing content for searches that are growing—not yesterday's news.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">Can I cancel anytime?</h3>
                            <p className="faq-answer">Plans run month-to-month with no long-term contract. Cancel or pause whenever you need. All published content remains on your site.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SEOSalePage;
