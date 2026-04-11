import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Wifi, Database, Monitor, ArrowRight, ArrowDown, CheckCircle, XCircle,
  Users, Clock, ShieldCheck, CreditCard, CloudUpload, AlertTriangle,
  Zap, ExternalLink, ChevronDown, BarChart3, Mail, Code, Server,
  GitBranch, Terminal, Globe, Play, Layers, Box, Activity, Hash,
  FileCode, Sparkles, Target, TrendingUp, Award, Eye
} from 'lucide-react';
import {
  PROJECT_INFO, INTRODUCTION_DATA, PROBLEM_DATA, OBJECTIVES_DATA,
  DEVICE_SPECS, ARCHITECTURE_NODES, ARCHITECTURE_LAYERS,
  WORKFLOW_STEPS, WORKFLOW_VALID, WORKFLOW_INVALID,
  DB_SCHEMA, DASHBOARD_DATA, API_REFERENCE, RESULTS_DATA,
  IMPLEMENTATION_DATA, CONCLUSION_DATA, REFERENCES, REPO_URL,
  TECH_STACK_DATA, CODE_SNIPPETS, DEMO_URL,
} from '../constants';

// ── Icon Map ──────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, any> = {
  Cpu, Wifi, Database, Monitor, CreditCard, CloudUpload,
  CheckCircle, XCircle, AlertTriangle, ShieldCheck, Users, Clock,
  Zap, BarChart3, Mail, Code, Server, GitBranch, Terminal, Globe,
  Play, Layers, Box, Activity, Hash, FileCode, Sparkles, Target,
  TrendingUp, Award, Eye,
};

const getIcon = (name: string, props: any = {}) => {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon {...props} /> : null;
};

// ── Inline styles ─────────────────────────────────────────────────────────

const S = {
  white: '#ffffff',
  dim: 'rgba(255,255,255,0.55)',
  muted: 'rgba(255,255,255,0.30)',
  faint: 'rgba(255,255,255,0.12)',
  ghost: 'rgba(255,255,255,0.06)',
  black: '#000000',

  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '12px',
  } as React.CSSProperties,

  cardGlow: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255,255,255,0.04)',
  } as React.CSSProperties,
};

// ── Reusable Components ───────────────────────────────────────────────────

const SlideContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`slide-container h-full w-full flex flex-col overflow-hidden max-w-7xl mx-auto ${className}`}
    style={{ padding: 'clamp(20px, 3vh, 48px) clamp(24px, 3vw, 64px)' }}>
    {children}
  </div>
);

const SlideTitle = ({ children, sub }: { children: React.ReactNode, sub?: string }) => (
  <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-3 flex-shrink-0">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: S.white, textShadow: '0 0 30px rgba(255,255,255,0.10)' }}>
      {children}
    </h2>
    {sub && <p className="mt-1 text-sm font-mono" style={{ color: S.muted }}>{sub}</p>}
  </motion.div>
);

const SlideContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
    className={`flex-1 min-h-0 flex flex-col justify-center overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const Bullet = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.li
    initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + delay }}
    className="flex items-start gap-3 mb-2 text-sm"
    style={{ color: S.dim }}
  >
    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.4)' }} />
    <span>{children}</span>
  </motion.li>
);

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 35; const inc = value / steps; let cur = 0;
    const t = setInterval(() => { cur += inc; if (cur >= value) { setCount(value); clearInterval(t); } else { setCount(Math.floor(cur)); } }, 40);
    return () => clearInterval(t);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const MiniTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded text-[8px] font-mono" style={{ background: S.ghost, color: S.muted }}>{children}</span>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1: TITLE
// ═══════════════════════════════════════════════════════════════════════════

export const TitleSlide = () => (
  <SlideContainer className="justify-center items-center text-center">
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="w-full">
      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="p-4 rounded-2xl glow-border" style={{ background: S.ghost }}>
          <CreditCard size={44} color="white" />
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight" style={{ color: S.white, textShadow: '0 0 40px rgba(255,255,255,0.12)' }}>
        {PROJECT_INFO.title}
      </h1>
      <p className="text-lg md:text-xl font-light mb-3" style={{ color: S.dim }}>
        {PROJECT_INFO.subtitle}
      </p>

      {/* Tagline */}
      <div className="inline-block px-5 py-2 rounded-full mb-5" style={{ ...S.card }}>
        <p className="font-mono text-xs" style={{ color: S.muted }}>"{PROJECT_INFO.tagline}"</p>
      </div>

      {/* Counters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center gap-6 md:gap-10 mb-5">
        {PROJECT_INFO.infographics.map((item, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl md:text-3xl font-bold counter-pulse" style={{ color: S.white, textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
              <AnimatedCounter value={item.value} suffix={item.suffix} />
            </div>
            <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: S.muted }}>{item.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Key Highlights */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex flex-wrap justify-center gap-2 mb-5">
        {PROJECT_INFO.highlights.map((h, i) => (
          <span key={i} className="px-3 py-1 rounded-full text-[10px] flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: S.dim }}>
            <CheckCircle size={10} /> {h}
          </span>
        ))}
      </motion.div>

      {/* Team */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col items-center gap-2">
        <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: S.muted }}>{PROJECT_INFO.subject} • {PROJECT_INFO.semester}</div>
        <div className="flex flex-wrap justify-center gap-3">
          {PROJECT_INFO.team.map((m, i) => (
            <div key={i} className="px-4 py-2 rounded-lg" style={{ ...S.card }}>
              <div className="text-sm font-medium" style={{ color: S.white }}>{m.name}</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px]" style={{ color: S.muted }}>{m.id}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: S.muted }}>{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </SlideContainer>
);

// ── CSS Bar Chart (replaces broken Recharts) ─────────────────────────────

const CSSBarRow = ({ label, values, delay = 0 }: { label: string, values: { pct: number, label: string }[], delay?: number }) => (
  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }} className="mb-3">
    <div className="text-xs font-medium mb-1" style={{ color: S.white }}>{label}</div>
    <div className="space-y-1">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] w-16 flex-shrink-0 text-right" style={{ color: S.muted }}>{v.label}</span>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
              transition={{ delay: delay + 0.2, duration: 0.7, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: `rgba(255,255,255,${0.15 + v.pct / 200})` }}
            />
          </div>
          <span className="text-[10px] font-mono w-8 text-right" style={{ color: S.dim }}>{v.pct}%</span>
        </div>
      ))}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2: INTRODUCTION
// ═══════════════════════════════════════════════════════════════════════════

export const IntroductionSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Background & Motivation">Introduction</SlideTitle>
    <SlideContent className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      {/* Left */}
      <div className="space-y-3">
        <ul className="space-y-1">
          {INTRODUCTION_DATA.overview.map((t, i) => <Bullet key={i} delay={i * 0.06}>{t}</Bullet>)}
        </ul>

        {/* Why RFID */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-4 rounded-xl" style={{ ...S.cardGlow }}>
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2" style={{ color: S.white }}>
            <BarChart3 size={16} /> {INTRODUCTION_DATA.caseStudy.title}
          </h4>
          <p className="text-xs leading-relaxed mb-2" style={{ color: S.muted }}>
            {INTRODUCTION_DATA.caseStudy.description}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {INTRODUCTION_DATA.caseStudy.stats.map((s, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ background: S.ghost }}>
                <div className="text-base font-bold stat-value">{s.value}{s.unit === '%' ? '%' : ''}</div>
                <div className="text-[10px] uppercase" style={{ color: S.muted }}>{s.unit !== '%' ? s.unit : ''}</div>
                <div className="text-[10px] mt-0.5" style={{ color: S.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Advantages */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="grid grid-cols-2 gap-2">
          {INTRODUCTION_DATA.keyAdvantages.map((adv, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ ...S.card }}>
              <h5 className="text-xs font-bold mb-0.5" style={{ color: S.white }}>{adv.title}</h5>
              <p className="text-[11px]" style={{ color: S.muted }}>{adv.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: CSS Bar Chart + Comparison Table */}
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="p-4 rounded-xl" style={{ ...S.cardGlow }}>
          <h4 className="font-bold text-sm mb-4" style={{ color: S.white }}>Attendance Systems Comparison</h4>

          <CSSBarRow label="Efficiency" delay={0.5} values={[
            { label: 'Manual', pct: 45 },
            { label: 'Biometric', pct: 85 },
            { label: 'QR Code', pct: 75 },
            { label: 'RFID', pct: 95 },
          ]} />
          <CSSBarRow label="Error Rate (lower is better)" delay={0.7} values={[
            { label: 'Manual', pct: 12 },
            { label: 'Biometric', pct: 2 },
            { label: 'QR Code', pct: 5 },
            { label: 'RFID', pct: 1 },
          ]} />

          <p className="text-[10px] mt-2 italic" style={{ color: S.muted }}>RFID achieves highest efficiency with lowest error rate.</p>
        </motion.div>

        {/* Comparison table */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="rounded-xl overflow-hidden glow-card">
          <div className="p-3 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
            <Target size={14} color="white" />
            <h4 className="font-bold text-xs" style={{ color: S.white }}>Quick Comparison</h4>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th className="p-2 text-left uppercase font-bold text-[10px]" style={{ color: S.muted }}>Method</th>
                <th className="p-2 text-center uppercase font-bold text-[10px]" style={{ color: S.muted }}>Speed</th>
                <th className="p-2 text-center uppercase font-bold text-[10px]" style={{ color: S.muted }}>Cost</th>
                <th className="p-2 text-center uppercase font-bold text-[10px]" style={{ color: S.muted }}>Proxy Safe</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Manual Roll Call", "8-10s", "₹0", "✗"],
                ["Biometric", "3-5s", "₹8K+", "✓"],
                ["QR Code", "2-3s", "₹500", "✗"],
                ["RFID (Ours)", "<1s", "₹800", "✓"],
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <td className="p-2 font-medium" style={{ color: i === 3 ? S.white : S.dim }}>{row[0]}</td>
                  <td className="p-2 text-center font-mono" style={{ color: S.muted }}>{row[1]}</td>
                  <td className="p-2 text-center font-mono" style={{ color: S.muted }}>{row[2]}</td>
                  <td className="p-2 text-center" style={{ color: S.muted }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3: PROBLEM STATEMENT
// ═══════════════════════════════════════════════════════════════════════════

export const ProblemSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Why the current system is broken">Problem Statement</SlideTitle>
    <SlideContent>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {PROBLEM_DATA.stats.map((item, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.12 }}
            className="p-3 rounded-xl glow-card"
          >
            <div className="flex items-center gap-3 mb-1.5">
              {idx === 0 && <Clock size={20} color="white" />}
              {idx === 1 && <Users size={20} color="white" />}
              {idx === 2 && <Database size={20} color="white" />}
              <span className="text-lg font-bold stat-value">{item.value}</span>
            </div>
            <h3 className="text-xs font-bold mb-1" style={{ color: S.white }}>{item.label}</h3>
            <p className="text-[10px] leading-relaxed" style={{ color: S.muted }}>{item.desc}</p>
            <p className="text-[8px] mt-1 italic" style={{ color: S.muted }}>— {item.source}</p>
          </motion.div>
        ))}
      </div>

      {/* Real-world impacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
        {PROBLEM_DATA.impacts.map((item, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + idx * 0.08 }}
            className="p-3 rounded-xl" style={{ ...S.cardGlow }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {getIcon(item.icon, { size: 14, color: 'white' })}
              <h4 className="text-[11px] font-bold" style={{ color: S.white }}>{item.title}</h4>
            </div>
            <p className="text-[9px] leading-relaxed" style={{ color: S.muted }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Cost of Inaction + Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Cost of inaction */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="rounded-xl p-3" style={{ ...S.cardGlow }}>
          <h4 className="text-[10px] font-bold mb-2 flex items-center gap-2" style={{ color: S.white }}>
            <TrendingUp size={12} /> Cost of Inaction (Per Year)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {PROBLEM_DATA.costOfInaction.map((c, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ background: S.ghost }}>
                <div className="text-sm font-bold stat-value">{c.metric}</div>
                <div className="text-[8px]" style={{ color: S.muted }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-1.5 content-start">
          {PROBLEM_DATA.additionalPain.map((p, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-[9px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: S.dim }}>
              ⚠ {p}
            </span>
          ))}
        </motion.div>
      </div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4: OBJECTIVES
// ═══════════════════════════════════════════════════════════════════════════

export const ObjectiveSlide = () => (
  <SlideContainer>
    <SlideTitle sub="What we aim to achieve">Objectives</SlideTitle>
    <SlideContent>
      {/* 2×2 grid of objective cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {OBJECTIVES_DATA.map((obj, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.12 }}
            className="rounded-xl glow-card p-5 relative overflow-hidden"
          >
            {/* Number watermark */}
            <div className="absolute top-3 right-4 text-5xl font-black" style={{ color: 'rgba(255,255,255,0.04)' }}>
              0{idx + 1}
            </div>

            {/* Icon badge + title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                {getIcon(obj.icon, { size: 22, color: 'white' })}
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: S.white }}>{obj.title}</h3>
                <p className="text-xs" style={{ color: S.muted }}>Objective {idx + 1} of {OBJECTIVES_DATA.length}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-3" style={{ color: S.dim }}>{obj.desc}</p>

            {/* Detail line */}
            <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs leading-relaxed" style={{ color: S.muted }}>{obj.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom: Core Goal + Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="rounded-xl p-4 flex items-center gap-6" style={{ ...S.cardGlow }}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <Target size={18} color="white" />
          </div>
          <span className="text-sm font-bold" style={{ color: S.white }}>Core Goal</span>
        </div>
        <div className="w-px h-8 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }} />
        <span className="text-sm flex-1" style={{ color: S.dim }}>
          Replace manual attendance with a sub-₹800, self-hosted, real-time RFID system — zero recurring cost, zero cloud dependency.
        </span>
        <div className="flex gap-3 flex-shrink-0">
          {[
            { val: "<1s", lbl: "Scan" },
            { val: "₹735", lbl: "Cost" },
            { val: "0", lbl: "Cloud" },
          ].map((s, i) => (
            <div key={i} className="text-center px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-sm font-bold stat-value">{s.val}</div>
              <div className="text-[10px]" style={{ color: S.muted }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5: HARDWARE DESIGN (COMPACT WITH TABLES)
// ═══════════════════════════════════════════════════════════════════════════

export const DeviceDesignSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Components, wiring & specifications">Hardware Design</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        {/* Column 1: Component Bill of Materials */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-2">
              <Cpu size={13} color="white" />
              <h3 className="font-bold text-[11px]" style={{ color: S.white }}>Bill of Materials</h3>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)', color: S.white }}>Total: {DEVICE_SPECS.totalCost}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th className="p-2 text-left font-bold text-[8px] uppercase" style={{ color: S.muted }}>Component</th>
                  <th className="p-2 text-left font-bold text-[8px] uppercase" style={{ color: S.muted }}>Specifications</th>
                  <th className="p-2 text-left font-bold text-[8px] uppercase" style={{ color: S.muted }}>Role</th>
                  <th className="p-2 text-right font-bold text-[8px] uppercase" style={{ color: S.muted }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {DEVICE_SPECS.components.map((c, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="p-2 font-mono font-bold" style={{ color: S.white }}>{c.name}</td>
                    <td className="p-2" style={{ color: S.muted }}>{c.spec}</td>
                    <td className="p-2" style={{ color: S.dim }}>{c.role}</td>
                    <td className="p-2 text-right font-mono" style={{ color: S.white }}>{c.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Column 2: SPI Wiring Table */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
            <GitBranch size={13} color="white" />
            <h3 className="font-bold text-[11px]" style={{ color: S.white }}>SPI Wiring</h3>
          </div>
          <table className="w-full text-[10px] font-mono">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th className="p-1.5 text-left text-[8px] uppercase" style={{ color: S.muted }}>MFRC522</th>
                <th className="p-1.5 text-left text-[8px] uppercase" style={{ color: S.muted }}>ESP32</th>
                <th className="p-1.5 text-left text-[8px] uppercase" style={{ color: S.muted }}>Function</th>
              </tr>
            </thead>
            <tbody>
              {DEVICE_SPECS.wiring.map((w, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <td className="p-1.5 font-bold" style={{ color: S.white }}>{w.pin}</td>
                  <td className="p-1.5" style={{ color: S.dim }}>{w.gpio}</td>
                  <td className="p-1.5 text-[9px]" style={{ color: S.muted }}>{w.function}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Bottom row: ESP32 + MFRC522 specs side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl p-2.5 glow-card">
          <h4 className="font-bold text-[10px] mb-1.5 flex items-center gap-2" style={{ color: S.white }}>
            <Cpu size={12} /> ESP32 Specifications
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {DEVICE_SPECS.espSpecs.map((s, i) => (
              <div key={i} className="flex justify-between text-[9px] py-0.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ color: S.muted }}>{s.label}</span>
                <span className="font-mono" style={{ color: S.white }}>{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl p-2.5 glow-card">
          <h4 className="font-bold text-[10px] mb-1.5 flex items-center gap-2" style={{ color: S.white }}>
            <CreditCard size={12} /> MFRC522 / MIFARE Specifications
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {DEVICE_SPECS.rfidSpecs.map((s, i) => (
              <div key={i} className="flex justify-between text-[9px] py-0.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ color: S.muted }}>{s.label}</span>
                <span className="font-mono" style={{ color: S.white }}>{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Design note */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-2 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[9px] italic leading-relaxed" style={{ color: S.muted }}>{DEVICE_SPECS.designNote}</p>
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6: SYSTEM ARCHITECTURE (PROPER DIAGRAM)
// ═══════════════════════════════════════════════════════════════════════════

export const HardwareBlockSlide = () => (
  <SlideContainer>
    <SlideTitle sub="End-to-end data flow architecture">System Architecture</SlideTitle>
    <SlideContent className="items-center">
      {/* Proper Architecture Diagram */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="w-full max-w-5xl rounded-xl p-5" style={{ ...S.cardGlow }}>
        
        {/* Row 1: Hardware Flow */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {ARCHITECTURE_NODES.map((node, idx) => (
            <React.Fragment key={node.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.12 }}
                className="flex flex-col items-center gap-1.5 px-2">
                <div className="p-2.5 rounded-xl relative" style={{ 
                  ...S.cardGlow, 
                  ...(node.highlight ? { boxShadow: '0 0 25px rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.25)' } : {}) 
                }}>
                  {getIcon(node.icon, { size: 20, color: 'white' })}
                  {node.highlight && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping" style={{ background: 'rgba(255,255,255,0.5)' }} />}
                </div>
                <span className="text-[10px] font-mono font-bold" style={{ color: S.white }}>{node.label}</span>
                <span className="text-[8px] text-center max-w-[100px]" style={{ color: S.muted }}>{node.desc}</span>
              </motion.div>
              {idx < ARCHITECTURE_NODES.length - 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.12 + 0.06 }}
                  className="flex flex-col items-center gap-0.5 mx-1">
                  <ArrowRight size={14} color="rgba(255,255,255,0.35)" className="glow-arrow" />
                  <span className="text-[7px] font-mono" style={{ color: S.muted }}>
                    {idx === 0 ? "13.56MHz" : idx === 1 ? "SPI" : idx === 2 ? "WiFi/HTTP" : "localhost"}
                  </span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] my-3" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Row 2: Software Stack Details */}
        <div className="grid grid-cols-3 gap-3">
          {/* Server */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="p-2.5 rounded-lg" style={{ background: S.ghost }}>
            <div className="flex items-center gap-2 mb-1.5">
              <Server size={12} color="white" />
              <span className="text-[10px] font-bold" style={{ color: S.white }}>Backend</span>
            </div>
            <div className="space-y-1 text-[9px]" style={{ color: S.muted }}>
              <div>• Express.js REST API</div>
              <div>• 7 API endpoints</div>
              <div>• Cooldown logic (5 min)</div>
              <div>• Serves static frontend</div>
            </div>
          </motion.div>

          {/* Database */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="p-2.5 rounded-lg" style={{ background: S.ghost }}>
            <div className="flex items-center gap-2 mb-1.5">
              <Database size={12} color="white" />
              <span className="text-[10px] font-bold" style={{ color: S.white }}>Database</span>
            </div>
            <div className="space-y-1 text-[9px]" style={{ color: S.muted }}>
              <div>• SQLite (better-sqlite3)</div>
              <div>• WAL mode enabled</div>
              <div>• 2 tables: students, attendance</div>
              <div>• Prepared statements</div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="p-2.5 rounded-lg" style={{ background: S.ghost }}>
            <div className="flex items-center gap-2 mb-1.5">
              <Mail size={12} color="white" />
              <span className="text-[10px] font-bold" style={{ color: S.white }}>Notifications</span>
            </div>
            <div className="space-y-1 text-[9px]" style={{ color: S.muted }}>
              <div>• FormSubmit.co AJAX</div>
              <div>• No API key needed</div>
              <div>• Async (non-blocking)</div>
              <div>• HTML table template</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Layers */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-4 grid grid-cols-3 gap-4 w-full max-w-4xl text-center">
        {ARCHITECTURE_LAYERS.map((layer, i) => (
          <div key={i} className="p-2.5" style={{ borderTop: '2px solid rgba(255,255,255,0.12)' }}>
            <h4 className="font-bold text-xs mb-0.5" style={{ color: S.white }}>{layer.title}</h4>
            <p className="text-[9px]" style={{ color: S.muted }}>{layer.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Data flow summary */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        className="mt-3 w-full max-w-4xl p-2.5 rounded-lg font-mono text-[9px]" style={{ ...S.card }}>
        <div className="flex items-center gap-2 mb-1">
          <Activity size={10} color="rgba(255,255,255,0.4)" />
          <span className="text-[9px] font-bold" style={{ color: S.dim }}>Data Flow Summary</span>
        </div>
        <div style={{ color: S.muted }}>
          Card → MFRC522 (13.56MHz) → ESP32 (SPI) → WiFi → Express.js (HTTP POST) → SQLite (INSERT) → FormSubmit (Email) → Dashboard (Live Update)
        </div>
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7: WORKFLOW
// ═══════════════════════════════════════════════════════════════════════════

const FlowStep = ({ item, idx }: { item: any, idx: number }) => (
  <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} className="relative pl-7">
    <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-[3px]" style={{ background: S.white, borderColor: S.black, boxShadow: '0 0 8px rgba(255,255,255,0.2)' }} />
    <div className="flex items-center gap-2">
      {getIcon(item.icon, { size: 13, color: 'rgba(255,255,255,0.5)' })}
      <h4 className="font-bold text-xs" style={{ color: S.white }}>{item.step}</h4>
    </div>
    <p className="text-[11px] mt-0.5" style={{ color: S.muted }}>{item.desc}</p>
  </motion.div>
);

export const WorkflowSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Scan → Validate → Record → Notify">System Workflow</SlideTitle>
    <SlideContent className="items-center">
      <div className="w-full max-w-4xl">
        {/* Main */}
        <div className="relative ml-3 space-y-4 py-1" style={{ borderLeft: '2px solid rgba(255,255,255,0.10)' }}>
          {WORKFLOW_STEPS.map((item, idx) => <FlowStep key={idx} item={item} idx={idx} />)}
        </div>

        {/* Branch */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-4 ml-3 pl-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full border-[3px]" style={{ background: S.white, borderColor: S.black }} />
            <span className="font-mono text-[10px] font-bold" style={{ color: S.dim }}>STUDENT FOUND?</span>
            <ChevronDown size={12} color="rgba(255,255,255,0.4)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Valid */}
            <div className="branch-valid space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} color="white" />
                <span className="font-bold text-xs" style={{ color: S.white }}>✓ Student Found</span>
              </div>
              {WORKFLOW_VALID.map((item, idx) => <FlowStep key={idx} item={item} idx={idx + 4} />)}
            </div>
            {/* Invalid */}
            <div className="branch-invalid space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <XCircle size={14} color="rgba(255,255,255,0.5)" />
                <span className="font-bold text-xs" style={{ color: S.dim }}>✗ Not Found / Cooldown</span>
              </div>
              {WORKFLOW_INVALID.map((item, idx) => <FlowStep key={idx} item={item} idx={idx + 4} />)}
            </div>
          </div>
        </motion.div>

        {/* Timing bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-5 p-2.5 rounded-lg flex items-center justify-between" style={{ ...S.card }}>
          <div className="flex items-center gap-2">
            <Clock size={12} color="rgba(255,255,255,0.4)" />
            <span className="text-[10px] font-bold" style={{ color: S.white }}>End-to-End Timing</span>
          </div>
          <div className="flex gap-4 text-[9px] font-mono" style={{ color: S.muted }}>
            <span>Card Read: ~100ms</span>
            <span>HTTP POST: ~200ms</span>
            <span>DB Write: ~5ms</span>
            <span>Total: <strong style={{ color: S.white }}>&lt; 1 sec</strong></span>
          </div>
        </motion.div>
      </div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8: DATABASE SCHEMA
// ═══════════════════════════════════════════════════════════════════════════

const SchemaCard = ({ schema, delay = 0 }: { schema: typeof DB_SCHEMA.students, delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="rounded-xl overflow-hidden glow-card">
    <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
      {getIcon(schema.icon, { size: 14, color: 'white' })}
      <h3 className="font-mono font-bold text-xs" style={{ color: S.white }}>{schema.title}</h3>
    </div>
    <div className="p-3 font-mono text-[11px] space-y-1.5">
      {schema.fields.map((f, i) => (
        <div key={i} className="flex justify-between items-start pb-1.5" style={{ borderBottom: i < schema.fields.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
          <div>
            <span style={{ color: S.white }}>{f.name}</span>
            <p className="text-[9px] mt-0.5" style={{ color: S.muted }}>{f.desc}</p>
          </div>
          <span className="text-[9px] ml-3 flex-shrink-0" style={{ color: S.muted }}>{f.type}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export const DatabaseSlide = () => (
  <SlideContainer>
    <SlideTitle sub="SQLite database structure (better-sqlite3)">Database Schema</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SchemaCard schema={DB_SCHEMA.students} delay={0.1} />
        <SchemaCard schema={DB_SCHEMA.attendance} delay={0.2} />
      </div>
      
      {/* API Reference */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 rounded-xl overflow-hidden glow-card">
        <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Globe size={14} color="white" />
          <h4 className="font-bold text-xs" style={{ color: S.white }}>REST API Endpoints</h4>
          <span className="text-[8px] font-mono ml-auto px-2 py-0.5 rounded" style={{ background: S.ghost, color: S.muted }}>{API_REFERENCE.length} endpoints</span>
        </div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-1 font-mono text-[10px]">
          {API_REFERENCE.map((api, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ 
                background: api.method === 'GET' ? 'rgba(255,255,255,0.08)' : api.method === 'POST' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: S.white 
              }}>{api.method}</span>
              <span style={{ color: S.dim }}>{api.endpoint}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* DB design decisions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        className="mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: "Zap", title: "WAL Mode", desc: "Write-Ahead Logging for concurrent reads during writes" },
          { icon: "ShieldCheck", title: "Prepared Statements", desc: "Parameterized queries prevent SQL injection attacks" },
          { icon: "Database", title: "CASCADE Deletes", desc: "Removing a student auto-deletes their attendance records" },
        ].map((item, i) => (
          <div key={i} className="p-2.5 rounded-lg" style={{ ...S.card }}>
            <div className="flex items-center gap-1.5 mb-1">
              {getIcon(item.icon, { size: 11, color: 'white' })}
              <span className="text-[10px] font-bold" style={{ color: S.white }}>{item.title}</span>
            </div>
            <p className="text-[9px]" style={{ color: S.muted }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9: DASHBOARD MOCKUP
// ═══════════════════════════════════════════════════════════════════════════

export const DashboardMockupSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Self-hosted web interface at localhost:3000">Web Dashboard</SlideTitle>
    <SlideContent>
      <div className="w-full rounded-xl overflow-hidden flex flex-col glow-card" style={{ maxHeight: '380px' }}>
        {/* Header */}
        <div className="h-10 flex items-center px-4 justify-between flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <CreditCard size={10} color="white" />
            </div>
            <span className="font-bold text-xs" style={{ color: S.white }}>AttendEase</span>
            <span className="text-[9px] font-mono" style={{ color: S.muted }}>Embedded Systems Lab</span>
          </div>
          <div className="flex gap-4 text-[10px]" style={{ color: S.muted }}>
            {DASHBOARD_DATA.navItems.map((item, i) => (
              <span key={i} style={i === 0 ? { color: S.white } : {}} className="cursor-pointer">{item}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-3 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.01)' }}>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {DASHBOARD_DATA.stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="p-2.5 rounded-lg" style={{ ...S.card }}>
                <div className="text-[9px] uppercase" style={{ color: S.muted }}>{stat.label}</div>
                <div className="text-lg font-bold stat-value">{stat.val}</div>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-lg overflow-hidden" style={{ ...S.card }}>
            <div className="grid grid-cols-4 p-2 text-[9px] font-bold uppercase" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: S.muted }}>
              <div>Time</div><div>Register No</div><div>Name</div><div>Status</div>
            </div>
            {DASHBOARD_DATA.recentScans.map((row, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                className="grid grid-cols-4 p-2 text-[11px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', color: S.dim }}>
                <div className="font-mono" style={{ color: S.muted }}>{row.time}</div>
                <div className="font-mono" style={{ color: S.white }}>{row.id}</div>
                <div>{row.name}</div>
                <div>
                  <span className="px-2 py-0.5 rounded text-[9px]" style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: S.white,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>{row.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-3 flex flex-wrap gap-2">
        {DASHBOARD_DATA.features.map((f, i) => (
          <span key={i} className="px-2.5 py-1 rounded-full text-[9px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: S.dim }}>
            ✓ {f}
          </span>
        ))}
      </motion.div>

      {/* Dashboard tech info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
        className="mt-2 grid grid-cols-4 gap-2">
        {[
          { label: "Auto-Refresh", value: "3s interval" },
          { label: "Theme Support", value: "Dark + Light" },
          { label: "Framework", value: "Vanilla JS" },
          { label: "Background", value: "WebGL Terminal" },
        ].map((item, i) => (
          <div key={i} className="p-2 rounded-lg text-center" style={{ ...S.card }}>
            <div className="text-[8px] uppercase" style={{ color: S.muted }}>{item.label}</div>
            <div className="text-[10px] font-mono font-bold" style={{ color: S.white }}>{item.value}</div>
          </div>
        ))}
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10: IMPLEMENTATION DETAILS
// ═══════════════════════════════════════════════════════════════════════════

export const ImplementationSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Technical stack & code architecture">Implementation Details</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Firmware */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <Cpu size={14} color="white" />
            <h3 className="font-bold text-xs" style={{ color: S.white }}>{IMPLEMENTATION_DATA.firmware.title}</h3>
          </div>
          <div className="p-2.5 space-y-1">
            {IMPLEMENTATION_DATA.firmware.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]" style={{ color: S.dim }}>
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                {f}
              </div>
            ))}
            <div className="mt-2 pt-2 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {IMPLEMENTATION_DATA.firmware.libraries.map((lib, i) => (
                <MiniTag key={i}>{lib}</MiniTag>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Server */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <Server size={14} color="white" />
            <h3 className="font-bold text-xs" style={{ color: S.white }}>{IMPLEMENTATION_DATA.server.title}</h3>
          </div>
          <div className="p-2.5 space-y-1">
            {IMPLEMENTATION_DATA.server.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]" style={{ color: S.dim }}>
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                {f}
              </div>
            ))}
            <div className="mt-2 pt-2 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {IMPLEMENTATION_DATA.server.techStack.map((lib, i) => (
                <MiniTag key={i}>{lib}</MiniTag>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Email */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <Mail size={14} color="white" />
            <h3 className="font-bold text-xs" style={{ color: S.white }}>{IMPLEMENTATION_DATA.email.title}</h3>
          </div>
          <div className="p-2.5 space-y-1">
            {IMPLEMENTATION_DATA.email.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]" style={{ color: S.dim }}>
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                {f}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <Monitor size={14} color="white" />
            <h3 className="font-bold text-xs" style={{ color: S.white }}>{IMPLEMENTATION_DATA.dashboard.title}</h3>
          </div>
          <div className="p-2.5 space-y-1">
            {IMPLEMENTATION_DATA.dashboard.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]" style={{ color: S.dim }}>
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* GitHub link */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-3 flex justify-center">
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
          style={{ ...S.card, textDecoration: 'none' }}>
          <GitBranch size={14} color="white" />
          <span className="text-xs font-mono" style={{ color: S.white }}>github.com/Kukyos/AttendEase</span>
          <ExternalLink size={10} color="rgba(255,255,255,0.4)" />
        </a>
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11: TECH STACK OVERVIEW (NEW)
// ═══════════════════════════════════════════════════════════════════════════

export const TechStackSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Complete technology breakdown">Tech Stack</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {TECH_STACK_DATA.categories.map((cat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="rounded-xl overflow-hidden glow-card">
            <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
              {getIcon(cat.icon, { size: 14, color: 'white' })}
              <h3 className="font-bold text-xs" style={{ color: S.white }}>{cat.title}</h3>
              <span className="ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: S.ghost, color: S.muted }}>{cat.items.length}</span>
            </div>
            <div className="p-2.5 space-y-2">
              {cat.items.map((item, i) => (
                <div key={i} className="pb-2" style={{ borderBottom: i < cat.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold" style={{ color: S.white }}>{item.name}</span>
                    <span className="text-[8px] font-mono" style={{ color: S.muted }}>{item.version}</span>
                  </div>
                  <p className="text-[9px]" style={{ color: S.muted }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Architecture flow */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="rounded-xl p-3" style={{ ...S.cardGlow }}>
        <h4 className="text-[10px] font-bold mb-2 flex items-center gap-2" style={{ color: S.white }}>
          <Layers size={12} /> System Integration Flow
        </h4>
        <div className="space-y-1 font-mono text-[10px]">
          {TECH_STACK_DATA.architecture.lines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
              className="flex items-center gap-2">
              <span className="text-[8px] w-4 text-right" style={{ color: S.muted }}>{i + 1}.</span>
              <span style={{ color: S.dim }}>{line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="mt-3 grid grid-cols-6 gap-2">
        {[
          { label: "Languages", value: "3", desc: "C++, JS, HTML/CSS" },
          { label: "Dependencies", value: "6", desc: "npm packages" },
          { label: "DB Engine", value: "SQLite", desc: "Embedded" },
          { label: "Protocol", value: "SPI", desc: "Hardware bus" },
          { label: "Wireless", value: "WiFi", desc: "802.11 b/g/n" },
          { label: "Email", value: "AJAX", desc: "FormSubmit.co" },
        ].map((item, i) => (
          <div key={i} className="text-center p-2 rounded-lg" style={{ ...S.card }}>
            <div className="text-xs font-bold stat-value">{item.value}</div>
            <div className="text-[8px] uppercase" style={{ color: S.muted }}>{item.label}</div>
            <div className="text-[7px]" style={{ color: 'rgba(255,255,255,0.15)' }}>{item.desc}</div>
          </div>
        ))}
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 12: CODE WALKTHROUGH (NEW)
// ═══════════════════════════════════════════════════════════════════════════

const CodeBlock = ({ snippet, delay = 0 }: { snippet: typeof CODE_SNIPPETS.esp32, delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="rounded-xl overflow-hidden glow-card flex flex-col">
    <div className="p-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
      <FileCode size={12} color="white" />
      <h4 className="font-bold text-[10px]" style={{ color: S.white }}>{snippet.title}</h4>
      <span className="ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: S.ghost, color: S.muted }}>{snippet.language}</span>
    </div>
    <pre className="p-3 flex-1 overflow-auto" style={{ background: 'rgba(0,0,0,0.3)', margin: 0 }}>
      <code className="font-mono text-[9px] leading-relaxed whitespace-pre" style={{ color: S.dim }}>
        {snippet.code}
      </code>
    </pre>
  </motion.div>
);

export const CodeWalkthroughSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Key code segments from each layer">Code Walkthrough</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <CodeBlock snippet={CODE_SNIPPETS.esp32} delay={0.1} />
        <CodeBlock snippet={CODE_SNIPPETS.server} delay={0.2} />
        <CodeBlock snippet={CODE_SNIPPETS.email} delay={0.3} />
      </div>

      {/* Key patterns */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-3 grid grid-cols-4 gap-2">
        {[
          { icon: "ShieldCheck", title: "Prepared Statements", desc: "All SQL uses parameterized queries" },
          { icon: "Clock", title: "Dual Cooldown", desc: "3s on ESP32, 5min on server" },
          { icon: "Wifi", title: "Auto-Reconnect", desc: "ESP32 retries WiFi on drop" },
          { icon: "Mail", title: "Async Email", desc: "fetch() doesn't block response" },
        ].map((item, i) => (
          <div key={i} className="p-2.5 rounded-lg" style={{ ...S.card }}>
            <div className="flex items-center gap-1.5 mb-1">
              {getIcon(item.icon, { size: 11, color: 'white' })}
              <span className="text-[10px] font-bold" style={{ color: S.white }}>{item.title}</span>
            </div>
            <p className="text-[9px]" style={{ color: S.muted }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 13: RESULTS
// ═══════════════════════════════════════════════════════════════════════════

export const ResultsSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Performance data & analysis">Results & Outcomes</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Metrics + Benefits */}
        <div className="space-y-3">
          <div className="space-y-2.5">
            {RESULTS_DATA.metrics.map((m, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.12 }}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span style={{ color: S.dim }}>{m.label}</span>
                  <span style={{ color: S.white }}>{m.value}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.percent}%` }} transition={{ delay: 0.4 + idx * 0.15, duration: 0.8 }}
                    className="h-full rounded-full" style={{ background: 'rgba(255,255,255,0.45)' }} />
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-bold mb-1.5" style={{ color: S.white }}>Key Benefits</h3>
            <ul className="space-y-1">
              {RESULTS_DATA.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-[10px]" style={{ color: S.dim }}>
                  <CheckCircle size={10} color="white" className="flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testing results */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} 
            className="rounded-xl overflow-hidden glow-card">
            <div className="p-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Activity size={11} color="white" />
              <h4 className="font-bold text-[10px]" style={{ color: S.white }}>Test Results</h4>
            </div>
            <div className="p-2 space-y-1">
              {RESULTS_DATA.testingResults.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-[9px] py-0.5" style={{ borderBottom: i < RESULTS_DATA.testingResults.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <span style={{ color: S.dim }}>{t.test}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono" style={{ color: S.muted }}>{t.result}</span>
                    <CheckCircle size={9} color="rgba(255,255,255,0.5)" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Comparison Table */}
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="rounded-xl overflow-hidden glow-card">
          <div className="p-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-bold text-xs" style={{ color: S.white }}>System Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {RESULTS_DATA.comparison.headers.map((h, i) => (
                    <th key={i} className="p-2 text-left font-bold text-[9px] uppercase" style={{ color: i === 3 ? S.white : S.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESULTS_DATA.comparison.rows.map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-2" style={{ color: j === 0 ? S.dim : j === 3 ? S.white : S.muted }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 14: CONCLUSION & FUTURE SCOPE
// ═══════════════════════════════════════════════════════════════════════════

export const ConclusionSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Summary & forward-looking vision">Conclusion & Future Scope</SlideTitle>
    <SlideContent className="max-w-5xl mx-auto">
      <p className="text-sm leading-relaxed mb-4 text-center" style={{ color: S.dim }}>
        {CONCLUSION_DATA.summary}
      </p>

      {/* Achievement stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="grid grid-cols-6 gap-2 mb-4">
        {CONCLUSION_DATA.achievements.map((a, i) => (
          <div key={i} className="text-center p-2 rounded-lg" style={{ ...S.cardGlow }}>
            <div className="text-sm font-bold stat-value">{a.value}</div>
            <div className="text-[8px] uppercase" style={{ color: S.muted }}>{a.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Future Scope */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3 rounded-xl glow-card">
          <h4 className="font-bold text-xs mb-2.5 flex items-center gap-2" style={{ color: S.white }}><Zap size={14} /> Future Scope</h4>
          <div className="space-y-2">
            {CONCLUSION_DATA.futureScope.map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-[2px] rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <h5 className="text-xs font-medium" style={{ color: S.white }}>{item.title}</h5>
                  <p className="text-[9px]" style={{ color: S.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scalability */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-3 rounded-xl glow-card">
          <h4 className="font-bold text-xs mb-2.5 flex items-center gap-2" style={{ color: S.white }}><BarChart3 size={14} /> Scalability</h4>
          <div className="space-y-2">
            {CONCLUSION_DATA.scalability.map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-[2px] rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.10)' }} />
                <div>
                  <h5 className="text-xs font-medium" style={{ color: S.white }}>{item.title}</h5>
                  <p className="text-[9px]" style={{ color: S.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 15: REFERENCES
// ═══════════════════════════════════════════════════════════════════════════

export const ReferenceSlide = () => (
  <SlideContainer>
    <SlideTitle sub="Sources & documentation">References</SlideTitle>
    <SlideContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {REFERENCES.map((ref, idx) => (
          <motion.div key={ref.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex gap-3 items-start py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <span className="font-bold text-xs flex-shrink-0 w-5 text-center" style={{ color: S.white }}>[{ref.id}]</span>
            <div className="flex-1">
              <span className="text-[10px]" style={{ color: S.dim }}>
                {ref.author}, "{ref.title}"
                {(ref as any).journal && <>, <em>{(ref as any).journal}</em></>}
                , {ref.year}.
              </span>
              <a href={ref.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-2 text-[9px] transition-colors hover:opacity-80"
                style={{ color: S.white, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                <ExternalLink size={9} /> Link
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-5 flex justify-center">
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:opacity-80"
          style={{ ...S.cardGlow, textDecoration: 'none' }}>
          <GitBranch size={18} color="white" />
          <div>
            <div className="text-sm font-bold" style={{ color: S.white }}>View Full Source Code</div>
            <div className="text-[10px] font-mono" style={{ color: S.muted }}>{REPO_URL}</div>
          </div>
          <ExternalLink size={14} color="rgba(255,255,255,0.4)" />
        </a>
      </motion.div>
    </SlideContent>
  </SlideContainer>
);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 16: LIVE DEMO (NEW)
// ═══════════════════════════════════════════════════════════════════════════

export const DemoSlide = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <SlideContainer>
      <SlideTitle sub="Try the AttendEase dashboard — running live on localhost:3000">
        Live Demo
      </SlideTitle>
      <SlideContent className="items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="w-full flex-1 rounded-xl overflow-hidden relative" style={{ ...S.cardGlow, minHeight: '420px' }}>
          
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </div>
            <div className="flex-1 mx-4">
              <div className="px-3 py-1 rounded-md text-[10px] font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: S.muted }}>
                {DEMO_URL}
              </div>
            </div>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: S.white, textDecoration: 'none' }}>
              <ExternalLink size={10} /> Open in Tab
            </a>
          </div>

          {/* Loading overlay */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: 'rgba(0,0,0,0.8)', top: '32px' }}>
              <div className="w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.5)' }} />
              <p className="text-xs font-mono" style={{ color: S.muted }}>Loading AttendEase Dashboard...</p>
              <p className="text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.15)' }}>Make sure the server is running on port 3000</p>
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={DEMO_URL}
            onLoad={() => setLoaded(true)}
            className="w-full border-0"
            style={{ height: 'calc(100% - 32px)', background: '#06060a' }}
            title="AttendEase Live Demo"
          />
        </motion.div>

        {/* Bottom controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-3 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: loaded ? 'rgba(80,200,120,0.1)' : 'rgba(255,100,100,0.1)', border: `1px solid ${loaded ? 'rgba(80,200,120,0.2)' : 'rgba(255,100,100,0.2)'}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: loaded ? '#50c878' : '#ff6464' }} />
              <span className="text-[9px] font-medium" style={{ color: loaded ? '#50c878' : '#ff6464' }}>{loaded ? 'Connected' : 'Connecting...'}</span>
            </div>
            <span className="text-[9px] font-mono" style={{ color: S.muted }}>localhost:3000</span>
          </div>
          <div className="flex gap-2">
            {["Register Students", "Tap RFID Card", "View Attendance", "Check Stats"].map((item, i) => (
              <span key={i} className="px-2 py-1 rounded text-[8px]" style={{ background: S.ghost, color: S.muted }}>
                {i + 1}. {item}
              </span>
            ))}
          </div>
        </motion.div>
      </SlideContent>
    </SlideContainer>
  );
};
