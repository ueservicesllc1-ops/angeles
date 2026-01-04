import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="relative w-[768px] h-[256px]">
                                <Image
                                    src="/logo.png"
                                    alt="Angeles Group"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Empowering businesses with strategic financial guidance for over two decades. Your success is our bottom line.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-full bg-slate-800 text-cyan-200 border border-cyan-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all hover:scale-110 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-orange-500/20">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-4">
                            {['Tax Preparation', 'Bookkeeping', 'Payroll Services', 'Business Formation', 'Financial Planning'].map((item) => (
                                <li key={item}>
                                    <Link href="/services" className="!text-white hover:text-blue-400 text-sm transition-colors block hover:translate-x-1 font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'About Us', href: '/about' },
                                { name: 'Our Team', href: '/about' },
                                { name: 'Careers', href: '/contact' },
                                { name: 'Client Portal', href: '/login' },
                                { name: 'Privacy Policy', href: '/privacy' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="!text-white hover:text-blue-400 text-sm transition-colors block hover:translate-x-1 font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm !text-white group">
                                <div className="p-1 rounded bg-white/5 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span>123 Business Avenue, Suite 100<br />Atlanta, GA 30303</span>
                            </li>
                            <li className="flex gap-3 text-sm !text-white group">
                                <div className="p-1 rounded bg-white/5 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex gap-3 text-sm !text-white group">
                                <div className="p-1 rounded bg-white/5 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>contact@angelesgroup.us</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <p className="text-slate-300 text-sm">
                            © {new Date().getFullYear()} Angeles Group. All rights reserved.
                        </p>
                        <p className="text-slate-300 text-sm flex items-center gap-2">
                            <span className="hidden md:block w-1 h-1 rounded-full bg-slate-500"></span>
                            <span>Designed & Powered by <span className="text-white font-bold hover:text-blue-400 transition-colors cursor-default">FreedomLabs</span></span>
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-sm text-slate-300 hover:text-white transition-colors">Terms</Link>
                        <Link href="/privacy" className="text-sm text-slate-300 hover:text-white transition-colors">Privacy</Link>
                        <Link href="/privacy" className="text-sm text-slate-300 hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
