import React, { useState } from 'react';
import { Send, Check, AlertCircle, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessName: '',
        enquiryType: 'General enquiry',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://acheexsffdcuzidpiwbh.supabase.co/functions/v1/contact-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.ok) {
                setStatus('success');
            } else {
                console.error('Email error:', result.error);
                setStatus('error');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left Column: Context & Info */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                            Let's Talk
                        </h2>
                        <p className="text-xl text-text-muted mb-12 leading-relaxed">
                            Question, quote request, or just want to say hello? We typically respond within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-surface-subtle p-3 rounded-lg text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary mb-1">Email Us</h3>
                                    <a href="mailto:hello@launchedin10.co.uk" className="text-accent font-medium hover:underline">
                                        hello@launchedin10.co.uk
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-surface-subtle p-3 rounded-lg text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary mb-1">Our Office</h3>
                                    <p className="text-text-muted">
                                        61 Bridge Street<br />
                                        Kington, Herefordshire<br />
                                        HR5 3DJ<br />
                                        United Kingdom
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-surface-subtle rounded-xl border border-gray-100">
                            <h4 className="font-bold text-primary mb-2">Have a quick question?</h4>
                            <p className="text-text-muted mb-4 text-sm">Check our FAQ—most answers are there.</p>
                            <a href="#faq" className="text-accent font-semibold text-sm hover:underline">
                                View Frequently Asked Questions →
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white rounded-2xl shadow-luxury-elevated border border-gray-100 p-8">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4">Message Sent!</h3>
                                <p className="text-text-muted mb-8">
                                    Thanks for reaching out, {formData.name}. We'll get back to you shortly (usually within 24 hours).
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-accent font-semibold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {status === 'error' && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-700 text-sm">
                                        <AlertCircle size={18} />
                                        <span>Something went wrong. Please try again or email us directly at hello@launchedin10.co.uk</span>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="jane@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="Optional"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">What can we help with?</label>
                                    <select
                                        name="enquiryType"
                                        value={formData.enquiryType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                                    >
                                        <option>General enquiry</option>
                                        <option>Pricing question</option>
                                        <option>Ready to start</option>
                                        <option>Partnership opportunity</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Tell us a bit about your project..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? (
                                        <>Sending...</>
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
