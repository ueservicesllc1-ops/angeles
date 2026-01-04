'use client';

import * as React from 'react';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
                            Here to Help
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Start Your Financial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Transformation Today
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Whether you need tax preparation, bookkeeping, or business incorporation, our team of experts is ready to assist you.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Contact Info Column */}
                    <div className="lg:col-span-5 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl font-bold text-white mb-8">Get In Touch</h2>

                            <ContactItem
                                icon={<MapPin className="w-6 h-6" />}
                                title="Visit Our Office"
                                content={
                                    <>
                                        4188 Highway 53, Suite 102<br />
                                        Hoschton, GA 30548
                                    </>
                                }
                            />

                            <ContactItem
                                icon={<Phone className="w-6 h-6" />}
                                title="Give Us a Call"
                                content={
                                    <a href="tel:8629267442" className="hover:text-blue-400 transition-colors">
                                        (862) 926-7442
                                    </a>
                                }
                            />

                            <ContactItem
                                icon={<Mail className="w-6 h-6" />}
                                title="Email Us"
                                content={
                                    <a href="mailto:info@angelesgroup.net" className="hover:text-blue-400 transition-colors">
                                        info@angelesgroup.net
                                    </a>
                                }
                            />
                        </motion.div>

                        {/* Map Style Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-64 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative group"
                        >
                            <iframe
                                title="Office Location"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }}
                                src="https://maps.google.com/maps?q=4188+Highway+53,+Suite+102,+Hoschton,+GA+30548&output=embed"
                                allowFullScreen
                                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl"></div>
                        </motion.div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                                <p className="text-slate-400 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactItem({ icon, title, content }: { icon: any, title: string, content: React.ReactNode }) {
    return (
        <div className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                {icon}
            </div>
            <div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{title}</h4>
                <div className="text-slate-400 leading-relaxed font-medium">
                    {content}
                </div>
            </div>
        </div>
    );
}
