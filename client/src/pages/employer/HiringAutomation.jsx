import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
    FiFileText, FiShare2, FiCpu, FiCalendar, 
    FiMail, FiAward, FiDatabase, FiBarChart2, 
    FiLink, FiShield, FiCheckCircle, FiTrendingUp, FiSearch, FiZap
} from "react-icons/fi";
import mavenLogo from "../../../assets/maven-logo-BdiSsfJk.svg";

const WORKFLOW_STEPS = [
    { id: 1, icon: <FiFileText />, title: "Job Requisition", sub: "Auto-created from HRMS", status: "complete", color: "#A3E635" },
    { id: 2, icon: <FiShare2 />, title: "Multi-board Posting", sub: "Published to 30+ boards", status: "complete", color: "#A3E635" },
    { id: 3, icon: <FiCpu />, title: "AI Resume Screening", sub: "Scoring 1,240 applicants", status: "active", color: "#1a3566" },
    { id: 4, icon: <FiCalendar />, title: "Auto-Scheduling", sub: "Calendars synced", status: "pending", color: "#CBD5E1" },
    { id: 5, icon: <FiMail />, title: "Offer Generation", sub: "Template ready", status: "pending", color: "#CBD5E1" },
    { id: 6, icon: <FiAward />, title: "Onboarding Kick-off", sub: "Day-1 kit auto-sent", status: "pending", color: "#CBD5E1" },
];

const METRICS = [
    { label: "Time saved per hire", val: "18h", change: "↓ 74%", pos: true },
    { label: "Cost per hire", val: "₹8.2K", change: "↓ 61%", pos: true },
    { label: "Screening accuracy", val: "97.3%", change: "↑ from 71%", pos: true },
    { label: "Avg. days to offer", val: "6.4d", change: "↓ from 28d", pos: true },
];

const FEATURES = [
    { icon: <FiDatabase />, title: "AI-powered CV parsing", desc: "Extract structured data from any resume format. Skills, experience, education — all tagged and searchable in milliseconds." },
    { icon: <FiMail />, title: "Automated candidate comms", desc: "Personalised emails at every stage. Acknowledgements, rejections, interview invites — all sent on autopilot with your brand voice." },
    { icon: <FiCalendar />, title: "Interview scheduling engine", desc: "Candidates self-schedule from real-time interviewer availability. No back-and-forth. No no-shows. Average booking time: 4 minutes." },
    { icon: <FiBarChart2 />, title: "Hiring analytics & reports", desc: "Pipeline health, funnel drop-off, diversity metrics, and time-to-hire — all in a single live dashboard your CFO will love." },
    { icon: <FiLink />, title: "40+ ATS/HRMS integrations", desc: "Plug straight into Greenhouse, Workday, SAP, BambooHR, Zoho, and 35+ more. Your data flows, nothing breaks." },
    { icon: <FiShield />, title: "Compliance automation", desc: "GDPR-compliant candidate data handling, auto-deletion schedules, and audit trails — so your legal team sleeps well." },
];

const TESTIMONIALS = [
    { quote: "We reduced time-to-hire by 70% in the first quarter. The AI screening alone saved my team 300 hours.", name: "Pooja Srinivasan", role: "Head of Talent, Razorpay", initials: "PS", bg: "#1a3566" },
    { quote: "The scheduling automation is magical. Candidates book their own slots and the whole process just... flows.", name: "Aryan Kapoor", role: "VP HR, PhonePe", initials: "AK", bg: "#0D9488" },
    { quote: "MavenJobs Automation paid for itself in 6 weeks. We're now hiring 3x the volume with the same team size.", name: "Riya Malhotra", role: "Talent Lead, Meesho", initials: "RM", bg: "#7C3AED" },
];

const PLANS = [
    { name: "Scale", price: "₹24,999", desc: "For growing teams", feats: ["Up to 50 active roles", "AI screening + scoring", "Email automation", "Basic analytics", "Email support"], hl: false },
    { name: "Enterprise", price: "Custom", desc: "For large organisations", feats: ["Unlimited roles", "Full workflow automation", "Custom integrations", "Advanced analytics", "Dedicated CSM + SLA"], hl: true },
];

