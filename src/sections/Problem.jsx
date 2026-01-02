import { Clock, Receipt, Bot } from 'lucide-react';

const ProblemCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-luxury hover:shadow-luxury-elevated transition-all duration-300 border border-gray-100 group">
        <div className="bg-surface-subtle w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Icon size={32} className="text-primary group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-display font-bold text-primary mb-4">{title}</h3>
        <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
);

const Problem = () => {
    const problems = [
        {
            icon: Clock,
            title: "The DIY Trap",
            description: "You started with Wix or Squarespace. Three weekends later, it still looks like a template. You're a business owner, not a website designer—but somehow you're debugging plugins at midnight."
        },
        {
            icon: Receipt,
            title: "The Agency Black Hole",
            description: "You paid £5,000+ for a \"bespoke\" website. Twelve weeks later, you're still \"in revisions.\" When you finally launch, they vanish. Update request? That'll be another invoice."
        },
        {
            icon: Bot,
            title: "The AI Gamble",
            description: "You tried the new AI website builders. It generated something in 30 seconds—and it looks like it. Generic. Soulless. Identical to ten thousand other sites. Your business deserves better."
        }
    ];

    return (
        <section id="problem" className="py-24 bg-white relative">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-primary mb-4">Sound Familiar?</h2>
                    <p className="text-xl text-text-muted">Most UK businesses are stuck in one of three traps.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {problems.map((prob, idx) => (
                        <ProblemCard key={idx} {...prob} />
                    ))}
                </div>

                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-2xl font-display font-medium text-primary">
                        There's a reason you're still looking. <br />
                        The website design services market is broken. <span className="text-accent font-bold">We fixed it.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Problem;
