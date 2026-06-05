import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_STACKS, CONSULTING_DIAGRAMS } from '../data';
import { 
  Code2, 
  Smartphone, 
  GitCompare, 
  ArrowRight,
  Sparkles,
  Layers,
  LayoutGrid,
  Zap,
  CheckCircle,
  Database,
  Workflow
} from 'lucide-react';

interface FrameworkStacksProps {
  onSelectStack: (stackName: string) => void;
}

export default function FrameworkStacks({ onSelectStack }: FrameworkStacksProps) {
  const [activeStackCategory, setActiveStackCategory] = useState<'CMS' | 'Frontend' | 'Mobile' | 'Automation' | 'Schematics'>('CMS');

  const filteredStacks = TECH_STACKS.filter(stack => stack.category === activeStackCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C232B] bg-[#11161B] text-[#E60026] text-[10px] font-mono uppercase tracking-widest leading-none">
          <Layers className="h-3.5 w-3.5" />
          <span>TECHNICAL ARCHITECTURES & STACKS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">Software Codebases & Framework Stacks</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Open-source technologies selected purposefully for low maintenance, near-infinite scale, extreme response latency, and low computing footprints.
        </p>
      </div>

      {/* Sub tabs selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border border-[#1C232B] p-1.5 bg-[#0D1115] overflow-hidden gap-1 rounded-none shadow-2xl">
        <button
          onClick={() => setActiveStackCategory('CMS')}
          className={`flex items-center justify-center gap-2 py-3 px-1 rounded-none text-xs font-bold transition-all cursor-pointer ${
            activeStackCategory === 'CMS' 
              ? 'bg-[#E60026] text-white shadow-sm' 
              : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
          }`}
        >
          <Code2 className="h-4 w-4 shrink-0" />
          <span>Headless CMS</span>
        </button>

        <button
          onClick={() => setActiveStackCategory('Frontend')}
          className={`flex items-center justify-center gap-2 py-3 px-1 rounded-none text-xs font-bold transition-all cursor-pointer ${
            activeStackCategory === 'Frontend' 
              ? 'bg-[#E60026] text-white shadow-sm' 
              : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
          }`}
        >
          <LayoutGrid className="h-4 w-4 shrink-0" />
          <span>Web & Frontends</span>
        </button>

        <button
          onClick={() => setActiveStackCategory('Mobile')}
          className={`flex items-center justify-center gap-2 py-3 px-1 rounded-none text-xs font-bold transition-all cursor-pointer ${
            activeStackCategory === 'Mobile' 
              ? 'bg-[#E60026] text-white shadow-sm' 
              : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
          }`}
        >
          <Smartphone className="h-4 w-4 shrink-0" />
          <span>Native Mobility</span>
        </button>

        <button
          onClick={() => setActiveStackCategory('Automation')}
          className={`flex items-center justify-center gap-2 py-3 px-1 rounded-none text-xs font-bold transition-all cursor-pointer ${
            activeStackCategory === 'Automation' 
              ? 'bg-[#E60026] text-white shadow-sm' 
              : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
          }`}
        >
          <Zap className="h-4 w-4 shrink-0" />
          <span>Workflow Automation</span>
        </button>

        <button
          onClick={() => setActiveStackCategory('Schematics')}
          className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-1 rounded-none text-xs font-bold transition-all cursor-pointer ${
            activeStackCategory === 'Schematics' 
              ? 'bg-[#E60026] text-white shadow-sm' 
              : 'text-[#E60026] hover:text-white hover:bg-[#E60026]/10'
          }`}
        >
          <Workflow className="h-4 w-4 shrink-0" />
          <span>Systems Flow</span>
        </button>
      </div>

      {/* Render Technical Diagrams/Schematics Viewport (Page 5) */}
      {activeStackCategory === 'Schematics' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CONSULTING_DIAGRAMS.map((diag, index) => (
              <motion.div
                key={diag.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0D1115] text-slate-100 border border-[#1C232B] rounded-none p-6 shadow-2xl space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#E60026] bg-[#E60026]/10 border border-[#E60026]/30 px-2 py-1 rounded-none uppercase font-bold tracking-widest">
                      SCHEMA MODEL {index + 1}
                    </span>
                    <span className="text-xs font-mono text-emerald-500 font-bold">{diag.roiEstimate}</span>
                  </div>

                  <h3 className="text-lg font-serif text-white tracking-tight">{diag.title}</h3>

                  {/* Flow steps container */}
                  <div className="space-y-1 pt-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">Step-by-Step Flow Process</span>
                    <div className="relative pl-4 space-y-3 border-l border-[#1C232B]">
                      {diag.systemFlow.map((step, sIdx) => (
                        <div key={sIdx} className="relative text-xs">
                          <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#E60026] ring-4 ring-[#0D1115]" />
                          <span className="font-semibold text-slate-300 block leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Integrations tags */}
                  <div className="pt-4 border-t border-[#1C232B] space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Cohesive API integrations</span>
                    <div className="flex flex-wrap gap-1.5">
                      {diag.integrations.map((integ, iIdx) => (
                        <span key={iIdx} className="text-[10px] font-mono text-slate-300 bg-[#161B22] border border-[#1C232B] px-2 py-1 rounded">
                          {integ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1C232B]">
                  <button
                    onClick={() => onSelectStack(`Consulting Schematic: ${diag.title}`)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-[#E60026] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-none hover:bg-[#C50020] transition-all cursor-pointer border border-[#E60026]"
                  >
                    <span>Request Flow Integration</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border border-[#E60026]/20 bg-gradient-to-br from-[#12161A] to-[#0A0D10] rounded-none text-center max-w-xl mx-auto space-y-2">
            <span className="font-serif text-sm font-bold text-white block">Custom Architecture Consultation</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Require custom systems flow sheets or legacy ERP mappings? Let’s detail your microservice buffers in the Strategy Session.
            </p>
          </div>
        </div>
      ) : (
        /* Render Tech Stacks List (Pages 3 & 4) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStacks.map((stack, index) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group bg-[#0D1115] border border-[#1C232B] rounded-none p-6 hover:border-[#E60026]/60 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-[#E60026] bg-[#E60026]/10 border border-[#E60026]/20 px-2.5 py-1 rounded-none uppercase tracking-widest leading-none">
                    {stack.category}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-emerald-500">
                    {stack.popularity}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-serif text-white group-hover:text-[#E60026] transition-colors">{stack.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed leading-[1.6]">{stack.description}</p>
                </div>

                {/* Benefits specs list */}
                <div className="pt-4 border-t border-[#1C232B] space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Core Architectural Merits</span>
                  <ul className="space-y-1.5 font-sans">
                    {stack.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle className="h-3.5 w-3.5 text-[#E60026] mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C232B]">
                <button
                  onClick={() => onSelectStack(stack.name)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#E60026] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-none hover:bg-[#C50020] transition-all cursor-pointer border border-[#E60026]"
                >
                  <span>Select Stack</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
