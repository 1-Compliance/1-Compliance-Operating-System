import React from 'react';

interface ShowcasePaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  onNavigateToSubscriptions: () => void;
  onUnlockDemo: () => void;
}

export const ShowcasePaywallModal: React.FC<ShowcasePaywallModalProps> = ({
  isOpen,
  onClose,
  featureName = 'Live Audit Execution',
  onNavigateToSubscriptions,
  onUnlockDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1024] to-slate-900 border-2 border-cyan-500/70 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-xl shadow-inner">
              🔒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Showcase Demo Mode
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Read-Only Example
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Subscription Required to Unlock: {featureName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">You are previewing a sample compliance environment on www.1-compliance.com.</strong> 1-Compliance OS combines <strong className="text-cyan-300">Human Compliance Experts (28+ years Manhattan corporate legal &amp; compliance leadership, Fordham Law MSL)</strong> with our <strong className="text-emerald-300">5 Autonomous Sentinels (Jax, IT, Privacy, Risky, HR)</strong>. Live scanning, automated policy authoring, auditor exports, and custom team workspaces are reserved for active subscribers.
          </div>

          {/* Value Prop Checklist */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              What unlocks upon company subscription:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Human Expert + Autonomous Synergy:</strong> 24/7 autonomous monitoring by Jax &amp; our Sentinels paired with human compliance oversight.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Industry Auto-Conformance:</strong> Conforms specifically to Law Firms, CPAs, Healthcare (HIPAA), FinTech (PCI DSS), SaaS, or Defense.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>1-Click CPA Auditor ZIP Package:</strong> Export tamper-proof SHA-256 evidence binders ready for AICPA/ISO auditors.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Company-Wide User Pool:</strong> All approved employees join via corporate email whitelist (@yourcompany.com).</span>
              </div>
            </div>
          </div>

          {/* Quick Subscription Tier Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Instant Checkout via Square (Activates Immediately):
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Starter / Vendor */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/60 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Starter &amp; Scanner</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Website Scanner &amp; Vendor Passport</div>
                  <div className="text-2xl font-black font-mono text-cyan-400 my-2">$49<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  <p className="text-[11px] text-slate-400">Continuous website compliance scanning, cookies, headers &amp; verified trust badge.</p>
                </div>
                <a
                  href="https://square.link/u/rrwYFGu9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold transition-all text-xs text-center block"
                >
                  Subscribe $49/mo ↗
                </a>
              </div>

              {/* Professional / Team */}
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/50 flex flex-col justify-between hover:border-indigo-400 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Professional / Team</div>
                  <div className="text-indigo-300 text-[11px] mt-0.5">Full OS + 5 Sentinels</div>
                  <div className="text-2xl font-black font-mono text-indigo-400 my-2">$199<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  <p className="text-[11px] text-slate-400">Complete autonomous compliance OS, policy customizer &amp; multi-user workspace.</p>
                </div>
                <a
                  href="https://square.link/u/GvqwdSHx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all text-xs shadow-md text-center block"
                >
                  Subscribe $199/mo ↗
                </a>
              </div>

              {/* Enterprise */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border-2 border-cyan-400 flex flex-col justify-between relative shadow-lg">
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[9px] font-mono font-black bg-cyan-400 text-slate-950">
                  POPULAR
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Enterprise Scale</div>
                  <div className="text-cyan-300 text-[11px] mt-0.5">Company-Wide + Expert Concierge</div>
                  <div className="text-2xl font-black font-mono text-white my-2">$499<span className="text-xs text-slate-400 font-normal">+/mo</span></div>
                  <p className="text-[11px] text-slate-300">Full enterprise access, 1-click CPA auditor binders &amp; human compliance expert review.</p>
                </div>
                <a
                  href="https://square.link/u/bGLuAsoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black transition-all text-xs shadow-md text-center block"
                >
                  Subscribe $499/mo ↗
                </a>
              </div>
            </div>
          </div>

          {/* Footer Navigation to Full Plans */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 text-center sm:text-left">
              Need 100+ enterprise seats, cohort calculators, or white-label branding?
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToSubscriptions();
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs hover:opacity-95 transition-all shadow-sm cursor-pointer"
              >
                Compare All Plans &amp; Enterprise Cohorts →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
