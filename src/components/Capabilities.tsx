import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { 
  Cloud, 
  Cpu, 
  Smartphone, 
  GitCompare, 
  LineChart,
  ArrowRight,
  Filter,
  Check,
  Tag,
  DollarSign
} from 'lucide-react';

interface CapabilitiesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Capabilities({ onSelectService }: CapabilitiesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Map icon names to lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return <Cloud className="h-5 w-5" />;
      case 'Cpu': return <Cpu className="h-5 w-5" />;
      case 'Smartphone': return <Smartphone className="h-5 w-5" />;
      case 'GitCompare': return <GitCompare className="h-5 w-5" />;
      case 'LineChart': return <LineChart className="h-5 w-5" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  const categories = ['All', 'Architecture', 'CMS', 'Mobility', 'Integration', 'Marketing'];

  const filteredServices = selectedCategory === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C232B] bg-[#11161B] text-[#E60026] text-[10px] font-mono uppercase tracking-widest leading-none">
          <Tag className="h-3.5 w-3.5" />
          <span>CAPABILITY DIRECTORY</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">Pragmatic Architecture Directories</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Operational, performance-first system architectures optimized for extreme delivery speeds and robust transaction tolerances. Select a capability to book a design consultation directly.
        </p>
      </div>

      {/* Categories Toolbar Filter */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#1C232B]">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase mr-2 flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-[#E60026]" /> Filter Solutions:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-[#E60026] text-white shadow-sm' 
                : 'bg-[#13181E] border border-[#1C232B] text-slate-400 hover:text-white hover:bg-[#1C232B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Bento Grid of Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            transition={{ 
              type: "spring", 
              stiffness: 75, 
              damping: 14, 
              delay: index * 0.06 
            }}
            className="group flex flex-col justify-between bg-[#0D1115] border border-[#1C232B] rounded-none p-6 hover:border-[#E60026]/60 transition-[border-color] duration-300 relative overflow-hidden"
          >
            {/* Top Accents */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-[#E60026]/10 border border-[#E60026]/20 text-[#E60026] flex items-center justify-center">
                  {getIcon(service.icon)}
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 bg-[#161B22] border border-[#1C232B] px-2 py-1 rounded uppercase">
                  {service.category}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-serif text-white leading-snug group-hover:text-[#E60026] transition-colors">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed leading-[1.6]">{service.description}</p>
              </div>

              {/* Core Features list */}
              <div className="pt-4 border-t border-[#1C232B] space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Inclusions & Standard Specs</span>
                <ul className="space-y-1.5 font-sans">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="h-3.5 w-3.5 text-[#E60026] mt-0.5 shrink-0 animate-pulse" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Segment - Booking and Price Tag */}
            <div className="pt-6 mt-6 border-t border-[#1C232B] flex items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Consultation Estimate</span>
                <span className="text-sm font-mono font-bold text-slate-200 flex items-center">
                  <DollarSign className="h-3.5 w-3.5 text-slate-500 -mr-0.5" />
                  {service.pricingRange}
                </span>
              </div>
              <button
                onClick={() => onSelectService(service.title)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E60026] text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-[#C50020] transition-all cursor-pointer"
              >
                <span>Select & Book</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Informative Security Guarantee Accent Footer */}
      <div className="p-6 border border-[#E60026]/20 bg-gradient-to-br from-[#12161A] to-[#0A0D10] rounded-none flex flex-col sm:flex-row items-center gap-4 justify-between text-xs">
        <div className="space-y-1">
          <span className="font-serif text-sm font-bold text-white block">Strict Solopreneur Verification Seal</span>
          <span className="text-slate-400">Every single line of code is compiled, tested, and secured against SQL-injects and update-omissions prior to edge deployment.</span>
        </div>
        <span className="text-[10px] font-mono bg-[#E60026]/10 text-[#E60026] font-bold px-3 py-1 border border-[#E60026]/35 uppercase tracking-widest block shrink-0">
          99.98% SLA SECURED
        </span>
      </div>
    </div>
  );
}
