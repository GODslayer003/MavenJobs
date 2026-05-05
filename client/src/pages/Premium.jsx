import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FiCheck, FiZap, FiStar, FiArrowRight, FiUsers, FiSearch,
    FiShield, FiTrendingUp, FiAward, FiTarget, FiBarChart2,
    FiMessageCircle, FiPhone, FiMail, FiChevronRight, FiLayers,
    FiCpu, FiFilter, FiEye, FiPhoneCall, FiBell, FiInbox
} from 'react-icons/fi';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";

function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const fn = () => setY(window.scrollY);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);
    return y;
}

function FadeIn({ children, delay = 0, style = {} }) {
    const [ref, visible] = useInView();
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            ...style
        }}>
            {children}
        </div>
    );
}

const STATS = [
    { value: '85%+', label: "of India's premium white-collar professionals on PremiumX" },
    { value: '75%+', label: 'of premium talent seeking opportunities is active on PremiumX' },
    { value: '70%+', label: 'of IIM grads register on PremiumX within 3 years' },
    { value: '30%+', label: 'YOY growth in premium talent dataset on MavenX' },
];

const ESSENTIALS = [
    { icon: <FiUsers size={22} />, title: 'Talent Availability', desc: 'A large, active pool of premium candidates — 85%+ of India\'s top talent (CTC>30L) in one place.', color: '#002366' },
    { icon: <FiSearch size={22} />, title: 'Faster Discovery', desc: 'Fast and precise identification of the right profiles through AI-powered matching algorithms.', color: '#10b981' },
    { icon: <FiMessageCircle size={22} />, title: 'Easier Connect', desc: 'Engaging candidates across the channels where they\'re most responsive — WhatsApp, email, and more.', color: '#6366f1' },
    { icon: <FiBarChart2 size={22} />, title: 'Cost-Efficient Hiring', desc: 'Maximising outcomes while minimising spend — the most ROI-positive premium hiring product in India.', color: '#f59e0b' },
];

const DISCOVERY_FEATURES = [
    {
        num: '01',
        title: 'A New Matching Algorithm — Built for Premium Hiring',
        desc: 'MavenPremiumX\'s search algorithm is built specifically to surface the most relevant premium talent pool. It leverages industry context when reading candidate profiles, prioritises premium-fit candidates in the results, and personalises ranking based on each recruiter\'s past activity and preferences.',
        outcome: 'The result: refined shortlists, higher relevance, and more time spent on the candidates who actually matter.',
        pillars: [
            { icon: <FiTarget size={18} />, label: 'Personalisation', sub: 'Understands your past activity and preferences' },
            { icon: <FiFilter size={18} />, label: 'Noise Removal', sub: 'Filters inaccurate and non-premium profiles' },
            { icon: <FiSearch size={18} />, label: 'Precise Matching', sub: 'Leverages candidate profiles with industry context' },
        ],
    },
    {
        num: '02',
        title: 'Active & Passive Premium Candidates — One Unified View',
        desc: 'The most valuable candidate for a senior role is often the one who isn\'t actively looking. MavenPremiumX brings active job-seekers (updated in the last six months) and passive premium professionals together in the same unified view, so recruiters can evaluate the full universe of relevant talent in a single workflow.',
        outcome: 'No relevant candidates are ever missed.',
        pillars: null,
        profiles: ['Active Profiles', 'Passive Profiles'],
    },
    {
        num: '03',
        title: 'Premium Shortlisting Filters — Exclusive to MavenPremiumX',
        desc: 'The advanced filters help find the most relevant candidates much faster. These filters reflect the exact criteria senior recruiters weigh when shortlisting — and they\'re exclusive to MavenPremiumX.',
        outcome: null,
        filters: [
            { label: 'NChecked Profiles', desc: 'Surface only candidates whose critical details have been cross-checked by Maven\'s team.' },
            { label: 'Similar Companies', desc: 'Finds candidates from organisations operating in similar industries, scale, and more.' },
            { label: 'Top Institutes', desc: 'Identify candidates from IITs, NITs, IIMs, and other premium institutions in one click.' },
        ],
    },
    {
        num: '04',
        title: 'AI-Powered Recommendations — Within Your Existing Workflow',
        badge: 'Coming Soon',
        desc: 'While searching for candidates, MavenPremiumX intelligently recommends additional relevant talent from our extended network — so the reach of your search expands without changing your process. Job postings can be distributed to matched candidates in one click, reaching the right audience without extra effort.',
        outcome: null,
        pillars: null,
    },
    {
        num: '05',
        title: 'PremiumX Assist — Expert Hiring Assistance Service',
        desc: 'PremiumX Assist is a paid, expert-led hiring support service built specifically for premium and leadership roles. A dedicated team of expert recruiters — with years of premium hiring experience — handle sourcing and shortlisting of top-quality talent, so your team can focus on interviewing only the best candidates.',
        outcome: null,
        pillars: null,
    },
];

