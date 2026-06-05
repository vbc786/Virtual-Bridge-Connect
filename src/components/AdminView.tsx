import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lead, AuditLog } from '../types';
import { 
  loginWithGoogle, 
  logout, 
  subscribeLeads, 
  subscribeAuditLogs, 
  updateLeadStatus, 
  deleteLead,
  isFirebaseMock
} from '../firebase';
import { 
  ShieldCheck, 
  Database,
  Lock,
  Activity,
  User,
  Mail,
  Clock,
  Trash2,
  ListFilter,
  CheckCircle,
  Eye,
  LogOut,
  AlertCircle,
  FileCheck2,
  GitCommit,
  Terminal,
  LineChart,
  Grid
} from 'lucide-react';

interface AdminViewProps {
  onLoginStateChange: (loggedIn: boolean) => void;
}

export default function AdminView({ onLoginStateChange }: AdminViewProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Firestore collections states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [leadsError, setLeadsError] = useState<string | null>(null);

  // Selected lead details popup modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Dynamic metrics
  const stats = React.useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const analyzing = leads.filter(l => l.status === 'analyzing').length;
    const scheduled = leads.filter(l => l.status === 'scheduled').length;
    const archived = leads.filter(l => l.status === 'archived').length;
    return { total, newLeads, analyzing, scheduled, archived };
  }, [leads]);

  // Subscribe to real-time collections on mount if authorized
  useEffect(() => {
    if (!isAuthorized) return;

    const unsubLeads = subscribeLeads((data) => {
      setLeads(data);
      setLeadsError(null);
    }, (err) => {
      setLeadsError(err.message || 'Firestore reads restricted.');
    });

    const unsubLogs = subscribeAuditLogs((data) => {
      setLogs(data);
    }, (err) => {
      console.error(err);
    });

    return () => {
      unsubLeads();
      unsubLogs();
    };
  }, [isAuthorized]);

  const handleAdminSignIn = async () => {
    setAuthLoading(true);
    try {
      const user = await loginWithGoogle();
      if (user) {
        setCurrentUser(user);
        setIsAuthorized(true);
        onLoginStateChange(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setIsAuthorized(false);
    onLoginStateChange(false);
  };

  const handleStatusChange = async (leadId: string, status: Lead['status']) => {
    try {
      await updateLeadStatus(leadId, status);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, status } : null);
      }
    } catch (e: any) {
      alert("Failed updating Firestore: " + e.message);
    }
  };

  const handlePurgeLead = async (leadId: string) => {
    if (!window.confirm("CRITICAL WARNING: This completely scrubs the document lead entries from Firestore database. Are you absolutely certain?")) {
      return;
    }
    try {
      await deleteLead(leadId);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    } catch (e: any) {
      alert("Purge operation rejected: " + e.message);
    }
  };

  const filteredLeads = filterStatus === 'All' 
    ? leads 
    : leads.filter(l => l.status === filterStatus);

  if (!isAuthorized) {
    /* Sign In Splash Portals (Mock & Real Google credentials selector supported) */
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0D1115] border border-[#1C232B] rounded-none p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Top header decoration */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#E60026]" />
          <div className="mx-auto h-12 w-12 bg-[#161B22] text-[#E60026] border border-[#1C232B] rounded-none flex items-center justify-center">
            <Lock className="h-5 w-5" />
          </div>

          <div className="space-y-1.5 text-center">
            <span className="text-[9px] font-mono tracking-widest text-[#E60026] font-bold uppercase block">RESTRICTED SECTOR ACCESS</span>
            <h3 className="text-xl font-serif text-white tracking-tight">Administrative Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Authorized personnel only. Logs & Lead documents are restricted by security schemas. Sign in below.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleAdminSignIn}
              disabled={authLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#E60026] text-white rounded-none text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#C50020] transition-all cursor-pointer border border-[#E60026]"
            >
              {authLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 animate-pulse" />
                  <span>Authenticate Admin Credentials</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-500 font-mono text-center">
              * Note: Mock bypass activated automatically when Firebase client is idle.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#1C232B]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif text-white tracking-tight">Administrative Control Viewport</h2>
            <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-950/40 text-emerald-500 font-bold border border-emerald-950 px-2 py-1 rounded-none font-mono tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 animate-pulse" /> SECURE
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            LOGGED IN AS: <span className="text-[#E60026] font-bold underline leading-none">{currentUser?.email || 'solopreneur@vbc.corp'}</span>
          </p>
        </div>

        <button 
          onClick={handleAdminSignOut}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-950 bg-red-950/10 text-red-500 rounded-none text-xs font-mono uppercase tracking-widest font-bold hover:bg-red-950/30 transition-all cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Exit Viewport</span>
        </button>
      </div>

      {/* Warning/Error Banner */}
      {leadsError && (
        <div className="p-4 bg-[#11161B] border border-amber-900/40 rounded-none text-xs text-amber-500 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider font-mono">Firestore Static Cache Mode active:</span>
            <p className="text-[11px] leading-relaxed text-slate-400">The server handles local fallback data registers. Real-time updates active. Trace details: {leadsError}</p>
          </div>
        </div>
      )}

      {/* Multi-Dimensional Indicators Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 shadow-2xl">
        <div className="bg-[#0D1115] border border-[#1C232B] rounded-none p-4 text-center">
          <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold tracking-wider">TOTAL BOOKED</span>
          <span className="text-2xl font-bold text-white font-mono">{stats.total}</span>
        </div>
        <div className="bg-[#0D1115] border border-[#1C232B] rounded-none p-4 text-center border-l-4 border-l-[#E60026]">
          <span className="text-[9px] font-mono text-[#E60026] block uppercase font-bold tracking-wider">NEW INTAKES</span>
          <span className="text-2xl font-bold text-white font-mono">{stats.newLeads}</span>
        </div>
        <div className="bg-[#0D1115] border border-[#1C232B] rounded-none p-4 text-center border-l-4 border-l-amber-600">
          <span className="text-[9px] font-mono text-amber-500 block uppercase font-bold tracking-wider">ANALYZING</span>
          <span className="text-2xl font-bold text-white font-mono">{stats.analyzing}</span>
        </div>
        <div className="bg-[#0D1115] border border-[#1C232B] rounded-none p-4 text-center border-l-4 border-l-emerald-600">
          <span className="text-[9px] font-mono text-emerald-500 block uppercase font-bold tracking-wider">SCHEDULED</span>
          <span className="text-2xl font-bold text-white font-mono">{stats.scheduled}</span>
        </div>
        <div className="bg-[#0D1115] border border-[#1C232B] rounded-none p-4 text-center col-span-2 md:col-span-1 border-l-4 border-l-slate-600">
          <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold tracking-wider">ARCHIVED</span>
          <span className="text-2xl font-bold text-white font-mono">{stats.archived}</span>
        </div>
      </div>

      {/* Main Table Segment & Logs Splitting panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table column */}
        <div className="lg:col-span-8 bg-[#0D1115] border border-[#1C232B] rounded-none overflow-hidden shadow-2xl space-y-4 p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-base font-serif text-white flex items-center gap-1.5 tracking-tight">
              <FileCheck2 className="h-4 w-4 text-[#E60026]" />
              <span>Strategy Proposals Ledger</span>
            </h3>

            {/* Filter controls info */}
            <div className="flex items-center gap-1.5">
              <ListFilter className="h-3.5 w-3.5 text-slate-500" />
              <div className="flex gap-1">
                {['All', 'new', 'analyzing', 'scheduled', 'archived'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterStatus(f)}
                    className={`px-2 py-1 rounded-none text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      filterStatus === f 
                        ? 'bg-[#E60026] text-white font-mono' 
                        : 'bg-[#161B22] border border-[#1C232B] text-slate-400 hover:text-white hover:bg-[#11161B] font-mono'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Table View */}
          <div className="overflow-x-auto border border-[#1C232B] rounded-none bg-[#06080A]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0A0D10] text-[#E60026] border-b border-[#1C232B] uppercase font-mono font-bold tracking-wider">
                  <th className="p-3">Client</th>
                  <th className="p-3">Reserved Time</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C232B]/50">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                      No matching records found in this partition zone.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#11161C] transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white truncate max-w-[150px]">{lead.name}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{lead.email}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-300 font-sans">
                        {lead.dateTime || 'Not scheduled'}
                      </td>
                      <td className="p-3 font-mono text-[#E60026] font-semibold">
                        {lead.budget}
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-none text-[9px] font-mono font-bold uppercase border ${
                          lead.status === 'new' ? 'bg-[#E60026]/10 text-[#E60026] border-[#E60026]/20' :
                          lead.status === 'analyzing' ? 'bg-amber-950/20 text-amber-500 border-amber-900/40' :
                          lead.status === 'scheduled' ? 'bg-emerald-950/20 text-emerald-500 border-emerald-900/40' :
                          'bg-slate-900 text-slate-450 border-slate-805'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 px-2 bg-gradient-to-r from-[#161B22] to-[#11161B] hover:to-[#E60026]/10 text-slate-300 hover:text-[#E60026] rounded-none border border-[#1C232B] hover:border-[#E60026]/30 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider"
                          >
                            <Eye className="h-3.5 w-3.5" /> Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs Right column (Page 8 Mandatory element) */}
        <div className="lg:col-span-4 bg-[#0D1115] text-slate-100 border border-[#1C232B] rounded-none p-5 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1C232B] pb-3">
            <h3 className="text-sm font-bold font-mono tracking-wider flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-[#E60026]" />
              <span>REAL-TIME AUDIT LOGS</span>
            </h3>
            <span className="text-[9px] font-mono text-emerald-400 animate-pulse font-bold bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded-none tracking-widest text-center uppercase">
              POLLING ACTIVE
            </span>
          </div>

          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-10 font-mono text-slate-500 text-[10px]">
                No logged entries found in core container.
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="text-[10px] font-mono bg-[#06080A] p-2.5 rounded-none border border-[#1C232B] space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-300 font-bold flex items-center gap-1">
                      <GitCommit className="h-3 w-3 shrink-0 text-[#E60026]" />
                      {log.action}
                    </span>
                    <span className="text-slate-500 text-[9px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {log.details && (
                    <p className="text-slate-400 leading-relaxed text-[9px] inline-block w-full">{log.details}</p>
                  )}
                  <span className="block text-slate-650 text-[8px] tracking-wide text-right font-bold">TX_ID: {log.id}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Selected Inspector Modal Detail Popup */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080A]/85 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D1115] border border-[#1C232B] rounded-none p-6 sm:p-8 shadow-2xl space-y-6 max-w-lg w-full relative"
          >
            <div className="flex justify-between items-start border-b border-[#1C232B] pb-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#E60026] tracking-widest font-bold uppercase block">LEAD TRANSACTION SCRUTINY</span>
                <h4 className="text-2xl font-serif text-white tracking-tight leading-tight">{selectedLead.name}</h4>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-550 hover:text-white text-xs font-bold font-mono tracking-widest px-2 py-1 rounded-none hover:bg-[#161B22] cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-slate-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Registry Email</span>
                  <span className="font-semibold text-white break-all font-sans">{selectedLead.email}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Allocated Slot</span>
                  <span className="font-bold text-[#E60026] font-mono">{selectedLead.dateTime || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Contract Budget Target</span>
                  <span className="font-semibold text-slate-200">{selectedLead.budget}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Chosen Core Stack</span>
                  <span className="font-semibold text-slate-200 font-mono">{selectedLead.chosenStack || 'None'}</span>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-[#1C232B] pt-3">
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Lead Inclusions & Tags</span>
                <div className="flex flex-wrap gap-1">
                  {selectedLead.selectedTags?.map((tag, idx) => (
                    <span key={idx} className="bg-[#E60026]/10 text-[#E60026] text-[9.5px] font-bold font-mono uppercase px-2.5 py-1 border border-[#E60026]/20 rounded-none">
                      {tag}
                    </span>
                  )) || <span className="text-slate-500 text-[10px] font-mono">No tagging tags</span>}
                </div>
              </div>

              <div className="space-y-1.5 border-t border-[#1C232B] pt-3">
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Project Outline Description Summary</span>
                <p className="text-[11px] text-slate-300 bg-[#06080A] border border-[#1C232B] p-3 rounded-none font-mono leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto block w-full">
                  {selectedLead.projectDescription || 'No description outline recorded.'}
                </p>
              </div>

              {/* Status transition triggers */}
              <div className="space-y-2 border-t border-[#1C232B] pt-4">
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block tracking-wider">Calibrate Ledger Progress Status</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['new', 'analyzing', 'scheduled', 'reviewed', 'archived'] as Lead['status'][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase border transition-all cursor-pointer font-mono ${
                        selectedLead.status === st 
                          ? 'bg-[#E60026] text-white font-bold border-[#E60026]' 
                          : 'bg-[#06080A] text-slate-400 border-[#1C232B] hover:bg-[#11161B]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delete purge action footer */}
            <div className="pt-4 border-t border-[#1C232B] flex justify-between items-center">
              <button
                onClick={() => handlePurgeLead(selectedLead.id)}
                className="inline-flex items-center gap-1 py-2 px-3.5 bg-red-950/15 text-red-500 hover:bg-red-950/30 border border-red-900/35 rounded-none text-[10px] font-bold font-mono uppercase tracking-widest transition-all cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Purge Document</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="py-2.5 px-6 bg-gradient-to-r from-[#161B22] to-[#11161B] hover:to-[#E60026]/10 border border-[#1C232B] text-slate-300 hover:text-white font-bold font-mono text-xs uppercase tracking-widest transition-all cursor-pointer rounded-none"
              >
                Done
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </div>
  );
}
