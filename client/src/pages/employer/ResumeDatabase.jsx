import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
    FiSearch, FiZap, FiMail, FiRefreshCw, 
    FiBarChart2, FiShield, FiMapPin, FiBriefcase,
    FiCheckCircle, FiClock
} from "react-icons/fi";
import mavenLogo from "../../../assets/maven-logo-BdiSsfJk.svg";

const FILTERS = ["Location", "Experience", "Skills", "Salary", "Availability", "Education"];
const SKILLS_CLOUD = ["React.js", "Node.js", "Python", "Data Science", "UI/UX", "DevOps", "Java", "SQL", "Machine Learning", "Figma", "AWS", "Product Management", "Go", "TypeScript", "Flutter", "Kotlin"];
const TALENT = [
    { name: "Kavya Sharma", role: "Senior Product Designer", loc: "Bengaluru", exp: "7 yrs", avail: "Immediately", skills: ["Figma", "Prototyping", "UX Research"], match: 97, initials: "KS", bg: "#1a3566" },
    { name: "Arjun Mehta", role: "Full Stack Engineer", loc: "Mumbai", exp: "5 yrs", avail: "2 weeks", skills: ["React", "Node.js", "AWS"], match: 93, initials: "AM", bg: "#0D9488" },
    { name: "Sneha Pillai", role: "Data Scientist", loc: "Hyderabad", exp: "4 yrs", avail: "1 month", skills: ["Python", "ML", "SQL"], match: 89, initials: "SP", bg: "#7C3AED" },
    { name: "Rohit Nair", role: "DevOps Engineer", loc: "Pune", exp: "6 yrs", avail: "Immediately", skills: ["AWS", "Docker", "K8s"], match: 85, initials: "RN", bg: "#DC2626" },
    { name: "Priya Anand", role: "Product Manager", loc: "Delhi NCR", exp: "8 yrs", avail: "3 weeks", skills: ["Agile", "Roadmapping", "Analytics"], match: 91, initials: "PA", bg: "#B45309" },
    { name: "Kiran Rao", role: "iOS Developer", loc: "Chennai", exp: "3 yrs", avail: "Immediately", skills: ["Swift", "Xcode", "CoreData"], match: 78, initials: "KR", bg: "#065F46" },
];

const FEATURES = [
    { icon: <FiZap />, title: "AI-Powered Matching", desc: "Our proprietary AI scores each profile against your job requirements, surfacing the top 5% instantly." },
    { icon: <FiSearch />, title: "250+ Search Filters", desc: "Filter by skills, location, salary expectations, notice period, education, and 240+ more parameters." },
    { icon: <FiMail />, title: "Direct Outreach", desc: "Message candidates directly without revealing your company — maintain confidentiality through hiring." },
    { icon: <FiRefreshCw />, title: "Real-time Updates", desc: "Profiles updated daily. You see candidates who are actively looking right now, not 6 months ago." },
    { icon: <FiBarChart2 />, title: "Talent Analytics", desc: "Benchmark compensation, understand skill availability in your city, and plan hiring quarters ahead." },
    { icon: <FiShield />, title: "Verified Profiles", desc: "Every candidate is email + phone verified. Employment history cross-checked via our partner network." },
];

const STATS = [
    { val: "10Cr+", label: "Verified Profiles" },
    { val: "250+", label: "Search Filters" },
    { val: "72h", label: "Avg. Time to Shortlist" },
    { val: "3.2M", label: "Profiles Updated Weekly" },
];