const CONNECT_FEATURES = [
    {
        title: 'Faster Connect Through Multiple Channels',
        desc: 'MavenPremiumX connects you to premium talent across the channels they are most active in — increasing response rates and reducing manual effort for the recruiter.',
        channels: [
            { icon: <FiBell size={20} />, label: 'Notifications', color: '#f59e0b' },
            { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', color: '#10b981' },
            { icon: <FiPhoneCall size={20} />, label: 'Automated Call', color: '#6366f1' },
            { icon: <FiMail size={20} />, label: 'Email', color: '#002366' },
            { icon: <FiInbox size={20} />, label: 'Maven Inbox', color: '#ec4899' },
        ],
    },
    {
        title: 'NChecked Profiles — Cross-Verified by Maven',
        desc: 'For senior hires, verifying critical candidate details is one of the most time-consuming parts of the process. With NChecked, Maven\'s team has already done that legwork — 14+ key candidate details such as current CTC breakup, company duration, notice period, designation, location, job-search status, preferred location, skills, and more are cross-checked. Recruiters move straight to the conversations that matter.',
        checks: ['Current CTC Breakup', 'Current Company Duration', 'Notice Period', 'Current Designation', 'Current Location', 'Job Search Status', 'Preferred Location', 'Skills'],
    },
    {
        title: 'Concierge Support',
        desc: 'Concierge support enables expert-led assistance to help recruiters source and hire premium talent more effectively. Your dedicated Maven expert acts as an extension of your team — available whenever the hiring stakes are highest.',
    },
];

export default function Premium() {
    const scrollY = useScrollY();
    const navScrolled = scrollY > 50;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1e293b' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#bfdbfe}

        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse-ring{0%{transform:scale(0.92);opacity:.7}70%{transform:scale(1.08);opacity:.2}100%{transform:scale(0.92);opacity:.7}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes gradshift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

        .premium-nav-link{font-size:13.5px;font-weight:600;color:#475569;text-decoration:none;padding:4px 0;position:relative;transition:color .2s}
        .premium-nav-link:hover{color:#002366}
        .premium-section-tag{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#10b981;font-family:'Bricolage Grotesque',sans-serif;margin-bottom:12px}
        .premium-h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;color:#0f172a;letter-spacing:-0.03em;line-height:1.06}
        .premium-divider{width:44px;height:3px;background:linear-gradient(90deg,#002366,#10b981);border-radius:3px;margin:14px 0 20px}
        .premium-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:22px;transition:all .3s}
        .premium-card:hover{border-color:rgba(0,35,102,.15);box-shadow:0 20px 56px rgba(0,35,102,.1);transform:translateY(-4px)}
        .step-num{font-family:'Bricolage Grotesque',sans-serif;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
        .channel-chip{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 16px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:16px;transition:all .25s;cursor:default;flex:1}
        .channel-chip:hover{border-color:rgba(0,35,102,.2);background:#fff;box-shadow:0 8px 28px rgba(0,35,102,.08);transform:translateY(-2px)}
        .filter-pill{display:flex;align-items:flex-start;gap:12px;padding:18px 20px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;transition:all .25s}
        .filter-pill:hover{border-color:#a7f3d0;background:#ecfdf5;box-shadow:0 6px 20px rgba(16,185,129,.1)}
        .check-badge{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:100px;font-size:12.5px;font-weight:700;color:#065f46}
        .stat-bar{height:4px;border-radius:4px;background:linear-gradient(90deg,#002366,#10b981);margin-top:10px}

        @media(max-width:900px){
          .prem-hero-img{display:none!important}
          .prem-grid-2{grid-template-columns:1fr!important}
          .prem-grid-3{grid-template-columns:1fr!important}
          .prem-grid-4{grid-template-columns:1fr 1fr!important}
          .prem-stat-grid{grid-template-columns:1fr 1fr!important}
          .prem-channels{flex-wrap:wrap!important}
        }
        @media(max-width:600px){
          .prem-grid-4{grid-template-columns:1fr!important}
          .prem-stat-grid{grid-template-columns:1fr!important}
          .prem-hero-btns{flex-direction:column!important}
        }
      `}</style>

            {/* ── HEADER ── */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                {/* ── PROMO BAR ── */}
                <div style={{ background: 'linear-gradient(90deg,#001540,#002b7a,#001540)', backgroundSize: '200% 100%', animation: 'shimmer 5s linear infinite', color: '#fff', padding: '10px 0', textAlign: 'center', fontSize: 11.5, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                <FiStar size={11} fill="currentColor" />
                <span>Introducing <span style={{ color: '#6ee7b7' }}>MavenPremiumX</span> — India's Most Advanced Premium Hiring Platform</span>
                <FiStar size={11} fill="currentColor" />
            </div>

                {/* ── NAV ── */}
                <nav style={{ padding: navScrolled ? '12px 44px' : '17px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: navScrolled ? 'rgba(255,255,255,.97)' : 'rgba(255,255,255,.92)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${navScrolled ? '#e2e8f0' : 'rgba(226,232,240,.4)'}`, boxShadow: navScrolled ? '0 4px 24px rgba(0,35,102,.07)' : 'none', transition: 'all .3s' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={mavenLogo} alt="MavenJobs" style={{ height: 30 }} />
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                    <a href="#why" className="premium-nav-link">Why PremiumX</a>
                    <a href="#discovery" className="premium-nav-link">Discovery</a>
                    <a href="#connect" className="premium-nav-link">Connect</a>
                    <a href="#get-started" className="premium-nav-link">Get Started</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #c7d2fe' }}>
                            <FiPhone size={13} color="#002366" />
                        </div>
                        1800-102-5557
                    </div>
                    <button style={{ padding: '9px 22px', background: '#002366', color: '#fff', border: 'none', borderRadius: 11, fontSize: 13.5, fontWeight: 800, cursor: 'pointer', fontFamily: "'Bricolage Grotesque',sans-serif", boxShadow: '0 4px 14px rgba(0,35,102,.25)', transition: 'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#001540'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#002366'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        Get PremiumX
                    </button>
                </div>
                </nav>
            </header>

            {/* ── HERO ── */}
            <section style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '120px 44px 60px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 40, left: -80, width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,35,102,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 80, width: '100%' }}>
                    {/* Left */}
                    <div style={{ flex: '0 0 52%', maxWidth: 600 }}>
                        <FadeIn delay={0}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #EEF2FF, #ecfdf5)', border: '1px solid #c7d2fe', color: '#002366', fontSize: 11.5, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '7px 18px', borderRadius: 100, marginBottom: 28, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                                <FiZap size={12} fill="currentColor" />
                                AI-Powered Premium Talent Discovery
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 1.03, color: '#0f172a', marginBottom: 22, letterSpacing: '-0.04em' }}>
                                Hire India's
                                <span style={{ display: 'block', background: 'linear-gradient(135deg,#002366,#0052cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Top 1% of</span>
                                <span style={{ color: '#10b981' }}>Premium Talent</span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.78, marginBottom: 18, maxWidth: 500 }}>
                                Hiring premium talent is fundamentally different from hiring at scale. The pool is smaller, the signals are more nuanced, and the cost of a wrong hire compounds for years.
                            </p>
                            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, marginBottom: 40, maxWidth: 500, fontWeight: 600 }}>
                                That's exactly what <span style={{ color: '#002366', fontWeight: 800 }}>MavenPremiumX</span> is built for.
                            </p>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <div className="prem-hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                                <button style={{ padding: '15px 34px', background: '#002366', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: "'Bricolage Grotesque',sans-serif", display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,35,102,.3)', transition: 'all .2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#001540'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,35,102,.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#002366'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,35,102,.3)'; }}>
                                    Explore PremiumX <FiArrowRight size={16} />
                                </button>
                                <button style={{ padding: '15px 32px', background: '#fff', color: '#002366', border: '1.5px solid #c7d2fe', borderRadius: 13, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.borderColor = '#93c5fd'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#c7d2fe'; }}>
                                    Request a Demo
                                </button>
                            </div>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                                {[{ icon: FiShield, text: 'NChecked Profiles' }, { icon: FiTrendingUp, text: '30%+ YOY Growth' }, { icon: FiAward, text: 'FAANG-Grade Talent' }].map(({ icon: Icon, text }, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                        <Icon size={13} color="#10b981" />
                                        <span style={{ fontSize: 12.5, color: '#64748b', fontWeight: 600 }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right visual */}
                    <div className="prem-hero-img" style={{ flex: 1, position: 'relative' }}>
                        {/* Glow */}
                        <div style={{ position: 'absolute', inset: -30, background: 'linear-gradient(135deg, rgba(0,35,102,0.08), rgba(16,185,129,0.06))', borderRadius: 36, filter: 'blur(40px)' }} />

                        {/* Main card */}
                        <div style={{ position: 'relative', zIndex: 1, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 28, padding: '36px', boxShadow: '0 40px 90px rgba(0,35,102,0.14)', animation: 'float 5s ease-in-out infinite' }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                                <div>
                                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Premium Talent Search</div>
                                    <div style={{ fontSize: 12.5, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>MavenPremiumX · AI-Powered</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 100 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'pulse-ring 2s ease infinite' }} />
                                    <span style={{ fontSize: 11.5, fontWeight: 800, color: '#065f46' }}>Live</span>
                                </div>
                            </div>

                            {/* Candidate rows */}
                            {[
                                { name: 'Anjali Bhonsle', role: 'Regional Head of Comms', exp: '15 yrs', ctc: '₹90L', tag: 'NChecked', active: true },
                                { name: 'Umesh Kumar Panigrahi', role: 'Finance Head at KPMG', exp: '18 yrs', ctc: '₹1.2Cr', tag: 'IIM Ahmedabad', active: false },
                                { name: 'Abhinav Gupta', role: 'VP Engineer at Google', exp: '14 yrs', ctc: '₹2.1Cr', tag: 'IIT Delhi', active: true },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: i === 1 ? '#EEF2FF' : '#f8fafc', borderRadius: 14, marginBottom: 10, border: i === 1 ? '1.5px solid #c7d2fe' : '1.5px solid transparent', transition: 'all .2s', cursor: 'default' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 11, background: i === 0 ? '#EEF2FF' : i === 1 ? '#002366' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: i === 1 ? '#fff' : '#002366', flexShrink: 0 }}>
                                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{c.name}</div>
                                            <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 500 }}>{c.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13.5, fontWeight: 800, color: '#002366' }}>{c.ctc}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 3 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.active ? '#10b981' : '#f59e0b' }} />
                                            <span style={{ fontSize: 10.5, color: c.active ? '#065f46' : '#92400e', fontWeight: 700 }}>{c.active ? 'Active' : 'Passive'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Bottom metric */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, padding: '14px 18px', background: 'linear-gradient(135deg, #001540, #002366)', borderRadius: 14 }}>
                                <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>Premium matches found</span>
                                <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, color: '#6ee7b7' }}>2,847</span>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div style={{ position: 'absolute', top: -14, right: -14, zIndex: 2, background: '#fff', border: '1.5px solid #a7f3d0', borderRadius: 14, padding: '11px 18px', boxShadow: '0 8px 28px rgba(16,185,129,.18)', display: 'flex', alignItems: 'center', gap: 9 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiShield size={15} color="#10b981" />
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 800, color: '#0f172a' }}>NChecked</div>
                                <div style={{ fontSize: 10.5, color: '#64748b', fontWeight: 600 }}>Cross-verified by Maven</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '56px 44px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <FadeIn>
                        <div style={{ textAlign: 'center', marginBottom: 48 }}>
                            <span className="premium-section-tag">TALENT AVAILABILITY</span>
                            <h2 className="premium-h2" style={{ fontSize: 'clamp(26px,3.5vw,40px)' }}>India's Premium Talent Pool —<br />All in One Place</h2>
                            <div className="premium-divider" style={{ margin: '14px auto 0' }} />
                        </div>
                    </FadeIn>
                    <div className="prem-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
                        {STATS.map((s, i) => (
                            <FadeIn key={i} delay={i * 90}>
                                <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20, padding: '32px 26px', textAlign: 'left', transition: 'all .3s', cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,35,102,.09)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 40, fontWeight: 800, color: '#002366', lineHeight: 1, marginBottom: 10, letterSpacing: '-0.04em' }}>{s.value}</div>
                                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{s.label}</div>
                                    <div className="stat-bar" style={{ width: `${[85, 75, 70, 30][i]}%` }} />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PARTNERS MARQUEE ── */}
            <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '20px 0', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 56, animation: 'marquee 22s linear infinite', width: 'max-content', alignItems: 'center' }}>
                    {['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Deloitte', 'Amazon', 'Flipkart', 'HDFC Bank', 'BCG', 'Infosys', 'Bain & Co', 'Zomato', 'Byju\'s', 'Razorpay',
                        'Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Deloitte', 'Amazon', 'Flipkart', 'HDFC Bank', 'BCG', 'Infosys', 'Bain & Co', 'Zomato', 'Byju\'s', 'Razorpay'].map((name, i) => (
                            <span key={i} style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 11.5, fontWeight: 800, color: '#c8d3e0', letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{name}</span>
                        ))}
                </div>
            </div>

            {/* ── WHY PREMIUM HIRING NEEDS A CURATED EXPERIENCE ── */}
            <section id="why" style={{ padding: '88px 44px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }}>
                    <div style={{ flex: '0 0 44%' }}>
                        <FadeIn>
                            <span className="premium-section-tag">WHY PREMIUMX</span>
                            <h2 className="premium-h2" style={{ fontSize: 'clamp(28px,3.8vw,44px)', marginBottom: 10 }}>Why Premium Hiring Needs a Curated Experience</h2>
                            <div className="premium-divider" />
                            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 22 }}>
                                The demand for India's premium talent is growing fast — roughly at <strong style={{ color: '#002366' }}>20% CAGR</strong> — and competition for top talent has intensified accordingly.
                            </p>
                            <p style={{ fontSize: 15.5, color: '#475569', lineHeight: 1.78, marginBottom: 22 }}>
                                Global Capability Centres, Fortune 500 India operations, funded startups, family-run businesses, unicorns — all chasing the same narrow pool of leaders, specialists, and highly qualified professionals.
                            </p>
                            <p style={{ fontSize: 15.5, color: '#475569', lineHeight: 1.78 }}>
                                As this segment has grown, so has the opportunity to serve it with a dedicated hiring experience. In the last 6–9 months, Maven has invested substantially to improve the discovery of premium talent.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Four Essentials */}
                    <div style={{ flex: 1 }}>
                        <FadeIn delay={150}>
                            <div style={{ background: 'linear-gradient(135deg, #001540, #002366)', borderRadius: 24, padding: '36px 32px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: '#6ee7b7', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Four Essentials of Premium Hiring</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        {ESSENTIALS.map((e, i) => (
                                            <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '18px 16px' }}>
                                                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${e.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: i === 1 ? '#6ee7b7' : i === 0 ? '#93c5fd' : i === 2 ? '#a5b4fc' : '#fbbf24' }}>
                                                    {e.icon}
                                                </div>
                                                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 800, color: '#f1f5f9', marginBottom: 6 }}>{e.title}</div>
                                                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.6, fontWeight: 500 }}>{e.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── DISCOVERY OF PREMIUM TALENT ── */}
            <section id="discovery" style={{ background: '#f8fafc', padding: '88px 44px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <FadeIn>
                        <div style={{ textAlign: 'center', marginBottom: 64 }}>
                            <span className="premium-section-tag">DISCOVERY ENGINE</span>
                            <h2 className="premium-h2" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>
                                Five Ways MavenPremiumX Finds<br />the Right Candidate — Faster
                            </h2>
                            <div className="premium-divider" style={{ margin: '16px auto 16px' }} />
                            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 540, margin: '0 auto' }}>
                                Senior recruiters say the biggest edge in premium hiring is filtering a large talent pool quickly and reaching the right shortlist with confidence.
                            </p>
                        </div>
                    </FadeIn>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                        {DISCOVERY_FEATURES.map((feat, i) => (
                            <FadeIn key={i} delay={i * 60}>
                                <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 24, padding: '44px', position: 'relative', overflow: 'hidden', transition: 'all .3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,35,102,.15)'; e.currentTarget.style.boxShadow = '0 16px 56px rgba(0,35,102,.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#002366,#10b981)' }} />
                                    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
                                        <div style={{ flexShrink: 0 }}>
                                            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 52, fontWeight: 800, color: '#f1f5f9', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none' }}>{feat.num}</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{feat.title}</h3>
                                                {feat.badge && (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', background: '#EEF2FF', border: '1px solid #c7d2fe', borderRadius: 100, fontSize: 10.5, fontWeight: 800, color: '#002366', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: "'Bricolage Grotesque',sans-serif", flexShrink: 0 }}>
                                                        <FiZap size={10} fill="currentColor" /> {feat.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.78, marginBottom: feat.outcome || feat.pillars || feat.filters || feat.profiles ? 20 : 0 }}>{feat.desc}</p>

                                            {feat.outcome && (
                                                <div style={{ padding: '14px 18px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, fontSize: 14, color: '#065f46', fontWeight: 600, lineHeight: 1.6, marginBottom: feat.pillars ? 24 : 0 }}>
                                                    <FiCheck size={14} style={{ display: 'inline', marginRight: 7, verticalAlign: 'middle' }} />
                                                    {feat.outcome}
                                                </div>
                                            )}

                                            {feat.pillars && (
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 20 }}>
                                                    {feat.pillars.map((p, pi) => (
                                                        <div key={pi} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '20px 16px', textAlign: 'center', transition: 'all .25s', cursor: 'default' }}
                                                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.background = '#EEF2FF'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
                                                            <div style={{ width: 40, height: 40, borderRadius: 11, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#002366' }}>{p.icon}</div>
                                                            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13.5, fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>{p.label}</div>
                                                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{p.sub}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {feat.profiles && (
                                                <div style={{ marginTop: 20, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
                                                    <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                                                        {feat.profiles.map((p, pi) => (
                                                            <div key={pi} style={{ flex: 1, padding: '12px 20px', textAlign: 'center', background: pi === 0 ? '#002366' : 'transparent', fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: pi === 0 ? '#fff' : '#64748b', borderRight: pi === 0 ? '1px solid #e2e8f0' : 'none' }}>{p}</div>
                                                        ))}
                                                    </div>
                                                    {['Senior Director · 17 yrs · ₹1.4Cr', 'VP Operations · 14 yrs · ₹95L', 'Chief of Staff · 11 yrs · ₹78L'].map((row, ri) => (
                                                        <div key={ri} style={{ padding: '13px 20px', borderBottom: ri < 2 ? '1px solid #f1f5f9' : 'none', fontSize: 13, color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <span>{row}</span>
                                                            <span style={{ fontSize: 11.5, fontWeight: 700, color: ri % 2 === 0 ? '#10b981' : '#f59e0b', background: ri % 2 === 0 ? '#ecfdf5' : '#fffbeb', padding: '2px 10px', borderRadius: 100 }}>{ri % 2 === 0 ? 'Active' : 'Passive'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {feat.filters && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                                                    {feat.filters.map((f, fi) => (
                                                        <div key={fi} className="filter-pill">
                                                            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                                                <FiCheck size={14} color="#10b981" strokeWidth={3} />
                                                            </div>
                                                            <div>
                                                                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 3 }}>{f.label}</div>
                                                                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PREMIUM TALENT CONNECT ── */}
            <section id="connect" style={{ padding: '88px 44px', maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <span className="premium-section-tag">CONNECT & PRODUCTIVITY</span>
                        <h2 className="premium-h2" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>Premium Talent Connect<br />&amp; Recruiter Productivity</h2>
                        <div className="premium-divider" style={{ margin: '16px auto 16px' }} />
                        <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
                            Reach premium candidates where they are. Reduce manual effort. Move faster.
                        </p>
                    </div>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {CONNECT_FEATURES.map((feat, i) => (
                        <FadeIn key={i} delay={i * 80}>
                            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 24, padding: '44px', position: 'relative', overflow: 'hidden', transition: 'all .3s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,35,102,.15)'; e.currentTarget.style.boxShadow = '0 16px 56px rgba(0,35,102,.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#10b981,#002366)' }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 9, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 12.5, fontWeight: 800, color: '#002366' }}>#{i + 1}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(18px,2.2vw,23px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{feat.title}</h3>
                                </div>
                                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.78, marginBottom: feat.channels || feat.checks ? 28 : 0 }}>{feat.desc}</p>

                                {feat.channels && (
                                    <div>
                                        <div style={{ fontSize: 11.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>Multi-Channel Outreach</div>
                                        <div className="prem-channels" style={{ display: 'flex', gap: 14 }}>
                                            {feat.channels.map((ch, ci) => (
                                                <div key={ci} className="channel-chip">
                                                    <div style={{ width: 44, height: 44, borderRadius: 13, background: `${ch.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ch.color }}>{ch.icon}</div>
                                                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>{ch.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 16, textAlign: 'center', fontWeight: 500 }}>Engage candidates across the channels where they're most responsive</p>
                                    </div>
                                )}

                                {feat.checks && (
                                    <div>
                                        <div style={{ fontSize: 11.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>14+ Key Details Cross-Checked</div>
                                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                            {feat.checks.map((ch, ci) => (
                                                <div key={ci} className="check-badge">
                                                    <FiCheck size={11} strokeWidth={3} color="#10b981" />
                                                    {ch}
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: 20, padding: '16px 20px', background: '#EEF2FF', border: '1px solid #c7d2fe', borderRadius: 12, fontSize: 14, color: '#002366', fontWeight: 600, lineHeight: 1.65 }}>
                                            <FiShield size={14} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                                            Recruiters skip the verification step entirely — and move straight to the conversations that matter.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── GET STARTED ── */}
            <section id="get-started" style={{ padding: '0 44px 88px', maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ background: 'linear-gradient(135deg,#001540 0%,#002366 45%,#003db5 100%)', borderRadius: 28, padding: '72px 64px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60, flexWrap: 'wrap' }}>
                            <div style={{ flex: '0 0 56%', maxWidth: 580 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.28)', color: '#6ee7b7', fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', padding: '6px 18px', borderRadius: 100, marginBottom: 24, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                                    <FiStar size={11} fill="currentColor" /> Get Started with MavenPremiumX
                                </div>
                                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 18 }}>
                                    Unlock India's Deepest<br /><span style={{ color: '#6ee7b7' }}>Premium Talent Pool</span>
                                </h2>
                                <p style={{ fontSize: 16, color: 'rgba(255,255,255,.65)', lineHeight: 1.75, marginBottom: 32 }}>
                                    MavenPremiumX unlocks a deeper talent pool with advanced features that help you discover and connect with the right talent — faster, more precisely, and at the best ROI in the industry.
                                </p>
                                <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, marginBottom: 32 }}>
                                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13.5, fontWeight: 800, color: 'rgba(255,255,255,.75)', marginBottom: 12, letterSpacing: '.05em' }}>FOR A GUIDED WALKTHROUGH OR ANY QUESTIONS</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(16,185,129,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FiMail size={14} color="#6ee7b7" />
                                            </div>
                                            <a href="mailto:support@mavenjobs.com" style={{ fontSize: 14.5, color: '#6ee7b7', fontWeight: 700, textDecoration: 'none' }}>support@mavenjobs.com</a>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(96,165,250,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FiPhone size={14} color="#93c5fd" />
                                            </div>
                                            <span style={{ fontSize: 14.5, color: '#93c5fd', fontWeight: 700 }}>1800 102 5558 <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>(Mon–Sat, 10:00 AM – 6:00 PM)</span></span>
                    </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                    <button style={{ padding: '15px 34px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: "'Bricolage Grotesque',sans-serif", display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(16,185,129,.35)', transition: 'all .2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#0da371'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(16,185,129,.45)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,185,129,.35)'; }}>
                                        Get Started Now <FiArrowRight size={16} />
                                    </button>
                                    <button style={{ padding: '15px 32px', background: 'rgba(255,255,255,.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)', borderRadius: 13, fontSize: 15, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 8 }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.14)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}>
                                        <FiPhoneCall size={15} /> Talk to Your Account Manager
                                    </button>
                                </div>
                            </div>

                            {/* Right — what you get */}
                            <div style={{ flex: 1, minWidth: 260 }}>
                                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,.4)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 20 }}>What You Unlock</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {['85%+ of India\'s premium talent in one pool', 'AI-powered matching with industry context', 'Active + passive candidates in one view', 'NChecked cross-verified profiles', 'Exclusive premium shortlisting filters', 'Multi-channel candidate outreach', 'Concierge & expert hiring support'].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12 }}>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(16,185,129,.16)', border: '1px solid rgba(16,185,129,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <FiCheck size={11} color="#6ee7b7" strokeWidth={3} />
                                            </div>
                                            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: '#001540', padding: '56px 44px 32px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
                        <div>
                            <img src={mavenLogo} alt="MavenJobs" style={{ height: 28, filter: 'brightness(0) invert(1)', opacity: .85, display: 'block', marginBottom: 16 }} />
                            <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.7, maxWidth: 240 }}>India's leading premium talent platform — built for the next generation of hiring.</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 18 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>All systems operational</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap' }}>
                            {[
                                { title: 'PremiumX', links: ['Why PremiumX', 'Discovery Engine', 'NChecked Profiles', 'PremiumX Assist', 'Pricing'] },
                                { title: 'Company', links: ['About Maven', 'Blog', 'Careers', 'Press', 'Contact'] },
                                { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'] },
                            ].map(({ title, links }) => (
                                <div key={title}>
                                    <p style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#334155', marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{title}</p>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {links.map(l => (
                                            <li key={l}>
                                                <a href="#" style={{ fontSize: 13.5, color: '#64748b', textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}
                                                    onMouseEnter={e => e.target.style.color = '#cbd5e1'}
                                                    onMouseLeave={e => e.target.style.color = '#64748b'}>{l}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <p style={{ fontSize: 13, color: '#334155' }}>© 2026 MavenJobs Private Limited · All rights reserved · CIN: U74999KA2022PTC000001</p>
                        <p style={{ fontSize: 13, color: '#334155' }}>Made with ❤️ in India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}