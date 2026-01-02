import { Upload, Palette, ShieldCheck } from 'lucide-react';

const ProcessStep = ({ number, title, description, subtext, icon: Icon }) => (
    <div className="relative p-8 rounded-2xl bg-white shadow-luxury border border-gray-100">
        <div className="absolute -top-6 left-8 bg-primary text-white font-display font-bold text-2xl px-4 py-2 rounded-lg shadow-lg">
            {number}
        </div>
        <div className="mt-8">
            <h3 className="text-xl font-display font-bold text-primary mb-4">{title}</h3>
            <p className="text-text-muted mb-4">{description}</p>
            <p className="text-sm font-semibold text-accent uppercase tracking-wide">{subtext}</p>
        </div>
    </div>
);

const Process = () => {
    return (
        <section id="process" className="py-24 bg-surface-subtle">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-display font-bold text-primary mb-4">
                        Your Website. Our Problem.
                    </h2>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        Here's how our website design services work—and what you actually have to do (spoiler: almost nothing).
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10 border-t-2 border-dashed border-gray-300"></div>

                    <ProcessStep
                        number="01"
                        title="5 Minutes of Your Time"
                        description="Pick your tier. Send us your content—text, images, logo. Pay 50% to lock in your slot. That's your entire involvement until review."
                        subtext='No calls. No questionnaires. No "discovery workshops."'
                        icon={Upload}
                    />
                    <ProcessStep
                        number="02"
                        title="10 Days of Ours"
                        description="Your dedicated website designer builds from scratch. Not templates. Not AI-generated. Human-crafted design, built for your business. You review. We refine. Done."
                        subtext="Miss the deadline? Full refund. You keep the site."
                        icon={Palette}
                    />
                    <ProcessStep
                        number="03"
                        title="Forever Managed"
                        description="We go live. Then we stay. Hosting, security, updates, compliance, support—handled monthly. Your website grows with your business. We don't disappear."
                        subtext="Unlike the agency you're still trying to reach."
                        icon={ShieldCheck}
                    />
                </div>
            </div>
        </section>
    );
};

export default Process;
