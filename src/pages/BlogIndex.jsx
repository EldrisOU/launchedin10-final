import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Calendar,
    User,
    ArrowRight,
    Loader2,
    Rocket,
    Search,
    Globe,
    Sparkles,
    Clock,
    CheckCircle2,
    TrendingUp,
    Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const SILO_CATEGORIES = [
    {
        id: 'business-growth',
        name: 'Business Growth',
        icon: Rocket,
        description: 'Scaling strategies and automation playbooks for elite performance.'
    },
    {
        id: 'website-design',
        name: 'Website Design',
        icon: Globe,
        description: 'Converstion-first architecture and premium user experience guides.'
    },
    {
        id: 'seo-fundamentals',
        name: 'SEO Fundamentals',
        icon: Search,
        description: 'Technical SEO and authority building for search dominance.'
    },
    {
        id: 'industry-spotlights',
        name: 'Industry Spotlights',
        icon: Sparkles,
        description: 'Sector-specific insights and emerging technology trends.'
    }
];

const BlogIndex = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('li10_posts')
                    .select('*')
                    .eq('status', 'publish')
                    .order('published_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 bg-[var(--bg-warm)]">
                <Loader2 className="animate-spin text-[var(--teal)]" size={48} />
            </div>
        );
    }

    // Filter SILO_CATEGORIES if a category param is present
    const activeSilos = category
        ? SILO_CATEGORIES.filter(s => s.id === category || s.name.toLowerCase().replace(/ /g, '-') === category)
        : SILO_CATEGORIES;

    // Group posts by category
    const groupedPosts = activeSilos.reduce((acc, silo) => {
        acc[silo.name] = posts.filter(p => p.primary_category === silo.name);
        return acc;
    }, {});

    return (
        <div className="bg-[var(--bg-warm)] min-h-screen">
            <Helmet>
                <title>{category ? `${activeSilos[0]?.name} Insights` : 'Website Insights & Growth Guides'} | LaunchedIn10 Blog</title>
                <meta name="description" content={category ? `Expert guides on ${activeSilos[0]?.name} for UK SMEs.` : "Expert guides on website design, SEO fundamentals, and business growth for UK SMEs."} />
                <link rel="canonical" href={category ? `https://launchedin10.co.uk/blog/${category}` : "https://launchedin10.co.uk/blog"} />
            </Helmet>

            {/* HERO SECTION */}
            <section className="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[var(--bg-warm)] to-[var(--surface)]">
                {/* Decorative Elements */}
                <div className="absolute top-40 right-[-10%] w-[40%] aspect-square bg-[radial-gradient(circle,rgba(14,165,165,0.06)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] aspect-square bg-[radial-gradient(circle,rgba(26,43,74,0.04)_0%,transparent_70%)] pointer-events-none" />

                <div className="max-w-screen-lg mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(14,165,165,0.08)] border border-[rgba(14,165,165,0.2)] text-[var(--teal)] text-sm font-semibold mb-8"
                    >
                        <TrendingUp size={14} />
                        {category ? `${activeSilos[0]?.name} Archive` : 'Elite Digital Intelligence'}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold text-[var(--navy)] mb-8 tracking-tight leading-[1.05]"
                    >
                        {category ? activeSilos[0]?.name : 'Grow Your Business with Daily'} <span className="relative inline-block">
                            {category ? 'Insights' : 'SEO Content That Ranks'}
                            <span className="absolute bottom-4 left-0 right-0 h-3 bg-gradient-to-r from-[rgba(14,165,165,0.3)] to-[rgba(14,165,165,0.1)] -z-10 rounded-full" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {category ? `Master the mechanics of ${activeSilos[0]?.name}. No fluff. Just the frameworks we use to launch businesses in 10 days.` : "Expert guides, actionable insights, and proven strategies for UK SMEs. Every article is optimised for Google, published automatically, and designed to drive qualified traffic to your business."}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center gap-12 pt-12 border-t border-[var(--border-subtle)]"
                    >
                        {[
                            { label: 'Success Rate', value: '100%', detail: 'Launch Guarantee' },
                            { label: 'Build Time', value: '10 Days', detail: 'Elite Protocol' },
                            { label: 'ROI Focus', value: 'High', detail: 'Revenue First' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-display font-bold text-[var(--teal)]">{stat.value}</div>
                                <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SEO VALUE SECTION */}
            <section className="py-32 px-4 bg-white">
                <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-display font-bold text-[var(--navy)] leading-tight tracking-tight">
                            Strategic Content Designed for <span className="text-[var(--teal)] italic">Disruption</span>.
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)]">
                            In a world of generic advice, we provide the blueprints. Every article in our siloed architecture is a piece of a larger authority graph, designed to pass maximum value to your domain.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Zero-JS Pre-rendered Content Infrastructure',
                                'Semantic Siloing for Search Dominance',
                                'Connected Entity Schema Implementation',
                                'Direct Domain Authority Distribution'
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-[var(--text-primary)] font-medium">
                                    <CheckCircle2 className="text-[var(--teal)] shrink-0 mt-1" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative p-12 lg:p-16">
                        <div className="card-elite p-8 relative">
                            <div className="absolute -top-3 left-8 bg-[var(--teal)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                Authority Asset
                            </div>
                            <h3 className="text-2xl font-display font-bold text-[var(--navy)] mb-4">Elite Infrastructure</h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-8">
                                We don't just write blogs; we construct authority nodes that search engines prioritize.
                            </p>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
                                {[
                                    { v: '100', l: 'SEO Score' },
                                    { v: '<1s', l: 'LCP Speed' },
                                    { v: '5.0', l: 'UX Grade' }
                                ].map((m, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-xl font-bold text-[var(--navy)]">{m.v}</div>
                                        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{m.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY GRID */}
            <section className="py-32 px-4 bg-[var(--bg-warm)]">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-display font-bold text-[var(--navy)] tracking-tight mb-4">
                            The Knowledge <span className="text-[var(--teal)]">{category ? 'Silo' : 'Silos'}</span>
                        </h2>
                        <p className="text-[var(--text-secondary)]">{category ? `Curated intelligence for ${activeSilos[0]?.name}.` : 'Explore curated clusters of professional digital intelligence.'}</p>
                    </div >

                    <div className="space-y-24">
                        {activeSilos.map((silo) => {
                            const siloPosts = groupedPosts[silo.name] || [];
                            if (siloPosts.length === 0) return null;

                            return (
                                <div key={silo.id} className="category-block bg-white rounded-3xl p-8 md:p-12 border border-[var(--border-subtle)] shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pb-8 border-b border-[var(--border-subtle)]">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)] flex items-center justify-center text-[var(--teal)] shadow-lg">
                                                <silo.icon size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-display font-bold text-[var(--navy)]">{silo.name}</h3>
                                                <p className="text-[var(--text-muted)] mt-1">{silo.description}</p>
                                            </div>
                                        </div>
                                        {!category && (
                                            <Link
                                                to={`/blog/${silo.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--teal)] hover:text-[var(--navy)] transition-colors group"
                                            >
                                                View Archive
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div >

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {siloPosts.map((post) => (
                                            <motion.article
                                                key={post.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                className="post-card group flex flex-col bg-[var(--bg-warm)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                            >
                                                <Link
                                                    to={`/blog/${post.primary_category.toLowerCase().replace(/ /g, '-')}/${post.slug}`}
                                                    className="block aspect-[16/10] overflow-hidden bg-[var(--navy)]"
                                                >
                                                    <img
                                                        src={post.featured_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'}
                                                        alt={post.image_alt || post.post_title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </Link>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <span className="text-[10px] font-bold text-[var(--teal)] uppercase tracking-widest">
                                                            {post.display_tag || silo.name}
                                                        </span>
                                                        <span className="text-xs text-[var(--text-muted)]">
                                                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-GB')}
                                                        </span>
                                                    </div>

                                                    <h4 className="text-lg font-bold text-[var(--navy)] mb-3 leading-snug group-hover:text-[var(--teal)] transition-colors">
                                                        <Link to={`/blog/${post.primary_category.toLowerCase().replace(/ /g, '-')}/${post.slug}`}>
                                                            {post.post_title}
                                                        </Link>
                                                    </h4>

                                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 flex-grow leading-relaxed">
                                                        {post.excerpt || post.yoast_description}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-auto text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={12} className="text-[var(--teal)]" />
                                                            {post.read_time || 5} Min Read
                                                        </div>
                                                        <Link
                                                            to={`/blog/${post.primary_category.toLowerCase().replace(/ /g, '-')}/${post.slug}`}
                                                            className="text-[var(--navy)] hover:text-[var(--teal)] transition-colors"
                                                        >
                                                            Full Guide
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </div>
                                </div >
                            );
                        })}
                    </div >
                </div >
            </section >

            {/* CALL TO ACTION */}
            < section className="py-32 px-4" >
                <div className="max-w-screen-xl mx-auto rounded-[3rem] bg-[var(--navy)] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--teal)] opacity-10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">
                            Build Your Authority <span className="text-[var(--teal)] italic">Now</span>.
                        </h2>
                        <p className="text-lg text-white/70 mb-12">
                            Stop settling for standard. Deploy your elite digital vision with the 10-day protocol.
                        </p>
                        <Link
                            to="/#pricing"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--teal)] text-white font-bold rounded-2xl hover:bg-white hover:text-[var(--navy)] transition-all transform hover:-translate-y-1 shadow-xl"
                        >
                            Launch Your Project
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default BlogIndex;
