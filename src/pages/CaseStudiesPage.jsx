import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, FileText, CheckCircle, Rocket, ShoppingCart, Globe, FileSearch } from 'lucide-react';
import CTA from '../sections/CTA';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
    // KINETIC EXPANSION STATE
    const [activeCase, setActiveCase] = React.useState(null);
    // EXPANDABLE STORY STATE
    const [expandedStories, setExpandedStories] = React.useState({});

    const openPreview = (url, title) => {
        setActiveCase({ url, title });
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    const toggleStory = (id) => {
        setExpandedStories(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const closePreview = () => {
        setActiveCase(null);
        document.body.style.overflow = 'unset'; // Unlock scroll
    };

    return (
        <div className="case-studies-wrapper">
            <Helmet>
                <title>Real Websites. Live in 10 Days. | LaunchedIn10 Case Studies</title>
                <meta name="description" content="See real examples of high-performance websites built and launched in just 10 days. No templates. No delays. Just results." />
            </Helmet>

            {/* LIVE PREVIEW MODAL (KINETIC EXPANSION) */}
            {activeCase && (
                <div className="preview-modal-overlay" onClick={closePreview}>
                    <div className="preview-modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="preview-modal-header">
                            <span className="modal-title">{activeCase.title}</span>
                            <button className="modal-close" onClick={closePreview}>Close Preview ✕</button>
                        </div>
                        <div className="preview-modal-frame-wrapper">
                            <iframe
                                src={activeCase.url}
                                title={activeCase.title}
                                className="preview-modal-iframe"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* HERO SECTION */}
            <section className="hero">
                <div className="container">
                    <div className="hero-label">Trusted by UK Founders</div>
                    <h1 className="hero-title">
                        Real Websites.<br />
                        <span>Live in 10 Days.</span>
                    </h1>
                    <p className="hero-subtitle">
                        No templates. No drag-and-drop. No 12-week timelines.<br />
                        Professional websites built for your business — managed forever.
                    </p>
                </div>
            </section>

            {/* CASE STUDIES GRID */}
            <section className="case-grid-section">
                <div className="container">
                    <div className="case-grid">

                        {/* CASE STUDY 1: PRITCHARD */}
                        <div className={`case-card ${expandedStories['pritchard'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://client-pritchardcritical-power.pages.dev/', 'Pritchard Critical Power')}>
                                <div className="preview-header">
                                    <span className="domain">pritchardcp.co.uk</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://client-pritchardcritical-power.pages.dev/"
                                        title="Pritchard Critical Power Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    {/* Overlay to prevent accidental scrolls while viewing card, click to interact hints available in future */}
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">03/01/2026</span>
                                    <span className="meta-tag">ELECTRICAL</span>
                                </div>
                                <h2 className="case-title">Pritchard Critical Power</h2>
                                <p className="case-location">Pontypool, Wales</p>
                                <p className="case-description">
                                    A 30-year veteran electrician pivoting to specialist data centre and AI compute infrastructure. Bold, industrial brand that stands apart from generic trade websites.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">8</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">5</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">B2B</div>
                                        <div className="stat-label">FOCUS</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://client-pritchardcritical-power.pages.dev/" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('pritchard')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['pritchard'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['pritchard'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>Gareth Pritchard had 30 years of electrical experience but his existing brand was generic — lost among thousands of UK sparkies. As he pivoted to specialist data centre work, he needed a website that signalled serious capability, not domestic call-outs.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We created Pritchard Critical Power — a complete rebrand with an industrial aesthetic (anthracite black, molten copper) that photographs beautifully against server rooms. Five pages of conversion-focused copy, B2B positioning, and technical credibility signals.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A distinctive online presence that positions Gareth for the contracts he actually wants — data centre operators, colocation providers, and enterprise IT teams.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"The site looks nothing like any other electrical contractor in Wales. That’s exactly what I wanted. Now when I’m tendering for data centre work, I look the part."</p>
                                    <div className="quote-author">— Gareth Pritchard, <span>Managing Director</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 2: DUNNET HOUSE */}
                        <div className={`case-card ${expandedStories['dunnethouse'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://client-dunnethouseschool.pages.dev/', 'Dunnet House School')}>
                                <div className="preview-header">
                                    <span className="domain">dunnethouse.sch.uk</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://client-dunnethouseschool.pages.dev/"
                                        title="Dunnet House School Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">02/01/2026</span>
                                    <span className="meta-tag">EDUCATION</span>
                                </div>
                                <h2 className="case-title">Dunnet House School</h2>
                                <p className="case-location">Caithness, Scotland</p>
                                <p className="case-description">
                                    An independent primary school in the Scottish Highlands. Warm, sophisticated design that conveys trust to parents — while meeting Education Scotland compliance.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">9</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">6</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">100%</div>
                                        <div className="stat-label">COMPLIANT</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://client-dunnethouseschool.pages.dev/" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('dunnethouse')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['dunnethouse'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['dunnethouse'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>Dunnet House School needed to modernize its digital presence without losing the warmth and family atmosphere that defines it. The previous site was outdated and didn't clearly communicate their unique value proposition to prospective parents.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We designed a welcoming, accessible website using a soft, sophisticated color palette that reflects the school's heritage. The new structure simplifies navigation for parents while ensuring all regulatory information is easily found.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A compliant, engaging website that truly represents the school's ethos. Initial feedback from parents has been overwhelmingly positive, citing ease of use and the warm, inviting visual design.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"Finally, a website that shows parents what we’re really like. It feels like us — not like a generic school template."</p>
                                    <div className="quote-author">— Mrs Fiona MacLeod, <span>Headteacher</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 3: THE SELLER INDEX */}
                        <div className={`case-card ${expandedStories['sellerindex'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://thesellerindex.com', 'TheSellerIndex')}>
                                <div className="preview-header">
                                    <span className="domain">thesellerindex.com</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://thesellerindex.com"
                                        title="TheSellerIndex Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">15/01/2026</span>
                                    <span className="meta-tag">DATA INTELLIGENCE</span>
                                </div>
                                <h2 className="case-title">TheSellerIndex</h2>
                                <p className="case-location">Kington, Herefordshire</p>
                                <p className="case-description">
                                    A verified Amazon seller data platform serving lead-gen agencies, compliance providers, and aggregators. Four-tier pricing model with an interactive dataset builder and multi-market coverage across UK, Germany, and France.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">10</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">12</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">B2B</div>
                                        <div className="stat-label">FOCUS</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://thesellerindex.com" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('sellerindex')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['sellerindex'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['sellerindex'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>The founder needed a data product that could stand on its own — not just another landing page, but a full commercial platform with tiered pricing, a live dataset builder, market-specific pages, and the credibility signals that B2B buyers expect before handing over budget.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We built a conversion-optimised SaaS-style site with an interactive dataset builder, four distinct pricing tiers, dedicated market hub pages for UK, Germany, and France, a GDPR compliance section, and schema-rich product pages designed to rank for high-intent Amazon seller lead queries.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A fully operational data commerce platform that positions TheSellerIndex as a credible alternative to enterprise data providers — at a fraction of the cost and with a distinct brand identity that converts cold traffic into paying customers.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"We needed something that looked and felt like a proper SaaS product, not a side project. What we got was a platform our sales team actually sends prospects to with confidence."</p>
                                    <div className="quote-author">— Mark Eldris, <span>Founder</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 4: MEMAERO */}
                        <div className={`case-card ${expandedStories['memaero'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://memaero.co.uk', 'MEMAERO')}>
                                <div className="preview-header">
                                    <span className="domain">memaero.co.uk</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://memaero.co.uk"
                                        title="MEMAERO Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">20/01/2026</span>
                                    <span className="meta-tag">ECOMMERCE</span>
                                </div>
                                <h2 className="case-title">MEMAERO</h2>
                                <p className="case-location">Kington, Herefordshire</p>
                                <p className="case-description">
                                    A UK family drone brand selling beginner-friendly drones with WooCommerce integration, a 60-second product chooser quiz, and a First-Flight Coach onboarding experience. Two products, two price points, one clear mission.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">7</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">8</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">D2C</div>
                                        <div className="stat-label">FOCUS</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://memaero.co.uk" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('memaero')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['memaero'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['memaero'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>The brand needed to launch a consumer drone store that could compete with Amazon and eBay listings — without looking like a generic dropship site. It had to build trust with parents, explain UK drone ID rules, and convert first-time buyers who don't know which drone to pick.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We built a WooCommerce-powered store with an interactive 60-second product chooser quiz, a First-Flight Coach onboarding flow, and product pages that address every parent's concern — from crash durability to UK CAA registration. CoverDrone insurance integration and a 2-year warranty give buyers confidence.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A polished D2C brand that stands apart from marketplace listings. The site positions MEMAERO as a trusted UK family drone specialist rather than another faceless reseller.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"Parents don't buy drones from sites that look sketchy. The quiz and the First-Flight Coach changed everything — people trust us before they even add to cart."</p>
                                    <div className="quote-author">— MEMAERO Team, <span>Brand Owner</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 5: TORXUP */}
                        <div className={`case-card ${expandedStories['torxup'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://torxup.co.uk', 'Torxup')}>
                                <div className="preview-header">
                                    <span className="domain">torxup.co.uk</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://torxup.co.uk"
                                        title="Torxup Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">12/01/2026</span>
                                    <span className="meta-tag">ECOMMERCE</span>
                                </div>
                                <h2 className="case-title">Torxup</h2>
                                <p className="case-location">Kington, Herefordshire</p>
                                <p className="case-description">
                                    A UK tool accessories brand selling rapid Makita-compatible chargers and reusable dust masks to tradespeople and DIYers. Product-led pages with comparison tables, a filter chooser tool, and embedded customer reviews.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">6</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">7</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">D2C</div>
                                        <div className="stat-label">FOCUS</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://torxup.co.uk" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('torxup')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['torxup'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['torxup'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>Torxup needed to sell directly to UK tradespeople — a sceptical audience that lives on vans and sites, not design blogs. The site had to prove product quality instantly, handle Makita compatibility messaging carefully, and convert visitors who are used to buying from Amazon.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We designed a product-led WooCommerce store with head-to-head charger comparison tables, a CoreMask filter chooser tool, and prominent customer reviews. Every page is built to answer the trade buyer's question: "Is this better than what I've got?"</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A focused, no-nonsense ecommerce site that speaks the language of the trade. Product pages convert by leading with specs, comparisons, and social proof — not marketing fluff.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"Our customers are sparkies and chippies, not web designers. The site had to feel like a tool catalogue, not a fashion brand. That's exactly what we got."</p>
                                    <div className="quote-author">— Torxup Team, <span>Founder</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 6: AG8N */}
                        <div className={`case-card ${expandedStories['ag8n'] ? 'expanded' : ''}`}>
                            <div className="case-preview" onClick={() => openPreview('https://28601dff.ag8n.pages.dev/', 'ag8n')}>
                                <div className="preview-header">
                                    <span className="domain">ag8n.io</span>
                                    <span className="preview-hint">Tap to expand ↗</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://28601dff.ag8n.pages.dev/"
                                        title="ag8n Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay">
                                        <div className="overlay-btn">View Live Site</div>
                                    </div>
                                </div>
                            </div>
                            <div className="case-content">
                                <div className="case-meta">
                                    <span className="meta-date">01/02/2026</span>
                                    <span className="meta-tag">DEVELOPER TOOLS</span>
                                </div>
                                <h2 className="case-title">ag8n</h2>
                                <p className="case-location">Kington, Herefordshire</p>
                                <p className="case-description">
                                    A privacy-first MCP server and 7-skill pack that connects Google Antigravity to n8n. One-time purchase at £19.95 — no subscription. Built for developers, vibe coders, and consultants who automate with AI.
                                </p>

                                <div className="case-stats">
                                    <div className="stat">
                                        <div className="stat-value">5</div>
                                        <div className="stat-label flex-col">DAYS<span className="stat-sub">From Brief</span></div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">6</div>
                                        <div className="stat-label">PAGES</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">SaaS</div>
                                        <div className="stat-label">FOCUS</div>
                                    </div>
                                </div>

                                <div className="case-actions">
                                    <a href="https://28601dff.ag8n.pages.dev/" target="_blank" rel="noreferrer" className="case-link" aria-label="View Live Site">
                                        <ArrowRight size={20} />
                                    </a>
                                    <button className="case-toggle" onClick={() => toggleStory('ag8n')}>
                                        <span>Full Story</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={expandedStories['ag8n'] ? 'rotated' : ''}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`case-story ${expandedStories['ag8n'] ? 'expanded' : ''}`}>
                                    <div className="case-story-inner">
                                        <div className="story-section">
                                            <h4>The Challenge</h4>
                                            <p>The product needed a sales page that could explain a deeply technical concept — connecting an AI agent to a workflow automation platform via MCP — to three distinct audiences: developers, vibe coders, and consultants. It also had to handle Stripe checkout for a one-time digital product.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Solution</h4>
                                            <p>We built a clean, developer-focused single-product site with a 7-skill feature grid, a step-by-step installation guide, audience-specific value propositions, and an integrated Stripe checkout. Privacy-first messaging front and centre to match the product's zero-telemetry positioning.</p>
                                        </div>

                                        <div className="story-section">
                                            <h4>The Result</h4>
                                            <p>A polished product page that converts technical visitors without the jargon overload. The install guide doubles as documentation, reducing support queries from day one.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="case-quote">
                                    <p>"Most dev tool landing pages are either too flashy or too sparse. This one explains exactly what ag8n does, who it's for, and how to install it — in under 60 seconds."</p>
                                    <div className="quote-author">— ag8n Team, <span>Product Owner</span></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* MID SECTION TEXT */}
            <section className="mid-text-section">
                <div className="container">
                    <h3>There's a reason you're still looking.</h3>
                    <p>The website design services market is broken. <span>We fixed it.</span></p>
                </div>
            </section>

            {/* HOW WE WORK */}
            <section className="process-mini-section">
                <div className="container">
                    <h2 className="section-title">How We Work</h2>
                    <p className="section-subtitle">No mystery. No six-month timelines. A proven process that delivers results.</p>

                    <div className="process-grid">
                        <div className="process-card">
                            <div className="process-icon"><FileText size={24} /></div>
                            <h3>Brief</h3>
                            <p>Share your content, brand direction, and goals. Most clients complete our simple form in under an hour.</p>
                        </div>
                        <div className="process-card">
                            <div className="process-icon"><Rocket size={24} /></div>
                            <h3>Build</h3>
                            <p>Our team designs and develops your site. You review, we refine. Proper craftsmanship, not templates.</p>
                        </div>
                        <div className="process-card">
                            <div className="process-icon"><CheckCircle size={24} /></div>
                            <h3>Launch</h3>
                            <p>Your professional website goes live within 10 days. We manage hosting, security, and updates — forever.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMING SOON */}
            <section className="coming-soon-section">
                <div className="container">
                    <h2 className="section-title">More Case Studies Coming</h2>
                    <p className="section-subtitle">We're documenting more client transformations. Check back soon.</p>

                    <div className="coming-soon-grid">
                        <div className="coming-card">
                            <Globe size={24} />
                            <h4>Translated Sites</h4>
                            <p>UK businesses expanding into EU markets</p>
                        </div>
                        <div className="coming-card">
                            <FileSearch size={24} />
                            <h4>Professional Services</h4>
                            <p>Consultancies and service-based firms</p>
                        </div>
                        <div className="coming-card">
                            <ShoppingCart size={24} />
                            <h4>Hospitality</h4>
                            <p>Hotels, restaurants, and leisure brands</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Insights - Internal Linking Section */}
            <section className="related-section" style={{ padding: '6rem 0', background: 'var(--bg-warm, #f8f7f4)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="section-label" style={{ display: 'inline-block', marginBottom: '1rem' }}>Related Intelligence</span>
                        <h2 className="section-title">Explore Our Services & Insights</h2>
                        <p className="section-subtitle">Deep-dive resources to help grow your business online.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <a href="/blog/website-design" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', textDecoration: 'none', border: '1px solid rgba(26,43,74,0.1)', transition: 'all 0.3s ease' }}>
                            <h3 style={{ color: 'var(--navy, #1a2b4a)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Website Design</h3>
                            <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.9rem' }}>Guides on building high-performance websites that convert.</p>
                        </a>
                        <a href="/seo-automation" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', textDecoration: 'none', border: '1px solid rgba(26,43,74,0.1)', transition: 'all 0.3s ease' }}>
                            <h3 style={{ color: 'var(--navy, #1a2b4a)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>SEO Disruptor</h3>
                            <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.9rem' }}>Automate content production and outrank competitors.</p>
                        </a>
                        <a href="/website-translation" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', textDecoration: 'none', border: '1px solid rgba(26,43,74,0.1)', transition: 'all 0.3s ease' }}>
                            <h3 style={{ color: 'var(--navy, #1a2b4a)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>EU Translation</h3>
                            <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.9rem' }}>Expand across Europe with fully localised websites.</p>
                        </a>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.9rem' }}>
                            Explore our <a href="/blog" style={{ color: 'var(--teal, #0ea5a5)', fontWeight: '600' }}>content intelligence hub</a> or <a href="/#pricing" style={{ color: 'var(--teal, #0ea5a5)', fontWeight: '600' }}>view website packages</a>.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <CTA />

        </div>
    );
};

export default CaseStudiesPage;
