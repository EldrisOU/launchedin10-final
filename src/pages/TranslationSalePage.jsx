import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Globe,
    Check,
    X,
    Plus,
    ChevronRight,
    ExternalLink,
    Mail,
    Zap,
    Shield,
    MessageSquare,
    CheckCircle2,
    DollarSign,
    Clock,
    Layout,
    ArrowRight
} from 'lucide-react';
import './TranslationSalePage.css';

const CONFIG = {
    WEBHOOK_URL: 'https://n8n.eldris.ai/webhook/5aa92bb4-af01-4056-930e-81501f476802',
    SCAN_TIMEOUT: 60000,
    PRICING: {
        TIERS: {
            50: { onboarding: 195, monthly: 29.95, pages: 50, id: 'starter' },
            100: { onboarding: 345, monthly: 49.95, pages: 100, id: 'growth' },
            500: { onboarding: 795, monthly: 79.95, pages: 500, id: 'business' },
            999: { onboarding: 1495, monthly: 129.95, pages: 9999, id: 'enterprise' }
        }
    }
};

const LANGUAGES = [
    { code: 'de', flag: '🇩🇪', name: 'German' },
    { code: 'fr', flag: '🇫🇷', name: 'French' },
    { code: 'es', flag: '🇪🇸', name: 'Spanish' },
    { code: 'it', flag: '🇮🇹', name: 'Italian' },
    { code: 'nl', flag: '🇳🇱', name: 'Dutch' },
    { code: 'pl', flag: '🇵🇱', name: 'Polish' },
    { code: 'pt', flag: '🇵🇹', name: 'Portuguese' },
    { code: 'sv', flag: '🇸🇪', name: 'Swedish' },
    { code: 'da', flag: '🇩🇰', name: 'Danish' },
    { code: 'fi', flag: '🇫🇮', name: 'Finnish' },
    { code: 'el', flag: '🇬🇷', name: 'Greek' },
    { code: 'cs', flag: '🇨🇿', name: 'Czech' },
    { code: 'hu', flag: '🇭🇺', name: 'Hungarian' },
    { code: 'ro', flag: '🇷🇴', name: 'Romanian' },
    { code: 'bg', flag: '🇧🇬', name: 'Bulgarian' },
    { code: 'sk', flag: '🇸🇰', name: 'Slovak' },
    { code: 'hr', flag: '🇭🇷', name: 'Croatian' },
    { code: 'lt', flag: '🇱🇹', name: 'Lithuanian' },
    { code: 'lv', flag: '🇱🇻', name: 'Latvian' },
    { code: 'et', flag: '🇪🇪', name: 'Estonian' },
    { code: 'sl', flag: '🇸🇮', name: 'Slovenian' },
    { code: 'mt', flag: '🇲🇹', name: 'Maltese' },
    { code: 'ga', flag: '🇮🇪', name: 'Irish' }
];

