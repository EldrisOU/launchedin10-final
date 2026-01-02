import React, { useEffect, useRef } from 'react';

const Calculator = () => {
    const iframeRef = useRef(null);

    // Listen for resize messages from the calculator iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'CALCULATOR_RESIZE') {
                if (iframeRef.current) {
                    iframeRef.current.style.height = `${event.data.height}px`;
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <section id="calculator" className="bg-white py-24">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Calculate Your Competitive ROI</h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
                    Use our interactive audit tool to see exactly how your current digital presence stacks up. Identify your search market share gaps and the growth potential our 10-day deployment can unlock.
                </p>
            </div>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="w-full bg-white rounded-3xl overflow-hidden min-h-[600px]">
                    <iframe
                        ref={iframeRef}
                        src="/launchedin10-calculator.html"
                        className="w-full border-none transition-all duration-300"
                        title="LaunchedIn10 Calculator"
                        style={{ height: '800px' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Calculator;
