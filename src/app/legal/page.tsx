'use client';

import * as React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className="p-8">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function LegalPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="py-16 bg-slate-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-12">Legal Information</h1>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="border-b border-slate-800">
                        <div className="flex">
                            <button
                                onClick={() => handleChange(0)}
                                className={`px-6 py-4 text-sm font-medium transition-colors ${value === 0
                                        ? 'text-blue-400 border-b-2 border-blue-400'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => handleChange(1)}
                                className={`px-6 py-4 text-sm font-medium transition-colors ${value === 1
                                        ? 'text-blue-400 border-b-2 border-blue-400'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Terms of Service
                            </button>
                            <button
                                onClick={() => handleChange(2)}
                                className={`px-6 py-4 text-sm font-medium transition-colors ${value === 2
                                        ? 'text-blue-400 border-b-2 border-blue-400'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Tax Disclaimer
                            </button>
                        </div>
                    </div>

                    <CustomTabPanel value={value} index={0}>
                        <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            <strong>Last Updated: January 1, 2026</strong>
                        </p>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Angeles Tax, Bookkeeping & Multiservices ("we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy.
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-3">Information We Collect</h3>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, and social security number (when provided for tax purposes).
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-3">Data Security</h3>
                        <p className="text-slate-300 leading-relaxed">
                            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
                        </p>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <h2 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            By using this website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Angeles Tax provides tax preparation, bookkeeping, and incorporation services. We do not provide legal advice. Any information provided on this site is for general informational purposes only and does not constitute legal or financial advice.
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-3">Payment</h3>
                        <p className="text-slate-300 leading-relaxed">
                            Payment for services is due at the time service is rendered unless otherwise agreed upon in writing. We reserve the right to withhold completed tax returns until payment is made in full.
                        </p>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        <h2 className="text-2xl font-bold text-white mb-4">Tax Disclaimer</h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            The information on this website is provided for general informational purposes only and should not be construed as specific tax, legal, or financial advice. Tax laws are subject to change and may vary depending on your specific circumstances.
                        </p>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            <strong className="text-white">IRS Circular 230 Disclosure:</strong> To ensure compliance with requirements imposed by the IRS, we inform you that any U.S. federal tax advice contained in this communication (including any attachments) is not intended or written to be used, and cannot be used, for the purpose of (i) avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or recommending to another party any transaction or matter addressed herein.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            You should consult with a professional tax advisor to discuss your specific situation.
                        </p>
                    </CustomTabPanel>
                </div>
            </div>
        </div>
    );
}
