'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Calculator, BarChart3, PieChart, Users, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import HeroCarousel from '@/components/HeroCarousel';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30">

      {/* Hero Section */}
      <HeroCarousel />

      {/* Modern Bento Grid Services */}
      <section className="py-32 bg-slate-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Holistic Financial Architecture</h2>
            <p className="text-slate-400 text-lg max-w-2xl">Beyond simple compliance. We build the financial infrastructure that supports your scaling business.</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Main Large Card */}
            <motion.div variants={item} className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <Calculator size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Strategic Tax Planning</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  Stop reacting to tax season. Our forward-looking approach identifies deductions, credits, and structures that save you money before the year even ends.
                </p>
                <div className="mt-8 flex gap-2">
                  <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300">Corporate Return</div>
                  <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300">Partnership</div>
                  <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300">Individual High-Net-Worth</div>
                </div>
              </div>
            </motion.div>

            {/* Tall Card */}
            <motion.div variants={item} className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-purple-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Business Formation</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Start on solid ground. We analyze your liability and growth potential to recommend the perfect entity structure.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> LLC Formation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> S-Corp Election</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> C-Corp Registration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Operating Agreements</li>
              </ul>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div variants={item} className="relative group overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bookkeeping</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Monthly reconciliation and financial statements that give you a clear pulse on your business health.
              </p>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div variants={item} className="relative group overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-amber-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Audit Defense</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Full representation before the IRS. We handle the bureaucracy so you can keep running your business.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Years Experience', value: '20+' },
              { label: 'Business Clients', value: '500+' },
              { label: 'Tax Savings', value: '$2M+' },
              { label: 'Audit Success Rate', value: '100%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Optimize Your Finances?</h2>
          <p className="text-xl text-slate-400 mb-12">
            Join the hundreds of business owners who trust Angeles Group with their financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
import * as React from 'react';
