import { ArrowRight, Check } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100/50">
            {/* [DESIGN-ELEVATION] Speed Lines Motif */}
            <div className="absolute top-[15%] right-0 w-1/2 h-full pointer-events-none opacity-[0.03] select-none">
                <div className="w-full h-px bg-primary transform -rotate-12 translate-y-12"></div>
                <div className="w-2/3 ml-auto h-px bg-primary transform -rotate-12 translate-y-24"></div>
                <div className="w-full h-px bg-primary transform -rotate-12 translate-y-36"></div>
                <div className="absolute top-20 right-20 text-[20rem] font-display font-bold text-primary opacity-[0.05] leading-none -rotate-12 z-0">
                    10
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Content (Dominant) */}
                    <div className="lg:col-span-8 relative">
                        {/* Trusted Badge */}
                        <div className="inline-flex items-center gap-3 mb-10 animate-fade-in-up">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        {/* Avatar Placeholder */}
                                    </div>
                                ))}
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-sm font-bold text-primary tracking-tight">Trusted by UK Founders</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-primary leading-[0.95] mb-8 tracking-tighter animate-fade-in-up delay-100">
                            Your Website.<br />
                            <span className="font-serif italic font-light text-accent">Live in 10 Days.</span><br />
                            Managed Forever.
                        </h1>

                        <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl leading-relaxed font-light animate-fade-in-up delay-200">
                            The anti-agency service. We design, build, and manage your bespoke website for a flat monthly fee. No templates. No freelancers. No headaches.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-300">
                            <a href="https://portal.launchedin10.co.uk" className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-primary rounded-none hover:bg-primary-light transition-all shadow-luxury-elevated hover:shadow-luxury-glow transform hover:-translate-y-0.5 min-w-[200px]">
                                Start Your Build
                                <ArrowRight className="ml-3" size={20} />
                            </a>
                            <a href="#process" className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-primary bg-transparent border-2 border-primary/10 hover:border-primary rounded-none transition-all min-w-[200px]">
                                How It Works
                            </a>
                        </div>
                    </div>

                    {/* Right Visual (Abstract / Editorial) */}
                    <div className="lg:col-span-4 relative mt-12 lg:mt-0 animate-fade-in-left delay-300 hidden lg:block">
                        <div className="relative">
                            {/* Abstract Card Stack */}
                            <div className="absolute top-0 right-0 w-64 h-80 bg-accent/5 backdrop-blur-sm border border-accent/10 transform rotate-6 z-0"></div>
                            <div className="relative z-10 bg-white p-8 shadow-luxury-elevated border-l-4 border-accent max-w-sm ml-auto">
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Timeline</div>
                                        <div className="text-3xl font-display font-bold text-primary">10 Days</div>
                                    </div>
                                    <div className="h-px bg-gray-100 w-full"></div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cost</div>
                                        <div className="text-3xl font-display font-bold text-primary">Flat Rate</div>
                                    </div>
                                    <div className="h-px bg-gray-100 w-full"></div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Outcome</div>
                                        <div className="text-3xl font-display font-bold text-accent font-serif italic">Bespoke</div>
                                    </div>
                                </div>
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2 shadow-lg">
                                    <Check size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
