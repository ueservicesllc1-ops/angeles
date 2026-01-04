'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
            {/* Header Section */}
            <div className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Users className="w-4 h-4" />
                            Our Mission
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Building Trust Through <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Financial Excellence
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white">More Than Just Numbers</h2>
                        <h3 className="text-xl text-blue-400 font-medium">Helping our community prosper with expert financial guidance.</h3>

                        <div className="space-y-4 text-slate-400 leading-relaxed">
                            <p>
                                At Angeles Tax, Bookkeeping & Multiservices, we believe that professional financial services should be accessible, transparent, and trustworthy. With over 20 years of experience, we have dedicated ourselves to serving individuals, families, and small business owners in Georgia and beyond.
                            </p>
                            <p>
                                We understand the challenges of navigating the US tax system, especially for the immigrant and Hispanic community. That is why we provide service in both English and Spanish, ensuring you fully understand every step of the process.
                            </p>
                            <p>
                                We are not just tax preparers; we are your partners in financial growth. Whether you are filing your first return, starting a new company, or organizing your business finances, we are here to provide the stability and expertise you deserve.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
                    >
                        <Image
                            src="/about-team.png"
                            alt="Angeles Group Team Office"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-slate-900/20 mix-blend-overlay"></div>
                    </motion.div>
                </div>

                <div className="text-center max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-16"
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Shield className="w-8 h-8" />}
                            title="Trust"
                            description="We treat your information with the highest level of security and confidentiality."
                            delay={0.1}
                        />
                        <ValueCard
                            icon={<CheckCircle2 className="w-8 h-8" />}
                            title="Accuracy"
                            description="We effectively minimize errors and maximize your legal refund."
                            delay={0.2}
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8" />}
                            title="Community"
                            description="We are proud to serve and empower our local diverse community."
                            delay={0.3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors group"
        >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
