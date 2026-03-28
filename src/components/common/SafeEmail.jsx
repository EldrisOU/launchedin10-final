import React from 'react';

/**
 * SafeEmail Component
 * Obfuscates the email address from crawlers while maintaining 
 * usability for human users. Decodes the address on click.
 */
const SafeEmail = ({ className, children, subject = '', body = '', ...props }) => {
    // hello@launchedin10.co.uk obfuscated with simple base64
    const e = "aGVsbG9AbGF1bmNoZWRpbjEwLmNvLnVr";

    const handleClick = (event) => {
        event.preventDefault();

        try {
            const decoded = atob(e);
            let mailtoUrl = `mailto:${decoded}`;

            const params = [];
            if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
            if (body) params.push(`body=${encodeURIComponent(body)}`);

            if (params.length > 0) {
                mailtoUrl += `?${params.join('&')}`;
            }

            // GA4: Track CTA click as begin_checkout
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'begin_checkout', {
                    event_category: 'conversion',
                    event_label: 'email_cta_click',
                    value: 1
                });
            }

            window.location.href = mailtoUrl;
        } catch (err) {
            console.error('Email decode failed:', err);
        }
    };

    return (
        <a
            href="javascript:void(0)"
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </a>
    );
};

export default SafeEmail;
