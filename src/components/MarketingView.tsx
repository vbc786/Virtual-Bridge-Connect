import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CAMPAIGN_FRAMEWORKS } from '../data';
import { 
  TrendingUp, 
  ArrowRight, 
  Target, 
  DollarSign, 
  Percent, 
  Award,
  BookOpen,
  ChevronRight,
  MousePointer,
  Sparkles
} from 'lucide-react';

interface MarketingViewProps {
  onSelectCampaign: (campaignName: string) => void;
}

export default function MarketingView({ onSelectCampaign }: MarketingViewProps) {
  // ROI Calculation state
  const [budget, setBudget] = useState<number>(5000);
  const [cpc, setCpc] = useState<number>(2.50);
  const [conversionRate, setConversionRate] = useState<number>(3.5);
  const [contractValue, setContractValue] = useState<number>(8000);
  const [closeRate, setCloseRate] = useState<number>(10);

  // Computed Outputs
  const metrics = useMemo(() => {
    const clicks = Math.floor(budget / cpc);
    const leads = Math.floor(clicks * (conversionRate / 100));
    const deals = Math.floor(leads * (closeRate / 100));
    const grossRevenue = deals * contractValue;
    const netProfit = grossRevenue - budget;
    const roas = budget > 0 ? (grossRevenue / budget).toFixed(2) : '0';
    const costPerLead = leads > 0 ? (budget / leads).toFixed(2) : '0';

    return {
      clicks,
      leads,
      deals,
      grossRevenue,
      netProfit,
      roas,
      costPerLead
    };
  }, [budget, cpc, conversionRate, contractValue, closeRate]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C232B] bg-[#11161B] text-[#E60026] text-[10px] font-mono uppercase tracking-widest leading-none">
          <TrendingUp className="h-4 w-4" />
          <span>REAL GROWTH ENGINE PLATFORMS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">Growth & Inbound B2B Campaigns</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          We combine enterprise technical architecture with precision digital marketing metrics. Run real simulations on conversions and client metrics below.
        </p>
      </div>

      {/* ROI Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-[#0D1115] border border-[#1C232B] rounded-none overflow-hidden shadow-2xl">
        {/* Sliders Console column */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center bg-[#E60026] text-white text-xs font-mono font-black">1</span>
              <span>Inbound ROI Interactive Calculator</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest font-bold">Adjust variables below to calibrate target funnel values</p>
          </div>

          <div className="space-y-5 pt-2">
            {/* Ad Budget Sliders */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 font-sans flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-[#E60026]" />
                  Monthly Advertising Budget
                </label>
                <span className="font-mono font-bold text-[#E60026] bg-[#E60026]/10 px-2.5 py-0.5 border border-[#E60026]/20 text-xs">
                  ${budget.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#E60026] h-1.5 bg-[#161B22] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Average CPC Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 font-sans flex items-center gap-1">
                  <MousePointer className="h-3.5 w-3.5 text-[#E60026]" />
                  Average Cost Per Click (CPC)
                </label>
                <span className="font-mono font-bold text-slate-100 bg-[#161B22] border border-[#1C232B] px-2 py-0.5 text-xs">
                  ${cpc.toFixed(2)}
                </span>
              </div>
              <input 
                type="range" 
                min="0.50" 
                max="10.00" 
                step="0.10"
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full accent-slate-400 h-1.5 bg-[#161B22] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>$0.50</span>
                <span>$5.00</span>
                <span>$10.00</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Estimated Conversion slider */}
              <div className="space-y-2 border-t border-[#1C232B] pt-4">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300 font-sans flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5 text-[#E60026]" />
                    Conversion Rate
                  </label>
                  <span className="font-mono font-bold text-slate-100 bg-[#161B22] border border-[#1C232B] px-1.5 py-0.5 rounded text-xs">
                    {conversionRate}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="15.0" 
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-[#E60026] h-1.5 bg-[#161B22] rounded-lg cursor-pointer"
                />
              </div>

              {/* Close Ratio slider */}
              <div className="space-y-2 border-t border-[#1C232B] pt-4">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300 font-sans flex items-center gap-1">
                    <Target className="h-3.5 w-3.5 text-[#E60026]" />
                    Lead-to-Close Rate
                  </label>
                  <span className="font-mono font-bold text-slate-100 bg-[#161B22] border border-[#1C232B] px-1.5 py-0.5 rounded text-xs">
                    {closeRate}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  step="1"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full accent-slate-400 h-1.5 bg-[#161B22] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Average Contract Value input */}
            <div className="space-y-2 border-t border-[#1C232B] pt-4">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 font-sans">Average Closed Contract LTV ($)</label>
                <span className="font-mono font-bold text-emerald-500 bg-emerald-950/40 border border-emerald-950 px-2.5 py-0.5 text-xs">
                  ${contractValue.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="30000" 
                step="500"
                value={contractValue}
                onChange={(e) => setContractValue(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-[#161B22] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>$1,000</span>
                <span>$15,000</span>
                <span>$30,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Funnel Calculations output column */}
        <div className="lg:col-span-5 bg-[#0A0D10] border-l border-[#1C232B] text-slate-100 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#E60026] font-bold uppercase block">COMPUTED PERFORMANCE METRICS</span>
              <h3 className="text-lg font-serif text-white">Simulated Funnel Outputs</h3>
            </div>

            {/* Microstats list */}
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-baseline border-b border-[#1C232B] pb-2.5">
                <span className="text-xs text-slate-400">Calculated Clicks</span>
                <span className="font-mono text-sm font-semibold">{metrics.clicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#1C232B] pb-2.5">
                <span className="text-xs text-slate-400">Captured Hot Leads</span>
                <span className="font-mono text-sm font-semibold text-[#E60026]">{metrics.leads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#1C232B] pb-2.5">
                <span className="text-xs text-slate-400">Cost Per Lead (CPL)</span>
                <span className="font-mono text-sm font-semibold text-slate-300">${metrics.costPerLead}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#1C232B] pb-2.5">
                <span className="text-xs text-slate-400">Deals Closed</span>
                <span className="font-mono text-sm font-semibold text-emerald-400">{metrics.deals.toLocaleString()}</span>
              </div>
            </div>

            {/* Large Highlight Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0D1115] p-4 border border-[#1C232B] rounded-none">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Gross Revenue</span>
                <span className="text-lg font-bold font-serif text-emerald-500">${metrics.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="bg-[#0D1115] p-4 border border-[#1C232B] rounded-none">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Funnel ROI (ROAS)</span>
                <span className="text-lg font-bold font-serif text-[#E60026]">{metrics.roas}x</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1C232B] mt-6 space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Calibrated for solopreneur traffic structures.</span>
            </div>
            <button
              onClick={() => onSelectCampaign(`Funnel Custom Simulate: ROAS ${metrics.roas}x`)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-[#E60026] hover:bg-[#C50020] text-xs font-mono font-bold uppercase tracking-widest text-[#E60026] text-white rounded-none border border-[#E60026] transition-all cursor-pointer"
            >
              <span>Commit Simulations To Strategy</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Channels Roadmaps */}
      <div className="space-y-6">
        <div className="space-y-1.5 max-w-2xl">
          <h3 className="text-xl font-serif text-white tracking-tight">Inbound Acquisition Campaign Blueprints</h3>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold">Our proven, organic campaigns for solopreneur client targets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAMPAIGN_FRAMEWORKS.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-[#0D1115] border border-[#1C232B] rounded-none p-6 hover:border-[#E60026]/60 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-[#161B22] px-2 py-1 border border-[#1C232B]">
                    {campaign.channel}
                  </span>
                  <span className="text-[9px] font-bold text-[#E60026] font-mono bg-[#E60026]/10 px-2.5 py-1 rounded-none border border-[#E60026]/20 uppercase tracking-wider">
                    {campaign.roiMultiplier}X ROI
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-serif text-white tracking-tight leading-tight">{campaign.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed leading-[1.6]">{campaign.description}</p>
                </div>

                {/* Tactics checklist */}
                <div className="pt-4 border-t border-[#1C232B] space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Inbound Growth Tactics</span>
                  <ul className="space-y-1.5 font-sans">
                    {campaign.tactics.map((tactic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <Award className="h-4 w-4 text-[#E60026] shrink-0 mt-0.5 animate-pulse" />
                        <span>{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C232B]">
                <button
                  onClick={() => onSelectCampaign(campaign.name)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#E60026] hover:bg-[#C50020] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-none border border-[#E60026] transition-all cursor-pointer"
                >
                  <span>Incorporate In My Strategy</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
