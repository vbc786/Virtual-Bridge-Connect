import React, { useState } from 'react';
import { isFirebaseMock } from '../firebase';
import { 
  Cloud, 
  Menu, 
  X, 
  Sparkles, 
  Activity, 
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  isAdminLoggedIn, 
  onLogout,
  onLoginClick 
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Agency Hub' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'stacks', label: 'Architectures' },
    { id: 'marketing', label: 'Growth Engines' },
    { id: 'intake', label: 'Strategy Intake' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1C232B] bg-[#0A0D10]/90 backdrop-blur-md text-slate-100">
      {/* Dynamic System Status Indicator */}
      <div className="flex w-full items-center justify-between px-4 py-1.5 text-[11px] font-mono border-b border-[#1C232B] text-slate-400 bg-[#070A0D]">
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-[#E60026] animate-pulse" />
          <span className="tracking-widest">VBC CORE NETWORK: ACTIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Database className="h-3 w-3 text-slate-500" />
            Storage State: {isFirebaseMock ? (
              <span className="text-amber-500 font-semibold bg-amber-950/40 border border-amber-900/50 px-1.5 py-0.5 rounded text-[9px]">LOCAL FALLBACK ENGINE</span>
            ) : (
              <span className="text-emerald-500 font-semibold bg-emerald-950/40 border border-emerald-950 px-1.5 py-0.5 rounded text-[9px]">FIRESTORE CLOUD</span>
            )}
          </span>
          {isAdminLoggedIn && (
            <span className="flex items-center gap-1 text-[#E60026] font-semibold">
              <Lock className="h-3 w-3" /> ADMIN SECURE VIEW
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* Stark brand logo block from Sophisticated Dark layout specifications */}
          <div className="w-8 h-8 bg-[#E60026] shrink-0 flex items-center justify-center font-serif text-white font-black text-sm">
            V
          </div>
          <div>
            <span className="text-lg font-serif font-bold tracking-tighter text-white block leading-none">VBC</span>
            <span className="text-[9px] font-mono tracking-widest text-[#E60026] uppercase font-bold">Virtual Bridge Connect</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-[#E60026] text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-[#161B22]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Admin Login */}
        <div className="hidden md:flex items-center gap-3">
          {isAdminLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-[#E60026] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-[#1C232B] border border-[#1C232B]'
                }`}
              >
                Admin Control
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-semibold uppercase tracking-wider text-red-500 hover:text-red-400 hover:underline px-2 py-1"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('intake')}
                className="flex items-center gap-1.5 rounded bg-[#E60026] hover:bg-[#C50020] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/20 transition-all cursor-pointer"
              >
                <span>Book Proposal</span>
                <Sparkles className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onLoginClick}
                className="text-[10px] uppercase font-mono text-slate-500 hover:text-slate-300 border border-[#1C232B] hover:border-slate-700 rounded px-2.5 py-1"
              >
                Admin View
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {!isAdminLoggedIn && (
            <button
              onClick={() => setActiveTab('intake')}
              className="px-3 py-1.5 bg-[#E60026] text-white text-xs font-bold rounded uppercase tracking-wider"
            >
              Consult
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:bg-[#161B22] hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1C232B] bg-[#0A0D10] px-4 py-3 shadow-2xl space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all block ${
                activeTab === item.id 
                  ? 'bg-[#E60026] text-white' 
                  : 'text-slate-300 hover:bg-[#161B22]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#1C232B] flex flex-col gap-2">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 bg-[#161B22] text-white text-xs font-bold uppercase tracking-wider rounded border border-[#1C232B]"
                >
                  Admin Control Viewport
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:underline"
                >
                  Terminate Secure Session
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 text-[10px] uppercase font-mono text-slate-500 hover:bg-[#161B22] border border-[#1C232B] rounded"
                >
                  Log into secure portal
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
