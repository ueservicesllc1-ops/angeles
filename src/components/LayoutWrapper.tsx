'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <LanguageProvider>
            <AuthProvider>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </AuthProvider>
        </LanguageProvider>
    );
}
