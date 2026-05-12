import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiBarChart2 } from "react-icons/fi";
import mavenLogo from "../../../assets/maven-logo-BdiSsfJk.svg";

const NAV_LINKS = ["Our offerings", "Solutions", "How it works", "Resources"];

const PLANS = [
    {
        name: "Starter",
        price: "₹4,999",
        period: "/month",
        tag: "Best for SMBs",
        tagColor: "#A3E635",
        features: [
            "5 Active Job Postings",
            "500 Applications/month",
            "Basic Candidate Filters",
            "Email Notifications",
            "7-day Free Trial",
        ],
        cta: "Start Free Trial",
        highlight: false,
    },
    {
        name: "Growth",
        price: "₹14,999",
        period: "/month",
        tag: "Most Popular",
        tagColor: "#A3E635",
        features: [
            "25 Active Job Postings",
            "Unlimited Applications",
            "Advanced AI Filters",
            "Priority Listing Boost",
            "Dedicated Account Manager",
            "Analytics Dashboard",
        ],
        cta: "Get Started",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        tag: "For Large Teams",
        tagColor: "#60A5FA",
        features: [
            "Unlimited Postings",
            "Custom Integrations (ATS/HRMS)",
            "White-label Career Page",
            "SLA-backed Support",
            "Bulk Import/Export",
            "Dedicated CSM",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
];

const STATS = [
    { val: "10Cr+", label: "Active Jobseekers" },
    { val: "48h", label: "Avg. Time to First Apply" },
    { val: "4.8×", label: "Faster Hiring" },
    { val: "98%", label: "Employer Satisfaction" },
];

const HOW = [
    { n: "01", title: "Create your posting", desc: "Fill in job details, requirements, and culture. Our AI suggests missing fields to maximise visibility." },
    { n: "02", title: "Reach qualified talent", desc: "Your listing is promoted across MavenJobs feed, email digests, and partner job boards instantly." },
    { n: "03", title: "Screen & shortlist", desc: "Smart filters and AI ranking surface the top 10% of applicants in your dashboard automatically." },
    { n: "04", title: "Interview & hire", desc: "Schedule directly, share feedback with your team, and extend offers — all inside one platform." },
];

const FAQS = [
    { q: "How quickly does my job go live?", a: "Within 60 seconds of submission. No manual review required for standard postings." },
    { q: "Can I edit a live posting?", a: "Yes, all changes reflect immediately. You can pause, edit, or close postings at any time." },
    { q: "Do you integrate with our ATS?", a: "We support 40+ ATS integrations including Greenhouse, Lever, Workday, and SAP SuccessFactors." },
    { q: "What happens after my plan expires?", a: "Your postings are paused (not deleted). Upgrade anytime to reactivate with full history intact." },
];

export default function JobPosting() {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const howRef = useRef(null);
    const plansRef = useRef(null);
    const faqRef = useRef(null);
    const openFaq = useRef(null);

    useEffect(() => {
        let gsap, ScrollTrigger;
        const load = async () => {
            const g = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
            const st = await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
            gsap = window.gsap;
            ScrollTrigger = window.ScrollTrigger;
            if (!gsap) return;
            gsap.registerPlugin(ScrollTrigger);

            // Hero
            const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
            heroTl
                .from(".jp-hero-eyebrow", { opacity: 0, y: 30, duration: 0.7 })
                .from(".jp-hero-h1 .word", { opacity: 0, y: 50, stagger: 0.07, duration: 0.8 }, "-=0.3")
                .from(".jp-hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
                .from(".jp-hero-ctas", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
                .from(".jp-hero-badge", { opacity: 0, scale: 0.85, stagger: 0.1, duration: 0.5 }, "-=0.3")
                .from(".jp-hero-mockup", { opacity: 0, x: 80, duration: 1 }, "-=0.8");

            // Stats
            gsap.from(".jp-stat", {
                scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
                opacity: 0, y: 40, stagger: 0.15, duration: 0.7, ease: "power2.out"
            });

            // How steps
            gsap.from(".jp-step", {
                scrollTrigger: { trigger: howRef.current, start: "top 75%" },
                opacity: 0, x: -40, stagger: 0.15, duration: 0.7, ease: "power2.out"
            });

            // Plans
            gsap.from(".jp-plan-card", {
                scrollTrigger: { trigger: plansRef.current, start: "top 75%" },
                opacity: 0, y: 60, stagger: 0.15, duration: 0.8, ease: "back.out(1.4)"
            });

            // FAQ
            gsap.from(".jp-faq-item", {
                scrollTrigger: { trigger: faqRef.current, start: "top 80%" },
                opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: "power2.out"
            });
        };
        load();
    }, []);

    const toggleFaq = (i) => {
        const items = document.querySelectorAll(".jp-faq-answer");
        const icons = document.querySelectorAll(".jp-faq-icon");
        items.forEach((el, idx) => {
            if (idx === i) {
                const open = el.style.maxHeight && el.style.maxHeight !== "0px";
                el.style.maxHeight = open ? "0px" : el.scrollHeight + "px";
                el.style.opacity = open ? "0" : "1";
                icons[idx].style.transform = open ? "rotate(0deg)" : "rotate(45deg)";
            } else {
                el.style.maxHeight = "0px";
                el.style.opacity = "0";
                icons[idx].style.transform = "rotate(0deg)";
            }
        });
    };

    const S = {
        root: { fontFamily: "'Outfit', 'Manrope', sans-serif", background: "#fff", color: "#0A1628", overflowX: "hidden" },
        nav: { position: "fixed", top: 0, left: 0, right: 0, height: 68, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E8EDFF", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", zIndex: 200 },
        navBrand: { display: "flex", alignItems: "center", gap: 10, fontWeight: 900, fontSize: 22, color: "#1a3566", letterSpacing: -1 },
        navBrandAccent: { color: "#A3E635" },
        navLinks: { display: "flex", gap: 32 },
        navLink: { fontSize: 14.5, fontWeight: 600, color: "#334155", cursor: "pointer", textDecoration: "none", padding: "4px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
        navCtas: { display: "flex", gap: 12 },
        btnOutline: { padding: "9px 22px", borderRadius: 9, border: "2px solid #1a3566", background: "transparent", color: "#1a3566", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" },
        btnSolid: { padding: "9px 22px", borderRadius: 9, border: "none", background: "#1a3566", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" },

        hero: { paddingTop: 140, paddingBottom: 80, paddingLeft: 60, paddingRight: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1280, margin: "0 auto" },
        heroEyebrow: { display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF8D1", color: "#4A7C00", borderRadius: 999, padding: "6px 14px", fontSize: 12.5, fontWeight: 800, marginBottom: 18, letterSpacing: 0.5 },
        heroH1: { fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, color: "#0A1628", marginBottom: 22 },
        heroAccent: { color: "#1a3566", WebkitTextStroke: "1px #A3E635" },
        heroSub: { fontSize: 17, color: "#475569", lineHeight: 1.65, marginBottom: 36, maxWidth: 500 },
        heroCtas: { display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 },
        heroBtnPrimary: { padding: "14px 30px", borderRadius: 11, border: "none", background: "#1a3566", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(26,53,102,0.28)", transition: "all 0.2s" },
        heroBtnGreen: { padding: "14px 30px", borderRadius: 11, border: "2.5px solid #A3E635", background: "#A3E635", color: "#0A1628", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(163,230,53,0.3)", transition: "all 0.2s" },
        heroBadges: { display: "flex", gap: 12, flexWrap: "wrap" },
        heroBadge: { display: "flex", alignItems: "center", gap: 6, background: "#F0F4FF", borderRadius: 8, padding: "7px 13px", fontSize: 12.5, fontWeight: 600, color: "#334155" },

        mockup: { background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(26,53,102,0.14)", border: "1.5px solid #E8EDFF", padding: 24, position: "relative" },
        mockupHeader: { background: "linear-gradient(135deg, #1a3566, #2a4f8f)", borderRadius: 12, padding: "18px 20px", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" },
        mockupTitle: { color: "#fff", fontWeight: 800, fontSize: 16 },
        mockupBadge: { background: "#A3E635", color: "#0A1628", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 },
        mockupRow: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #F1F5F9" },
        mockupAvatar: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 },
        mockupMeta: { flex: 1 },
        mockupName: { fontWeight: 700, fontSize: 14, color: "#0A1628", marginBottom: 2 },
        mockupSub: { fontSize: 12, color: "#94A3B8" },
        mockupScore: { fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 999 },

        statsStrip: { background: "#0A1628", padding: "52px 60px" },
        statsInner: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 },
        statCard: { textAlign: "center" },
        statVal: { fontSize: 48, fontWeight: 900, color: "#A3E635", letterSpacing: -2, marginBottom: 4 },
        statLabel: { fontSize: 14, color: "#94A3B8", fontWeight: 500 },

        section: { maxWidth: 1280, margin: "0 auto", padding: "80px 60px" },
        sectionEye: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.12em", color: "#A3E635", background: "#0A1628", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 14 },
        sectionH2: { fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: -1.5, color: "#0A1628", marginBottom: 12 },
        sectionSub: { fontSize: 16, color: "#64748B", maxWidth: 540, lineHeight: 1.7 },

        howGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 52 },
        stepCard: { background: "#F8FAFF", borderRadius: 18, padding: "32px 28px", border: "1.5px solid #E8EDFF", position: "relative", overflow: "hidden" },
        stepNum: { fontSize: 72, fontWeight: 900, color: "#E8EDFF", position: "absolute", top: 16, right: 24, lineHeight: 1, letterSpacing: -3 },
        stepTitle: { fontSize: 20, fontWeight: 800, color: "#0A1628", marginBottom: 10, letterSpacing: -0.5 },
        stepDesc: { fontSize: 14.5, color: "#64748B", lineHeight: 1.7 },
        stepLine: { width: 40, height: 4, background: "#A3E635", borderRadius: 2, marginBottom: 16 },

        plansGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, marginTop: 52 },
        planCard: { background: "#fff", borderRadius: 22, padding: "36px 30px", border: "1.5px solid #E8EDFF", boxShadow: "0 4px 24px rgba(26,53,102,0.06)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" },
        planCardHL: { background: "linear-gradient(145deg, #0A1628, #1a3566)", border: "none", boxShadow: "0 20px 60px rgba(26,53,102,0.28)" },
        planTag: { fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999, display: "inline-block", marginBottom: 20, alignSelf: "flex-start" },
        planName: { fontSize: 22, fontWeight: 900, color: "#0A1628", marginBottom: 8, letterSpacing: -0.5 },
        planNameHL: { color: "#fff" },
        planPrice: { fontSize: 44, fontWeight: 900, color: "#1a3566", letterSpacing: -2, lineHeight: 1 },
        planPriceHL: { color: "#A3E635" },
        planPeriod: { fontSize: 16, fontWeight: 500, color: "#94A3B8" },
        planDivider: { height: 1, background: "#F1F5F9", margin: "22px 0" },
        planDividerHL: { background: "rgba(255,255,255,0.12)" },
        planFeat: { display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#334155", marginBottom: 12 },
        planFeatHL: { color: "rgba(255,255,255,0.85)" },
        planCheck: { width: 20, height: 20, borderRadius: 6, background: "#EFF8D1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 },
        planCheckHL: { background: "rgba(163,230,53,0.25)" },
        planCta: { marginTop: "auto", padding: "13px 0", borderRadius: 11, fontFamily: "inherit", fontWeight: 800, fontSize: 15, cursor: "pointer", border: "none", background: "#A3E635", color: "#0A1628", transition: "all 0.2s", textAlign: "center" },
        planCtaHL: { background: "#A3E635", color: "#0A1628" },
        planGlow: { position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.2), transparent 70%)" },

        faqWrap: { marginTop: 52, maxWidth: 780 },
        faqItem: { borderBottom: "1.5px solid #F1F5F9", padding: "20px 0" },
        faqQ: { display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 },
        faqQText: { fontSize: 17, fontWeight: 700, color: "#0A1628", letterSpacing: -0.3 },
        faqIcon: { width: 30, height: 30, borderRadius: "50%", background: "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#1a3566", flexShrink: 0, transition: "transform 0.3s", fontWeight: 300 },
        faqAnswer: { maxHeight: 0, overflow: "hidden", opacity: 0, transition: "max-height 0.4s ease, opacity 0.3s ease" },
        faqAnswerText: { fontSize: 15, color: "#64748B", lineHeight: 1.75, paddingTop: 14 },

        ctaSection: { background: "linear-gradient(135deg, #0A1628 0%, #1a3566 60%, #0f2a50 100%)", margin: "0 60px 80px", borderRadius: 28, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, overflow: "hidden", position: "relative" },
        ctaGlow1: { position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.15), transparent 70%)" },
        ctaGlow2: { position: "absolute", bottom: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.1), transparent 70%)" },
        ctaH2: { fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: -1.5, marginBottom: 12, lineHeight: 1.1 },
        ctaAccent: { color: "#A3E635" },
        ctaSub: { fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 },
        ctaBtn: { padding: "16px 36px", borderRadius: 12, border: "none", background: "#A3E635", color: "#0A1628", fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 8px 28px rgba(163,230,53,0.35)", transition: "all 0.2s" },

        footer: { borderTop: "1px solid #F1F5F9", padding: "28px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1280, margin: "0 auto" },
        footerBrand: { fontWeight: 900, fontSize: 18, color: "#1a3566" },
        footerLinks: { display: "flex", gap: 28, fontSize: 13.5, color: "#94A3B8", fontWeight: 500 },
        footerCopy: { fontSize: 12.5, color: "#CBD5E1" },
    };

    const CANDS = [
        { initials: "AK", bg: "#1a3566", role: "Sr. Product Designer", exp: "6 yrs", score: 94, scoreColor: "#A3E635", scoreBg: "#EFF8D1" },
        { initials: "PS", bg: "#2D6A4F", role: "React Developer", exp: "4 yrs", score: 88, scoreColor: "#059669", scoreBg: "#ECFDF5" },
        { initials: "RV", bg: "#7C3AED", role: "Data Analyst", exp: "3 yrs", score: 81, scoreColor: "#7C3AED", scoreBg: "#F5F3FF" },
    ];

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <div style={S.root}>
                {/* NAV */}
                <nav style={S.nav}>
                    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                        <img src={mavenLogo} alt="Maven Jobs" style={{ height: 36 }} />
                    </Link>
                    <div style={S.navLinks}>
                        {NAV_LINKS.map(l => <span key={l} style={S.navLink}>{l}</span>)}
                    </div>
                    <div style={S.navCtas}>
                        <button style={S.btnOutline}>Buy online</button>
                        <button style={{ ...S.btnSolid, background: "#1a3566" }}>Post a job</button>
                    </div>
                </nav>

                {/* HERO */}
                <section ref={heroRef} style={{ paddingTop: 68, background: "linear-gradient(180deg,#F8FAFF 0%,#fff 100%)" }}>
                    <div style={S.hero}>
                        <div>
                            <div className="jp-hero-eyebrow" style={S.heroEyebrow}>
                                <span>●</span> India's #1 Job Posting Platform
                            </div>
                            <h1 className="jp-hero-h1" style={S.heroH1}>
                                {["Post.", "Attract.", "Hire"].map(w => (
                                    <span key={w} className="word" style={{ display: "inline-block", marginRight: "0.22em" }}>{w}</span>
                                ))}
                                <br />
                                <span className="word" style={{ display: "inline-block", color: "#1a3566" }}>Repeat</span>
                                <span className="word" style={{ display: "inline-block", color: "#A3E635" }}>.</span>
                            </h1>
                            <p className="jp-hero-sub" style={S.heroSub}>Reach 10 crore+ active jobseekers across India. Get quality applications within 48 hours of posting — guaranteed.</p>
                            <div className="jp-hero-ctas" style={S.heroCtas}>
                                <button style={S.heroBtnPrimary}>Post a Job — Free Trial</button>
                                <button style={S.heroBtnGreen}>See Pricing</button>
                            </div>
                            <div className="jp-hero-badge" style={S.heroBadges}>
                                {["✓ No credit card required", "✓ Go live in 60 seconds", "✓ 40+ ATS integrations"].map(b => (
                                    <span key={b} style={S.heroBadge}>{b}</span>
                                ))}
                            </div>
                        </div>

                        <div className="jp-hero-mockup" style={S.mockup}>
                            <div style={S.mockupHeader}>
                                <div style={S.mockupTitle}>Applicant Inbox · Senior UX Designer</div>
                                <div style={S.mockupBadge}>LIVE</div>
                            </div>
                            <div style={{ padding: "0 4px" }}>
                                {CANDS.map((c, i) => (
                                    <div key={i} style={{ ...S.mockupRow, borderBottom: i < CANDS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                                        <div style={{ ...S.mockupAvatar, background: c.bg }}>{c.initials}</div>
                                        <div style={S.mockupMeta}>
                                            <div style={S.mockupName}>{c.initials === "AK" ? "Ananya K." : c.initials === "PS" ? "Priya S." : "Rahul V."}</div>
                                            <div style={S.mockupSub}>{c.role} · {c.exp} exp</div>
                                        </div>
                                        <div style={{ ...S.mockupScore, background: c.scoreBg, color: c.scoreColor }}>{c.score}% match</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 18, background: "#F8FAFF", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                                    <FiBarChart2 size={14} /> 247 total applicants · Posted 2h ago
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 800, color: "#1a3566", cursor: "pointer" }}>View all →</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <div ref={statsRef} style={S.statsStrip}>
                    <div style={S.statsInner}>
                        {STATS.map((s, i) => (
                            <div key={i} className="jp-stat" style={S.statCard}>
                                <div style={S.statVal}>{s.val}</div>
                                <div style={S.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div ref={howRef} style={S.section}>
                    <div style={S.sectionEye}>HOW IT WORKS</div>
                    <h2 style={S.sectionH2}>From post to hire<br />in four steps</h2>
                    <p style={S.sectionSub}>Our intelligent platform handles the heavy lifting so your team can focus on what matters — finding the right person.</p>
                    <div style={S.howGrid}>
                        {HOW.map((h, i) => (
                            <div key={i} className="jp-step" style={S.stepCard}>
                                <div style={S.stepNum}>{h.n}</div>
                                <div style={S.stepLine} />
                                <div style={S.stepTitle}>{h.title}</div>
                                <div style={S.stepDesc}>{h.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PLANS */}
                <div ref={plansRef} style={{ ...S.section, background: "#F8FAFF", maxWidth: "100%", padding: "80px 0" }}>
                    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
                        <div style={S.sectionEye}>PRICING</div>
                        <h2 style={S.sectionH2}>Transparent plans,<br />zero hidden fees</h2>
                        <div style={S.plansGrid}>
                            {PLANS.map((p, i) => (
                                <div key={i} className="jp-plan-card" style={i === 1 ? { ...S.planCard, ...S.planCardHL } : S.planCard}>
                                    {i === 1 && <div style={S.planGlow} />}
                                    <span style={{ ...S.planTag, background: i === 1 ? "rgba(163,230,53,0.2)" : "#F0F4FF", color: i === 1 ? "#A3E635" : "#1a3566" }}>{p.tag}</span>
                                    <div style={i === 1 ? { ...S.planName, ...S.planNameHL } : S.planName}>{p.name}</div>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                                        <span style={i === 1 ? { ...S.planPrice, ...S.planPriceHL } : S.planPrice}>{p.price}</span>
                                        <span style={S.planPeriod}>{p.period}</span>
                                    </div>
                                    <div style={i === 1 ? { ...S.planDivider, ...S.planDividerHL } : S.planDivider} />
                                    {p.features.map((f, fi) => (
                                        <div key={fi} style={i === 1 ? { ...S.planFeat, ...S.planFeatHL } : S.planFeat}>
                                            <div style={i === 1 ? { ...S.planCheck, ...S.planCheckHL } : S.planCheck}>✓</div>
                                            {f}
                                        </div>
                                    ))}
                                    <div style={{ height: 28 }} />
                                    <button style={S.planCta}>{p.cta}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div ref={faqRef} style={S.section}>
                    <div style={S.sectionEye}>FAQ</div>
                    <h2 style={S.sectionH2}>Common questions</h2>
                    <div style={S.faqWrap}>
                        {FAQS.map((f, i) => (
                            <div key={i} className="jp-faq-item" style={S.faqItem}>
                                <div style={S.faqQ} onClick={() => toggleFaq(i)}>
                                    <span style={S.faqQText}>{f.q}</span>
                                    <span className="jp-faq-icon" style={S.faqIcon}>+</span>
                                </div>
                                <div className="jp-faq-answer" style={S.faqAnswer}>
                                    <p style={S.faqAnswerText}>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA BAND */}
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <div style={S.ctaSection}>
                        <div style={S.ctaGlow1} /><div style={S.ctaGlow2} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <h2 style={S.ctaH2}>Start posting jobs<br /><span style={S.ctaAccent}>in 60 seconds.</span></h2>
                            <p style={S.ctaSub}>Join 40,000+ companies who trust MavenJobs to find their next great hire.</p>
                        </div>
                        <button style={{ ...S.ctaBtn, position: "relative", zIndex: 1 }}>Post Your First Job — Free</button>
                    </div>
                </div>

                {/* FOOTER */}
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