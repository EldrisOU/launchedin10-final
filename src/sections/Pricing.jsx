import { Check } from 'lucide-react';

const PricingCard = ({ tier, popular = false }) => {
    return (
        <div className={`relative group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${popular
            ? 'bg-white/90 backdrop-blur-xl border-white/80 shadow-luxury-elevated ring-1 ring-accent/20 z-10 transform md:-translate-y-4'
            : 'bg-white/60 backdrop-blur-md border-white/50 shadow-luxury hover:shadow-luxury-elevated'
            }`}>
            {popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-primary">{tier.name}</h3>
                <p className="text-sm text-text-muted mt-2 min-h-[40px]">{tier.description}</p>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-primary">£{tier.activation}</span>
                    <span className="ml-2 text-text-muted">activation</span>
                </div>
                <p className="text-sm font-bold text-accent mt-2">+ £{tier.monthly}/mo management</p>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Design & Build</div>
                    <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[18px]"><Check size={18} className="text-accent" /></div>
                                <span className={popular ? "text-primary font-medium" : "text-primary/80"}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Migration Included</div>
                    <ul className="space-y-3">
                        {tier.migration.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[18px]"><Check size={18} className="text-accent" /></div>
                                <span className={popular ? "text-primary font-medium" : "text-primary/80"}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Care & Hosting</div>
                    <ul className="space-y-3">
                        {tier.care.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[18px]"><Check size={18} className="text-accent" /></div>
                                <span className={popular ? "text-primary font-medium" : "text-primary/80"}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className={`w-full mt-8 py-4 px-6 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 ${popular
                ? 'bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-accent/40'
                : 'border-2 border-primary/10 text-primary hover:border-primary hover:bg-primary hover:text-white'
                }`}>
                {popular ? 'Get Started' : 'Choose ' + tier.name}
            </button>
        </div>
    );
};

const Pricing = () => {
    const tiers = [
        {
            name: 'Starter',
            description: 'Perfect for small businesses and sole traders.',
            activation: '497',
            monthly: '99',
            features: ['Up to 5 Pages', 'Template-Based Design', 'Contact Form', '10-Day Delivery'],
            migration: ['25 Blog Posts Migrated', '10 Products Migrated'],
            care: ['Hosting & SSL Included', 'GDPR & Privacy Policy', '48h Email Support']
        },
        {
            name: 'Growth',
            description: 'For established SMBs ready to look the part.',
            activation: '997',
            monthly: '149',
            features: ['Up to 12 Pages', 'Semi-Custom Design', 'Lead Capture Forms', 'Local SEO Setup'],
            migration: ['100 Blog Posts Migrated', '25 Products Migrated'],
            care: ['Priority Hosting', 'Google Business Profile', '24h Email & Chat Support']
        },
        {
            name: 'Scale',
            description: 'For growing businesses with complex needs.',
            activation: '1,997',
            monthly: '249',
            features: ['Up to 25 Pages', 'Fully Custom Design', 'E-commerce Ready', '6-Month SEO Strategy'],
            migration: ['200 Blog Posts Migrated', '75 Products Migrated', 'URL Redirects & Mapping'],
            care: ['Enterprise Hosting', 'Compliance Audit', 'Quarterly Strategy Call']
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-surface-subtle relative overflow-hidden">
            {/* Background Blob for Glassmorphism */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        Website Design Services. Priced Honestly.
                    </h2>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        One activation fee. One monthly rate. New site or redesign — same price, migration included.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Starter Tier */}
                    <PricingCard tier={tiers[0]} />

                    {/* Growth Tier (Featured) */}
                    <PricingCard tier={tiers[1]} popular={true} />

                    {/* Scale Tier */}
                    <PricingCard tier={tiers[2]} />
                </div>

                <div className="mt-12 text-center text-sm text-text-muted space-y-2 opacity-80">
                    <p>All prices in GBP. 12-month minimum term. Cancel anytime after with 30 days' notice. You own everything — always.</p>
                    <p>Larger site? We charge £2 per additional post or product. Most SMB sites fit comfortably within Growth.</p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
