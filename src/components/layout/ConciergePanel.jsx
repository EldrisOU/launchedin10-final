import React from 'react';
import { MessageSquare } from 'lucide-react';

const ConciergePanel = () => {
    return (
        <div
            onClick={() => window.location.href = '/#pricing'}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-[var(--navy)] text-[var(--teal)] border border-[rgba(14,165,165,0.2)] border-r-0 shadow-2xl py-8 px-3 rounded-l-2xl cursor-pointer overflow-hidden group transition-all hover:pl-6"
        >
            <div className="absolute inset-0 bg-[rgba(14,165,165,0.1)] translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="flex flex-col items-center gap-4 [writing-mode:vertical-rl] rotate-180">
                <MessageSquare size={18} className="rotate-90 text-[var(--teal)]" />
                <span className="font-display font-bold tracking-[0.2em] text-[10px] text-white uppercase">CONCIERGE</span>
            </div>
        </div>
    );
};

export default ConciergePanel;
