import { Check, X, Minus, ShieldCheck, Zap, Globe, Database, Key } from 'lucide-react';
import { clsx } from 'clsx';

const ComparisonRow = ({ label, starter, growth, scale, highlight = false, header = false, subtext = null }) => {
    if (header) {
        return (
            <div className="grid grid-cols-4 gap-4 py-6 border-b border-gray-200 mt-8 first:mt-0">
                <div className="col-span-4 md:col-span-1">
                    <div className="font-display font-bold text-lg text-primary">{label}</div>
                    {subtext && <div className="text-xs text-text-muted font-normal mt-1">{subtext}</div>}
                </div>
                <div className="hidden md:block col-span-3"></div>
            </div>
        );
    }

    return (
        <div className={clsx(
            "py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors",
            highlight && "bg-accent/5 -mx-4 px-4 rounded-lg"
        )}>
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 gap-4 items-center">
                <div className="font-medium text-text-muted col-span-1">{label}</div>
                <div className="text-center text-sm font-semibold text-text-muted">
                    {typeof starter === 'boolean' ? (starter ? <Check className="text-success mx-auto" size={20} /> : <Minus className="text-gray-300 mx-auto" size={20} />) : starter}
                </div>
                <div className="text-center text-sm font-bold text-primary">
                    {typeof growth === 'boolean' ? (growth ? <Check className="text-success mx-auto" size={20} /> : <Minus className="text-gray-300 mx-auto" size={20} />) : growth}
                </div>
                <div className="text-center text-sm font-bold text-accent">
                    {typeof scale === 'boolean' ? (scale ? <Check className="text-success mx-auto" size={20} /> : <Minus className="text-gray-300 mx-auto" size={20} />) : scale}
                </div>
            </div>

            {/* Mobile Layout (Stacked/Gripped) */}
            <div className="md:hidden">
                <div className="font-medium text-primary mb-3">{label}</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded">
                        <span className="uppercase text-[10px] font-bold text-gray-400">Starter</span>
                        <span className="font-semibold text-text-muted">
                            {typeof starter === 'boolean' ? (starter ? <Check className="text-success" size={16} /> : <Minus className="text-gray-300" size={16} />) : starter}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 bg-primary/5 rounded border border-primary/10">
                        <span className="uppercase text-[10px] font-bold text-primary">Growth</span>
                        <span className="font-bold text-primary">
                            {typeof growth === 'boolean' ? (growth ? <Check className="text-success" size={16} /> : <Minus className="text-gray-300" size={16} />) : growth}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 bg-accent/5 rounded border border-accent/10">
                        <span className="uppercase text-[10px] font-bold text-accent">Scale</span>
                        <span className="font-bold text-accent">
                            {typeof scale === 'boolean' ? (scale ? <Check className="text-success" size={16} /> : <Minus className="text-gray-300" size={16} />) : scale}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Comparison = () => {
    return (
        <section id="comparison" className="py-24 bg-surface-subtle">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                        The Elite Standard
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        We don't build "basic" websites. Every tier includes our Elite Infrastructure as standard.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 p-6 md:p-8">
                    {/* Table Header (Desktop) */}
                    <div className="hidden md:grid grid-cols-4 gap-4 pb-6 border-b border-gray-200 mb-4 sticky top-0 bg-white z-20">
                        <div className="font-bold text-gray-400 uppercase text-xs tracking-wider pt-4">Features</div>
                        <div className="text-center">
                            <div className="font-bold text-gray-400 text-lg">Starter</div>
                            <div className="text-xs text-text-muted mt-1">Foundations</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-primary text-xl">Growth</div>
                            <div className="text-xs text-text-muted mt-1">Expansion</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-accent text-lg">Scale</div>
                            <div className="text-xs text-text-muted mt-1">Dominance</div>
                        </div>
                    </div>

                    {/* Elite Infrastructure */}
                    <ComparisonRow label="THE GROWTH ENGINE" subtext="Standard in every build." header />
                    <ComparisonRow label="Google-First Architecture" starter={true} growth={true} scale={true} highlight />
                    <ComparisonRow label="Instant-Load Speed Guarantee" starter={true} growth={true} scale={true} />
                    <ComparisonRow label="Dominant Search Listings" starter={true} growth={true} scale={true} />
                    <ComparisonRow label="ROI & Conversion Tracking" starter={true} growth={true} scale={true} />
                    <ComparisonRow label="Bank-Level Security Shield" starter={true} growth={true} scale={true} />
                    <ComparisonRow label="100% Code & Data Ownership" starter={true} growth={true} scale={true} />

                    {/* Design & Build */}
                    <ComparisonRow label="DESIGN & CAPACITY" header />
                    <ComparisonRow label="Pages Included" starter="5" growth="12" scale="25+" />
                    <ComparisonRow label="Design Level" starter="Template+" growth="Semi-Custom" scale="Fully Custom" />
                    <ComparisonRow label="Revision Rounds" starter="1" growth="2" scale="Unlimited" />

                    {/* Site Migration */}
                    <ComparisonRow label="MIGRATION & PROTECTION" header />
                    <ComparisonRow label="Ranking Protection Guarantee" starter={true} growth={true} scale={true} highlight />
                    <ComparisonRow label="Full Content Migration" starter="Up to 25" growth="Up to 100" scale="Unlimited" />
                    <ComparisonRow label="Product Catalog Transfer" starter="Up to 10" growth="Up to 50" scale="Unlimited" />

                    {/* Support */}
                    <ComparisonRow label="SUPPORT & GROWTH" header />
                    <ComparisonRow label="Google Shopping Setup" starter={<Minus size={18} />} growth={<Minus size={18} />} scale={true} highlight />
                    <ComparisonRow label="Support SLA" starter="Standard" growth="Priority" scale="24/7 Elite" />
                    <ComparisonRow label="Monthly Content Updates" starter="30 Mins" growth="90 Mins" scale="Unlimited" />
                    <ComparisonRow label="Quarterly Strategy Call" starter={<Minus size={18} />} growth={<Check className="text-success mx-auto" size={18} />} scale={<Check className="text-success mx-auto" size={18} />} highlight />
                    <ComparisonRow label="Dedicated Growth Manager" starter={<Minus size={18} />} growth={<Minus size={18} />} scale={<Check className="text-success mx-auto" size={18} />} />

                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-text-muted">
                        * All plans include our strict 90+ PageSpeed guarantee and daily backups.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
