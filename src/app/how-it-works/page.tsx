'use client';

import * as React from 'react';
import Link from 'next/link';

const steps = [
    {
        num: '01',
        title: 'Contact Us',
        desc: 'Reach out via phone, WhatsApp, or our online form to tell us what you need support with.',
    },
    {
        num: '02',
        title: 'Schedule Appointment',
        desc: 'Book a time to meet in-person at our Hoschton office or arrange a virtual consultation.',
    },
    {
        num: '03',
        title: 'Submit Documents',
        desc: 'Bring or upload the required documents. We review everything to ensure nothing is missed.',
    },
    {
        num: '04',
        title: 'We Handle Everything',
        desc: 'Relax while we prepare your taxes or paperwork. We notify you when everything is ready for signature.',
    },
];

export default function HowItWorksPage() {
    return (
        <div className="py-20 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">PROCESS</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h1>
                    <p className="text-xl text-slate-400">Simple, transparent, and efficient.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {steps.map((step) => (
                        <div key={step.num} className="relative bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                            <div className="text-8xl font-black text-slate-800/50 absolute -top-4 -left-1">
                                {step.num}
                            </div>
                            <div className="relative z-10 pt-8">
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
