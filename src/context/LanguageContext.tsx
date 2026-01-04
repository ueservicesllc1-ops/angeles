'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Locale } from '@/lib/dictionary';

type LanguageContextType = {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>('en');

    // Load language from localStorage if available
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Locale;
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Locale) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = dictionary[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
