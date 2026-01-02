import { ShieldCheck } from 'lucide-react';

const Guarantee = () => {
    return (
        <section id="guarantee" className="py-24 bg-accent relative overflow-hidden text-white">
            {/* Texture Overlay (Noise) */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Depth Shadow */}
            <div className="absolute inset-0 shadow-inner-light pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20 shadow-lg">
                    <ShieldCheck size={48} className="text-white" />
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                    The 10-Day Launch Guarantee.
                </h2>

                <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
                    If we don't not launch your site within 10 business days of receiving your content,
                    <span className="font-bold border-b-2 border-white/30 pb-0.5 mx-1.5">we work for free</span>
                    until it's live.
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5"></div>
                        <p className="text-sm opacity-90">Full refund of your setup fee if we miss the deadline.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5"></div>
                        <p className="text-sm opacity-90">First month of management is on the house.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guarantee;
