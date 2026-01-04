'use client';

import * as React from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    'Tax Preparation',
    'Bookkeeping',
    'Incorporation',
    'Notary/Multiservices',
    'Other',
];

export default function ContactForm() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await addDoc(collection(db, 'contact_submissions'), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error('Error submitting form: ', error);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3"
                >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! We'll be in touch soon.</p>
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
                </motion.div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1.5">Interested Service</label>
                    <div className="relative">
                        <select
                            name="service"
                            id="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select a service...</option>
                            {services.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your needs..."
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
}