export default function HiringAutomation() {
    const heroRef = useRef(null);
    const workflowRef = useRef(null);
    const featRef = useRef(null);
    const testRef = useRef(null);
    const [activeStep, setActiveStep] = useState(3);

    useEffect(() => {
        const load = async () => {
            await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
            await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            if (!gsap) return;
            gsap.registerPlugin(ScrollTrigger);

            // Hero
            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(".ha-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
                .from(".ha-word", { opacity: 0, y: 60, stagger: 0.07, duration: 0.9 }, "-=0.3")
                .from(".ha-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
                .from(".ha-cta-row", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
                .from(".ha-metric-card", { opacity: 0, y: 30, stagger: 0.1, duration: 0.6 }, "-=0.2");

            // Workflow steps
            gsap.from(".ha-wf-step", {
                scrollTrigger: { trigger: workflowRef.current, start: "top 75%" },
                opacity: 0, x: -40, stagger: 0.12, duration: 0.7, ease: "power2.out"
            });

            // Features
            gsap.from(".ha-feat-card", {
                scrollTrigger: { trigger: featRef.current, start: "top 75%" },
                opacity: 0, y: 50, stagger: 0.1, duration: 0.7, ease: "back.out(1.2)"
            });

            // Testimonials
            gsap.from(".ha-test-card", {
                scrollTrigger: { trigger: testRef.current, start: "top 80%" },
                opacity: 0, scale: 0.94, stagger: 0.12, duration: 0.7, ease: "power2.out"
            });

            // Pulse the active workflow step
            gsap.to(".ha-active-pulse", {
                scale: 1.15, opacity: 0.5, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut"
            });

            // Animated counter numbers
            const countEls = document.querySelectorAll(".ha-anim-num");
            countEls.forEach(el => {
                const target = parseFloat(el.dataset.target);
                gsap.fromTo(el, { textContent: 0 }, {
                    scrollTrigger: { trigger: el, start: "top 85%" },
                    textContent: target, duration: 2, ease: "power2.out",
                    snap: { textContent: target < 10 ? 0.1 : 1 },
                    onUpdate: function () {
                        const v = parseFloat(el.textContent);
                        el.textContent = target < 10 ? v.toFixed(1) : Math.round(v);
                    }
                });
            });
        };
        load();
    }, []);

    const S = {
        root: { fontFamily: "'Outfit', sans-serif", background: "#fff", color: "#0A1628", overflowX: "hidden" },
        nav: { position: "fixed", top: 0, left: 0, right: 0, height: 68, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E8EDFF", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", zIndex: 200 },
        navBrand: { fontWeight: 900, fontSize: 22, color: "#1a3566", display: "flex", alignItems: "center", gap: 8 },

        hero: { paddingTop: 68, background: "#F8FAFF", minHeight: "100vh", display: "flex", alignItems: "center" },
        heroInner: { maxWidth: 1280, margin: "0 auto", padding: "80px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" },
        eyebrow: { display: "inline-flex", alignItems: "center", gap: 8, background: "#0A1628", color: "#A3E635", borderRadius: 999, padding: "7px 16px", fontSize: 12.5, fontWeight: 800, marginBottom: 20, letterSpacing: 0.4 },
        heroH1: { fontSize: "clamp(36px,4vw,58px)", fontWeight: 900, letterSpacing: -2, color: "#0A1628", lineHeight: 1.06, marginBottom: 22 },
        heroAccent: { color: "#1a3566", position: "relative" },
        heroAccentUnder: { position: "absolute", bottom: -4, left: 0, right: 0, height: 4, background: "#A3E635", borderRadius: 2 },
        heroSub: { fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 36, maxWidth: 500 },
        ctaRow: { display: "flex", gap: 14, flexWrap: "wrap" },
        heroBtnPrimary: { padding: "14px 30px", borderRadius: 11, border: "none", background: "#1a3566", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(26,53,102,0.25)", transition: "all 0.2s" },
        heroBtnGreen: { padding: "14px 30px", borderRadius: 11, border: "2.5px solid #A3E635", background: "#A3E635", color: "#0A1628", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" },

        metricsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
        metricCard: { background: "#fff", border: "1.5px solid #E8EDFF", borderRadius: 16, padding: "20px 22px", boxShadow: "0 4px 20px rgba(26,53,102,0.06)" },
        metricVal: { fontSize: 38, fontWeight: 900, letterSpacing: -1.5, color: "#0A1628", lineHeight: 1, marginBottom: 4 },
        metricChange: { fontSize: 12.5, fontWeight: 700, color: "#059669", background: "#ECFDF5", borderRadius: 999, padding: "3px 9px", display: "inline-block", marginBottom: 6 },
        metricLabel: { fontSize: 13, color: "#64748B", fontWeight: 500 },

        statsRow: { background: "#0A1628", padding: "56px 60px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, maxWidth: "100%" },

        section: { maxWidth: 1280, margin: "0 auto", padding: "80px 60px" },
        sectionEye: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.12em", color: "#A3E635", background: "#0A1628", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 14 },
        sectionH2: { fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: -1.5, color: "#0A1628", marginBottom: 12 },
        sectionSub: { fontSize: 16, color: "#64748B", maxWidth: 560, lineHeight: 1.7 },

        wfSection: { background: "#0A1628", padding: "80px 0" },
        wfInner: { maxWidth: 1280, margin: "0 auto", padding: "0 60px" },
        wfEye: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.12em", color: "#A3E635", background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 14 },
        wfH2: { fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: -1.5, color: "#fff", marginBottom: 48 },
        wfList: { display: "flex", flexDirection: "column", gap: 0 },
        wfStep: { display: "flex", alignItems: "center", gap: 24, padding: "20px 0", cursor: "pointer", borderRadius: 14, transition: "all 0.2s" },
        wfIconWrap: { width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, position: "relative" },
        wfActivePulse: { position: "absolute", inset: -6, borderRadius: 18, background: "rgba(163,230,53,0.2)", zIndex: -1 },
        wfStepInfo: { flex: 1 },
        wfStepTitle: { fontSize: 17, fontWeight: 800, marginBottom: 3 },
        wfStepSub: { fontSize: 13.5, fontWeight: 500 },
        wfConnector: { width: 2, height: 24, background: "rgba(255,255,255,0.08)", marginLeft: 25 },

        featGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 52 },
        featCard: { background: "#fff", border: "1.5px solid #E8EDFF", borderRadius: 20, padding: "32px 28px", transition: "all 0.25s" },
        featIcon: { fontSize: 32, marginBottom: 16, display: "block" },
        featTitle: { fontSize: 18, fontWeight: 800, color: "#0A1628", marginBottom: 8, letterSpacing: -0.4 },
        featDesc: { fontSize: 14.5, color: "#64748B", lineHeight: 1.7 },

        testSection: { background: "linear-gradient(180deg, #F8FAFF 0%, #fff 100%)", padding: "80px 0" },
        testInner: { maxWidth: 1280, margin: "0 auto", padding: "0 60px" },
        testGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 48 },
        testCard: { background: "#fff", border: "1.5px solid #E8EDFF", borderRadius: 22, padding: "32px 28px", boxShadow: "0 4px 20px rgba(26,53,102,0.05)" },
        testQuote: { fontSize: 15.5, color: "#334155", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" },
        testAuthor: { display: "flex", alignItems: "center", gap: 14 },
        testAvatar: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", flexShrink: 0 },
        testName: { fontWeight: 800, fontSize: 14.5, color: "#0A1628", marginBottom: 2 },
        testRole: { fontSize: 12.5, color: "#94A3B8" },
        testStars: { fontSize: 14, color: "#F59E0B", marginBottom: 16 },

        plansSection: { maxWidth: 1280, margin: "0 auto", padding: "80px 60px" },
        plansGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 52, maxWidth: 860 },
        planCard: { background: "#fff", border: "1.5px solid #E8EDFF", borderRadius: 22, padding: "36px 32px" },
        planCardHL: { background: "linear-gradient(145deg,#0A1628,#1a3566)", border: "none" },
        planName: { fontSize: 24, fontWeight: 900, color: "#0A1628", marginBottom: 4 },
        planNameHL: { color: "#fff" },
        planPrice: { fontSize: 42, fontWeight: 900, color: "#1a3566", letterSpacing: -2, marginBottom: 6 },
        planPriceHL: { color: "#A3E635" },
        planDesc: { fontSize: 14, color: "#94A3B8", marginBottom: 22 },
        planDescHL: { color: "rgba(255,255,255,0.5)" },
        planDivider: { height: 1, background: "#F1F5F9", margin: "18px 0" },
        planDividerHL: { background: "rgba(255,255,255,0.1)" },
        planFeat: { display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#334155", marginBottom: 11 },
        planFeatHL: { color: "rgba(255,255,255,0.8)" },
        planCheck: { width: 20, height: 20, borderRadius: 6, background: "#EFF8D1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 },
        planCheckHL: { background: "rgba(163,230,53,0.2)" },
        planBtn: { width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "#A3E635", color: "#0A1628", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit", marginTop: 22, transition: "all 0.2s" },

        ctaBand: { background: "#0A1628", margin: "0 60px 80px", borderRadius: 28, padding: "72px 80px", position: "relative", overflow: "hidden" },
        ctaGlow: { position: "absolute", top: "50%", left: "10%", transform: "translateY(-50%)", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.18), transparent 70%)", pointerEvents: "none" },
        ctaRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, position: "relative", zIndex: 1 },
        ctaH2: { fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: -1.5, marginBottom: 12, lineHeight: 1.1 },
        ctaAccent: { color: "#A3E635" },
        ctaSub: { fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 440 },
        ctaBtn: { padding: "16px 40px", borderRadius: 12, border: "none", background: "#A3E635", color: "#0A1628", fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 8px 28px rgba(163,230,53,0.3)" },

        footer: { borderTop: "1px solid #F1F5F9", padding: "28px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1280, margin: "0 auto" },
        footerBrand: { fontWeight: 900, fontSize: 18, color: "#1a3566" },
        footerLinks: { display: "flex", gap: 28, fontSize: 13.5, color: "#94A3B8", fontWeight: 500 },
        footerCopy: { fontSize: 12.5, color: "#CBD5E1" },
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <div style={S.root}>
                {/* NAV */}
                <nav style={S.nav}>
                    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                        <img src={mavenLogo} alt="Maven Jobs" style={{ height: 36 }} />
                    </Link>
                    <div style={{ display: "flex", gap: 28 }}>
                        {["Our offerings", "Solutions", "How it works", "Resources"].map(l => (
                            <span key={l} style={{ fontSize: 14.5, fontWeight: 600, color: "#334155", cursor: "pointer" }}>{l}</span>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button style={{ padding: "9px 22px", borderRadius: 9, border: "2px solid #1a3566", background: "transparent", color: "#1a3566", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Buy online</button>
                        <button style={{ padding: "9px 22px", borderRadius: 9, border: "none", background: "#1a3566", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Post a job</button>
                    </div>
                </nav>

                {/* HERO */}
                <section ref={heroRef} style={S.hero}>
                    <div style={S.heroInner}>
                        <div>
                            <div className="ha-eyebrow" style={{ ...S.eyebrow, display: "flex", alignItems: "center", gap: 8 }}><FiCpu /> AI-Powered Hiring Automation</div>
                            <h1 style={S.heroH1}>
                                {["Hire", "smarter."].map(w => <span key={w} className="ha-word" style={{ display: "inline-block", marginRight: "0.2em" }}>{w}</span>)}
                                <br />
                                {["Work", "less."].map(w => <span key={w} className="ha-word" style={{ display: "inline-block", marginRight: "0.2em", color: w === "less." ? "#1a3566" : "#0A1628" }}>{w}</span>)}
                                <br />
                                <span className="ha-word" style={{ display: "inline-block", position: "relative", marginRight: "0.1em" }}>
                                    <span style={{ position: "relative", zIndex: 1, color: "#0A1628" }}>Hire faster</span>
                                    <span style={S.heroAccentUnder} />
                                </span>
                                <span className="ha-word" style={{ display: "inline-block", color: "#A3E635" }}>.</span>
                            </h1>
                            <p className="ha-sub" style={S.heroSub}>Automate every step of recruitment — from posting to onboarding. Reduce time-to-hire by 74% and cost-per-hire by 61%.</p>
                            <div className="ha-cta-row" style={S.ctaRow}>
                                <button style={S.heroBtnPrimary}>Start Automating — Free</button>
                                <button style={S.heroBtnGreen}>Book a Demo</button>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {METRICS.map((m, i) => (
                                <div key={i} className="ha-metric-card" style={S.metricCard}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div style={S.metricVal}>{m.val}</div>
                                        <span style={S.metricChange}>{m.change}</span>
                                    </div>
                                    <div style={S.metricLabel}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WORKFLOW */}
                <div ref={workflowRef} style={S.wfSection}>
                    <div style={S.wfInner}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
                            <div>
                                <div style={S.wfEye}>AUTOMATION WORKFLOW</div>
                                <h2 style={S.wfH2}>Your entire pipeline,<br />on autopilot</h2>
                                <div style={S.wfList}>
                                    {WORKFLOW_STEPS.map((step, i) => (
                                        <div key={step.id}>
                                            <div
                                                className="ha-wf-step"
                                                style={{
                                                    ...S.wfStep,
                                                    background: activeStep === step.id ? "rgba(255,255,255,0.06)" : "transparent",
                                                    padding: "20px 16px",
                                                }}
                                                onClick={() => setActiveStep(step.id)}
                                            >
                                                <div style={{ ...S.wfIconWrap, background: step.status === "complete" ? "rgba(163,230,53,0.15)" : step.status === "active" ? "#1a3566" : "rgba(255,255,255,0.05)", border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <span style={{ fontSize: 20, display: "flex", alignItems: "center" }}>{step.icon}</span>
                                                    {step.status === "active" && <div className="ha-active-pulse" style={S.wfActivePulse} />}
                                                </div>
                                                <div style={S.wfStepInfo}>
                                                    <div style={{ ...S.wfStepTitle, color: step.status === "pending" ? "rgba(255,255,255,0.35)" : "#fff" }}>{step.title}</div>
                                                    <div style={{ ...S.wfStepSub, color: step.status === "active" ? "#A3E635" : "rgba(255,255,255,0.4)" }}>{step.sub}</div>
                                                </div>
                                                {step.status === "complete" && <span style={{ fontSize: 12, fontWeight: 800, color: "#A3E635", background: "rgba(163,230,53,0.12)", padding: "3px 10px", borderRadius: 999 }}>Done</span>}
                                                {step.status === "active" && <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: "#1a3566", padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(163,230,53,0.3)" }}>Running</span>}
                                            </div>
                                            {i < WORKFLOW_STEPS.length - 1 && <div style={S.wfConnector} />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: detail panel */}
                            <div style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "32px 28px" }}>
                                {(() => {
                                    const s = WORKFLOW_STEPS.find(x => x.id === activeStep);
                                    return (
                                        <div>
                                            <div style={{ fontSize: 52, marginBottom: 20, color: s.color }}>{s.icon}</div>
                                            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: -0.5 }}>{s.title}</div>
                                            <div style={{ height: 3, width: 48, background: "#A3E635", borderRadius: 2, marginBottom: 18 }} />
                                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 24 }}>
                                                {s.id === 1 && "When a new role opens in your HRMS, MavenJobs automatically drafts a job description, pre-fills requirements, and routes it for manager approval — in under 2 minutes."}
                                                {s.id === 2 && "Your approved JD is simultaneously pushed to MavenJobs, LinkedIn, Indeed, Naukri, and 26 other boards. One click. Maximum reach."}
                                                {s.id === 3 && "Our AI reads every resume, scores candidates against 60+ criteria, flags red/green signals, and ranks the top 10% to the front of your queue. Currently processing 1,240 applicants."}
                                                {s.id === 4 && "Shortlisted candidates receive a branded invite and pick from your interviewers' real-time calendar slots. Average time from shortlist to scheduled: 4 minutes."}
                                                {s.id === 5 && "Generate compliant, personalised offer letters with a single click. Pre-loaded with salary, benefits, and start date. Sent and tracked automatically."}
                                                {s.id === 6 && "On day one, the new hire receives their equipment requests, system access checklist, and welcome kit — all triggered the moment they accept the offer."}
                                            </p>
                                            <div style={{ display: "flex", gap: 12 }}>
                                                <div style={{ background: s.status === "complete" ? "rgba(163,230,53,0.1)" : s.status === "active" ? "rgba(26,53,102,0.5)" : "rgba(255,255,255,0.04)", border: `1px solid ${s.color}`, borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, color: s.color, display: "flex", alignItems: "center", gap: 8 }}>
                                                    Status: 
                                                    {s.status === "complete" ? <><FiCheckCircle /> Complete</> : 
                                                     s.status === "active" ? <><FiZap /> Running</> : 
                                                     <><FiClock /> Pending</>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURES */}
                <div ref={featRef} style={S.section}>
                    <div style={S.sectionEye}>PLATFORM FEATURES</div>
                    <h2 style={S.sectionH2}>Every tool your recruiters<br />never knew they needed</h2>
                    <p style={S.sectionSub}>Purpose-built automation that works with your existing stack — not against it.</p>
                    <div style={S.featGrid}>
                        {FEATURES.map((f, i) => (
                            <div key={i} className="ha-feat-card" style={S.featCard}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#A3E635"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(26,53,102,0.1)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8EDFF"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                            >
                                <span style={S.featIcon}>{f.icon}</span>
                                <div style={S.featTitle}>{f.title}</div>
                                <div style={S.featDesc}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TESTIMONIALS */}
                <div ref={testRef} style={S.testSection}>
                    <div style={S.testInner}>
                        <div style={S.sectionEye}>WHAT CUSTOMERS SAY</div>
                        <h2 style={S.sectionH2}>Loved by India's fastest-<br />growing companies</h2>
                        <div style={S.testGrid}>
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="ha-test-card" style={S.testCard}>
                                    <div style={S.testStars}>★★★★★</div>
                                    <p style={S.testQuote}>"{t.quote}"</p>
                                    <div style={S.testAuthor}>
                                        <div style={{ ...S.testAvatar, background: t.bg }}>{t.initials}</div>
                                        <div>
                                            <div style={S.testName}>{t.name}</div>
                                            <div style={S.testRole}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PLANS */}
                <div style={S.plansSection}>
                    <div style={S.sectionEye}>PRICING</div>
                    <h2 style={S.sectionH2}>Choose your level<br />of automation</h2>
                    <div style={S.plansGrid}>
                        {PLANS.map((p, i) => (
                            <div key={i} style={i === 1 ? { ...S.planCard, ...S.planCardHL } : S.planCard}>
                                <div style={i === 1 ? { ...S.planName, ...S.planNameHL } : S.planName}>{p.name}</div>
                                <div style={i === 1 ? { ...S.planPrice, ...S.planPriceHL } : S.planPrice}>{p.price}</div>
                                <div style={i === 1 ? { ...S.planDesc, ...S.planDescHL } : S.planDesc}>{p.desc}</div>
                                <div style={i === 1 ? { ...S.planDivider, ...S.planDividerHL } : S.planDivider} />
                                {p.feats.map((f, fi) => (
                                    <div key={fi} style={i === 1 ? { ...S.planFeat, ...S.planFeatHL } : S.planFeat}>
                                        <div style={i === 1 ? { ...S.planCheck, ...S.planCheckHL } : S.planCheck}>✓</div>
                                        {f}
                                    </div>
                                ))}
                                <button style={S.planBtn}>{i === 1 ? "Contact Sales" : "Start Free Trial"}</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA BAND */}
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <div style={S.ctaBand}>
                        <div style={S.ctaGlow} />
                        <div style={S.ctaRow}>
                            <div>
                                <h2 style={S.ctaH2}>Your next hire is<br /><span style={S.ctaAccent}>already waiting.</span></h2>
                                <p style={S.ctaSub}>Join 40,000+ companies using MavenJobs to automate their recruitment and hire 3× faster.</p>
                            </div>
                            <button style={S.ctaBtn}>Start Free — No Credit Card</button>
                        </div>
                    </div>
                </div>

                <div style={S.footer}>
                    <div style={S.footerBrand}>MAVENJOBS</div>
                    <div style={S.footerLinks}>
                        {["Privacy", "Terms", "Support", "Sitemap"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
                    </div>
                    <div style={S.footerCopy}>© 2025 MavenJobs. All rights reserved.</div>
                </div>
            </div>
        </>
    );
}