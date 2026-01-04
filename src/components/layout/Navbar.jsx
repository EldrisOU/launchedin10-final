import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const location = useLocation();
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Process', href: '/#process' },
        { name: 'SEO Disruptor', href: '/seo-disruptor' },
        { name: 'Translate Me', href: '/translate-me' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'The Lab', href: '/blog' },
    ];

    const isActive = (href) => {
        if (href === '/') return location.pathname === '/';
        if (href === '/blog') return location.pathname.startsWith('/blog');
        return location.pathname === href;
    };

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-20 flex items-center",
            scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-luxury" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:bg-accent transition-colors duration-500 shadow-lg shadow-primary/10">
                        <Rocket size={20} className="stroke-[2.5px]" />
                    </div>
                    <span className="font-bold text-xl text-primary tracking-tight">
                        Launched<span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-4">In10</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        link.href.startsWith('/#') ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-bold transition-all uppercase tracking-widest",
                                    isActive(link.href)
                                        ? "text-accent border-b-2 border-accent pb-1"
                                        : "text-primary/60 hover:text-accent"
                                )}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={clsx(
                                    "text-sm font-bold transition-all uppercase tracking-widest",
                                    isActive(link.href)
                                        ? "text-accent border-b-2 border-accent pb-1"
                                        : "text-primary/60 hover:text-accent"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <a
                        href="https://app.launchedin10.co.uk"
                        className="bg-primary text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-primary-light transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 uppercase tracking-widest"
                    >
                        Start Build
                    </a>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden p-2 text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        link.href.startsWith('/#') ? (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    "text-lg font-bold transition-colors",
                                    isActive(link.href) ? "text-accent" : "text-primary hover:text-accent"
                                )}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    "text-lg font-bold transition-colors",
                                    isActive(link.href) ? "text-accent" : "text-primary hover:text-accent"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <a
                        href="https://app.launchedin10.co.uk"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-primary text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest"
                    >
                        Start Build
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;