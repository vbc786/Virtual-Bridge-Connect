import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AVAILABLE_SLOTS } from '../data';
import { submitLead } from '../firebase';
import { 
  Calendar, 
  Sparkles, 
  User, 
  Mail, 
  MessageSquare, 
  DollarSign, 
  Layers, 
  Clock, 
  CheckCircle, 
  ShieldAlert,
  ArrowRight,
  ClipboardCheck,
  Check
} from 'lucide-react';

interface IntakeViewProps {
  preFilledChoice?: string;
  onClearPreFilled: () => void;
  onGotoAdmin: () => void;
}

export default function IntakeView({ preFilledChoice, onClearPreFilled, onGotoAdmin }: IntakeViewProps) {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [chosenStack, setChosenStack] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('$15,000 - $30,000');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Page operation feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // If a pre-filled value is passed (e.g. from service catalog page or stacks tab clicks)
  useEffect(() => {
    if (preFilledChoice) {
      if (preFilledChoice.toLowerCase().includes('consulting') || preFilledChoice.toLowerCase().includes('schematic')) {
        setChosenStack(preFilledChoice);
        if (!selectedTags.includes('Systems flows')) {
          setSelectedTags(prev => [...prev, 'Systems flows']);
        }
      } else if (preFilledChoice.toLowerCase().includes('campaign') || preFilledChoice.includes('ROAS') || preFilledChoice.includes('High-Ticket')) {
        setChosenStack(preFilledChoice);
        if (!selectedTags.includes('SEO & Strategy')) {
          setSelectedTags(prev => [...prev, 'SEO & Strategy']);
        }
      } else {
        setChosenStack(preFilledChoice);
        // Toggle corresponding tag if not already in list
        const relatedTag = preFilledChoice.includes('CMS') ? 'Headless CMS' : 'High-Performance Mobile';
        if (!selectedTags.includes(relatedTag)) {
          setSelectedTags(prev => [...prev, relatedTag]);
        }
      }
      onClearPreFilled(); // clear to avoid repeat logic
    }
  }, [preFilledChoice]);

  const capabilitiesList = [
    'Enterprise Infrastructure',
    'Headless CMS',
    'High-Performance Mobile',
    'Webhook Automation',
    'SEO & Strategy',
    'Systems flows',
    'Analytics Dashboards'
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Hard client validations
    if (!name.trim()) return setSubmitError('Please provide your full identity name.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setSubmitError('Please provide a valid business email address.');
    }
    if (projectDescription.length > 2000) {
      return setSubmitError('Project outline details must not surpass 2000 characters to keep review scopes concise.');
    }
    if (!selectedSlot) {
      return setSubmitError('Please reserve a calendar slot to lock in your initial strategy consultation.');
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        projectDescription: projectDescription.trim(),
        budget,
        chosenStack: chosenStack.trim() || 'Custom Bespoke Stack (To be outlined in session)',
        dateTime: selectedSlot,
        selectedTags
      };

      const id = await submitLead(payload);
      setSubmittedId(id);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Severe error during system write operation. Please check connectivity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence mode="wait">
        {!submittedId ? (
          /* Intake Form Panel */
          <motion.div
            key="intake-form-pane"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Content column: form description benefits */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C232B] bg-[#11161B] text-[#E60026] text-[10px] font-mono uppercase tracking-widest leading-none">
                <ClipboardCheck className="h-4 w-4" />
                <span>CONNECT WITH SECURED CHANNELS</span>
              </div>
              <h2 className="text-4xl font-serif text-white tracking-tight leading-tight">High-Ticket Strategy Booking Console</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect directly with our veteran Lead Architect. Fill out this operational ledger to calibrate your stack and book your strategy consultation.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#1C232B] text-xs text-slate-350 font-sans">
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#E60026] shrink-0 mt-0.5" />
                  <span>Your submission is recorded immediately to our Firestore active logs.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#E60026] shrink-0 mt-0.5" />
                  <span>The Lead Architect will review your target stack within 4 hours.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#E60026] shrink-0 mt-0.5" />
                  <span>Direct Slack / Email invite links will be forwarded upon review checkpoint.</span>
                </div>
              </div>

              {/* Secure status icon indicator */}
              <div className="p-4 bg-[#0A0D10] border border-[#1C232B] rounded-none text-[11px] font-mono text-slate-400 space-y-1">
                <span className="font-bold text-white block text-xs tracking-wider">ENFORCING STRICT SECURITY SCHEMAS</span>
                <span>Payload validators inspect every key to prevent shadow-injection, value-poisoning, and updater-omissions.</span>
              </div>
            </div>

            {/* Right column: The interactive form */}
            <div className="lg:col-span-7 bg-[#0D1115] border border-[#1C232B] rounded-none p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Error Banner inside form */}
                {submitError && (
                  <div className="p-4 bg-red-950/40 border border-red-900 rounded-none text-xs text-red-500 flex items-start gap-2.5">
                    <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Grid Inputs: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-[#E60026]" />
                      Client Full Identity
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Stephen Strange"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm bg-[#06080A] border border-[#1C232B] text-white rounded-none p-3 focus:border-[#E60026] focus:outline-none placeholder-slate-600 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#E60026]" />
                      Business Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. stephen@marvel.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm bg-[#06080A] border border-[#1C232B] text-white rounded-none p-3 focus:border-[#E60026] focus:outline-none placeholder-slate-600 transition-all"
                    />
                  </div>
                </div>

                {/* Chosen Stack Selection input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#E60026]" />
                    Chosen Open-Source Tech Stack
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Decoupled WordPress + React, Strapi, Custom iOS UI"
                    value={chosenStack}
                    onChange={(e) => setChosenStack(e.target.value)}
                    className="w-full text-sm bg-[#06080A] border border-[#1C232B] text-white rounded-none p-3 focus:border-[#E60026] focus:outline-none placeholder-slate-600 transition-all font-medium"
                  />
                  <p className="text-[10px] text-slate-500 font-mono">You can click stacks inside the Architectures directory to pre-fill this ledger field instantly.</p>
                </div>

                {/* Capabilities required chips select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase block">Capabilities Required</label>
                  <div className="flex flex-wrap gap-1.5">
                    {capabilitiesList.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1.5 rounded-none text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                            isSelected 
                              ? 'bg-[#E60026]/15 text-[#E60026] border-[#E60026]' 
                              : 'bg-[#06080A] text-slate-400 border-[#1C232B] hover:bg-[#11161B]'
                          }`}
                        >
                          <span>{tag}</span>
                          {isSelected && <Check className="h-3 w-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Brief description textarea plus character counter track */}
                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-[#E60026]" />
                      Brief Project Description Outline
                    </label>
                    <span className={`text-[10px] font-mono ${projectDescription.length > 1800 ? 'text-[#E60026] font-bold' : 'text-slate-500'}`}>
                      {projectDescription.length} / 2000 chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={2000}
                    placeholder="Provide a high-level summary of your database volume scale, transactional speed targets, and desired calendar integration outcomes."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full text-sm bg-[#06080A] border border-[#1C232B] text-white rounded-none p-3 focus:border-[#E60026] focus:outline-none resize-none placeholder-slate-600 transition-all font-sans"
                  />
                  <div className="h-1 bg-[#11161B] rounded-none overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-150 ${projectDescription.length > 1800 ? 'bg-[#E60026]' : 'bg-[#E60026]'}`}
                      style={{ width: `${(projectDescription.length / 2000) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Target Budget selector chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-[#E60026]" />
                    Target Project Budget Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['$5,000 - $15,000', '$15,000 - $30,000', '$30,000 - $50,000', '$50,000+'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`py-2.5 px-1 text-center rounded-none text-xs font-semibold border transition-all cursor-pointer ${
                          budget === opt 
                            ? 'bg-[#E60026] text-white border-[#E60026] shadow-md font-mono' 
                            : 'bg-[#06080A] border-[#1C232B] text-slate-400 hover:bg-[#11161B] font-mono'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation calendar booking grid */}
                <div className="space-y-2.5 border-t border-[#1C232B] pt-5">
                  <label className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#E60026]" />
                    Reserve Strategy Consultation Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-[#1C232B] rounded-none p-2.5 bg-[#06080A]">
                    {AVAILABLE_SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex items-center gap-2 px-3 py-2 text-left rounded-none text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#E60026]/15 text-[#E60026] border-[#E60026] font-bold font-mono shadow-sm' 
                              : 'bg-[#0A0D10] text-slate-400 border-[#1C232B] hover:border-[#1C232B]/80 font-mono hover:bg-[#11161B]'
                          }`}
                        >
                          <Clock className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-[#E60026]' : 'text-slate-500'}`} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submission CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-[#E60026] hover:bg-[#C50020] text-white uppercase font-mono tracking-widest text-xs font-bold rounded-none border border-[#E60026] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Synchronizing payload...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Proposal Ledgers</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        ) : (
          /* Intake Success Ticket Panel */
          <motion.div
            key="intake-success-pane"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#0D1115] border border-[#1C232B] rounded-none p-8 shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Top success ring graphic */}
            <div className="mx-auto h-16 w-16 bg-emerald-950/40 rounded-none border border-emerald-900 flex items-center justify-center text-emerald-500 shadow-inner">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono bg-emerald-950/40 text-emerald-500 font-bold px-2.5 py-1 rounded-none uppercase tracking-widest border border-emerald-950">
                STRATEGY LEDGER SECURED
              </span>
              <h3 className="text-2.5xl font-serif text-white tracking-tight">Your Strategy Consult is Locked!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Thank you, {name}. Your intake ledger has been written into Cloud Firestore under the UID transaction handle below.
              </p>
            </div>

            {/* Generated ticket parameters */}
            <div className="bg-[#06080A] border border-[#1C232B] p-5 rounded-none text-left font-mono text-[11px] space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#1C232B] pb-1.5">
                <span className="text-slate-500 font-bold">LEDGER TX_UID</span>
                <span className="text-slate-200 font-bold select-all">{submittedId}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C232B] pb-1.5">
                <span className="text-slate-500 font-bold">EMAIL REGISTRY</span>
                <span className="text-slate-200 font-bold">{email}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C232B] pb-1.5">
                <span className="text-slate-500 font-bold">RESERVED SLOT</span>
                <span className="text-[#E60026] font-bold">{selectedSlot}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 font-bold">CHOSEN TARGET STACK</span>
                <span className="text-slate-200 font-bold truncate max-w-xs">{chosenStack || 'N/A'}</span>
              </div>
            </div>

            {/* Inbound process outlines */}
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              We have dispatched an automated validation ping to your email. The Lead Architect will analyze your configuration parameters and release the Secure Client Portal invite shortly!
            </p>

            {/* Admin view links */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={onGotoAdmin}
                className="text-xs font-bold text-[#E60026] hover:underline font-mono uppercase tracking-wider cursor-pointer"
              >
                Access Admin Dashboard to see your Lead &gt;
              </button>
              <span className="text-slate-700 hidden sm:block">|</span>
              <button
                onClick={() => {
                  setSubmittedId(null);
                  setName('');
                  setEmail('');
                  setChosenStack('');
                  setProjectDescription('');
                  setSelectedSlot('');
                  setSelectedTags([]);
                }}
                className="text-xs font-bold text-slate-400 hover:text-white hover:underline font-mono uppercase tracking-wider cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
