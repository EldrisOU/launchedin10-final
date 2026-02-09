import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

const ConciergePanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isLeadCapture, setIsLeadCapture] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', email: '', ctaType: '' });
    const inputRef = useRef(null);
    const messagesRef = useRef([]);

    // Keep messagesRef in sync
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // Session ID for the chat session
    const sessionId = useRef(`session-${Math.random().toString(36).substr(2, 9)}`);
    const location = useLocation();

    // -- INIT LOGIC --
    useEffect(() => {
        if (!isOpen) return;

        if (messages.length === 0) {
            setIsTyping(true);

            // Initial greeting
            setTimeout(() => {
                let greeting = "Welcome. Looking to launch a new vision or elevate an existing one?";
                if (location.hash === '#pricing') {
                    greeting = "Need clarity on the perfect tier for your growth?";
                }

                // Add context for the FIRST message so we can track it if needed
                addMessage({
                    text: greeting,
                    sender: 'bot',
                    type: 'text',
                    context: "Bot Greeting"
                });
                setIsTyping(false);

                // Follow up options
                setTimeout(() => {
                    addMessage({
                        type: 'options',
                        sender: 'bot',
                        options: [
                            { label: 'New Vision', value: 'I want to build a brand new vision.' },
                            { label: 'Elevate Existing', value: 'I want to elevate an existing business.' }
                        ]
                    });
                }, 500);
            }, 1000);
        }
    }, [isOpen, location.hash]);

    // Auto-focus input when opening or when typing finishes
    useEffect(() => {
        if (isOpen && !isTyping) {
            // Small delay to ensure render
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isTyping, messages]);

    const addMessage = (msg) => {
        const newMsg = { ...msg, id: Date.now() + Math.random() };
        setMessages(prev => [...prev, newMsg]);
    };

    const handleOptionClick = (option) => {
        // User selection becomes a message
        addMessage({ text: option.label, sender: 'user', type: 'text' });

        if (option.isCTA) {
            // Focus ONLY on email/contact leads per user rules
            if (option.cta === 'email' || option.cta === 'contact') {
                simulateThinking(option.value);
            } else if (option.cta.startsWith('checkout')) {
                simulateThinking(`I'd like to proceed with ${option.cta.split('-')[1] || 'checkout'}`);
            } else {
                simulateThinking(option.value);
            }
        } else {
            simulateThinking(option.value); // Send full descriptive value
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        addMessage({ text: input, sender: 'user', type: 'text' });
        setInput('');
        simulateThinking(input);
    };

    const simulateThinking = (userInput) => {
        setIsTyping(true);
        // Minimum delay for UI feel, then fetch
        setTimeout(() => {
            processResponse(userInput);
        }, 1000);
    };

    const processResponse = async (userInput) => {
        // Use Ref for messages to avoid closure traps and ensure context is always sent
        const currentMessages = messagesRef.current;
        const lastBotMsg = currentMessages.filter(m => m.sender === 'bot').pop();
        const contextText = lastBotMsg ? lastBotMsg.text : "Bot Greeting";

        try {
            const response = await fetch('https://n8n.eldris.ai/webhook/eldris-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userInput,
                    intent: 'message', // Default intent for standard AI interaction
                    sessionId: sessionId.current,
                    page: location.pathname + location.hash,
                    context: contextText // Sending previous bot question as context
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            let responseText = data.output || data.message || "I received your message.";
            let responseOptions = data.options || [];

            // -- NEW: CTA PARSING LOGIC --
            const ctaRegex = /<cta:([^>]+)>/g;
            const ctaMatches = [...responseText.matchAll(ctaRegex)];

            // Remove the raw tags from the text before displaying
            const cleanText = responseText.replace(ctaRegex, '').trim();
            addMessage({ text: cleanText, sender: 'bot', type: 'text' });

            if (ctaMatches.length > 0) {
                const ctaType = ctaMatches[0][1];

                // If the CTA is for email or contact, trigger lead capture mode
                if (ctaType === 'email' || ctaType === 'contact') {
                    setIsLeadCapture(true);
                    setLeadData(prev => ({ ...prev, ctaType }));
                } else {
                    // Otherwise, render it as an option / button
                    setTimeout(() => {
                        addMessage({
                            type: 'options',
                            sender: 'bot',
                            options: [{ label: `Proceed with ${ctaType.replace('-', ' ')}`, value: cleanText, isCTA: true, cta: ctaType }]
                        });
                    }, 500);
                }
            }

            if (responseOptions.length > 0) {
                setTimeout(() => {
                    addMessage({ type: 'options', sender: 'bot', options: responseOptions });
                }, 500);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            addMessage({
                text: "I'm having trouble connecting right now. Please try again.",
                sender: 'bot',
                type: 'text'
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (!leadData.name || !leadData.email) return;

        setIsTyping(true);
        setIsLeadCapture(false);

        addMessage({
            text: `Contact request submitted for ${leadData.name} (${leadData.email})`,
            sender: 'user',
            type: 'text'
        });

        try {
            const response = await fetch('https://n8n.eldris.ai/webhook/eldris-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "Lead Capture Submission",
                    intent: 'contact_team',
                    name: leadData.name,
                    email: leadData.email,
                    cta: leadData.ctaType,
                    sessionId: sessionId.current,
                    page: location.pathname + location.hash
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const responseText = data.output || data.message || "Thank you. Your request has been sent to the team.";

            addMessage({ text: responseText, sender: 'bot', type: 'text' });

            // Reset lead data
            setLeadData({ name: '', email: '', ctaType: '' });

        } catch (error) {
            console.error("Lead Submit Error:", error);
            addMessage({
                text: "There was an issue sending your request. Please try again or use our contact form.",
                sender: 'bot',
                type: 'text'
            });
        } finally {
            setIsTyping(false);
        }
    };

    // Derived state: The "Active" message to display.
    const activeMessage = messages[messages.length - 1];

    return (
        <>
            {/* -- 1. TAB TRIGGER -- */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        whileHover={{ x: -5 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-primary text-accent border border-accent/20 border-r-0 shadow-lg py-8 px-3 rounded-l-xl cursor-pointer overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-accent/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <div className="writing-vertical-rl transform rotate-180 flex items-center gap-4">
                            <MessageSquare className="transform rotate-90 text-accent" size={18} />
                            <span className="font-display font-bold tracking-[0.2em] text-xs text-white">CONCIERGE</span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* -- 2. PANEL -- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-accent z-[100] shadow-2xl flex flex-col border-l border-white/10"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-accent/50 backdrop-blur-md absolute top-0 w-full z-10">
                            <div>
                                <h3 className="font-display font-bold text-2xl text-white tracking-tight">Concierge</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                    <span className="text-xs text-white/80 font-medium tracking-wide uppercase">AI Online</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* CONTENT AREA - STABLE CONTAINER */}
                        <div className="flex-1 flex flex-col items-center justify-center px-8 relative overflow-hidden w-full">

                            {/* Combined Container for Message + Thinking + Input */}
                            <div className="w-full max-w-md flex flex-col items-center">

                                {/* Message / Thinking Area */}
                                <div className="w-full min-h-[220px] flex items-center justify-center mb-6">
                                    <AnimatePresence mode="wait">
                                        {isTyping ? (
                                            <motion.div
                                                key="thinking"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex flex-col items-center gap-4 py-8"
                                            >
                                                <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                <p className="font-display font-medium text-sm text-white/60 tracking-[0.3em] uppercase">Processing</p>
                                            </motion.div>
                                        ) : activeMessage && (
                                            <motion.div
                                                key={activeMessage.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full text-center"
                                            >
                                                {activeMessage.type === 'text' && (
                                                    <h4 className={clsx(
                                                        "font-display leading-snug p-2",
                                                        activeMessage.sender === 'bot'
                                                            ? "text-lg md:text-xl font-medium text-white"
                                                            : "text-base text-white/70 italic font-light"
                                                    )}>
                                                        {activeMessage.text}
                                                    </h4>
                                                )}

                                                {activeMessage.type === 'options' && (
                                                    <div className="flex flex-col gap-3 mt-6 items-center justify-center w-full">
                                                        {activeMessage.options.map((opt, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleOptionClick(opt)}
                                                                className="w-full py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/30 text-white font-medium text-base transition-all duration-300 group flex items-center justify-between"
                                                            >
                                                                <span className="text-sm">{opt.label}</span>
                                                                <ChevronRight className="text-white/40 group-hover:text-white transform group-hover:translate-x-1 transition-all" size={18} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* INPUT AREA - GROUPED WITH CONTENT */}
                                <div className="relative w-full">
                                    <AnimatePresence mode="wait">
                                        {isLeadCapture ? (
                                            <motion.form
                                                key="lead-form"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                onSubmit={handleLeadSubmit}
                                                className="w-full space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10"
                                            >
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Enter your name"
                                                        value={leadData.name}
                                                        onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/40 outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">Work Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="email@company.com"
                                                        value={leadData.email}
                                                        onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/40 outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsLeadCapture(false)}
                                                        className="py-3 px-4 rounded-xl text-white/50 text-sm font-bold hover:text-white transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={!leadData.name || !leadData.email || isTyping}
                                                        className="py-3 px-4 bg-white text-accent rounded-xl text-sm font-bold hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        {isTyping ? <Loader2 className="animate-spin" size={16} /> : "Submit Request"}
                                                    </button>
                                                </div>
                                            </motion.form>
                                        ) : (
                                            <motion.div
                                                key="standard-input"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="relative w-full"
                                            >
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                                    placeholder="Speak to us..."
                                                    className="w-full bg-black/10 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-1 focus:ring-white/20 outline-none transition-all text-base backdrop-blur-md"
                                                    disabled={isTyping}
                                                />
                                                <button
                                                    onClick={handleSend}
                                                    disabled={!input.trim() || isTyping}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white text-accent rounded-xl hover:bg-white/90 disabled:opacity-0 disabled:scale-75 transition-all shadow-lg block"
                                                >
                                                    <Send size={18} strokeWidth={2.5} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </>
    );
};

export default ConciergePanel;

