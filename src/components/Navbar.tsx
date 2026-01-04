'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, userProfile } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const isPortal = pathname?.startsWith('/client') || pathname?.startsWith('/admin') || pathname?.startsWith('/staff');

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${(scrolled || isPortal) ? 'bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-white/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                {/* Mobile-first: altura más pequeña en móvil, más grande en desktop */}
                <div className="flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-[120px]">
                    {/* Logo - Responsive sizing */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center group">
                            {/* Mobile: Logo más pequeño y proporcionado */}
                            <div className="relative w-32 h-12 sm:w-40 sm:h-14 md:w-48 md:h-16 lg:w-[280px] lg:h-20 xl:w-[350px] xl:h-24">
                                <Image
                                    src="/logo.png"
                                    alt="Angeles Group"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                        {['Services', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-xs lg:text-sm font-semibold !text-white hover:text-blue-400 transition-colors relative group px-2"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden lg:block">
                                    <p className="text-sm font-medium text-white">{userProfile?.displayName || 'User'}</p>
                                    <p className="text-xs text-slate-400">{userProfile?.email}</p>
                                </div>
                                <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                    {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                            >
                                Client Portal
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-3 px-3 flex flex-col gap-1 animate-in slide-in-from-top-2">
                    {['Services', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="block px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/70 transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    {user ? (
                        <div className="px-4 py-3 rounded-lg bg-slate-800/50 mt-2">
                            <p className="text-sm font-medium text-white">{userProfile?.displayName || 'User'}</p>
                            <p className="text-xs text-slate-400">{userProfile?.email}</p>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-500 transition mt-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Client Portal
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