const TranslationSalePage = () => {
    // State for Widget
    const [isExpanded, setIsExpanded] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const [scanData, setScanData] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedTier, setSelectedTier] = useState(50);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [pricing, setPricing] = useState({ setup: 0, monthly: 0, total: 0 });
    const [leadEmail, setLeadEmail] = useState('');
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);

    const dropdownRef = useRef(null);

    // Pricing calculation logic
    useEffect(() => {
        const langs = selectedLanguages.length;
        const baseTier = CONFIG.PRICING.TIERS[selectedTier];

        let onboarding = baseTier.onboarding;
        let monthly = baseTier.monthly;

        // Apply scan modifiers if available
        if (scanned && scanData) {
            const override = scanData.pricing_override;
            const recommendedTier = scanData.recommended_tier || getRecommendedTier(scanData.pages || 0);

            if (override && selectedTier === recommendedTier) {
                onboarding = override.onboarding ?? baseTier.onboarding;
                monthly = override.monthly ?? baseTier.monthly;
            }
        }

        const setupTotal = langs * onboarding;
        const monthlyTotal = monthly;
        const grandTotal = setupTotal + monthlyTotal;

        setPricing({
            setup: setupTotal,
            monthly: monthlyTotal,
            total: grandTotal,
            onboardingRate: onboarding
        });
    }, [selectedLanguages, selectedTier, scanned, scanData]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLangDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getRecommendedTier = (pages) => {
        if (pages <= 50) return 50;
        if (pages <= 100) return 100;
        if (pages <= 500) return 500;
        return 999;
    };

    const normalizeUrl = (urlStr) => {
        let n = urlStr.trim().toLowerCase();
        if (!n.startsWith('http://') && !n.startsWith('https://')) n = 'https://' + n;
        return n;
    };

    const extractDomain = (urlStr) => {
        try {
            return new URL(normalizeUrl(urlStr)).hostname.replace('www.', '');
        } catch {
            return urlStr.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        }
    };

    const handleScan = async () => {
        if (!url) { setUrlError('Please enter your website URL'); return; }
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i;
        if (!urlPattern.test(url.trim())) { setUrlError('Please enter a valid URL'); return; }

        setUrlError('');
        setIsScanning(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.SCAN_TIMEOUT);

        try {
            const res = await fetch(CONFIG.WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: normalizeUrl(url), action: 'analyse' }),
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.ok) {
                const dataRaw = await res.json();
                const data = Array.isArray(dataRaw) ? dataRaw[0] : dataRaw;
                const finalData = {
                    pages: parseInt(data.pages) || 0,
                    posts: parseInt(data.posts) || 0,
                    products: parseInt(data.product_count || data.products) || 0,
                    forms: parseInt(data.forms) || 0,
                    recommended_tier: data.recommended_tier || null,
                    pricing_override: data.pricing_override || null
                };
                setScanData(finalData);
                setScanned(true);

                const recTier = finalData.recommended_tier || getRecommendedTier(finalData.pages);
                setSelectedTier(recTier);
            } else {
                setUrlError('Could not analyze website. Please try again.');
            }
        } catch (e) {
            clearTimeout(timeout);
            setUrlError('Scan failed. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    const handleLeadSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!leadEmail || !leadEmail.includes('@')) return;

        setIsSubmittingLead(true);
        try {
            await fetch(CONFIG.LEAD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: leadEmail,
                    action: 'lead',
                    service: 'translation',
                    url: url ? normalizeUrl(url) : 'no-url-provided'
                })
            });
            setLeadSubmitted(true);
        } catch (e) {
            console.error('Lead submission failed', e);
            // Show success anyway for UX fallback
            setLeadSubmitted(true);
        } finally {
            setIsSubmittingLead(false);
        }
    };

    const addLanguage = (code) => {
        if (!selectedLanguages.includes(code)) {
            setSelectedLanguages([...selectedLanguages, code]);
        }
        setShowLangDropdown(false);
    };

    const removeLanguage = (code) => {
        setSelectedLanguages(selectedLanguages.filter(c => c !== code));
    };

    const mailtoLink = "mailto:hello@launchedin10.co.uk?subject=Inquiry from Translation Page";

    return (
        <div className="translation-page-wrapper">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <span className="hero-label">EU Expansion Made Simple</span>
                    <h1 className="hero-title">Sell Across Europe <span>Without Rebuilding Your Site</span></h1>
                    <p className="hero-subtitle">Clone and localise your existing website into any EU language. Proper structure, SEO signals, and hreflang baked in. No agencies. No six-figure costs. No waiting months for delivery.</p>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">23</div>
                            <div className="hero-stat-label">EU Languages</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">&lt;1hr</div>
                            <div className="hero-stat-label">Sites Go Live</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">£29.95</div>
                            <div className="hero-stat-label">From /month</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="problem-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">The Reality</div>
                        <h2 className="section-title">EU Expansion Fails for Boring Reasons</h2>
                        <p className="section-subtitle">Demand isn't the issue. Friction is. Localisation projects get stuck in cost, complexity, and constant rework.</p>
                    </div>

                    <div className="problem-grid">
                        <div className="problem-card">
                            <div className="problem-icon"><Clock /></div>
                            <h3>Agency Timelines</h3>
                            <p>Traditional localisation takes months. By the time you launch, the market opportunity has shifted. Your competitors got there first.</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon"><DollarSign /></div>
                            <h3>Six-Figure Quotes</h3>
                            <p>Agencies charge tens of thousands per language. Every content update becomes another invoice. Budgets drain before traction builds.</p>
                        </div>
                        <div className="problem-card">
                            <div className="problem-icon"><Zap /></div>
                            <h3>Technical Nightmares</h3>
                            <p>Plugins break layouts. Developers quote weeks for "simple" changes. You end up managing multiple disconnected sites.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="solution-section">
                <div className="container">
                    <div className="solution-grid">
                        <div className="solution-content">
                            <h2>Clone Once. Sell Everywhere.</h2>
                            <p>We clone your existing website into any EU language—complete with SEO structure, hreflang tags, and proper URL architecture. You don't need a new build. You don't need a plugin project. You need a system that scales as your business grows.</p>

                            <ul className="solution-list">
                                <li><CheckCircle2 size={22} /> <span><strong>Full site clone</strong> — Every page, form, and product in your target language</span></li>
                                <li><CheckCircle2 size={22} /> <span><strong>SEO-ready structure</strong> — Localised URLs, metadata, and hreflang signals</span></li>
                                <li><CheckCircle2 size={22} /> <span><strong>No dev required</strong> — We handle the technical complexity</span></li>
                                <li><CheckCircle2 size={22} /> <span><strong>Updates sync</strong> — Change your main site, translations follow</span></li>
                            </ul>
                        </div>

                        <div className="solution-visual">
                            <div className="visual-stat">
                                <div className="visual-stat-value">23</div>
                                <div className="visual-stat-label">EU languages available</div>
                            </div>
                            <div className="visual-features">
                                <div className="visual-feature">
                                    <div className="visual-feature-value">&lt;1hr</div>
                                    <div className="visual-feature-label">Site live</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">100%</div>
                                    <div className="visual-feature-label">SEO structure</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">Zero</div>
                                    <div className="visual-feature-label">Dev work needed</div>
                                </div>
                                <div className="visual-feature">
                                    <div className="visual-feature-value">UK</div>
                                    <div className="visual-feature-label">Based support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">How It Works</div>
                        <h2 className="section-title">Live in Under an Hour. Seriously.</h2>
                        <p className="section-subtitle">No calls. No back-and-forth. No waiting.</p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Scan Your Site</h3>
                            <p>Enter your URL. We analyse pages, forms, and products automatically</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Choose Languages</h3>
                            <p>Select from 23 EU languages. Add as many as you need</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Pay & Run</h3>
                            <p>Secure checkout. Your clones start building immediately</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Go Live</h3>
                            <p>Localised sites ready in under an hour. DNS setup available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Pricing</div>
                        <h2 className="section-title">Predictable. Per Language. No Surprises.</h2>
                        <p className="section-subtitle">Expand one market at a time with complete control over costs.</p>
                    </div>

                    <div className="tiers-grid">
                        {Object.entries(CONFIG.PRICING.TIERS).map(([tierKey, tier]) => (
                            <div key={tierKey} className={`tier-card ${tier.id === 'growth' ? 'popular' : ''}`}>
                                {tier.id === 'growth' && <span className="tier-badge">Most Popular</span>}
                                <h3 className="tier-name">{tier.id.charAt(0).toUpperCase() + tier.id.slice(1)}</h3>
                                <p className="tier-pages">{tier.pages === 9999 ? '500+' : `Up to ${tier.pages}`} pages</p>
                                <div className="tier-pricing">
                                    <div className="tier-monthly">
                                        <span className="tier-currency">£</span>
                                        <span className="tier-amount">{tier.monthly}</span>
                                        <span className="tier-period">/mo</span>
                                    </div>
                                    <div className="tier-onboarding"><strong>£{tier.onboarding}</strong> per language setup</div>
                                </div>
                                <ul className="tier-features">
                                    <li className="tier-feature"><Check size={16} /> <span>Full site clone</span></li>
                                    <li className="tier-feature"><Check size={16} /> <span>SEO metadata</span></li>
                                    <li className="tier-feature"><Check size={16} /> <span>Hreflang setup</span></li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pricing-note">
                        <p className="pricing-note-text"><span className="pricing-note-highlight">DNS setup done-for-you: £95</span> — We handle subdomain configuration so your translated sites go live with zero technical work from you.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2 className="cta-title">Ready to Sell Across Europe?</h2>
                <p className="cta-subtitle">Scan your site below. See exactly what it'll cost. No surprises.</p>
                <button
                    className="cta-btn"
                    onClick={() => {
                        setIsExpanded(true);
                        window.scrollTo({ bottom: 0, behavior: 'smooth' });
                    }}
                >
                    Calculate My Cost →
                </button>
                <p className="cta-hint">Free scan. No commitment.</p>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">FAQ</div>
                        <h2 className="section-title">Common Questions</h2>
                    </div>

                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3 className="faq-question">Do I need to rebuild my website?</h3>
                            <p className="faq-answer">No. We clone from your existing URL. Your original site stays untouched. We create separate, fully translated versions.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">What about SEO?</h3>
                            <p className="faq-answer">Each clone includes localised URLs, translated metadata, and proper hreflang tags. Google understands exactly which language version to show in each market.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">Will dynamic elements work?</h3>
                            <p className="faq-answer">Most do. Some JavaScript-heavy components may need minor adjustment. We'll flag anything during the scan process.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="faq-question">What about DNS setup?</h3>
                            <p className="faq-answer">Self-serve instructions included, or we do it for you for £95. Either way, your translated sites get proper subdomain URLs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Widget */}
            <div className={`widget-container ${isExpanded ? 'expanded' : ''}`}>
                <div className="widget-wrapper">

                    {/* Collapsed Bar */}
                    {!isExpanded && (
                        <div className="widget-bar" onClick={() => setIsExpanded(true)}>
                            <div className="bar-content">
                                <span className="bar-icon">🌐</span>
                                <span className="bar-text">Translate your website into 23 EU languages</span>
                            </div>
                            <button className="bar-cta">Get Quote</button>
                        </div>
                    )}

                    {/* Expanded Panel */}
                    <div className={`widget-panel ${isExpanded ? 'expanded' : ''}`}>
                        <div className="panel-header">
                            <span className="panel-title">Website Translation Calculator</span>
                            <button className="panel-close" onClick={() => setIsExpanded(false)}><X /></button>
                        </div>

                        <div className="panel-body">
                            {/* Scanning Overlay */}
                            {isScanning && (
                                <>
                                    <div className="scan-modal-backdrop"></div>
                                    <div className="scan-modal">
                                        <div className="spinner"></div>
                                        <div className="scan-status">Scanning your site...</div>
                                    </div>
                                </>
                            )}

                            {/* URL Input */}
                            <div className="calc-section">
                                <div className="calc-section-label">Your Website</div>
                                <div className="url-row">
                                    <input
                                        type="url"
                                        className={`url-input ${urlError ? 'error' : ''}`}
                                        placeholder="yourwebsite.com"
                                        value={url}
                                        onChange={(e) => { setUrl(e.target.value); setUrlError(''); }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                                    />
                                    <button className="scan-btn" onClick={handleScan} disabled={isScanning}>
                                        {scanned ? 'Rescan' : 'Scan Site'}
                                    </button>
                                </div>
                                {urlError && <div className="url-error visible">{urlError}</div>}

                                {scanned && scanData && (
                                    <div className="scan-results">
                                        <div className="scan-header">
                                            <div className="scan-check"><Check size={14} /></div>
                                            <span className="scan-domain">{extractDomain(url)}</span>
                                        </div>
                                        <div className="stats-grid">
                                            <div className="stat-box">
                                                <div className="stat-value">{scanData.pages}</div>
                                                <div className="stat-label">Pages</div>
                                            </div>
                                            <div className="stat-box">
                                                <div className="stat-value">{scanData.forms}</div>
                                                <div className="stat-label">Forms</div>
                                            </div>
                                            <div className="stat-box">
                                                <div className="stat-value">{scanData.products}</div>
                                                <div className="stat-label">Products</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Language Selection */}
                            <div className="calc-section">
                                <div className="calc-section-label">Target Languages</div>
                                <div className="selected-languages">
                                    {selectedLanguages.length === 0 ? (
                                        <span className="no-languages">No languages selected</span>
                                    ) : (
                                        selectedLanguages.map(code => {
                                            const lang = LANGUAGES.find(l => l.code === code);
                                            return (
                                                <span key={code} className="language-tag">
                                                    {lang.flag} {lang.name}
                                                    <button className="language-tag-remove" onClick={() => removeLanguage(code)}><X size={12} /></button>
                                                </span>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="language-dropdown-wrapper" ref={dropdownRef}>
                                    <button className="add-language-btn" onClick={() => setShowLangDropdown(!showLangDropdown)}>
                                        <Plus size={16} /> Add language
                                    </button>
                                    {showLangDropdown && (
                                        <div className="language-dropdown">
                                            {LANGUAGES.map(lang => (
                                                <div
                                                    key={lang.code}
                                                    className={`language-option ${selectedLanguages.includes(lang.code) ? 'disabled' : ''}`}
                                                    onClick={() => !selectedLanguages.includes(lang.code) && addLanguage(lang.code)}
                                                >
                                                    <span className="language-option-flag">{lang.flag}</span>
                                                    <span>{lang.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tier Selection */}
                            <div className="calc-section">
                                <div className="calc-section-label">Site Size Tier</div>
                                <div className="tier-options">
                                    {Object.entries(CONFIG.PRICING.TIERS).map(([tierKey, tier]) => (
                                        <label key={tierKey} className="tier-option">
                                            <input
                                                type="radio"
                                                name="tier"
                                                value={tierKey}
                                                checked={selectedTier === parseInt(tierKey)}
                                                onChange={(e) => setSelectedTier(parseInt(e.target.value))}
                                            />
                                            <span className="tier-btn">
                                                <span className="tier-left">
                                                    <span className="tier-radio"></span>
                                                    <span>
                                                        <span className="tier-label-text">{tier.id.charAt(0).toUpperCase() + tier.id.slice(1)}</span>
                                                        <span className="tier-pages-text"> · {tier.pages === 9999 ? '500+' : `≤${tier.pages}`} pages</span>
                                                    </span>
                                                </span>
                                                <span className="tier-price-text">£{tier.monthly}/mo</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Box */}
                            <div className="pricing-box">
                                <div className="price-row">
                                    <span className="price-label">Setup ({selectedLanguages.length} × £{pricing.onboardingRate})</span>
                                    <span className="price-value">£{pricing.setup.toLocaleString()}</span>
                                </div>
                                <div className="price-row">
                                    <span className="price-label">First month</span>
                                    <span className="price-value">£{pricing.monthly.toFixed(2)}</span>
                                </div>
                                <div className="price-row total">
                                    <span className="price-label">Due Today</span>
                                    <span className="price-value">£{pricing.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="price-monthly">
                                    Then <strong>£{pricing.monthly.toFixed(2)}</strong>/month
                                </div>
                            </div>

                            {/* CTA Options */}
                            <div className="cta-options-widget">
                                <a href="https://app.launchedin10.co.uk" className="cta-option-card">
                                    <div className="cta-option-title">Website + Translation Bundle</div>
                                    <div className="cta-option-desc">Building a new site? Add translation from day one</div>
                                    <span className="cta-option-btn">Start Website Build →</span>
                                </a>
                                <div className="cta-option-card">
                                    <div className="cta-option-title">Translation Only</div>
                                    <div className="cta-option-desc">Already have a website? Drop your email and we'll onboard you in 5 minutes.</div>

                                    {!leadSubmitted ? (
                                        <form className="email-capture-form" onSubmit={handleLeadSubmit}>
                                            <input
                                                type="email"
                                                className="email-input-widget"
                                                placeholder="your@email.com"
                                                value={leadEmail}
                                                onChange={(e) => setLeadEmail(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="cta-option-btn" disabled={isSubmittingLead}>
                                                {isSubmittingLead ? 'Sending...' : 'Get Started →'}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="email-success-widget">
                                            <CheckCircle2 size={16} /> We'll be in touch within 5 minutes
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="trust-line">
                                <span>🔒 Secure checkout</span>
                                <span>⚡ Live in under 1hr</span>
                                <span>💬 UK support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslationSalePage;
