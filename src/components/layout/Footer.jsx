import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white pt-32 pb-12 overflow-hidden relative">
            {/* GRADIENT TOP ACCENT */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    {/* BRANDING */}
                    <div className="col-span-1 md:col-span-2 text-center md:text-left">
                        <Link to="/" className="inline-block mb-8">
                            <span className="font-bold text-3xl tracking-tighter capitalize">
                                Launched<span className="text-accent italic">In10</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-4 mx-auto md:mx-0">
                            Precision engineering for the private sector. We build hyper-performance digital assets that turn visibility into regional market share.
                        </p>
                        <p className="text-gray-500 text-sm mb-8 font-medium">
                            61 Bridge Streent, Kington, Herefordshire, HR5 3DJ
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer group">
                                <Twitter size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer group">
                                <Linkedin size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Navigation</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li><a href="/#process" className="hover:text-white transition-colors">Process</a></li>
                            <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">The Lab</Link></li>
                            <li><a href="/#comparison" className="hover:text-white transition-colors">Comparison</a></li>
                        </ul>
                    </div>

                    {/* LEGAL */}
                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-accent mb-8">Legal</h4>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 gap-8">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span>Systems Online - v3.4.0</span>
                    </div>
                    <p>&copy; {currentYear} LaunchedIn10. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>UK Stack</span>
                        <span>Zero-JS Carbon</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;