import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('li10_posts')
                    .select('id, slug, post_title, featured_image_url, created_at, yoast_description')
                    .eq('status', 'publish')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                console.error('Error fetching recent posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentPosts();
    }, []);

    if (loading) return null;
    if (posts.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Market Intelligence</h2>
                        <p className="text-lg text-text-muted">
                            How we disrupt industries in 10 days. Deep dives into automation, conversion strategy, and high-performance design.
                        </p>
                    </div>
                    <Link to="/blog" className="group flex items-center gap-2 font-bold text-primary uppercase tracking-widest text-sm border-b-2 border-accent pb-2 hover:text-accent transition-all">
                        View The Lab <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full group"
                        >
                            <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={post.featured_image_url}
                                    alt={post.post_title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </Link>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest mb-4">
                                    <Calendar size={12} />
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <h3 className="text-xl font-display font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                                    <Link to={`/blog/${post.slug}`}>{post.post_title}</Link>
                                </h3>
                                <p className="text-sm text-text-muted line-clamp-3 mb-6">
                                    {post.yoast_description}
                                </p>
                                <Link to={`/blog/${post.slug}`} className="mt-auto text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-wider group/link">
                                    Read Analysis <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform text-accent" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogFeed;
