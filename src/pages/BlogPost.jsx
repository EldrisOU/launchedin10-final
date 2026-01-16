import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Calendar,
    User,
    ArrowLeft,
    Loader2,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Info,
    Clock,
    Award,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
    const { slug, category } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // YouTube Parser Logic (Elite Robust version)
    const parseYoutubeVideos = (content) => {
        if (!content) return '';

        // Match both raw URLs and WP figure wrappers (lenient with whitespace/newlines)
        const youtubeRegex = /(?:<p>[\s\n\r]*)?(?:<figure[^>]*>[\s\n\r]*(?:<div[^>]*>[\s\n\r]*)?)?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[^\s<"']*)(?:[\s\n\r]*<\/div>)?(?:[\s\n\r]*<\/figure>)?(?:[\s\n\r]*<\/p>)?/g;

        return content.replace(youtubeRegex, (match, videoId) => {
            return `
                <div class="video-container my-16 relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-[var(--navy)]">
                    <iframe 
                        src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen 
                        class="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            `;
        });
    };

    // Mid-content Image Insertion
    const insertSecondaryImage = (content, imageUrl, alt) => {
        if (!content || !imageUrl) return content;
        const paragraphs = content.split('</p>');
        if (paragraphs.length > 3) {
            const imageHtml = `
                <figure class="my-16">
                    <img src="${imageUrl}" alt="${alt || 'Insight illustration'}" class="w-full rounded-3xl shadow-2xl border border-[var(--border-subtle)]" />
                    <figcaption class="mt-4 text-center text-sm text-[var(--text-muted)] italic">Expert insight illustration</figcaption>
                </figure>
            `;
            paragraphs.splice(3, 0, imageHtml);
            return paragraphs.join('</p>');
        }
        return content;
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('li10_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;

                // Process content
                let content = parseYoutubeVideos(data.post_content);
                content = insertSecondaryImage(content, data.secondary_image_url, data.post_title);

                setPost({ ...data, post_content: content });

            } catch (error) {
                console.error('Error fetching post:', error);
                navigate('/blog');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 bg-[var(--bg-warm)]">
                <Loader2 className="animate-spin text-[var(--teal)]" size={48} />
            </div>
        );
    }

    if (!post) return null;

    const publishedAt = new Date(post.published_at || post.created_at);


    return (
        <div className="bg-[var(--bg-warm)] min-h-screen blog-post-context">
            <style>{`
                .blog-post-context {
                    font-size: 16px !important;
                }
                .blog-post-context h1 { font-size: clamp(2.5rem, 6vw, 4.5rem) !important; }
                
                /* Dynamic CTA Styles */
                .dynamic-cta-container .cta-box {
                    background: var(--navy);
                    padding: 4rem 3rem;
                    border-radius: 3rem;
                    text-align: center;
                    color: white;
                    margin: 4rem 0;
                    box-shadow: var(--shadow-xl);
                }
                .dynamic-cta-container h3 { color: white !important; font-size: 2.5rem !important; margin-bottom: 2rem !important; }
                .dynamic-cta-container p { color: rgba(255,255,255,0.7) !important; margin-bottom: 3rem !important; font-size: 1.125rem !important; }
                .dynamic-cta-container .cta-button {
                    background: var(--teal) !important;
                    color: white !important;
                    padding: 1.25rem 3rem !important;
                    border-radius: 1rem !important;
                    font-weight: 700 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .dynamic-cta-container .cta-button:hover {
                    background: white !important;
                    color: var(--navy) !important;
                    transform: translateY(-4px);
                }
            `}</style>
            <Helmet>
                <title>{post.post_title} | LaunchedIn10 Intelligence</title>
                <meta name="description" content={post.excerpt || post.yoast_description} />
                <link rel="canonical" href={`https://launchedin10.co.uk/blog/${post.primary_category?.toLowerCase().replace(/ /g, '-') || 'strategy'}/${post.slug}`} />

                {/* OG Tags */}
                <meta property="og:title" content={post.post_title} />
                <meta property="og:description" content={post.excerpt || post.yoast_description} />
                <meta property="og:image" content={post.featured_image_url} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://launchedin10.co.uk/blog/${post.primary_category?.toLowerCase().replace(/ /g, '-') || 'strategy'}/${post.slug}`} />

            </Helmet>

            <div className="max-w-screen-2xl mx-auto px-4 pt-48 pb-24">
                {/* Semantic Breadcrumb Style Navigation */}
                <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-12">
                    <Link to="/blog" className="hover:text-[var(--teal)] transition-colors inline-flex items-center gap-2">
                        <ArrowLeft size={14} />
                        Intelligence Lab
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--teal)]">{post.primary_category}</span>
                </div>

                <article className="max-w-screen-2xl mx-auto">
                    <header className="mb-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(14,165,165,0.08)] border border-[rgba(14,165,165,0.2)] text-[var(--teal)] text-[10px] font-bold uppercase tracking-widest mb-8"
                        >
                            <Award size={12} />
                            {post.display_tag || 'Verified Insight'}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-display font-bold text-[var(--navy)] mb-10 leading-[1.05] tracking-tight"
                        >
                            {post.post_title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest"
                        >
                            <span className="flex items-center gap-2">
                                <Calendar size={14} className="text-[var(--teal)]" />
                                {publishedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} className="text-[var(--teal)]" />
                                {post.read_time || 5} Min Read
                            </span>
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-[var(--teal)]" />
                                Professional Protocol
                            </span>
                        </motion.div>
                    </header>

                    {/* Featured Asset */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-24 shadow-2xl border border-[var(--border-subtle)] bg-[var(--navy)]"
                    >
                        <img
                            src={post.featured_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'}
                            alt={post.image_alt || post.post_title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/40 to-transparent" />
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Sidebar */}
                        <aside className="lg:w-1/4 order-2 lg:order-1">
                            <div className="sticky top-32 space-y-12">
                                <div className="p-8 bg-white rounded-3xl border border-[var(--border-subtle)] shadow-sm">
                                    <h3 className="text-[10px] font-bold text-[var(--navy)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border-subtle)] inline-block">Analyst</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--navy)] text-[var(--teal)] flex items-center justify-center text-xl font-bold shadow-lg">
                                            {post.author_name?.[0] || 'L'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[var(--navy)] leading-none mb-1">{post.author_name || 'LaunchedIn10'}</div>
                                            <div className="text-[10px] text-[var(--teal)] font-bold uppercase tracking-wider">Strategy Director</div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-xs text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--teal)] pl-4">
                                        Expert intelligence focusing on high-speed digital infrastructure and market disruption.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold text-[var(--navy)] uppercase tracking-widest mb-6">Syndication</h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {[
                                            { icon: Facebook, color: 'hover:bg-[#1877F2]' },
                                            { icon: Twitter, color: 'hover:bg-[#000000]' },
                                            { icon: Linkedin, color: 'hover:bg-[#0A66C2]' },
                                            { icon: Share2, color: 'hover:bg-[var(--teal)]' }
                                        ].map((soc, i) => (
                                            <button key={i} className={`w-full aspect-square rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all duration-300 shadow-sm ${soc.color}`}>
                                                <soc.icon size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-[var(--navy)] rounded-3xl text-white">
                                    <Zap className="text-[var(--teal)] mb-4" size={24} />
                                    <h4 className="font-display font-bold text-lg mb-2">Ready to scale?</h4>
                                    <p className="text-[10px] text-white/60 mb-6 leading-relaxed">Implement these strategies in your own business in just 10 days.</p>
                                    <Link to="/#pricing" className="block text-center bg-white text-[var(--navy)] text-xs font-bold py-3 rounded-xl hover:bg-[var(--teal)] hover:text-white transition-colors">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:w-3/4 order-1 lg:order-2">
                            <div
                                className="blog-content prose prose-lg prose-slate max-w-none 
                                prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--navy)] prose-headings:tracking-tight
                                prose-p:text-[var(--text-primary)] prose-p:leading-relaxed prose-p:mb-10
                                prose-a:text-[var(--teal)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-20 prose-img:border prose-img:border-[var(--border-subtle)]
                                prose-strong:text-[var(--navy)] prose-strong:font-bold
                                prose-ul:list-disc prose-ul:pl-6 prose-li:mb-4
                                prose-blockquote:border-[var(--teal)] prose-blockquote:bg-[rgba(14,165,165,0.03)] prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-[var(--navy)]
                                "
                                dangerouslySetInnerHTML={{ __html: post.post_content }}
                            />

                            {/* Custom Logic for mid-content injections */}
                            <style>{`
                                .blog-content h2 { margin-top: 5rem !important; margin-bottom: 2rem !important; font-size: 2.25rem !important; }
                                .blog-content h3 { margin-top: 3.5rem !important; margin-bottom: 1.5rem !important; font-size: 1.75rem !important; }
                                
                                .blog-content .eldris-author-bio-card { 
                                    background: white !important; 
                                    border: 1px solid var(--border-subtle) !important;
                                    border-left: 6px solid var(--teal) !important; 
                                    padding: 32px !important; 
                                    margin: 60px 0 !important;
                                    border-radius: 0 32px 32px 0;
                                    box-shadow: var(--shadow-sm);
                                }
                                .blog-content .takeaways-box { 
                                    background: rgba(14, 165, 165, 0.05) !important;
                                    border: 1px solid rgba(14, 165, 165, 0.1) !important;
                                    padding: 48px !important; 
                                    margin: 80px 0 !important; 
                                    border-radius: 48px;
                                }
                                .blog-content .cta-block { 
                                    text-align: center; 
                                    padding: 80px 48px !important; 
                                    margin: 80px 0 !important;
                                    background: var(--navy);
                                    border-radius: 48px;
                                    color: white;
                                    position: relative;
                                    overflow: hidden;
                                }
                                .blog-content .cta-headline { color: white !important; font-size: 2.5rem !important; margin-bottom: 32px !important; line-height: 1.1 !important; }
                                .blog-content .cta-button { 
                                    background-color: var(--teal) !important; 
                                    color: white !important; 
                                    padding: 20px 48px !important; 
                                    border-radius: 16px !important;
                                    font-size: 1.25rem !important;
                                    font-weight: 700 !important;
                                    box-shadow: 0 20px 40px rgba(14, 165, 165, 0.3) !important;
                                    display: inline-block;
                                    transition: all 0.3s ease;
                                }
                                .blog-content .cta-button:hover {
                                    transform: translateY(-4px);
                                    background-color: white !important;
                                    color: var(--navy) !important;
                                }
                                .blog-content .toc {
                                    background: white;
                                    border: 1px solid var(--border-subtle);
                                    padding: 32px;
                                    border-radius: 24px;
                                    margin-bottom: 60px;
                                    box-shadow: var(--shadow-sm);
                                }
                                .blog-content .toc ul { list-style: none !important; padding: 0 !important; }
                                .blog-content .toc li { margin-bottom: 12px !important; border-bottom: 1px solid var(--bg-warm); padding-bottom: 12px; }
                                .blog-content .toc a { color: var(--text-secondary); font-size: 0.95rem; font-weight: 600; }
                                .blog-content .toc a:hover { color: var(--teal); }
                            `}</style>
                        </div>
                    </div>
                </article>

                {/* Dynamic CTA from post data */}
                {post.cta_block ? (
                    <div className="dynamic-cta-container mt-32">
                        {post.cta_block.startsWith('{') ? (
                            (() => {
                                try {
                                    const data = JSON.parse(post.cta_block);
                                    return (
                                        <section className="p-16 md:p-24 bg-[var(--navy)] rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)]/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                            <div className="relative z-10 max-w-3xl mx-auto">
                                                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">{data.headline}</h2>
                                                {data.subheadline && <p className="text-xl text-white/70 mb-12 leading-relaxed">{data.subheadline}</p>}
                                                <Link to="/#pricing" className="bg-[var(--teal)] text-white px-12 py-6 rounded-2xl font-bold hover:bg-white hover:text-[var(--navy)] transition-all inline-block shadow-2xl hover:-translate-y-1 text-lg">
                                                    {data.button || 'Deploy Your Elite Vision'}
                                                </Link>
                                            </div>
                                        </section>
                                    );
                                } catch (e) { return null; }
                            })()
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: post.cta_block }} />
                        )}
                    </div>
                ) : (
                    <section className="mt-32 p-16 md:p-24 bg-[var(--navy)] rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal)]/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Evolve Your Digital Footprint.</h2>
                                <p className="text-xl text-white/70 mb-12 leading-relaxed">Stop building standard websites. Start building revenue-generating assets that dominate your niche.</p>
                                <a href="https://portal.launchedin10.co.uk" className="bg-[var(--teal)] text-white px-12 py-6 rounded-2xl font-bold hover:bg-white hover:text-[var(--navy)] transition-all inline-block shadow-2xl hover:-translate-y-1 text-lg">
                                    Deploy Your Elite Vision
                                </a>
                            </motion.div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
