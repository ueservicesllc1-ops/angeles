'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
            {/* Header Section */}
            <div className="relative py-20 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Shield className="w-4 h-4" />
                            Legal & Compliance
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-slate-400">
                            Last Updated: January 1, 2026
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-invert prose-lg max-w-none">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <Section title="1. Introduction and Scope" icon={<FileText className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                <strong>Angeles Group</strong> ("we," "our," or "us") is dedicated to maintaining the privacy and security of your personal and financial information. This Privacy Policy is compliant with applicable federal and state laws, including rules governing the disclosure of tax return information.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                This policy applies to all services provided by Angeles Group, including tax preparation, bookkeeping, payroll, and business formation services, whether accessed via our website, client portal, or in-person.
                            </p>
                        </Section>

                        <Section title="2. Information We Collect" icon={<Eye className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300 mb-4">
                                To provide accuracy in our financial services, we collect non-public personal information (NPI) from the following sources:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li><strong>Information you provide to us:</strong> This includes tax organizers, questionnaires, applications, and other forms. Examples include Name, Social Security Number (SSN), Employer Identification Number (EIN), Date of Birth, and dependent information.</li>
                                <li><strong>Information about your transactions:</strong> Records of services rendered, payment history, and credit card or bank account information used for billing.</li>
                                <li><strong>Third-party information:</strong> We may receive information from the IRS, state taxing authorities, or financial institutions with your authorization.</li>
                            </ul>
                        </Section>

                        <Section title="3. Disclosure of Information" icon={<Lock className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300 mb-4">
                                <strong>We do not sell your personal information.</strong> We restrict access to your non-public personal information to those members of our firm who need to know that information to provide services to you. We may disclose your information in the following limited circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li>To the Internal Revenue Service (IRS) and state taxing authorities for the purpose of filing your tax returns.</li>
                                <li>To third-party service providers (e.g., electronic filing centers, secure client portal providers) who assist in enabling our services and are bound by strict confidentiality agreements.</li>
                                <li>To comply with a valid court order, subpoena, or legal process.</li>
                                <li>With your express written consent to third parties (e.g., mortgage lenders requiring income verification).</li>
                            </ul>
                        </Section>

                        <Section title="4. Data Security & Retention" icon={<Shield className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300 mb-4">
                                We maintain physical, electronic, and procedural safeguards that comply with federal regulations to guard your personal information. Our systems utilize 256-bit SSL encryption, multi-factor authentication, and rigorous access controls.
                            </p>
                            <p className="text-slate-300">
                                We retain your tax and financial documents for a minimum period as required by law (typically 3-7 years), after which they are securely destroyed.
                            </p>
                        </Section>

                        <Section title="5. Your Rights & Consent" icon={<FileText className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300 mb-4">
                                By using our services, you consent to the collection and use of information as specified above. You have the right to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li>Request copies of your tax returns and documents held by us.</li>
                                <li>Revoke consent for future disclosures, except where required by law.</li>
                                <li>Request corrections to your personal data if inaccurate.</li>
                            </ul>
                        </Section>

                        <Section title="5. Contact Us" icon={<FileText className="w-6 h-6 text-blue-500" />}>
                            <p className="text-slate-300">
                                If you have questions or comments about this policy, you may email us at contact@angelesgroup.us or by post to:
                            </p>
                            <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                                <strong>Angeles Group</strong><br />
                                123 Business Avenue, Suite 100<br />
                                Atlanta, GA 30303<br />
                                United States
                            </div>
                        </Section>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <section className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h2 className="text-xl font-bold text-white m-0">{title}</h2>
            </div>
            {children}
        </section>
    );
}
