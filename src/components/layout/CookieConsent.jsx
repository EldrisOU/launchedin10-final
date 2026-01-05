import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay showing to not overwhelm the user immediately
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200]"
                >
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-100 shadow-luxury-elevated rounded-2xl p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-accent/10 p-2 rounded-lg text-accent">
                                <Cookie size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display font-bold text-primary text-lg leading-tight uppercase tracking-wide">
                                    Cookie Control
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-text-muted hover:text-primary transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-sm text-text-muted mb-6 leading-relaxed">
                            We use essential cookies to make our site work and analytics to improve your experience.
                            Read our <Link to="/cookies" className="text-accent hover:underline font-medium">Cookie Policy</Link> for details.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-primary text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-light transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                            >
                                Accept All <Check size={14} />
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 border border-gray-200 text-primary py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                Necessary Only
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Check = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default CookieConsent;
