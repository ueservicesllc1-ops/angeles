'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calculator, BarChart3, Building2, FileText, Globe, PenTool, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
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
                            Comprehensive Solutions
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Expert Services tailored to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Your Financial Success
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32">

                {/* TAX PREPARATION */}
                <ServiceSection
                    id="tax"
                    title="Tax Preparation"
                    subtitle="TAX SERVICES"
                    description="We take the stress out of tax season. Whether you are an individual with a simple return or a self-employed professional with complex expenses, we ensure accuracy and maximum refunds."
                    icon={<Calculator className="w-12 h-12 text-blue-500" />}
                    features={['Individual (1040) Returns', 'Self-Employed & Freelancers', 'ITIN Applications & Renewals', 'Amended Returns (1040-X)', 'State Tax Filings (All 50 States)']}
                    cta="Schedule Tax Appt"
                    ctaLink="/contact"
                    imageSrc="/tax.png"
                    align="left"
                />

                {/* BOOKKEEPING */}
                <ServiceSection
                    id="bookkeeping"
                    title="Bookkeeping for Small Business"
                    subtitle="BUSINESS SOLUTIONS"
                    description="Keep your finances organized and ready for tax time. We handle the numbers so you can focus on growing your business."
                    icon={<BarChart3 className="w-12 h-12 text-emerald-500" />}
                    features={['Monthly Bookkeeping', 'Expense Tracking', 'Bank Reconciliations', 'Financial Statements (P&L)', 'Payroll Setup Assistance']}
                    cta="Get a Quote"
                    ctaLink="/contact"
                    imageSrc="/bookkeeping.png"
                    align="right"
                />

                {/* INCORPORATIONS */}
                <ServiceSection
                    id="incorporations"
                    title="Incorporations & Setup"
                    subtitle="START YOUR BUSINESS"
                    description="Turn your dream into a legal reality. We guide you through the entity selection process and handle all the paperwork."
                    icon={<Building2 className="w-12 h-12 text-purple-500" />}
                    features={['LLC Registration', 'C-Corp & S-Corp Setup', 'EIN (Tax ID) Obtainment', 'Operating Agreements', 'Business License Guidance']}
                    cta="Start Your Business"
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
                    <h2 className="text-3xl font-bold text-white mb-8">Additional Multiservices</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Administrative</h3>
                            <p className="text-slate-400">Notary Public, Document Translation (Spanish/English), Form Filling Assistance.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-pink-400">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Logistics & Design</h3>
                            <p className="text-slate-400">Package Delivery Worldwide, Graphic Design Services for Business Cards & Flyers.</p>
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
