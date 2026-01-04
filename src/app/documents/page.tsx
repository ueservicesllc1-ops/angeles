'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

const checklists = [
    {
        title: 'Personal Information',
        items: [
            'Social Security Number (SSN) or ITIN for you, spouse, and dependents',
            'Dates of birth for all persons listed on return',
            "Valid Driver's License or Real ID / Passport",
            'Bank Account number and Routing number for Direct Deposit'
        ]
    },
    {
        title: 'Income Information',
        items: [
            'W-2 Forms from all employers',
            '1099-NEC for self-employed/contractor work',
            '1099-G for Unemployment benefits',
            '1099-R for Pension/Retirement/Annuity',
            'SSA-1099 for Social Security benefits',
            'Rental income and expenses records',
            'Interest and Dividend statements (1099-INT, 1099-DIV)'
        ]
    },
    {
        title: 'Deductions & Expenses',
        items: [
            'Form 1098 (Mortgage Interest)',
            'Property Tax records',
            'Charitable donation receipts',
            'Medical expense receipts',
            'Form 1098-T (Tuition statement)',
            'Child care provider information (Name, Address, EIN/SSN)',
            'Business expenses list (for self-employed)'
        ]
    }
];

export default function DocumentsPage() {
    return (
        <div className="py-16 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Documents Required
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Please bring these documents to your appointment to ensure an accurate and fast filing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {checklists.map((category) => (
                        <div key={category.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                            <h3 className="text-xl font-bold text-blue-400 mb-6 pb-3 border-b-2 border-blue-500 inline-block">
                                {category.title}
                            </h3>
                            <ul className="space-y-3">
                                {category.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-300 text-sm">
                                        <CheckSquare className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Missing something?
                    </h2>
                    <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                        Don't worry. Contact us and we will help you figure out what you need or how to obtain it.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-3 text-lg font-semibold bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-lg"
                        style={{ color: '#2563eb' }}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
