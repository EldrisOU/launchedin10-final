import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, FileText, CheckCircle, Rocket, ShoppingCart, Globe, FileSearch } from 'lucide-react';
import CTA from '../sections/CTA';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
    return (
        <div className="case-studies-wrapper">
            <Helmet>
                <title>Real Websites. Live in 10 Days. | LaunchedIn10 Case Studies</title>
                <meta name="description" content="See real examples of high-performance websites built and launched in just 10 days. No templates. No delays. Just results." />
            </Helmet>

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
                        <div className="case-card">
                            <div className="case-preview">
                                <div className="preview-header">
                                    <span className="domain">pritchardcp.co.uk</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://client-pritchardcritical-power.pages.dev/"
                                        title="Pritchard Critical Power Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    {/* Overlay to prevent accidental scrolls while viewing card, click to interact hints available in future */}
                                    <div className="iframe-overlay"></div>
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

                                <a href="https://client-pritchardcritical-power.pages.dev/" target="_blank" rel="noreferrer" className="view-live-link">
                                    VIEW LIVE SITE <ArrowRight size={14} />
                                </a>

                                <div className="case-quote">
                                    <p>"The site looks nothing like any other electrical contractor in Wales. That’s exactly what I wanted. Now when I’m tendering for data centre work, I look the part."</p>
                                    <div className="quote-author">— Gareth Pritchard, <span>Managing Director</span></div>
                                </div>
                            </div>
                        </div>

                        {/* CASE STUDY 2: DUNNET HOUSE */}
                        <div className="case-card">
                            <div className="case-preview">
                                <div className="preview-header">
                                    <span className="domain">dunnethouse.sch.uk</span>
                                </div>
                                <div className="iframe-container">
                                    <iframe
                                        src="https://client-dunnethouseschool.pages.dev/"
                                        title="Dunnet House School Live Preview"
                                        loading="lazy"
                                    ></iframe>
                                    <div className="iframe-overlay"></div>
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
                                    An independent primary school in the Scottish Highlands. Warm, sophisticated design that conveys trust to parents — while meeting Education Scotland compliance requirements.
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

                                <a href="https://client-dunnethouseschool.pages.dev/" target="_blank" rel="noreferrer" className="view-live-link">
                                    VIEW LIVE SITE <ArrowRight size={14} />
                                </a>

                                <div className="case-quote">
                                    <p>"Finally, a website that shows parents what we’re really like. It feels like us — not like a generic school template."</p>
                                    <div className="quote-author">— Mrs Fiona MacLeod, <span>Headteacher</span></div>
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
                            <ShoppingCart size={24} />
                            <h4>Ecommerce</h4>
                            <p>Product-based businesses selling online</p>
                        </div>
                        <div className="coming-card">
                            <Globe size={24} />
                            <h4>Translated Sites</h4>
                            <p>UK businesses expanding into EU</p>
                        </div>
                        <div className="coming-card">
                            <FileSearch size={24} />
                            <h4>SEO Blog Sites</h4>
                            <p>Content-driven lead generation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <CTA />

        </div>
    );
};

export default CaseStudiesPage;