export default function ResumeDatabase() {
    const heroRef = useRef(null);
    const featRef = useRef(null);
    const dbRef = useRef(null);
    const [activeSkill, setActiveSkill] = useState(null);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        const load = async () => {
            await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
            await import("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            if (!gsap) return;
            gsap.registerPlugin(ScrollTrigger);

            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(".rd-hero-tag", { opacity: 0, y: 20, duration: 0.6 })
                .from(".rd-word", { opacity: 0, y: 60, stagger: 0.08, duration: 0.9 }, "-=0.2")
                .from(".rd-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
                .from(".rd-search-box", { opacity: 0, y: 30, scale: 0.96, duration: 0.7 }, "-=0.3")
                .from(".rd-filter-pill", { opacity: 0, y: 20, stagger: 0.07, duration: 0.5 }, "-=0.3")
                .from(".rd-skills-cloud", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");

            gsap.from(".rd-stat", {
                scrollTrigger: { trigger: ".rd-stats-strip", start: "top 80%" },
                opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: "power2.out"
            });

            gsap.from(".rd-feat-card", {
                scrollTrigger: { trigger: featRef.current, start: "top 75%" },
                opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: "back.out(1.3)"
            });

            gsap.from(".rd-talent-card", {
                scrollTrigger: { trigger: dbRef.current, start: "top 75%" },
                opacity: 0, x: -30, stagger: 0.1, duration: 0.6, ease: "power2.out"
            });

            // Floating search cursor animation
            gsap.to(".rd-cursor", {
                y: -12, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
        };
        load();
    }, []);

    const S = {
        root: { fontFamily: "'Outfit', sans-serif", background: "#fff", color: "#0A1628", overflowX: "hidden" },
        nav: { position: "fixed", top: 0, left: 0, right: 0, height: 68, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E8EDFF", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", zIndex: 200 },
        navBrand: { fontWeight: 900, fontSize: 22, color: "#1a3566", display: "flex", alignItems: "center", gap: 8 },

        hero: { paddingTop: 120, paddingBottom: 64, background: "#0A1628", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 60px 80px", position: "relative", overflow: "hidden" },
        heroBg1: { position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.12), transparent 70%)", pointerEvents: "none" },
        heroBg2: { position: "absolute", bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,53,102,0.6), transparent 70%)", pointerEvents: "none" },
        heroGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" },

        heroTag: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(163,230,53,0.15)", border: "1px solid rgba(163,230,53,0.3)", color: "#A3E635", borderRadius: 999, padding: "7px 18px", fontSize: 12.5, fontWeight: 800, marginBottom: 28, letterSpacing: 0.5 },
        heroH1: { fontSize: "clamp(40px,5.5vw,74px)", fontWeight: 900, letterSpacing: -3, color: "#fff", lineHeight: 1.05, marginBottom: 22, maxWidth: 900 },
        heroAccent: { color: "#A3E635" },
        heroSub: { fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 48px" },

        searchBox: { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "10px 10px 10px 20px", display: "flex", alignItems: "center", gap: 12, maxWidth: 720, width: "100%", margin: "0 auto 24px" },
        searchInput: { flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: "#fff", fontFamily: "inherit", "::placeholder": { color: "rgba(255,255,255,0.4)" } },
        searchBtn: { padding: "12px 28px", borderRadius: 12, border: "none", background: "#A3E635", color: "#0A1628", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },

        filters: { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 },
        filterPill: { padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 },

        skillsCloud: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 760, margin: "0 auto" },
        skillPill: { padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", border: "1px solid transparent" },

        statsStrip: { background: "linear-gradient(135deg, #1a3566, #0A1628)", padding: "56px 60px" },
        statsInner: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 },
        statCard: { textAlign: "center" },
        statVal: { fontSize: 52, fontWeight: 900, color: "#A3E635", letterSpacing: -2, marginBottom: 6 },
        statLabel: { fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 500 },

        section: { maxWidth: 1280, margin: "0 auto", padding: "80px 60px" },
        sectionEye: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.12em", color: "#A3E635", background: "#0A1628", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 14 },
        sectionH2: { fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: -1.5, color: "#0A1628", marginBottom: 12 },
        sectionSub: { fontSize: 16, color: "#64748B", maxWidth: 540, lineHeight: 1.7, marginBottom: 0 },

        featGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 52 },
        featCard: { background: "#F8FAFF", border: "1.5px solid #E8EDFF", borderRadius: 20, padding: "32px 28px", transition: "all 0.25s", cursor: "default" },
        featIcon: { fontSize: 34, marginBottom: 16 },
        featTitle: { fontSize: 18, fontWeight: 800, color: "#0A1628", marginBottom: 8, letterSpacing: -0.4 },
        featDesc: { fontSize: 14.5, color: "#64748B", lineHeight: 1.7 },

        dbSection: { background: "#0A1628", padding: "80px 0" },
        dbInner: { maxWidth: 1280, margin: "0 auto", padding: "0 60px" },
        dbEye: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.12em", color: "#A3E635", background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.25)", display: "inline-block", padding: "4px 12px", borderRadius: 4, marginBottom: 14 },
        dbH2: { fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: -1.5, color: "#fff", marginBottom: 12 },
        dbSub: { fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 540, lineHeight: 1.7, marginBottom: 48 },
        talentGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
        talentCard: { background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px", transition: "all 0.25s", cursor: "pointer" },
        talentTop: { display: "flex", alignItems: "center", gap: 14, marginBottom: 16 },
        talentAvatar: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: "#fff", flexShrink: 0 },
        talentName: { fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 3 },
        talentRole: { fontSize: 12.5, color: "rgba(255,255,255,0.5)" },
        talentMeta: { display: "flex", gap: 12, marginBottom: 14 },
        talentMetaItem: { fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 },
        talentSkills: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 },
        talentSkill: { fontSize: 11.5, fontWeight: 600, background: "rgba(163,230,53,0.1)", color: "#A3E635", border: "1px solid rgba(163,230,53,0.2)", borderRadius: 6, padding: "3px 9px" },
        talentFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        talentMatch: { fontSize: 12, fontWeight: 800, color: "#A3E635" },
        talentBtn: { fontSize: 12, fontWeight: 700, background: "#1a3566", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: "inherit" },

        ctaSection: { background: "linear-gradient(135deg, #0A1628, #1a3566)", margin: "80px 60px", borderRadius: 28, padding: "72px 80px", position: "relative", overflow: "hidden", textAlign: "center" },
        ctaGlow: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(163,230,53,0.15), transparent 70%)", pointerEvents: "none" },
        ctaH2: { fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: -1.5, marginBottom: 14, lineHeight: 1.1, position: "relative", zIndex: 1 },
        ctaAccent: { color: "#A3E635" },
        ctaSub: { fontSize: 17, color: "rgba(255,255,255,0.6)", marginBottom: 36, position: "relative", zIndex: 1 },
        ctaBtn: { padding: "16px 40px", borderRadius: 12, border: "none", background: "#A3E635", color: "#0A1628", fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(163,230,53,0.3)", position: "relative", zIndex: 1 },

        footer: { borderTop: "1px solid #F1F5F9", padding: "28px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" },
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

                {/* HERO — dark */}
                <section ref={heroRef} style={S.hero}>
                    <div style={S.heroBg1} /><div style={S.heroBg2} /><div style={S.heroGrid} />
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div className="rd-hero-tag" style={S.heroTag}><FiSearch size={14} style={{ marginRight: 8 }} /> India's Largest Verified Resume Database</div>
                        <h1 style={S.heroH1}>
                            {["Find", "the", "right", "talent,"].map(w => (
                                <span key={w} className="rd-word" style={{ display: "inline-block", marginRight: "0.18em" }}>{w}</span>
                            ))}
                            <br />
                            <span className="rd-word" style={{ display: "inline-block", color: "#A3E635", marginRight: "0.18em" }}>before</span>
                            <span className="rd-word" style={{ display: "inline-block" }}>they</span>
                            <span className="rd-word" style={{ display: "inline-block", marginLeft: "0.18em" }}>apply.</span>
                        </h1>
                        <p className="rd-sub" style={S.heroSub}>Access 10 crore+ verified, actively-looking professionals across every role, city, and skill set in India.</p>

                        <div className="rd-search-box" style={S.searchBox}>
                            <span style={{ fontSize: 20, display: "flex", alignItems: "center" }}><FiSearch /></span>
                            <input
                                style={{ ...S.searchInput, color: "#fff" }}
                                placeholder="Search by role, skill, or company…"
                                value={searchVal}
                                onChange={e => setSearchVal(e.target.value)}
                            />
                            <button style={S.searchBtn}>Search Talent</button>
                        </div>

                        <div style={S.filters}>
                            {FILTERS.map(f => (
                                <div key={f} className="rd-filter-pill" style={S.filterPill}>{f} ▾</div>
                            ))}
                        </div>

                        <div className="rd-skills-cloud" style={S.skillsCloud}>
                            {SKILLS_CLOUD.map(s => (
                                <span
                                    key={s}
                                    style={{
                                        ...S.skillPill,
                                        background: activeSkill === s ? "#A3E635" : "rgba(255,255,255,0.07)",
                                        color: activeSkill === s ? "#0A1628" : "rgba(255,255,255,0.6)",
                                        border: `1px solid ${activeSkill === s ? "#A3E635" : "rgba(255,255,255,0.12)"}`,
                                    }}
                                    onMouseEnter={() => setActiveSkill(s)}
                                    onMouseLeave={() => setActiveSkill(null)}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <div className="rd-stats-strip" style={S.statsStrip}>
                    <div style={S.statsInner}>
                        {STATS.map((s, i) => (
                            <div key={i} className="rd-stat" style={S.statCard}>
                                <div style={S.statVal}>{s.val}</div>
                                <div style={S.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FEATURES */}
                <div ref={featRef} style={S.section}>
                    <div style={S.sectionEye}>WHAT YOU GET</div>
                    <h2 style={S.sectionH2}>Everything you need to<br />find and win top talent</h2>
                    <p style={S.sectionSub}>Tools built for speed, precision, and confidentiality — because great candidates don't wait.</p>
                    <div style={S.featGrid}>
                        {FEATURES.map((f, i) => (
                            <div key={i} className="rd-feat-card" style={S.featCard}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,53,102,0.1)"; e.currentTarget.style.borderColor = "#A3E635"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#E8EDFF"; e.currentTarget.style.transform = ""; }}
                            >
                                <div style={{ fontSize: 34, marginBottom: 16 }}>{f.icon}</div>
                                <div style={S.featTitle}>{f.title}</div>
                                <div style={S.featDesc}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TALENT CARDS */}
                <div ref={dbRef} style={S.dbSection}>
                    <div style={S.dbInner}>
                        <div style={S.dbEye}>LIVE DATABASE PREVIEW</div>
                        <h2 style={S.dbH2}>Profiles actively<br />searching right now</h2>
                        <p style={S.dbSub}>A live snapshot of the talent available today. Unlock full access to contact details and connect directly.</p>
                        <div style={S.talentGrid}>
                            {TALENT.map((t, i) => (
                                <div key={i} className="rd-talent-card" style={S.talentCard}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(163,230,53,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = ""; }}
                                >
                                    <div style={S.talentTop}>
                                        <div style={{ ...S.talentAvatar, background: t.bg }}>{t.initials}</div>
                                        <div>
                                            <div style={S.talentName}>{t.name}</div>
                                            <div style={S.talentRole}>{t.role}</div>
                                        </div>
                                    </div>
                                    <div style={S.talentMeta}>
                                        <span style={S.talentMetaItem}><FiMapPin size={13} style={{ marginRight: 4 }} /> {t.loc}</span>
                                        <span style={S.talentMetaItem}><FiBriefcase size={13} style={{ marginRight: 4 }} /> {t.exp}</span>
                                        <span style={S.talentMetaItem}><FiCheckCircle size={13} style={{ marginRight: 4 }} /> {t.avail}</span>
                                    </div>
                                    <div style={S.talentSkills}>
                                        {t.skills.map(sk => <span key={sk} style={S.talentSkill}>{sk}</span>)}
                                    </div>
                                    <div style={S.talentFooter}>
                                        <span style={S.talentMatch}>⚡ {t.match}% match</span>
                                        <button style={S.talentBtn}>View Profile</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <button style={{ padding: "14px 36px", borderRadius: 12, border: "1.5px solid rgba(163,230,53,0.4)", background: "transparent", color: "#A3E635", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                                Unlock Full Database Access →
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <div style={S.ctaSection}>
                        <div style={S.ctaGlow} />
                        <h2 style={S.ctaH2}>Stop waiting for<br /><span style={S.ctaAccent}>candidates to find you.</span></h2>
                        <p style={S.ctaSub}>Access India's freshest talent pool. Start searching with a free trial — no credit card needed.</p>
                        <button style={S.ctaBtn}>Start Free Access Now</button>
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