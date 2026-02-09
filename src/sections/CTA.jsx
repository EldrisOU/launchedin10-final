import { ArrowRight } from 'lucide-react';
import SafeEmail from '../components/common/SafeEmail';

const CTA = () => {
    return (
        <section id="cta" className="py-24 relative overflow-hidden bg-gradient-to-b from-primary to-[#0f172a]">
            {/* Glow Effects */}
            <div className="absolute top-0 center w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/10 rounded-[100%] blur-[100px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <span className="inline-block text-accent font-bold tracking-widest text-sm uppercase mb-6 animate-pulse-slow">
                    Capacity Limited: 5 Spots / Month
                </span>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]">
                    Ready to Launch?
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                    Your professional, managed website is 10 days away. <br className="hidden md:block" />
                    Start your build today for a flat monthly fee.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <SafeEmail className="group inline-flex items-center justify-center px-8 py-5 text-xl font-bold text-primary bg-white hover:bg-gray-50 transition-all shadow-luxury-elevated hover:shadow-luxury-glow min-w-[240px] rounded-none transform hover:-translate-y-1">
                        Start Your Build
                        <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                    </SafeEmail>
                    <SafeEmail className="text-white/80 hover:text-white font-medium border-b border-white/20 hover:border-white transition-colors pb-0.5">
                        Ask a Question
                    </SafeEmail>
                </div>
            </div>
        </section>
    );
};

export default CTA;
