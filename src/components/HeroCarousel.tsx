'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        badge: "Accepting New Clients for 2026 Tax Season",
        title: "Financial Clarity",
        highlight: "Defined by Precision",
        highlightGradient: "from-blue-400 via-indigo-400 to-cyan-400",
        description: "We deploy advanced tax strategies and rigorous bookkeeping to help growth-minded companies maximize wealth and minimize liability.",
        primaryCta: "Access Client Portal",
        primaryLink: "/login",
        secondaryCta: "Expert Consultation",
        secondaryLink: "/contact"
    },
    {
        id: 2,
        badge: "Maximize Your Refunds & Minimize Stress",
        title: "Professional",
        highlight: "TAXES",
        highlightGradient: "from-orange-500 via-orange-400 to-orange-500",
        description: "Don't leave money on the table. Our expert team ensures you get every deduction you deserve with accurate, timely, and compliant tax filing.",
        primaryCta: "Start My Tax Return",
        primaryLink: "/contact",
        secondaryCta: "Learn More",
        secondaryLink: "/services"
    },
    {
        id: 3,
        badge: "Strategic Bookkeeping for Growth",
        title: "Detailed Financial",
        highlight: "Intelligence & Insights",
        highlightGradient: "from-blue-400 via-indigo-400 to-cyan-400",
        description: "Go beyond basic data entry. Get actionable financial insights that help you make smarter business decisions and drive sustainable growth.",
        primaryCta: "Get a Quote",
        primaryLink: "/contact",
        secondaryCta: "View Services",
        secondaryLink: "/services"
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = React.useState(0);
    const [direction, setDirection] = React.useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 8000); // 8 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden h-auto min-h-[85vh] flex items-center">
            {/* Background Gradients (Static) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]" />
                </div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="relative h-[500px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full flex flex-col items-center text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm font-medium mb-8 backdrop-blur-md shadow-xl"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>
                                {slides[current].badge}
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
                                {slides[current].title} <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient-x ${slides[current].highlightGradient}`}>
                                    {slides[current].highlight}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                                {slides[current].description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={slides[current].primaryLink}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 z-20"
                                >
                                    {slides[current].primaryCta}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link
                                    href={slides[current].secondaryLink}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-950 border-2 border-white rounded-xl font-bold hover:bg-slate-200 hover:border-slate-200 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20"
                                >
                                    {slides[current].secondaryCta}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-12 relative z-30">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > current ? 1 : -1);
                                setCurrent(index);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === current
                                ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows for Desktop */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all hidden lg:flex backdrop-blur-sm z-30"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all hidden lg:flex backdrop-blur-sm z-30"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}
