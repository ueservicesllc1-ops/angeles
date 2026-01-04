'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calculator, BarChart3, Building2, FileText, Globe, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
    const { t } = useLanguage();

    const taxFeatures = [
        t('servicesPage.tax.features.0'),
        t('servicesPage.tax.features.1'),
        t('servicesPage.tax.features.2'),
        t('servicesPage.tax.features.3'),
        t('servicesPage.tax.features.4')
    ];

    const bookkeepingFeatures = [
        t('servicesPage.bookkeeping.features.0'),
        t('servicesPage.bookkeeping.features.1'),
        t('servicesPage.bookkeeping.features.2'),
        t('servicesPage.bookkeeping.features.3'),
        t('servicesPage.bookkeeping.features.4')
    ];

    const incorporationFeatures = [
        t('servicesPage.incorporations.features.0'),
        t('servicesPage.incorporations.features.1'),
        t('servicesPage.incorporations.features.2'),
        t('servicesPage.incorporations.features.3'),
        t('servicesPage.incorporations.features.4')
    ];

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
                            <Shield className="w-4 h-4" />
                            {t('servicesPage.header.badge')}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {t('servicesPage.header.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {t('servicesPage.header.highlight')}
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32">

                {/* TAX PREPARATION */}
                <ServiceSection
                    id="tax"
                    title={t('servicesPage.tax.title')}
                    subtitle={t('servicesPage.tax.subtitle')}
                    description={t('servicesPage.tax.description')}
                    icon={<Calculator className="w-12 h-12 text-blue-500" />}
                    features={taxFeatures}
                    cta={t('servicesPage.tax.cta')}
                    ctaLink="/contact"
                    imageSrc="/tax.png"
                    align="left"
                />

                {/* BOOKKEEPING */}
                <ServiceSection
                    id="bookkeeping"
                    title={t('servicesPage.bookkeeping.title')}
                    subtitle={t('servicesPage.bookkeeping.subtitle')}
                    description={t('servicesPage.bookkeeping.description')}
                    icon={<BarChart3 className="w-12 h-12 text-emerald-500" />}
                    features={bookkeepingFeatures}
                    cta={t('servicesPage.bookkeeping.cta')}
                    ctaLink="/contact"
                    imageSrc="/bookkeeping.png"
                    align="right"
                />

                {/* INCORPORATIONS */}
                <ServiceSection
                    id="incorporations"
                    title={t('servicesPage.incorporations.title')}
                    subtitle={t('servicesPage.incorporations.subtitle')}
                    description={t('servicesPage.incorporations.description')}
                    icon={<Building2 className="w-12 h-12 text-purple-500" />}
                    features={incorporationFeatures}
                    cta={t('servicesPage.incorporations.cta')}
                    ctaLink="/contact"
                    imageSrc="/incorporation.png"
                    align="left"
                />

                {/* MULTISERVICES */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden text-center"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <h2 className="text-3xl font-bold text-white mb-8">{t('servicesPage.multiservices.title')}</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{t('servicesPage.multiservices.admin.title')}</h3>
                            <p className="text-slate-400">{t('servicesPage.multiservices.admin.description')}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-pink-400">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{t('servicesPage.multiservices.logistics.title')}</h3>
                            <p className="text-slate-400">{t('servicesPage.multiservices.logistics.description')}</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

function ServiceSection({ id, title, subtitle, description, icon, features, cta, ctaLink, imageSrc, align }: any) {
    return (
        <div id={id} className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div
                initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={align === 'right' ? 'lg:order-2' : ''}
            >
                <div className="mb-6">{icon}</div>
                <h3 className="text-sm font-bold tracking-widest text-blue-500 mb-2 uppercase">{subtitle}</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">{description}</p>

                <ul className="space-y-4 mb-8">
                    {features.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-bold hover:bg-slate-200 transition-colors"
                    style={{ color: '#0f172a' }}
                >
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative h-[400px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 group ${align === 'right' ? 'lg:order-1' : ''}`}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 to-transparent pointer-events-none"></div>
            </motion.div>
        </div>
    );
}
