'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES } from '@/lib/constants';
import { LogOut, Menu, X } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const { user, userProfile, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    React.useEffect(() => {
        if (!userProfile || !pathname) return;

        const currentSection = pathname.split('/')[1];
        if (!['client', 'admin', 'staff'].includes(currentSection)) return;

        if (userProfile.role !== currentSection) {
            if (currentSection === 'admin' && userProfile.role !== 'admin') {
                router.push(`/${userProfile.role}/dashboard`);
            }
            if (currentSection === 'staff' && !['admin', 'staff'].includes(userProfile.role)) {
                router.push(`/${userProfile.role}/dashboard`);
            }
        }
    }, [userProfile, pathname, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user || !userProfile) {
        return null;
    }

    const roleRoutes = DASHBOARD_ROUTES[userProfile.role] || [];

    const iconMap: Record<string, React.ReactElement> = {
        Dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        Folder: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
        Description: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        Person: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        Assignment: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
        FolderOpen: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg>,
        Analytics: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        People: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        FolderShared: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
        Security: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        Badge: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
        Email: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    };

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden">
            {/* Sidebar Desktop - Fixed Left */}
            <div className="hidden lg:flex w-72 bg-slate-900 border-r border-slate-800 flex-col h-full fixed left-0 top-0 z-40 pt-[120px]">
                {/* Branding removed - provided by global Navbar */}

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {roleRoutes.map((route) => {
                        const isActive = pathname === route.path;
                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/10 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                                    : 'hover:bg-white/5'
                                    }`}
                            >
                                <span className={`mr-3 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`}>
                                    {iconMap[route.icon]}
                                </span>
                                <span className={`${isActive ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>
                                    {route.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content Area - Push right by sidebar width */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-72 relative">
                {/* Header removed - replaced by global Navbar */}
                {/* Mobile Menu Button - We need a way to open sidebar on mobile if Header is gone. 
                    For now, we will rely on the global navbar or add a floating button if needed. 
                    The global navbar covers the top, so we just remove the portal header. */ }
                <div className="lg:hidden absolute top-4 left-4 z-40">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-300 hover:text-white bg-slate-900/50 rounded-lg backdrop-blur-sm mt-[100px]"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm">
                        <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 p-4">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-xl font-bold text-white">ANGELES</h1>
                                    <p className="text-xs text-blue-500 font-semibold tracking-widest">PORTAL</p>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-300">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {roleRoutes.map((route) => {
                                    const isActive = pathname === route.path;
                                    return (
                                        <Link
                                            key={route.path}
                                            href={route.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                                                }`}
                                        >
                                            <span className="mr-3">{iconMap[route.icon]}</span>
                                            {route.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                )}

                {/* Page Content - Padded top for header and navbar */}
                <main className="flex-1 overflow-y-auto p-6 pt-[180px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {children}
                </main>
            </div>
        </div>
    );
}
