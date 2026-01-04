import * as React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import LayoutWrapper from '@/components/LayoutWrapper';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Angeles Group | Elite Financial Services',
  description: 'Strategic tax preparation, bookkeeping, and incorporation services for forward-thinking businesses.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900",
        fontSans.variable
      )}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
