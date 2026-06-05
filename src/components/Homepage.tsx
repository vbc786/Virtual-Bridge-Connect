import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cloud, 
  Cpu, 
  Smartphone, 
  Zap, 
  Code2, 
  Activity, 
  Check,
  TrendingUp,
  BadgeAlert
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (tab: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.div 
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Hero Block with Typography and CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C232B] bg-[#11161B] text-[#E60026] text-[10px] font-mono uppercase tracking-widest leading-none">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SOLOPRENEUR GLOBAL AGENCY FOR THE ELITE</span>
          </motion.div>
 
          <motion.h1 style={{ lineHeight: '0.9' }} variants={itemVariants} className="text-5xl sm:text-6xl lg:text-8xl font-serif text-white tracking-tighter">
            VIRTUAL BRIDGE<br />
            <span className="text-[#E60026]">CONNECT.</span>
          </motion.h1>
 
          <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Eliminate traditional agency overhead. Connect directly with an elite Systems Architect specializing in serverless headless CMS, extreme speed optimization, native mobile applications, and fail-safe automation schema logic.
          </motion.p>
 
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => onNavigate('intake')}
              className="flex items-center justify-center gap-2 group rounded-lg bg-[#E60026] px-6 py-4 text-xs font-mono font-black uppercase tracking-widest text-white shadow-xl hover:bg-[#C50020] transition-all cursor-pointer border border-[#E60026]"
            >
              <span>Initiate Strategy Intake</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('capabilities')}
              className="flex items-center justify-center gap-2 rounded-lg bg-transparent border border-[#1C232B] px-6 py-4 text-xs font-mono font-black uppercase tracking-widest text-slate-300 hover:bg-[#11161B] hover:text-white transition-all"
            >
              <span>Explore Capabilities</span>
            </button>
          </motion.div>
 
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1C232B] max-w-lg">
            <div>
              <span className="block text-3xl font-serif text-white leading-none">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">CODE-DELIVERY RATE</span>
            </div>
            <div>
              <span className="block text-3xl font-serif text-[#E60026] leading-none">&lt;500ms</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono leading-none">EDGE REACTION SPEED</span>
            </div>
            <div>
              <span className="block text-3xl font-serif text-white leading-none">5M+</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">CONCURRENT BUFFER</span>
            </div>
          </motion.div>
        </div>
 
        {/* 2. Visual Architecture Stack Display */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-[#E60026]/5 rounded-3xl blur-3xl -z-10" />
          <div className="bg-[#0F1317] text-slate-200 rounded-2xl shadow-2xl p-6 border border-[#1C232B] font-mono text-xs overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-[#1C232B] pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E60026]" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
              </div>
              <span className="text-[9px] text-slate-500">VBC_INFRASTRUCTURE_VISUALIZER.TS</span>
            </div>
 
            <div className="space-y-3">
              {/* Stack Layers */}
              <div className="p-3 bg-[#13181E] rounded-lg border border-[#1C232B] flex items-center justify-between relative group hover:border-[#E60026] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#E60026]/10 flex items-center justify-center text-[#E60026]">
                    <Cloud className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">MULTICLOUD ROUTER GATE</div>
                    <div className="text-[10px] text-slate-500 font-sans">Edge propagation & failover logic</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#E60026] font-bold bg-[#E60026]/10 px-2 py-0.5 rounded border border-[#E60026]/30">SECURE</span>
              </div>
 
              <div className="p-3 bg-[#13181E] rounded-lg border border-[#1C232B] flex items-center justify-between relative group hover:border-[#E60026] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#E60026]/10 flex items-center justify-center text-[#E60026]">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">DECOUPLED HEADLESS CMS</div>
                    <div className="text-[10px] text-slate-500 font-sans">Fast React hydration with CDN purge</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#E60026] font-bold bg-[#E60026]/10 px-2 py-0.5 rounded border border-[#E60026]/30 font-mono">CDN PUSH</span>
              </div>
 
              <div className="p-3 bg-[#13181E] rounded-lg border border-[#1C232B] flex items-center justify-between relative group hover:border-[#E60026] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#E60026]/10 flex items-center justify-center text-[#E60026]">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">MOBILE NATIVE RUNTIMES</div>
                    <div className="text-[10px] text-slate-500 font-sans">Jetpack Compose & SwiftUI bindings</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#E60026] font-bold bg-[#E60026]/10 px-2 py-0.5 rounded border border-[#E60026]/30 font-mono">COMPILE-TS</span>
              </div>
 
              <div className="p-3 bg-[#13181E] rounded-lg border border-[#1C232B] flex items-center justify-between relative group hover:border-[#E60026] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#E60026]/10 flex items-center justify-center text-[#E60026]">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">AUTOMATED API SCHEMAS</div>
                    <div className="text-[10px] text-slate-500 font-sans">Zapier scenario buffers & triggers</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#E60026] font-bold bg-[#E60026]/10 px-2 py-0.5 rounded border border-[#E60026]/30 font-mono">TRIGGERED</span>
              </div>
            </div>
 
            {/* Simulated Live Console Logs */}
            <div className="mt-4 pt-3 border-t border-[#1C232B] space-y-1 text-[10px] text-slate-400">
              <div className="text-[#E60026]">&gt; system.connect() successful.</div>
              <div className="text-slate-500">&gt; server.uptime_seconds == 348239s</div>
              <div className="text-emerald-500">&gt; Memory consumption: 8% [STABLE]</div>
            </div>
          </div>
        </motion.div>
      </div>
 
      {/* 3. High-Density Active Operations Console */}
      <div className="border border-[#1C232B] bg-[#0D1115] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-serif text-white tracking-tight">Agency Infrastructure Performance Console</h3>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">REAL-TIME FEEDBACK ON SEAMLESS SYSTEM SYNCHRONIZATION</p>
          </div>
          <button 
            onClick={() => onNavigate('stacks')}
            className="text-xs font-bold uppercase tracking-wider text-[#E60026] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Review Architectures <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#13181E] p-5 rounded-lg border border-[#1C232B] relative overflow-hidden">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
            <div className="text-3xl font-serif text-[#E60026]">99 / 100</div>
            <div className="font-semibold text-sm text-white mt-2">Lightweight Core Execution</div>
            <div className="text-xs text-slate-400 mt-2">Zero bloated JavaScript payloads. Every page hydrated instantly at edge.</div>
          </div>
 
          <div className="bg-[#13181E] p-5 rounded-lg border border-[#1C232B] relative overflow-hidden">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#E60026] animate-pulse" />
            <div className="text-3xl font-serif text-white">60 Seconds</div>
            <div className="font-semibold text-sm text-white mt-2">Form to Client Sync</div>
            <div className="text-xs text-slate-400 mt-2">Strategy intakes trigger real-time notifications, CRM inputs, and auto-scheduling.</div>
          </div>
 
          <div className="bg-[#13181E] p-5 rounded-lg border border-[#1C232B] relative overflow-hidden">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-neutral-500 animate-pulse" />
            <div className="text-3xl font-serif text-white">&lt;2ms latency</div>
            <div className="font-semibold text-sm text-white mt-2">Immutable Pipeline Buffer</div>
            <div className="text-xs text-slate-400 mt-2">Integrated queuing protects data buffers during massive marketing campaign spikes.</div>
          </div>
        </div>
      </div>
 
      {/* 4. Core Benefits & Trust Blocks */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3.5xl font-serif text-white tracking-tight">Why Global Solopreneur Engineering Wins</h2>
          <p className="text-xs sm:text-sm text-slate-400">By cutting out the intermediate account managers, we deploy pristine architectures directly in days, not months.</p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 p-2 border-l border-[#1C232B] pl-4">
            <div className="h-10 w-10 bg-[#E60026]/10 text-[#E60026] flex items-center justify-center font-serif text-lg font-bold">
              01
            </div>
            <h4 className="text-lg font-serif text-white leading-tight">Direct Architectural Access</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">No junior engineers practicing on your high-ticket budget. Get professional, custom systems designed directly by a veteran lead developer.</p>
          </div>
 
          <div className="space-y-3 p-2 border-l border-[#1C232B] pl-4">
            <div className="h-10 w-10 bg-[#E60026]/10 text-[#E60026] flex items-center justify-center font-serif text-lg font-bold">
              02
            </div>
            <h4 className="text-lg font-serif text-white leading-tight">Engineered for ROI</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">We bypass traditional standard coding models. Every CMS, App frame, and CRM bridge is selected purely for performance, caching speeds, and marketing returns.</p>
          </div>
 
          <div className="space-y-3 p-2 border-l border-[#1C232B] pl-4">
            <div className="h-10 w-10 bg-[#E60026]/10 text-[#E60026] flex items-center justify-center font-serif text-lg font-bold">
              03
            </div>
            <h4 className="text-lg font-serif text-white leading-tight">Automated Self-Sustenance</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Systems are hand-crafted to run without hand-holding. Client profile tracking, logging, error captures, and backups operate autonomously at zero cloud costs.</p>
          </div>
        </div>
      </div>
 
      {/* 5. Strategy Intake Lead Magnet CTA Panel */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#12161A] to-[#0A0D10] text-white overflow-hidden p-8 sm:p-12 border border-[#1C232B]">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,0,38,0.08),transparent_60%)] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#E60026] font-bold uppercase block">SECURE SYSTEM GATEWAY</span>
            <h3 className="text-2xl sm:text-4.5xl font-serif text-white tracking-tight leading-tight">Ready to map your stack and secure your strategic edge?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Fill out our 3-minute high-ticket strategy intake form. Lock in an architectural consultation slot, select your optimal open-source core stack, and receive an automated system blueprint proposal tailored directly to your load scales.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => onNavigate('intake')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded bg-[#E60026] text-xs font-mono font-bold uppercase tracking-widest text-white hover:bg-[#C50020] transition-all cursor-pointer border border-[#E60026]"
            >
              <span>Submit Strategy Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
