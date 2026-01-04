'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

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
                            {t('aboutPage.header.badge')}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {t('aboutPage.header.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {t('aboutPage.header.highlight')}
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
                        <h2 className="text-3xl font-bold text-white">{t('aboutPage.mission.title')}</h2>
                        <h3 className="text-xl text-blue-400 font-medium">{t('aboutPage.mission.subtitle')}</h3>

                        <div className="space-y-4 text-slate-400 leading-relaxed">
                            <p>{t('aboutPage.mission.p1')}</p>
                            <p>{t('aboutPage.mission.p2')}</p>
                            <p>{t('aboutPage.mission.p3')}</p>
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
                            sizes="(max-width: 1024px) 100vw, 50vw"
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
                        {t('aboutPage.values.title')}
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Shield className="w-8 h-8" />}
                            title={t('aboutPage.values.trust.title')}
                            description={t('aboutPage.values.trust.description')}
                            delay={0.1}
                        />
                        <ValueCard
                            icon={<CheckCircle2 className="w-8 h-8" />}
                            title={t('aboutPage.values.accuracy.title')}
                            description={t('aboutPage.values.accuracy.description')}
                            delay={0.2}
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8" />}
                            title={t('aboutPage.values.community.title')}
                            description={t('aboutPage.values.community.description')}
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
