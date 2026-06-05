import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import Capabilities from './components/Capabilities';
import FrameworkStacks from './components/FrameworkStacks';
import MarketingView from './components/MarketingView';
import IntakeView from './components/IntakeView';
import AdminView from './components/AdminView';
import { addAuditLog, getCurrentUserSync } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preFilledChoice, setPreFilledChoice] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Sync initialization state to avoid async flickers
  useEffect(() => {
    const user = getCurrentUserSync();
    if (user) {
      setIsAdminLoggedIn(true);
    }
    
    // Dispatch system bootstrap log to Firestore (or localStorage fallback engine)
    addAuditLog('Core Client Bootstrapped', 'Virtual Bridge Connect single view interface loaded successfully.');
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    addAuditLog('Navigation Event', `Visitor navigated to ${tab} viewport.`);
  };

  const handleSelectService = (serviceName: string) => {
    setPreFilledChoice(serviceName);
    setActiveTab('intake');
    addAuditLog('Lead Magnet Hook Triggered', `Preselected service: ${serviceName}`);
  };

  const handleSelectStack = (stackName: string) => {
    setPreFilledChoice(stackName);
    setActiveTab('intake');
    addAuditLog('Stack Hook Triggered', `Preselected stack: ${stackName}`);
  };

  const handleSelectCampaign = (campaignName: string) => {
    setPreFilledChoice(campaignName);
    setActiveTab('intake');
    addAuditLog('Campaign Funnel Hook Triggered', `Preselected funnel: ${campaignName}`);
  };

  const handleAdminLoginStateChange = (loggedIn: boolean) => {
    setIsAdminLoggedIn(loggedIn);
    if (loggedIn) {
      setActiveTab('admin');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D10] flex flex-col justify-between font-sans selection:bg-[#E60026]/20 selection:text-white text-slate-200">
      <div className="flex flex-col">
        {/* Nav Header */}
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={handleNavigate} 
          isAdminLoggedIn={isAdminLoggedIn}
          onLogout={() => handleAdminLoginStateChange(false)}
          onLoginClick={() => handleNavigate('admin')}
        />

        {/* Dynamic Screen Mounting */}
        <main className="flex-grow pb-16">
          {activeTab === 'home' && (
            <Homepage onNavigate={handleNavigate} />
          )}

          {activeTab === 'capabilities' && (
            <Capabilities onSelectService={handleSelectService} />
          )}

          {activeTab === 'stacks' && (
            <FrameworkStacks onSelectStack={handleSelectStack} />
          )}

          {activeTab === 'marketing' && (
            <MarketingView onSelectCampaign={handleSelectCampaign} />
          )}

          {activeTab === 'intake' && (
            <IntakeView 
              preFilledChoice={preFilledChoice} 
              onClearPreFilled={() => setPreFilledChoice('')}
              onGotoAdmin={() => {
                setActiveTab('admin');
                addAuditLog('Admin View Redirect', 'Visitor requested admin view.');
              }}
            />
          )}

          {activeTab === 'admin' && (
            <AdminView onLoginStateChange={handleAdminLoginStateChange} />
          )}
        </main>
      </div>

      {/* Modern Humble System Footer */}
      <footer className="border-t border-[#1C232B] bg-[#0D1115] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>&copy; {new Date().getFullYear()} Virtual Bridge Connect. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => handleNavigate('capabilities')}>Capability Index</span>
            <span className="text-slate-700">&bull;</span>
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => handleNavigate('stacks')}>Secure stacks</span>
            <span className="text-slate-700">&bull;</span>
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => handleNavigate('admin')}>Solopreneur Console</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
