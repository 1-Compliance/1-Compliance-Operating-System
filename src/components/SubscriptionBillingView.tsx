import React, { useState } from 'react';
import { SENTINELS } from '../data/sentinelsData';
import { CompanyBrandingConfig } from '../types/compliance';

interface SubscriptionBillingViewProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  onNavigateTab: (tab: string) => void;
  branding?: CompanyBrandingConfig;
  onUpdateBranding?: (branding: CompanyBrandingConfig) => void;
}

export interface PricingPlan {
  id: 'solo' | 'team' | 'enterprise_scale' | 'vendor_passport';
  name: string;
  badge: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  userLimit: string;
  highlighted?: boolean;
  features: string[];
  omittedFeatures?: string[];
  sentinelsIncluded: string[];
  idealFor: string;
  stripePriceIdMonthly: string;
  stripePriceIdAnnual: string;
  squareCheckoutUrl: string;
}

export interface EnterpriseMember {
  id: string;
  name: string;
  email: string;
  department: 'Factory & Operations' | 'HR & People' | 'IT & DevOps' | 'Finance & Legal' | 'Executive';
  role: 'Admin' | 'Compliance Officer' | 'Department Manager' | 'Staff / Operator' | 'External Auditor';
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

const INITIAL_ENTERPRISE_MEMBERS: EnterpriseMember[] = [
  {
    id: 'usr-01',
    name: 'Sarah Chen',
    email: 'sarah.chen@1-compliance.com',
    department: 'IT & DevOps',
    role: 'Admin',
    status: 'Active',
    lastActive: '10 mins ago',
  },
  {
    id: 'usr-02',
    name: 'Marcus Vance',
    email: 'marcus.v@1-compliance.com',
    department: 'Factory & Operations',
    role: 'Department Manager',
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: 'usr-03',
    name: 'Jessica Reynolds',
    email: 'jessica.r@1-compliance.com',
    department: 'HR & People',
    role: 'Compliance Officer',
    status: 'Active',
    lastActive: '3 hours ago',
  },
  {
    id: 'usr-04',
    name: 'David Zhao',
    email: 'david.z@1-compliance.com',
    department: 'Finance & Legal',
    role: 'Staff / Operator',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    id: 'usr-05',
    name: 'Robert Miller (BDO / Schellman CPA)',
    email: 'rmiller@auditfirm.com',
    department: 'Executive',
    role: 'External Auditor',
    status: 'Active',
    lastActive: '2 days ago',
  },
];

const PLANS: PricingPlan[] = [
  {
    id: 'solo',
    name: 'Solo / Founder Plan',
    badge: '1 User · Single Login',
    tagline: 'Complete compliance operating system combining Human Compliance Expert methodologies with all 5 Autonomous Sentinels for solo founders and CISOs.',
    monthlyPrice: 149,
    annualMonthlyPrice: 124, // $1,490/yr (2 months free)
    userLimit: '1 Company User (1 Login)',
    idealFor: 'Solo founders, technical leads, single compliance officers',
    stripePriceIdMonthly: 'price_solo_monthly_149',
    stripePriceIdAnnual: 'price_solo_annual_124',
    squareCheckoutUrl: 'https://square.link/u/GvqwdSHx',
    sentinelsIncluded: ['Jax (Chief Sentinel) + All 4 Domain Sentinels'],
    features: [
      '1 Dedicated Workspace Administrator Seat',
      'Human-Expert-Designed Frameworks + All 5 Autonomous Sentinels',
      'Production Website Security Scanner (TLS, HSTS, CSP, Headers)',
      '12 Master Policies with Instant Customizer',
      'SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4 Readiness',
      'Continuous Automated Infrastructure Blueprints (Trivy, Prowler, Gitleaks)',
      '1-Click Auditor-Ready ZIP Binder & Evidence Package Export',
      'Unlimited Included Guest Vendor Vetting Portals for Third-Party Suppliers',
    ],
    omittedFeatures: [
      'Multi-user team logins & role delegation',
      'Department-specific access scoping (Factory, HR, IT)',
      'Company-wide gamified training leaderboards',
      'Enterprise SSO & directory sync',
    ],
  },
  {
    id: 'team',
    name: 'Team Compliance Plan',
    badge: 'Up to 5 Logins',
    tagline: 'Collaborative compliance governance pairing Human Compliance Experts with autonomous Sentinels across growing teams.',
    monthlyPrice: 299,
    annualMonthlyPrice: 249, // $2,990/yr (2 months free)
    userLimit: 'Up to 5 Company Users (5 Logins)',
    idealFor: 'Startups with 2 to 5 team members needing collaborative workflows',
    stripePriceIdMonthly: 'price_team_monthly_299',
    stripePriceIdAnnual: 'price_team_annual_249',
    squareCheckoutUrl: 'https://square.link/u/GvqwdSHx',
    sentinelsIncluded: ['All 5 Sentinels with Shared Team Memory'],
    features: [
      'Up to 5 Dedicated Company Logins with Role-Based Access (RBAC)',
      'Everything in Solo / Founder Plan',
      'Cross-Department Hub (Factory Floor, HR, IT, Finance) with Plain-English views',
      'Role-based task delegation (Admin, Compliance Officer, Reviewer)',
      'Automated background continuous evidence collection probes',
      'Real-time Slack, Discord, and email webhook alerts',
      'Evidence tamper-proof SHA-256 cryptographic chain of custody',
      'Unlimited Free Guest Vendor Vetting Links with Auto-Scoring',
    ],
    omittedFeatures: [
      '6+ company logins across larger enterprise workforce',
      'SAML 2.0 / Okta / Azure AD Enterprise SSO integration',
      'Multi-department training quests with custom leaderboard',
    ],
  },
  {
    id: 'enterprise_scale',
    name: 'Enterprise Scale Plan',
    badge: '6 to 100 Users · Most Popular',
    tagline: 'Comprehensive company-wide compliance access with Dedicated Human Compliance Expert Concierge alongside all 5 Autonomous Sentinels.',
    monthlyPrice: 999,
    annualMonthlyPrice: 832, // $9,990/yr (2 months free)
    userLimit: '6 to 100 Company Users (All Employees)',
    highlighted: true,
    idealFor: 'Mid-Market & Scaleups (6 to 100 employees across all departments)',
    stripePriceIdMonthly: 'price_ent_monthly_999',
    stripePriceIdAnnual: 'price_ent_annual_832',
    squareCheckoutUrl: 'https://square.link/u/bGLuAsoa',
    sentinelsIncluded: ['All 5 Sentinels + Dedicated Human Compliance Expert Concierge'],
    features: [
      'Full Company-Wide Access for 6 to 100 Employees',
      'Dedicated Human Compliance Expert Concierge & Pre-Audit Gap Review',
      'Everything in Team Compliance Plan',
      'Departmental Access across Factory, HR, IT, Finance, Operations, Legal',
      'SAML 2.0 / Okta / Azure AD / Google Workspace SSO & Directory Sync',
      'Full Gamified Training Arcade with team quests & department leaderboards',
      'Automated Third-Party Vendor Risk Management (TPCRM)',
      'Unlimited Free Vendor Vetting Portals with instant scoring',
      'All 28 Enterprise Compliance Categories (ITAM, MiCA, RACI)',
      'Custom Multi-Framework Cross-Mapping (CMMC, FedRAMP, EU AI Act)',
      'Auditor Collaboration Access (Read-Only CPA seat included)',
    ],
  },
  {
    id: 'vendor_passport',
    name: 'Starter Scanner & Vendor Passport',
    badge: 'Website Scanner & Vendor Tier',
    tagline: 'Continuous website compliance scanning (GDPR, CCPA, ADA, Security Headers) plus pre-vetted Vendor Trust Passport.',
    monthlyPrice: 49,
    annualMonthlyPrice: 41, // $499/yr
    userLimit: 'Website & Vendor Security Team',
    idealFor: 'Businesses needing continuous website compliance scanning & third-party vendor verification',
    stripePriceIdMonthly: 'price_vendor_monthly_49',
    stripePriceIdAnnual: 'price_vendor_annual_41',
    squareCheckoutUrl: 'https://square.link/u/rrwYFGu9',
    sentinelsIncluded: ['Risky Sentinel + Jax Vendor Trust Guard'],
    features: [
      'Continuous Website Compliance & Vulnerability Scanning (TLS, HSTS, CSP, Cookies)',
      'Digital Verified Trust Badge & Continuous Posture Monitoring',
      'Fill out security credentials once, accepted by all enterprise clients',
      'Automatic distribution of verified SOC 2, ISO 27001 & Cyber Insurance',
      'Listing in the 1-Compliance Pre-Approved Vendor Directory',
      'Eliminate repetitive 100-question security spreadsheets forever',
    ],
  },
];

export const SubscriptionBillingView: React.FC<SubscriptionBillingViewProps> = ({
  onOpenSentinelHub,
  onNavigateTab,
  branding,
  onUpdateBranding,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [teamSize, setTeamSize] = useState<number>(35);
  const [activeSubTab, setActiveSubTab] = useState<
    | 'plans'
    | 'square_portal'
    | 'company_org'
    | 'white_label'
    | 'cohort'
    | 'enterprise_team'
    | 'roi'
    | 'portal'
  >('plans');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Square Payment Portal (+100 Users) Calculator State
  const [squareUsers, setSquareUsers] = useState<number>(120);
  const [squareCycle, setSquareCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isSquareModalOpen, setIsSquareModalOpen] = useState<boolean>(false);
  const [squarePaymentMethod, setSquarePaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cash_app'>('card');
  const [squareSuccess, setSquareSuccess] = useState<boolean>(false);
  const [squareTxId, setSquareTxId] = useState<string>('');

  // White-Label Customization State
  const [customBrand, setCustomBrand] = useState<CompanyBrandingConfig>(
    branding || {
      companyName: '1-Compliance',
      portalSubtitle: 'Enterprise Compliance Operating System',
      primaryColor: '#06b6d4',
      accentColor: '#3b82f6',
      themePreset: 'corporate_blue',
      welcomeMessage: 'Welcome to 1-Compliance Operating System',
      allowedEmailDomains: ['1-compliance.com'],
      isWhiteLabelActive: false,
      corporateDomain: 'app.1-compliance.com',
    }
  );
  const [brandSavedNotice, setBrandSavedNotice] = useState<boolean>(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  // Checkout modal simulator
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'payment' | 'success'>('review');
  const [couponCode, setCouponCode] = useState<string>('ENTERPRISE2026');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [customerEmail, setCustomerEmail] = useState<string>('admin@1-compliance.com');
  const [companyName, setCompanyName] = useState<string>('1-Compliance');

  // Enterprise Member Provisioning State
  const [members, setMembers] = useState<EnterpriseMember[]>(INITIAL_ENTERPRISE_MEMBERS);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberDept, setNewMemberDept] = useState<'Factory & Operations' | 'HR & People' | 'IT & DevOps' | 'Finance & Legal' | 'Executive'>('Factory & Operations');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Compliance Officer' | 'Department Manager' | 'Staff / Operator' | 'External Auditor'>('Department Manager');

  // Active Simulated Subscription
  const [currentSubscription, setCurrentSubscription] = useState<{
    plan: string;
    status: 'active' | 'trial';
    renewalDate: string;
    seatsUsed: number;
    seatsTotal: number;
    monthlyCost: number;
  }>({
    plan: 'Enterprise Scale Plan (6 to 100 Users)',
    status: 'active',
    renewalDate: 'Nov 15, 2027',
    seatsUsed: 35,
    seatsTotal: 100,
    monthlyCost: 832,
  });

  // Mega Enterprise User Formula:
  // 1 user = $149/mo ($124/mo annual)
  // 2-5 users = $299/mo ($249/mo annual)
  // 6-100 users = $999/mo ($832/mo annual)
  // 101+ users = $999 for each additional 100-user block
  // (e.g. 120 users = 2 blocks = $999 + $999 = $1,998/mo, 201 users = 3 blocks = $2,997/mo)
  const calculateCustomerMonthlyCost = (headcount: number, cycle: 'monthly' | 'annual') => {
    if (headcount <= 1) {
      return cycle === 'annual' ? 124 : 149;
    }
    if (headcount <= 5) {
      return cycle === 'annual' ? 249 : 299;
    }
    // 6+ users: Base 100 cohort = $999/mo ($832/mo annual).
    // For every additional 100 users, add another cohort block!
    const cohorts = Math.ceil(headcount / 100);
    const unitPrice = cycle === 'annual' ? 832 : 999;
    return cohorts * unitPrice;
  };

  const calculatedMonthly = calculateCustomerMonthlyCost(teamSize, billingCycle);
  const calculatedAnnual = calculatedMonthly * 12;

  // Competitor Pricing comparison for ROI calculator
  // Traditional GRC tools (Vanta, Drata) charge base fee + per employee cost
  const vantaEstimatedAnnual = Math.round(18000 + teamSize * 150);
  const drataEstimatedAnnual = Math.round(22000 + teamSize * 180);
  const netAnnualSavings = Math.max(0, vantaEstimatedAnnual - calculatedAnnual);

  const handleStartCheckout = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setCheckoutStep('review');
    setIsCheckoutOpen(true);
  };

  const handleCompletePayment = () => {
    if (!selectedPlan) return;
    const isEnterprise = selectedPlan.id === 'enterprise_scale';
    const isTeam = selectedPlan.id === 'team';
    const totalSeats = isEnterprise ? (teamSize > 100 ? Math.ceil(teamSize / 100) * 100 : 100) : isTeam ? 5 : 1;

    setCurrentSubscription({
      plan: `${selectedPlan.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
      status: 'active',
      renewalDate: billingCycle === 'annual' ? 'October 28, 2027' : 'November 28, 2026',
      seatsUsed: Math.min(members.length, totalSeats),
      seatsTotal: totalSeats,
      monthlyCost: billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice : selectedPlan.monthlyPrice,
    });
    setCheckoutStep('success');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    const newM: EnterpriseMember = {
      id: `usr-${Date.now()}`,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      department: newMemberDept,
      role: newMemberRole,
      status: 'Active',
      lastActive: 'Just now',
    };

    setMembers([newM, ...members]);
    setNewMemberName('');
    setNewMemberEmail('');
  };

  return (
    <div className="space-y-10">
      {/* Visual Header Banner with Jax & Squad */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">1-COMPLIANCE OS · HUMAN EXPERTS + AUTONOMOUS SENTINELS</span>
              <span aria-hidden="true">·</span>
              <span>Predictable Flat-Rate Pricing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Compliance Subscriptions Built by Human Legal &amp; Compliance Experts Alongside Autonomous Sentinels
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Backed by <strong>28+ years of Manhattan corporate legal &amp; compliance experience (Fordham Law MSL)</strong> paired with <strong>Jax and our 4 Domain Sentinels</strong>. From continuous Website Compliance Scanning &amp; Vendor Passports at <strong>$49/mo</strong> to Full OS plans (<strong>$149–$199 Solo/Pro, $299 Team, $499–$999 Enterprise</strong>). No per-seat penalties or hidden consulting fees.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>$49 Scanner/Vendor · $149–$199 Solo/Pro · $299 Team · $499–$999 Enterprise</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Instant Checkout via Square</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Seat Guest Vendor Portals</span>
            </div>
          </div>

          {/* Sentinel Mascots Lineup Card */}
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/95 border-2 border-indigo-200/90 shadow-md shrink-0 self-start lg:self-auto">
            {SENTINELS.map((sentinel) => (
              <div
                key={sentinel.id}
                onClick={() => onOpenSentinelHub(sentinel.id)}
                className="w-12 h-16 rounded-xl p-1 hover:scale-110 transition-all cursor-pointer flex flex-col items-center justify-between group"
                title={`${sentinel.name} (${sentinel.title})`}
              >
                <div className="relative h-11 w-full flex items-center justify-center">
                  <div className="absolute bottom-0 w-8 h-2 rounded-[100%] bg-cyan-400/30 blur-xs pointer-events-none group-hover:scale-125" />
                  <img
                    src={sentinel.image}
                    alt={sentinel.name}
                    className="h-full object-contain filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.4)] group-hover:scale-115 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-mono font-black text-indigo-900 group-hover:text-cyan-600">
                  {sentinel.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('plans')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'plans'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Subscription Plans ($49 – $999)
          </button>
          <button
            onClick={() => setActiveSubTab('square_portal')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'square_portal'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🟩 Square Payment Portal (+100 Users)</span>
            <span className="text-[10px] font-mono px-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
              Auto-Tally
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('company_org')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'company_org'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-black shadow-sm'
                : 'text-indigo-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🏢 Company-Wide Approved Users</span>
            <span className="text-[10px] font-mono px-1 rounded bg-indigo-950 text-cyan-300 border border-indigo-700">
              Single Subscription
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('white_label')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'white_label'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🎨 White-Label Company Theme</span>
            <span className="text-[10px] font-mono px-1 rounded bg-purple-950 text-pink-300 border border-purple-700">
              Custom Brand
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('cohort')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'cohort'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>Enterprise Cohort Calculator</span>
            <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-cyan-300">
              100+ Users
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('enterprise_team')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'enterprise_team'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>Company-Wide Team Access ({members.length})</span>
            <span className="text-[10px] font-mono px-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
              RBAC
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('roi')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'roi'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            ROI vs Vanta/Drata
          </button>
          <button
            onClick={() => setActiveSubTab('portal')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'portal'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Billing &amp; Invoices Portal
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SUBSCRIPTION PLANS & PRICING */}
      {/* ========================================================================= */}
      {activeSubTab === 'plans' && (
        <div className="space-y-8">
          {/* Instant Square Direct Checkout Bar */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border-2 border-emerald-500/60 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-black text-emerald-300 uppercase tracking-wider">
                  Instant Live Checkout via Square · Immediate Workspace Activation
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Activate your 1-Compliance OS or Continuous Website Scanner subscription immediately via Square secure checkout (Card, Apple Pay, Google Pay, Cash App):
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="https://square.link/u/rrwYFGu9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/50 transition-all shadow-sm"
              >
                Starter &amp; Scanner ($49/mo) ↗
              </a>
              <a
                href="https://square.link/u/GvqwdSHx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs transition-all shadow-sm"
              >
                Professional / Team ($199/mo) ↗
              </a>
              <a
                href="https://square.link/u/bGLuAsoa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 text-slate-950 font-mono font-black text-xs transition-all shadow-md"
              >
                Enterprise Scale ($499+/mo) ↗
              </a>
            </div>
          </div>

          {/* Billing Interval Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-semibold text-white">Choose Subscription Billing Term</div>
              <div className="text-xs text-slate-400">
                Annual billing includes 2 months free and locks in your enterprise rate.
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-cyan-400 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Save ~17% (2 Mo Free)
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid (4 Cards: Solo $149, Team $299, Enterprise $999, Vendor Passport $49) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => {
              const displayPrice = billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 rounded-xl border transition-all ${
                    plan.highlighted
                      ? 'bg-slate-900/90 border-cyan-500/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider text-slate-950 bg-cyan-400 shadow-sm">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                      {!plan.highlighted && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {plan.userLimit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 min-h-[40px] leading-relaxed">
                      {plan.tagline}
                    </p>

                    {/* Price Display */}
                    <div className="mt-4 pb-4 border-b border-slate-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                          ${displayPrice}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          / month
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        {billingCycle === 'annual'
                          ? `Billed annually at $${displayPrice * 12}/yr`
                          : 'Billed monthly · Cancel anytime'}
                      </div>
                      <div className="text-[11px] text-cyan-400/90 mt-2 font-mono">
                        {plan.idealFor}
                      </div>
                    </div>

                    {/* Sentinels Included */}
                    <div className="my-3 py-2 px-3 rounded bg-slate-950/70 border border-slate-800/80">
                      <div className="text-[10px] font-bold text-slate-300 mb-0.5 font-mono">
                        Sentinels Active:
                      </div>
                      <div className="text-xs text-cyan-300 font-mono space-y-0.5">
                        {plan.sentinelsIncluded.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 mt-3">
                      <div className="text-xs font-semibold text-slate-300">Features included:</div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.omittedFeatures && (
                        <div className="pt-2 border-t border-slate-800/60 mt-2 space-y-1">
                          {plan.omittedFeatures.map((omit, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-500 line-through">
                              <span className="text-slate-600 font-bold shrink-0">✕</span>
                              <span>{omit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                    <a
                      href={plan.squareCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                        plan.highlighted
                          ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                          : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700'
                      }`}
                    >
                      <span>Subscribe via Square (${displayPrice}/mo)</span>
                      <span>↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleStartCheckout(plan)}
                      className="w-full py-1.5 rounded-lg text-[11px] font-mono text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                    >
                      Review Plan &amp; Configure Organization
                    </button>
                    <div className="text-[10px] text-center text-slate-500">
                      Instant activation via Square · Cancel anytime
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mega Enterprise Cohort Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-400 text-slate-950">
                  101+ COMPANY USERS
                </span>
                <h3 className="text-base font-bold text-white">
                  Mega Enterprise Cohort Structure ($999 for every additional 100 users)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For organizations with more than 100 users, billing is simply <strong>$999/month for each additional group of 100 users</strong>.
                If your company has 120 users, you pay $999 + $999 = <strong>$1,998/month</strong>. 
                If you have 201 users, you pay $999 + $999 + $999 = <strong>$2,997/month</strong>. 
                Full company-wide access is provided across all departments with zero per-seat friction.
              </p>
            </div>

            <button
              onClick={() => setActiveSubTab('cohort')}
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-lg"
            >
              Launch Cohort Calculator →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB A: SQUARE PAYMENT PORTAL (+100 USERS AUTO-TALLY)              */}
      {/* ========================================================================= */}
      {activeSubTab === 'square_portal' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  Square Enterprise Auto-Tally Portal (+100 Users)
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                Formula: Math.ceil(Users / 100) × $999/mo
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dynamic Square Payment Portal for 100+ Enterprise Users
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              When an enterprise registers for 1-Compliance OS and specifies their headcount, Square automatically tallies 
              up their total monthly fee. The pricing scales in simple, predictable <strong className="text-emerald-300">100-user cohorts of $999/month</strong>. 
              A company with <strong>120 users</strong> automatically tallies to <strong>$1,998/month</strong> (2 cohorts). 
              A company with <strong>201 users</strong> automatically tallies to <strong>$2,997/month</strong> (3 cohorts). 
              The entire company receives access under a single corporate subscription.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Square Subscriptions API (`/v2/subscriptions`)</span>
              </div>
              <span>·</span>
              <span>Square Web Payments SDK (Cards, Apple Pay, Google Pay, Cash App)</span>
              <span>·</span>
              <span>Instant Organization Provisioning</span>
            </div>
          </div>

          {/* Interactive Calculator & Live Square Checkout Simulator */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🧮</span>
                  <span>Interactive Headcount & Square Total Fee Calculator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust company user count to watch Square dynamically calculate monthly and annual billing amounts.
                </p>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setSquareCycle('monthly')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    squareCycle === 'monthly'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly ($999/cohort)
                </button>
                <button
                  type="button"
                  onClick={() => setSquareCycle('annual')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    squareCycle === 'annual'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Annual ($832/mo)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    2 Mo Free
                  </span>
                </button>
              </div>
            </div>

            {/* Slider & Quick Presets */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">Target Company User Headcount</div>
                  <div className="text-xs text-slate-400">Total number of employees, managers, and staff to be registered:</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="3000"
                      value={squareUsers}
                      onChange={(e) => setSquareUsers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 px-3 py-1.5 text-lg font-mono font-extrabold text-emerald-400 bg-slate-900 border border-emerald-700/70 rounded-lg text-center focus:outline-none focus:border-emerald-400"
                    />
                    <span className="text-sm font-mono text-slate-300 font-bold">Users</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSquareUsers(Math.max(1, squareUsers - 10))}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setSquareUsers(squareUsers + 10)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={squareUsers}
                onChange={(e) => setSquareUsers(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Quick Tests:</span>
                {[
                  { label: '1 User (Solo)', count: 1 },
                  { label: '5 Users (Team)', count: 5 },
                  { label: '45 Users (1 Cohort)', count: 45 },
                  { label: '100 Users (1 Cohort)', count: 100 },
                  { label: '120 Users (2 Cohorts)', count: 120 },
                  { label: '201 Users (3 Cohorts)', count: 201 },
                  { label: '350 Users (4 Cohorts)', count: 350 },
                  { label: '500 Users (5 Cohorts)', count: 500 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    onClick={() => setSquareUsers(preset.count)}
                    className={`px-2.5 py-1 rounded-md font-mono transition-colors text-[11px] ${
                      squareUsers === preset.count
                        ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Square Auto-Tally Result Cards */}
            {(() => {
              const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
              const unitPrice = squareCycle === 'annual' ? 832 : 999;
              let calculatedMonthlyCost = 0;
              let planTierName = '';

              if (squareUsers <= 1) {
                calculatedMonthlyCost = squareCycle === 'annual' ? 124 : 149;
                planTierName = 'Solo / Founder Tier';
              } else if (squareUsers <= 5) {
                calculatedMonthlyCost = squareCycle === 'annual' ? 249 : 299;
                planTierName = 'Team Tier (Up to 5 Users)';
              } else {
                calculatedMonthlyCost = cohorts * unitPrice;
                planTierName = `Enterprise Scale (${cohorts} × 100-User Cohort${cohorts > 1 ? 's' : ''})`;
              }

              const totalDueToday = squareCycle === 'annual' ? calculatedMonthlyCost * 12 : calculatedMonthlyCost;
              const totalSeatsCapacity = squareUsers <= 1 ? 1 : squareUsers <= 5 ? 5 : cohorts * 100;
              const seatsBuffer = Math.max(0, totalSeatsCapacity - squareUsers);
              const perUserEffective = (calculatedMonthlyCost / squareUsers).toFixed(2);

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Card 1: Cohort Count */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Square Billing Cohorts</div>
                      <div className="text-2xl font-mono font-bold text-white">
                        {squareUsers <= 5 ? 'Single Plan' : `${cohorts} Cohort Blocks`}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono">
                        {squareUsers <= 5 ? `${squareUsers} seats max` : `${cohorts} × 100-user capacity`}
                      </div>
                    </div>

                    {/* Card 2: Square Total Fee Auto-Tally */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border-2 border-emerald-500 space-y-1.5 shadow-lg">
                      <div className="text-[11px] font-mono text-emerald-300 uppercase font-black">Square Auto-Tallied Fee</div>
                      <div className="text-3xl font-mono font-black text-white">
                        ${calculatedMonthlyCost.toLocaleString()}
                        <span className="text-xs text-emerald-300 font-normal"> / mo</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {squareCycle === 'annual'
                          ? `Billed annually at $${totalDueToday.toLocaleString()}/yr`
                          : 'Billed monthly to company card'}
                      </div>
                    </div>

                    {/* Card 3: Enterprise Seats Capacity */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Pooled Seat Capacity</div>
                      <div className="text-2xl font-mono font-bold text-cyan-300">
                        {totalSeatsCapacity} Total Seats
                      </div>
                      <div className="text-xs text-slate-400">
                        <strong className="text-emerald-400 font-mono">{seatsBuffer} seats</strong> ready for future hires
                      </div>
                    </div>

                    {/* Card 4: Effective Cost per User */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Effective Cost / User</div>
                      <div className="text-2xl font-mono font-bold text-white">
                        ${perUserEffective}
                        <span className="text-xs text-slate-400 font-normal"> / user / mo</span>
                      </div>
                      <div className="text-xs text-emerald-400">
                        Vs. $150.00/user on legacy Vanta
                      </div>
                    </div>
                  </div>

                  {/* Formula Breakdown Callout */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        SQUARE LINE ITEM BREAKDOWN FOR {squareUsers} USERS:
                      </div>
                      <div className="text-xs text-slate-300 font-mono">
                        {squareUsers <= 1 && 'Plan: Solo Tier @ $149/mo (Qty: 1)'}
                        {squareUsers > 1 && squareUsers <= 5 && 'Plan: Team Tier @ $299/mo (Qty: 1)'}
                        {squareUsers > 5 && (
                          <span>
                            Quantity in Square = <strong>{cohorts}</strong> × Enterprise 100-User Plan (@ ${unitPrice}/mo) = <strong className="text-emerald-300">${calculatedMonthlyCost.toLocaleString()}/mo</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <a
                        href={
                          squareUsers <= 1
                            ? 'https://square.link/u/GvqwdSHx'
                            : squareUsers <= 5
                            ? 'https://square.link/u/GvqwdSHx'
                            : 'https://square.link/u/bGLuAsoa'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                      >
                        <span>💳</span>
                        <span>Proceed to Square Checkout (${calculatedMonthlyCost.toLocaleString()}/mo) ↗</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSquareSuccess(false);
                          setIsSquareModalOpen(true);
                        }}
                        className="px-4 py-3 rounded-xl text-xs font-bold text-emerald-300 bg-slate-900 hover:bg-slate-800 border border-emerald-700/60 transition-all cursor-pointer"
                      >
                        Configure Corporate Domain &amp; Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB B: COMPANY-WIDE APPROVED USERS ARCHITECTURE                    */}
      {/* ========================================================================= */}
      {activeSubTab === 'company_org' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Company-Wide User-Approved Platform
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-indigo-400/20 text-indigo-300 border border-indigo-400/40">
                Single Subscription · Pooled Seats
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Company Subscription · All Approved Employees Included
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Rather than forcing each employee to create their own billing account or enter a credit card, 
              1-Compliance OS registers the subscription at the <strong className="text-white">Organization Level</strong>. 
              The company pays once (via Square or Stripe). Then, all approved employees, managers, factory operators, and 
              auditors receive instant authorized access through corporate domain auto-approval, SSO, or a pooled seat invite link.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-indigo-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Individual User Fees (Single Corporate Billing)</span>
              </div>
              <span>·</span>
              <span>Domain Whitelist Auto-Approval (`@1-compliance.com`)</span>
              <span>·</span>
              <span>Centralized Audit Chain of Custody</span>
            </div>
          </div>

          {/* Architecture Comparison: Individual Accounts vs Single Enterprise Subscription */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Wrong Way (Individual Accounts) */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-red-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                  ✕ The Broken Way (Individual Accounts)
                </span>
                <span className="text-xs text-slate-500 font-mono">Disjointed Chaos</span>
              </div>
              <h3 className="text-base font-bold text-white">Each Employee Signs Up Separately</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Every user is prompted to enter an individual credit card or billing profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Compliance evidence is fragmented across dozens of separate, unlinked databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Auditors cannot see a unified single company posture or complete chain of custody.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Finance team receives 100 different monthly expense reports to reimburse.</span>
                </li>
              </ul>
            </div>

            {/* The Right Way (1-Compliance Company-Approved Model) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border-2 border-cyan-500/80 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                  ✓ 1-Compliance Company-Wide Model
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">Unified Enterprise</span>
              </div>
              <h3 className="text-base font-bold text-white">Single Company Billing · Centralized Governance</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>1 Corporate Invoice in Square:</strong> The company pays once per month/year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Domain Auto-Approval:</strong> Anyone with <code>@company.com</code> logs in free of friction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Role Delegation:</strong> Assign roles (Factory Manager, IT Admin, HR, Read-Only Auditor).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Unified Evidence Vault:</strong> All employee policy attestations roll into one master audit binder.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Live Interactive Corporate Console Demo */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏢</span>
                  <span>Company Organization Management Console</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your company's master subscription, approved domain whitelist, and pooled seats.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300 font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  {members.length} / {currentSubscription.seatsTotal} Seats Allocated
                </span>
              </div>
            </div>

            {/* Master Organization Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Subscribed Organization</div>
                <div className="text-base font-bold text-white mt-1">
                  {customBrand.companyName || '1-Compliance'}
                </div>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">Tax ID: 84-2910481</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Billing Contact</div>
                <div className="text-base font-bold text-white mt-1">billing@1-compliance.com</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">Master Square Subscription Active</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Seat Pool Capacity</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-1">
                  {currentSubscription.seatsTotal} Total Capacity
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">
                  {currentSubscription.seatsTotal - members.length} available for employees
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => {
                    // Bulk import demo: Add 3 simulated employees to the roster
                    const bulkNew: EnterpriseMember[] = [
                      { id: `usr-${Date.now()}-1`, name: 'Elena Rostova', email: 'elena.r@1-compliance.com', department: 'Factory & Operations', role: 'Department Manager', status: 'Active', lastActive: 'Just now' },
                      { id: `usr-${Date.now()}-2`, name: 'Liam O\'Connor', email: 'liam.o@1-compliance.com', department: 'IT & DevOps', role: 'Staff / Operator', status: 'Active', lastActive: 'Just now' },
                      { id: `usr-${Date.now()}-3`, name: 'Priya Sharma', email: 'priya.s@1-compliance.com', department: 'HR & People', role: 'Compliance Officer', status: 'Active', lastActive: 'Just now' },
                    ];
                    setMembers([...bulkNew, ...members]);
                    alert('✓ Demo Bulk Import: Added 3 new verified employees to the company pool!');
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors text-center cursor-pointer shadow-sm"
                >
                  📥 Demo Bulk Import 3 Employees
                </button>
              </div>
            </div>

            {/* Domain Whitelist & Corporate Auto-Join Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Domain Auto-Approval Whitelist */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Auto-Approved Corporate Email Domains</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Auto-Join ON
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Any employee signing up with these email domain endings will be automatically added to this organization's subscription:
                </p>
                <div className="flex flex-wrap gap-2">
                  {customBrand.allowedEmailDomains.map((dom, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-cyan-300 flex items-center gap-1.5"
                    >
                      <span>@{dom}</span>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      const newDom = prompt('Enter additional corporate email domain (e.g. yourcompany.com):');
                      if (newDom && newDom.trim()) {
                        const updated = {
                          ...customBrand,
                          allowedEmailDomains: [...customBrand.allowedEmailDomains, newDom.replace('@', '').trim()],
                        };
                        setCustomBrand(updated);
                        if (onUpdateBranding) onUpdateBranding(updated);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    + Add Domain
                  </button>
                </div>
              </div>

              {/* Corporate Magic Invite URL */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Corporate Employee Invite Link</span>
                  <button
                    onClick={() =>
                      handleCopyText('https://app.1-compliance.com/join/corp-org-9821', 'invite_link')
                    }
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    {copiedSnippet === 'invite_link' ? '✓ Copied URL!' : '📋 Copy Invite URL'}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Share this secure corporate link in your company Slack or intranet. Employees click once to join the approved pool:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 truncate">
                  https://app.1-compliance.com/join/corp-org-9821
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB C: WHITE-LABEL COMPANY THEME & BRANDING CUSTOMIZER             */}
      {/* ========================================================================= */}
      {activeSubTab === 'white_label' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 border-2 border-purple-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider">
                  Company Custom Theme & White-Label Design Engine
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-purple-400/20 text-purple-300 border border-purple-400/40">
                100% Brand Customization
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Transform 1-Compliance OS Into Your Company's Internal Program
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Make the platform look and feel like an internal software system built specifically by and for your company. 
              Subscribers can customize the <strong className="text-white">company logo</strong>, <strong className="text-white">brand colors</strong>, 
              <strong className="text-white">custom welcome banner</strong>, and host it under their own corporate subdomain 
              (e.g., <code className="text-pink-300">compliance.yourcompany.com</code>).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-purple-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>Custom Primary & Accent Brand Colors</span>
              </div>
              <span>·</span>
              <span>Company Logo & Internal Portal Header</span>
              <span>·</span>
              <span>Subdomain CNAME Whitelabeling</span>
            </div>
          </div>

          {/* Theme Saved Toast Notice */}
          {brandSavedNotice && (
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="text-base">✓</span>
                <span>
                  <strong>Success:</strong> White-label branding applied to the entire platform! Look at the top navigation and headers above.
                </span>
              </div>
              <button
                onClick={() => setBrandSavedNotice(false)}
                className="text-emerald-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* White-Label Customization Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Form Controls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎨</span>
                <span>Brand Identity & Color Settings</span>
              </h3>

              {/* Preset Palette Chooser */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Quick Brand Color Presets:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'corporate_blue', name: 'Corporate Blue', primary: '#1d4ed8', accent: '#06b6d4' },
                    { id: 'healthtech_emerald', name: 'HealthTech Emerald', primary: '#059669', accent: '#10b981' },
                    { id: 'defense_amber', name: 'Defense Aerospace Amber', primary: '#d97706', accent: '#fbbf24' },
                    { id: 'fintech_purple', name: 'FinTech Deep Violet', primary: '#7c3aed', accent: '#c084fc' },
                    { id: 'cyber_crimson', name: 'Cyber Crimson', primary: '#e11d48', accent: '#f43f5e' },
                    { id: 'slate_minimal', name: 'Modern Minimal Slate', primary: '#475569', accent: '#38bdf8' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setCustomBrand({
                          ...customBrand,
                          themePreset: preset.id as any,
                          primaryColor: preset.primary,
                          accentColor: preset.accent,
                        });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        customBrand.primaryColor === preset.primary
                          ? 'border-white bg-slate-800 shadow-md ring-1 ring-white/30'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <div className="text-xs font-semibold text-white">{preset.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hex Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Primary Color (Hex):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customBrand.primaryColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, primaryColor: e.target.value })
                      }
                      className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={customBrand.primaryColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, primaryColor: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Accent Highlight (Hex):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customBrand.accentColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, accentColor: e.target.value })
                      }
                      className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={customBrand.accentColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, accentColor: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={customBrand.companyName}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, companyName: e.target.value })
                    }
                    placeholder="e.g. 1-Compliance or Your Organization Name"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Internal Portal Header / Subtitle:
                  </label>
                  <input
                    type="text"
                    value={customBrand.portalSubtitle}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, portalSubtitle: e.target.value })
                    }
                    placeholder="e.g. Enterprise Compliance Operating System"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Internal Welcome Banner Text:
                  </label>
                  <input
                    type="text"
                    value={customBrand.welcomeMessage}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, welcomeMessage: e.target.value })
                    }
                    placeholder="e.g. Welcome to 1-Compliance Operating System"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Corporate Subdomain (CNAME):
                  </label>
                  <input
                    type="text"
                    value={customBrand.corporateDomain || ''}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, corporateDomain: e.target.value })
                    }
                    placeholder="e.g. app.1-compliance.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onUpdateBranding) {
                      onUpdateBranding({
                        ...customBrand,
                        isWhiteLabelActive: true,
                      });
                    }
                    setBrandSavedNotice(true);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-black text-white transition-all shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: customBrand.primaryColor,
                    borderColor: customBrand.accentColor,
                  }}
                >
                  🚀 Apply White-Label Theme to Entire Platform
                </button>
                <div className="text-[11px] text-center text-slate-400 mt-2">
                  Immediately alters the navigation bar, headers, and welcome screens across the whole OS.
                </div>
              </div>
            </div>

            {/* Right Column: Live Mockup Preview */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Live In-App Employee Preview
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs"
                  style={{ backgroundColor: customBrand.primaryColor }}
                >
                  White-Label Active
                </span>
              </div>

              {/* Mock Nav Bar */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-md"
                    style={{ backgroundColor: customBrand.primaryColor }}
                  >
                    {customBrand.companyName.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{customBrand.companyName}</div>
                    <div className="text-[10px] text-slate-400">{customBrand.portalSubtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span
                    className="px-2 py-0.5 rounded text-white font-bold"
                    style={{ backgroundColor: customBrand.accentColor }}
                  >
                    Enterprise Internal
                  </span>
                </div>
              </div>

              {/* Mock Dashboard Hero Banner */}
              <div
                className="p-5 rounded-xl border text-white space-y-3 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${customBrand.primaryColor}22 0%, #090d16 100%)`,
                  borderColor: customBrand.primaryColor,
                }}
              >
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: customBrand.accentColor }}
                  />
                  <span style={{ color: customBrand.accentColor }} className="font-bold">
                    INTERNAL COMPLIANCE PLATFORM
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">
                  {customBrand.welcomeMessage}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous Sentinel network active. All employee evidence chains, policies, 
                  and audit binders are scoped to {customBrand.companyName}.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: customBrand.primaryColor }}
                  >
                    Start Security Quest
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700"
                  >
                    Employee Handbook
                  </button>
                </div>
              </div>

              {/* Technical White-Label Architecture */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-mono font-bold text-cyan-300">
                  How White-Label Customization Works Technologically:
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  1. <strong>Custom Domain CNAME:</strong> Customer creates a DNS record pointing <code>compliance.client.com</code> to <code>app.1-compliance.com</code>.<br />
                  2. <strong>Tenant Brand Resolution:</strong> When an employee opens the URL, the server matches the hostname and injects the company's color scheme and logos into the DOM.<br />
                  3. <strong>Zero Mention of Other Companies:</strong> To their staff, it appears as their own proprietary in-house compliance system.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ENTERPRISE COHORT CALCULATOR (101+ USERS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'cohort' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>SCALABLE ENTERPRISE FORMULA</span>
                <span>·</span>
                <span>MATH.CEIL(HEADCOUNT / 100) × $999</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Interactive Enterprise Cohort & User Headcount Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Test any company size below. Watch how the 1-Compliance cohort structure gives your entire company predictable budgeting, while saving tens of thousands compared to legacy per-seat pricing.
              </p>
            </div>

            {/* Interactive Headcount Slider */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">Company User Headcount</div>
                  <div className="text-xs text-slate-400">Total approved employees, managers, and staff across all departments:</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-3xl font-mono font-extrabold text-cyan-400">
                    {teamSize} Users
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setTeamSize(Math.max(1, teamSize - 10))}
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setTeamSize(teamSize + 10)}
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 (Solo $149)</span>
                <span>5 (Team $299)</span>
                <span>100 (100 Block $999)</span>
                <span>200 (2 Blocks $1,998)</span>
                <span>300 (3 Blocks $2,997)</span>
                <span>500 (5 Blocks $4,995)</span>
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">Applicable Plan Tier</div>
                <div className="text-lg font-bold text-white">
                  {teamSize <= 1
                    ? 'Solo / Founder Plan'
                    : teamSize <= 5
                    ? 'Team Compliance Plan'
                    : teamSize <= 100
                    ? 'Enterprise Scale Plan (1st Cohort)'
                    : `Mega Enterprise (${Math.ceil(teamSize / 100)} Cohort Blocks)`}
                </div>
                <div className="text-xs text-cyan-400 font-mono">
                  {teamSize <= 5 ? `${teamSize} Included Logins` : `${Math.ceil(teamSize / 100) * 100} Seat Pool Capacity`}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-500/80 space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase font-bold">1-Compliance Monthly Cost</div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  ${calculatedMonthly.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {billingCycle === 'annual'
                    ? `Billed annually at $${calculatedAnnual.toLocaleString()}/yr`
                    : `Monthly rate: $${calculateCustomerMonthlyCost(teamSize, 'monthly').toLocaleString()}/mo`}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-950 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Formula Applied</div>
                <div className="text-base font-mono font-bold text-emerald-300">
                  {teamSize <= 1
                    ? '$149 / month flat'
                    : teamSize <= 5
                    ? '$299 / month flat'
                    : teamSize <= 100
                    ? '$999 / month flat'
                    : `${Math.ceil(teamSize / 100)} × $999 = $${(Math.ceil(teamSize / 100) * 999).toLocaleString()}/mo`}
                </div>
                <div className="text-xs text-slate-400">
                  {teamSize > 100 && (
                    <span>
                      {Math.ceil(teamSize / 100)} blocks of 100 users (covers up to {Math.ceil(teamSize / 100) * 100} seats).
                    </span>
                  )}
                  {teamSize <= 100 && <span>Fixed flat rate with company-wide access.</span>}
                </div>
              </div>
            </div>

            {/* Real World Concrete Examples Table */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white">Concrete Enterprise Pricing Examples</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Team Headcount</th>
                      <th className="p-3">Pricing Cohorts</th>
                      <th className="p-3">Monthly Cost</th>
                      <th className="p-3">Annual (2 Mo Free)</th>
                      <th className="p-3">Legacy Tool Cost (Vanta)</th>
                      <th className="p-3 text-right">Your Net Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">1 User (Solo)</td>
                      <td className="p-3 text-slate-400">1 Login Tier</td>
                      <td className="p-3 font-bold text-cyan-300">$149 / mo</td>
                      <td className="p-3 text-emerald-400">$1,490 / yr</td>
                      <td className="p-3 text-red-400">$18,150 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$16,660 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">5 Users (Team)</td>
                      <td className="p-3 text-slate-400">Up to 5 Logins</td>
                      <td className="p-3 font-bold text-cyan-300">$299 / mo</td>
                      <td className="p-3 text-emerald-400">$2,990 / yr</td>
                      <td className="p-3 text-red-400">$18,750 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$15,760 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50 bg-cyan-950/20">
                      <td className="p-3 font-bold text-white">45 Users (Growth)</td>
                      <td className="p-3 text-cyan-400 font-bold">1st 100 Cohort</td>
                      <td className="p-3 font-bold text-cyan-300">$999 / mo</td>
                      <td className="p-3 text-emerald-400">$9,990 / yr</td>
                      <td className="p-3 text-red-400">$24,750 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$14,760 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">120 Users (Mega Ent)</td>
                      <td className="p-3 text-purple-300">2 Cohorts (1-100 + 101-200)</td>
                      <td className="p-3 font-bold text-cyan-300">$1,998 / mo ($999 + $999)</td>
                      <td className="p-3 text-emerald-400">$19,980 / yr</td>
                      <td className="p-3 text-red-400">$36,000 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$16,020 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">201 Users (Mega Ent)</td>
                      <td className="p-3 text-purple-300">3 Cohorts (3 × $999)</td>
                      <td className="p-3 font-bold text-cyan-300">$2,997 / mo</td>
                      <td className="p-3 text-emerald-400">$29,970 / yr</td>
                      <td className="p-3 text-red-400">$48,150 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$18,180 / yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ENTERPRISE COMPANY-WIDE TEAM & MEMBER MANAGEMENT */}
      {/* ========================================================================= */}
      {activeSubTab === 'enterprise_team' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>COMPANY-WIDE ENTERPRISE ACCESS</span>
                  <span>·</span>
                  <span>DEPARTMENT SCOPING & RBAC</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  Enterprise Member Directory & Department Roles
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  When your company subscribes to the Enterprise plan, all approved members, managers, and staff across all departments have full authorized access to 1-Compliance OS.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                  {members.length} / 100 Active Seats
                </span>
              </div>
            </div>

            {/* Add New Member Form */}
            <form onSubmit={handleAddMember} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Provision New Company User
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Company Email:</label>
                  <input
                    type="email"
                    required
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="e.g. alex@yourcompany.com"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Department Scope:</label>
                  <select
                    value={newMemberDept}
                    onChange={(e) => setNewMemberDept(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Factory & Operations">Factory & Operations</option>
                    <option value="HR & People">HR & People</option>
                    <option value="IT & DevOps">IT & DevOps</option>
                    <option value="Finance & Legal">Finance & Legal</option>
                    <option value="Executive">Executive & Board</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Role & Permissions:</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Department Manager">Department Manager</option>
                    <option value="Compliance Officer">Compliance Officer</option>
                    <option value="Staff / Operator">Staff / Operator</option>
                    <option value="Admin">Organization Admin</option>
                    <option value="External Auditor">External Auditor (Read-Only)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                >
                  + Add Member to Enterprise Pool
                </button>
              </div>
            </form>

            {/* Member Directory Table */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Last Active</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          <div>{member.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{member.email}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-cyan-300">{member.department}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            member.role === 'Admin'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800'
                              : member.role === 'External Auditor'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-slate-800 text-slate-200'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{member.status}</span>
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono">{member.lastActive}</td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Sent magic passwordless login link to ${member.email}`);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
                          >
                            Resend Access Link
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTERACTIVE CUSTOMER ROI CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'roi' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">GRC Cost Comparison & Capital Savings Calculator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Show prospective buyers exactly how much cash they save by replacing bloated legacy GRC platforms (Vanta, Drata) with 1-Compliance OS.
              </p>
            </div>

            {/* Slider for team size */}
            <div className="p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Target Company Headcount</div>
                  <div className="text-xs text-slate-400">Drag to see how legacy per-seat pricing inflates costs:</div>
                </div>
                <div className="text-2xl font-mono font-bold text-cyan-400">
                  {teamSize} Employees
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 (Solo)</span>
                <span>50 (Growth)</span>
                <span>100 (Scaleup)</span>
                <span>250+ (Enterprise)</span>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vanta Card */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-red-950/60 space-y-2">
                <div className="text-xs font-mono text-red-400">Legacy GRC Vendor #1</div>
                <div className="text-base font-bold text-white">Vanta Estimated Cost</div>
                <div className="text-3xl font-mono font-bold text-red-400">
                  ${vantaEstimatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <div>· Base platform: ~$18,000/yr</div>
                  <div>· Per-seat license fee: ~$150/emp</div>
                  <div>· Mandatory annual vendor lock-in</div>
                </div>
              </div>

              {/* Drata Card */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-amber-950/60 space-y-2">
                <div className="text-xs font-mono text-amber-400">Legacy GRC Vendor #2</div>
                <div className="text-base font-bold text-white">Drata Estimated Cost</div>
                <div className="text-3xl font-mono font-bold text-amber-400">
                  ${drataEstimatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <div>· Base platform: ~$22,000/yr</div>
                  <div>· Per-seat fee: ~$180/emp</div>
                  <div>· Add-ons for HIPAA & GDPR</div>
                </div>
              </div>

              {/* 1-Compliance OS Card */}
              <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/80 space-y-2 relative shadow-lg">
                <div className="text-xs font-mono text-cyan-400 font-bold">1-Compliance Operating System</div>
                <div className="text-base font-bold text-white">Your Customer Cost</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  ${calculatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-cyan-900/60">
                  <div>· Simple flat cohorts ($149 / $299 / $999)</div>
                  <div>· All 28 Notion categories & 5 Sentinels</div>
                  <div>· Unlimited Free Guest Vendor Vetting</div>
                </div>
              </div>
            </div>

            {/* Total Savings Highlight Banner */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Net Annual Capital Saved By Customer
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  ${netAnnualSavings.toLocaleString()} <span className="text-sm font-normal text-emerald-300">saved every single year</span>
                </div>
                <div className="text-xs text-slate-400">
                  Saved capital can fund additional product R&D, manufacturing equipment, or security headcount.
                </div>
              </div>

              <button
                onClick={() => handleStartCheckout(PLANS[2])}
                className="px-5 py-3 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shrink-0 shadow-lg"
              >
                Subscribe Enterprise at ${PLANS[2].annualMonthlyPrice}/mo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BILLING & INVOICES PORTAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'portal' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Customer Self-Service Billing Portal</h2>
                <p className="text-xs text-slate-400 mt-1">
                  How subscribed companies manage their active subscription, update credit cards, and download tax receipts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  Active Enterprise Subscription
                </span>
              </div>
            </div>

            {/* Subscription Detail Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-lg bg-slate-950/80 border border-slate-800">
              <div>
                <div className="text-xs text-slate-400">Current Plan</div>
                <div className="text-base font-bold text-white mt-1">{currentSubscription.plan}</div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">All 5 Sentinels Active</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Renewal Date</div>
                <div className="text-base font-bold text-white font-mono mt-1">
                  {currentSubscription.renewalDate}
                </div>
                <div className="text-xs text-slate-400 mt-1">Auto-renews via Stripe</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Seat Utilization</div>
                <div className="text-base font-bold text-white font-mono mt-1">
                  {members.length} / {currentSubscription.seatsTotal} Seats
                </div>
                <div className="text-xs text-slate-400 mt-1">{currentSubscription.seatsTotal - members.length} seats remaining</div>
              </div>

              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => {
                    alert('In production, this redirects to the Stripe Customer Portal (billing.stripe.com) where customers update corporate cards, tax IDs, or manage seats.');
                  }}
                  className="px-3 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-800 rounded hover:bg-cyan-950 transition-colors text-center"
                >
                  Open Stripe Customer Portal ↗
                </button>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">Billing History & Tax Receipts</div>
                <span className="text-xs text-slate-500 font-mono">Synced from Stripe</span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'INV-2026-901',
                    date: 'Oct 28, 2026',
                    description: '1-Compliance OS - Enterprise Scale Plan (Annual, 100 Seats)',
                    amount: '$9,990.00',
                    status: 'Paid',
                  },
                  {
                    id: 'INV-2025-412',
                    date: 'Oct 28, 2025',
                    description: '1-Compliance OS - Enterprise Scale Plan (Annual)',
                    amount: '$9,990.00',
                    status: 'Paid',
                  },
                ].map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-cyan-400 font-bold">{inv.id}</span>
                      <span className="text-slate-400">{inv.date}</span>
                      <span className="text-white font-medium">{inv.description}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white">{inv.amount}</span>
                      <span className="font-mono text-emerald-400">{inv.status}</span>
                      <button
                        type="button"
                        onClick={() => alert(`Downloading official PDF receipt for ${inv.id}...`)}
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        PDF Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT & ORGANIZATION CONFIGURATION MODAL                               */}
      {/* ========================================================================= */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {checkoutStep === 'success'
                    ? 'Subscription Confirmed'
                    : `Subscribe to ${selectedPlan.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {checkoutStep === 'review' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Selected Tier:</span>
                      <span className="font-bold text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Billing Cycle:</span>
                      <span className="font-mono text-cyan-400 uppercase">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">User Scope:</span>
                      <span className="font-mono text-slate-300">{selectedPlan.userLimit}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                      <span className="text-white">Due Today:</span>
                      <span className="text-emerald-400 font-mono">
                        ${billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice * 12 : selectedPlan.monthlyPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Billing Contact Email</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <a
                      href={selectedPlan.squareCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCompletePayment()}
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Complete Payment via Square</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total Charged:</span>
                      <span className="font-mono font-bold text-white">
                        ${billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice * 12 : selectedPlan.monthlyPrice}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Payment processed securely via Square. 256-bit SSL encrypted.
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('review')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <a
                      href={selectedPlan.squareCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCompletePayment}
                      className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg"
                    >
                      Proceed to Square Checkout ↗
                    </a>
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold text-emerald-400">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Square Checkout Opened!</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete your payment in the Square tab. Welcome to 1-Compliance OS — Human Compliance Experts &amp; our 5 Autonomous Sentinels are standing guard.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <a
                      href={selectedPlan.squareCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                    >
                      Re-open Square Payment Link ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-5 py-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* SQUARE ENTERPRISE CHECKOUT MODAL                                          */}
      {/* ========================================================================= */}
      {isSquareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-emerald-500/70 shadow-2xl overflow-hidden flex flex-col">
            {/* Square Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg font-black text-emerald-400">
                  ■
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Square Enterprise Checkout</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                      Auto-Tally
                    </span>
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    Unified Corporate Subscription · Single Company Billing
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSquareModalOpen(false)}
                className="text-slate-400 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {!squareSuccess ? (
                <div className="space-y-4">
                  {/* Order Summary with Auto-Tally Math */}
                  {(() => {
                    const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
                    const unitPrice = squareCycle === 'annual' ? 832 : 999;
                    let monthlyCost = 0;
                    if (squareUsers <= 1) {
                      monthlyCost = squareCycle === 'annual' ? 124 : 149;
                    } else if (squareUsers <= 5) {
                      monthlyCost = squareCycle === 'annual' ? 249 : 299;
                    } else {
                      monthlyCost = cohorts * unitPrice;
                    }
                    const totalDue = squareCycle === 'annual' ? monthlyCost * 12 : monthlyCost;

                    return (
                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Company Name:</span>
                          <span className="font-bold text-white font-mono">{customBrand.companyName || '1-Compliance'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Approved Headcount:</span>
                          <span className="font-bold text-emerald-300 font-mono">{squareUsers} Users</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Square Line Item Quantity:</span>
                          <span className="font-mono text-cyan-300 font-bold">
                            {squareUsers <= 5 ? '1 Tier' : `${cohorts} × 100-User Cohort Plan`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Billing Term:</span>
                          <span className="font-mono text-white uppercase">{squareCycle}</span>
                        </div>
                        <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-400">Total Billed by Square:</div>
                            <div className="text-[10px] text-emerald-400 font-mono">
                              ${monthlyCost.toLocaleString()}/month recurring
                            </div>
                          </div>
                          <div className="text-2xl font-mono font-black text-emerald-400">
                            ${totalDue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Supported Square Checkout Methods:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'card', label: '💳 Card' },
                        { id: 'apple_pay', label: '🍎 Apple Pay' },
                        { id: 'google_pay', label: '🌐 GPay' },
                        { id: 'cash_app', label: '💵 Cash App' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSquarePaymentMethod(method.id as any)}
                          className={`py-2 px-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center ${
                            squarePaymentMethod === method.id
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSquareModalOpen(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>

                    <a
                      href={
                        squareUsers <= 5
                          ? 'https://square.link/u/GvqwdSHx'
                          : 'https://square.link/u/bGLuAsoa'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
                        const unitPrice = squareCycle === 'annual' ? 832 : 999;
                        const monthly = squareUsers <= 1 ? 149 : squareUsers <= 5 ? 299 : cohorts * unitPrice;
                        const seatsTotal = squareUsers <= 1 ? 1 : squareUsers <= 5 ? 5 : cohorts * 100;

                        setSquareTxId(`sq_sub_${Date.now()}_ent`);
                        setSquareSuccess(true);
                        setCurrentSubscription({
                          plan: `Square Enterprise Scale (${cohorts} × 100-User Cohort${cohorts > 1 ? 's' : ''})`,
                          status: 'active',
                          renewalDate: 'Nov 29, 2027',
                          seatsUsed: Math.min(members.length, seatsTotal),
                          seatsTotal,
                          monthlyCost: monthly,
                        });
                      }}
                      className="px-6 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all shadow-lg cursor-pointer"
                    >
                      Complete Payment on Square ↗
                    </a>
                  </div>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center mx-auto text-3xl font-black text-emerald-300">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Square Subscription Activated!</h4>
                    <p className="text-xs text-slate-300">
                      Company Organization <strong className="text-white">{customBrand.companyName}</strong> has been registered.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Square Subscription ID:</span>
                      <span className="text-emerald-400 font-bold">{squareTxId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pooled Capacity:</span>
                      <span className="text-cyan-300 font-bold">{currentSubscription.seatsTotal} Approved Seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Auto-Approval Whitelist:</span>
                      <span className="text-white">@{customBrand.allowedEmailDomains.join(', @')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Billing Mode:</span>
                      <span className="text-emerald-400 font-bold">1 Unified Corporate Account</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSquareModalOpen(false)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
                    >
                      Open Corporate Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

