import React from 'react';
import logoHorizontal from '../assets/logo-horizontal.svg';

const StatCard = ({ value, label, subtext }) => (
    <div className="text-center p-6 md:p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-luxury transition-all duration-300">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">{value}</div>
        <div className="text-lg font-bold text-navy mb-2">{label}</div>
        <div className="text-sm text-text-muted italic">{subtext}</div>
    </div>
);

const SocialProof = () => {
    return (
        <section id="social-proof" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-primary mb-4">
                        They Switched. They Stayed.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <StatCard
                        value="10-Day"
                        label="Average Delivery"
                        subtext="(we're usually early)"
                    />
                    <StatCard
                        value="97%"
                        label="First-Time Approval Rate"
                        subtext="(clear briefs = better builds)"
                    />
                    <StatCard
                        value="0"
                        label="Clients Held Hostage"
                        subtext="(yes, we track that)"
                    />
                </div>

                {/* Replaced placeholder text with Logo Showcase */}
                <div className="text-center max-w-4xl mx-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={logoHorizontal} alt="LaunchedIn10" className="h-12 mx-auto" />
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
