import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiUsers,
  FiChevronDown,
  FiArrowRight,
  FiBriefcase,
  FiPhoneCall,
  FiX,
  FiSearch,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";

/* ─────────────────────────────── Helpers ─────────────────────────────── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────────── Data ────────────────────────────────── */
const JOB_PLANS = [
  {
    name: 'Hot Vacancy',
    price: '₹1,650',
    accent: '#2563EB',
    accentLight: '#EFF6FF',
    badge: 'Most Popular',
    validity: '30 days',
    features: [
      { text: 'Detailed job description', included: true },
      { text: '3 job locations', included: true },
      { text: 'Unlimited applies', included: true },
      { text: 'Applies expiry 90 days', included: true },
      { text: 'Jobseeker contact details', included: true },
      { text: 'Boost on Job Search Page', included: true },
      { text: 'Job Branding', included: true },
    ],
  },
  {
    name: 'Classified',
    price: '₹850',
    accent: '#2563EB',
    accentLight: '#F8FAFC',
    badge: null,
    validity: '30 days',
    features: [
      { text: 'Upto 250 char description', included: true },
      { text: '3 job locations', included: true },
      { text: 'Unlimited applies', included: true },
      { text: 'Applies expiry 90 days', included: true },
      { text: 'Jobseeker contact details', included: true },
      { text: 'Boost on Job Search Page', included: false },
      { text: 'Job Branding', included: false },
    ],
  },
  {
    name: 'Standard',
    price: '₹400',
    accent: '#2563EB',
    accentLight: '#F8FAFC',
    badge: null,
    validity: '15 days',
    features: [
      { text: 'Upto 250 char description', included: true },
      { text: '1 job location', included: true },
      { text: '200 applies', included: true },
      { text: 'Applies expiry 30 days', included: true },
      { text: 'Jobseeker contact details', included: false },
      { text: 'Boost on Job Search Page', included: false },
      { text: 'Job Branding', included: false },
    ],
  },
  {
    name: 'Free',
    price: 'Free',
    accent: '#16A34A',
    accentLight: '#F0FDF4',
    badge: null,
    validity: '7 days',
    isFree: true,
    features: [
      { text: 'Upto 250 char description', included: true },
      { text: '1 job location', included: true },
      { text: '50 applies', included: true },
      { text: 'Applies expiry 15 days', included: true },
      { text: 'Jobseeker contact details', included: false },
      { text: 'Boost on Job Search Page', included: false },
      { text: 'Job Branding', included: false },
    ],
  },
];

const FAQS = [
  {
    question: 'How long is a job posting active?',
    answer: 'A standard job posting remains active for 30 days from the date of publishing. You can extend it by purchasing additional validity.',
  },
  {
    question: 'What is Resdex and how does it work?',
    answer: 'Resdex is our extensive resume database. It allows you to search and contact candidates directly based on skills, experience, location, and more.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. The remaining value of your current plan will be pro-rated against the cost of the new plan.',
  },
  {
    question: 'Are there any hidden charges?',
    answer: 'No, all our pricing is transparent. The prices shown are exclusive of GST, which will be added at checkout as applicable.',
  },
];

const STATS = [
  { value: '8 Cr+', label: 'Job Seekers' },
  { value: '1.5 Lakh+', label: 'Active Companies' },
  { value: '50 Lakh+', label: 'Jobs Posted' },
  { value: '98%', label: 'Employer Satisfaction' },
];

/* ─────────────────────────────── Sub-components ───────────────────────── */
function PlanCard({ plan, index }) {
  const [ref, visible] = useInView(0.1);
  const isHot = plan.name === 'Hot Vacancy';

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
        position: 'relative',
        borderRadius: 20,
        background: isHot ? '#0F172A' : '#FFFFFF',
        border: isHot ? 'none' : '1.5px solid #E2E8F0',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHot
          ? '0 24px 60px rgba(37,99,235,0.25), 0 8px 16px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Hot accent glow */}
      {isHot && (
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 180, height: 180,
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {plan.badge && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'rgba(59,130,246,0.15)',
          color: '#93C5FD',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: 100,
          marginBottom: 16,
          width: 'fit-content',
        }}>
          <FiStar style={{ width: 10, height: 10 }} /> {plan.badge}
        </span>
      )}

      <h4 style={{
        fontSize: 20, fontWeight: 700,
        color: isHot ? '#F1F5F9' : '#1E293B',
        marginBottom: 4,
      }}>{plan.name}</h4>

      <div style={{ marginBottom: 4 }}>
        {plan.isFree ? (
          <span style={{ fontSize: 32, fontWeight: 800, color: isHot ? '#86EFAC' : '#16A34A' }}>Free</span>
        ) : (
          <>
            <span style={{ fontSize: 32, fontWeight: 800, color: isHot ? '#FFFFFF' : '#0F172A' }}>{plan.price}</span>
            <span style={{ fontSize: 13, color: isHot ? '#94A3B8' : '#94A3B8', marginLeft: 4 }}>+GST</span>
          </>
        )}
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center',
        fontSize: 12, fontWeight: 600,
        color: isHot ? '#60A5FA' : '#64748B',
        background: isHot ? 'rgba(96,165,250,0.1)' : '#F1F5F9',
        padding: '4px 10px',
        borderRadius: 100,
        marginBottom: 24,
        width: 'fit-content',
      }}>
        Valid for {plan.validity}
      </div>

      <div style={{
        borderTop: isHot ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F1F5F9',
        paddingTop: 20,
        marginBottom: 24,
        flex: 1,
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {plan.features.map((f, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 13.5,
              color: f.included
                ? (isHot ? '#CBD5E1' : '#334155')
                : (isHot ? '#475569' : '#CBD5E1'),
              textDecoration: f.included ? 'none' : 'line-through',
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: f.included
                  ? (isHot ? 'rgba(74,222,128,0.15)' : '#DCFCE7')
                  : (isHot ? 'rgba(255,255,255,0.05)' : '#F8FAFC'),
              }}>
                {f.included
                  ? <FiCheck style={{ width: 10, height: 10, color: isHot ? '#4ADE80' : '#16A34A', strokeWidth: 3 }} />
                  : <FiX style={{ width: 9, height: 9, color: isHot ? '#475569' : '#CBD5E1', strokeWidth: 2.5 }} />
                }
              </span>
              {f.text}
            </li>
          ))}
        </ul>
      </div>

      <button style={{
        width: '100%',
        padding: '13px 0',
        borderRadius: 12,
        border: isHot ? 'none' : (plan.isFree ? '1.5px solid #16A34A' : '1.5px solid #2563EB'),
        background: isHot
          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
          : plan.isFree
            ? 'transparent'
            : 'transparent',
        color: isHot ? '#FFFFFF' : plan.isFree ? '#16A34A' : '#2563EB',
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: '0.01em',
        transition: 'all 0.2s ease',
      }}
        onMouseEnter={e => {
          if (isHot) {
            e.target.style.background = 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)';
          } else {
            e.target.style.background = plan.isFree ? '#F0FDF4' : '#EFF6FF';
          }
        }}
        onMouseLeave={e => {
          if (isHot) {
            e.target.style.background = 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)';
          } else {
            e.target.style.background = 'transparent';
          }
        }}
      >
        {plan.isFree ? 'Post a free job' : 'Buy now →'}
      </button>
    </div>
  );
}

function StatCard({ value, label, index }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      textAlign: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#2563EB', lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500, letterSpacing: '0.02em' }}>{label}</div>
    </div>
  );
}

function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1.5px solid',
      borderColor: isOpen ? '#BFDBFE' : '#E2E8F0',
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      boxShadow: isOpen ? '0 4px 20px rgba(37,99,235,0.08)' : 'none',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', lineHeight: 1.4 }}>{faq.question}</span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginLeft: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? '#EFF6FF' : '#F8FAFC',
          transition: 'background 0.2s ease',
        }}>
          <FiChevronDown style={{
            width: 16, height: 16,
            color: isOpen ? '#2563EB' : '#94A3B8',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease, color 0.2s ease',
          }} />
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{
          padding: '0 24px 20px',
          margin: 0,
          fontSize: 14.5,
          color: '#475569',
          lineHeight: 1.7,
          borderTop: '1px solid #F1F5F9',
          paddingTop: 16,
        }}>{faq.answer}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Main Page ────────────────────────────── */
export default function Buyonline() {
  const [activeFaq, setActiveFaq] = useState(null);
  const scrollY = useScrollY();
  const [heroRef, heroVisible] = useInView(0.05);
  const [statsRef, statsVisible] = useInView(0.1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const navScrolled = scrollY > 60;

  return (
    <div style={{
      background: '#F8FAFC',
      minHeight: '100vh',
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      color: '#1E293B',
      overflowX: 'hidden',
    }}>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #BFDBFE; }
        html { scroll-behavior: smooth; }

        .nav-link {
          position: relative; font-size: 14px; font-weight: 500;
          color: #475569; text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #2563EB;
          transition: width 0.2s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: #2563EB; }
        .nav-link:hover::after { width: 100%; }

        .plan-card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .plan-card-hover:hover {
          transform: translateY(-4px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .badge-new {
          display: inline-flex; align-items: center;
          background: linear-gradient(90deg, #DC2626, #EF4444, #DC2626);
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite linear;
          color: white; font-size: 10px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          padding: 2px 8px; border-radius: 100px;
          margin-left: 6px;
        }
        .cta-btn-primary {
          background: #2563EB;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.01em;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35);
        }
        .cta-btn-primary:hover {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.4);
        }
        .cta-btn-secondary {
          background: white;
          color: #1E293B;
          border: 1.5px solid #E2E8F0;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.01em;
          transition: all 0.2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: #BFDBFE;
          color: #2563EB;
          background: #EFF6FF;
        }

        .resdex-card {
          transition: transform 0.2s ease;
        }
        .resdex-card:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .hero-image { display: none !important; }
          .plans-grid { grid-template-columns: 1fr 1fr !important; }
          .resdex-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .highlights-grid { flex-direction: column !important; }
          .nav-center { display: none !important; }
        }
        @media (max-width: 480px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════ NAV ══════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: navScrolled ? '14px 40px' : '18px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: navScrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(16px)' : 'none',
        borderBottom: navScrolled ? '1px solid rgba(226,232,240,0.7)' : 'none',
        boxShadow: navScrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={mavenLogo} alt="MavenJobs" style={{ height: 30 }} />
        </Link>

        <div className="nav-center" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link to="/employer-login" className="nav-link">Our offerings</Link>
          <a href="#" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
            Maven Talent Cloud <span className="badge-new">NEW</span>
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 13.5, fontWeight: 600, color: '#475569',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: '#EFF6FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FiPhoneCall style={{ width: 13, height: 13, color: '#2563EB' }} />
            </div>
            <span style={{ display: window.innerWidth < 900 ? 'none' : 'inline' }}>1800-102-2558</span>
          </div>
          <Link to="/employer-login" style={{
            fontSize: 13.5, fontWeight: 700, color: '#2563EB',
            textDecoration: 'none',
            padding: '8px 18px',
            border: '1.5px solid #BFDBFE',
            borderRadius: 10,
            background: '#EFF6FF',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.target.style.background = '#DBEAFE'; }}
            onMouseLeave={e => { e.target.style.background = '#EFF6FF'; }}
          >
            Employer Login
          </Link>
        </div>
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '120px 40px 60px',
        maxWidth: 1280, margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background blob */}
        <div style={{
          position: 'absolute', top: 80, right: -100,
          width: 600, height: 600,
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: -80,
          width: 400, height: 400,
          background: 'radial-gradient(circle at center, rgba(16,185,129,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="hero-grid" ref={heroRef} style={{
          display: 'flex', alignItems: 'center', gap: 60, width: '100%',
        }}>
          {/* Left */}
          <div style={{ flex: '0 0 50%', maxWidth: 560 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#EFF6FF', border: '1px solid #BFDBFE',
              color: '#1D4ED8', fontSize: 12.5, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '6px 14px', borderRadius: 100,
              marginBottom: 24,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}>
              <FiZap style={{ width: 12, height: 12 }} /> India's #1 Hiring Platform
            </div>

            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(38px, 5vw, 58px)',
              fontWeight: 400, lineHeight: 1.12,
              color: '#0F172A', marginBottom: 20,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
            }}>
              Find, attract &amp; hire
              <br />
              <em style={{ color: '#2563EB', fontStyle: 'italic' }}>exceptional talent</em>
            </h1>

            <p style={{
              fontSize: 17, color: '#64748B', lineHeight: 1.7,
              marginBottom: 36, maxWidth: 480,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s',
            }}>
              Connect with 8 crore+ active job seekers on MavenJobs. Post jobs, search resumes, and build your dream team — all in one place.
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.55s ease 0.4s, transform 0.55s ease 0.4s',
            }}>
              <button className="cta-btn-primary">
                Post a free job <FiArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button className="cta-btn-secondary">
                View all plans
              </button>
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 20, marginTop: 36,
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.55s ease 0.5s',
            }}>
              {[
                { icon: FiShield, text: 'Verified candidates' },
                { icon: FiTrendingUp, text: 'Fast hiring' },
                { icon: FiUsers, text: 'SMB-friendly' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon style={{ width: 14, height: 14, color: '#2563EB' }} />
                  <span style={{ fontSize: 12.5, color: '#64748B', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="hero-image" style={{
            flex: 1, position: 'relative',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}>
            <div style={{
              position: 'absolute', inset: -16,
              background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(16,185,129,0.05) 100%)',
              borderRadius: 28, filter: 'blur(32px)',
            }} />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Team collaborating"
              style={{
                width: '100%', height: 460, objectFit: 'cover',
                borderRadius: 24, position: 'relative', zIndex: 1,
                border: '3px solid rgba(255,255,255,0.8)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.14)',
              }}
            />
            {/* Floating card */}
            <div style={{
              position: 'absolute', bottom: -20, left: -20, zIndex: 2,
              background: 'white',
              borderRadius: 16, padding: '16px 20px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', gap: 14,
              minWidth: 220,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: '#EFF6FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiUsers style={{ width: 20, height: 20, color: '#2563EB' }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>2,340+</div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Hires this week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div ref={statsRef} className="stats-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: 900, margin: '0 auto', padding: '0 40px',
          gap: 0,
        }}>
          {STATS.map((s, i) => <StatCard key={i} {...s} index={i} />)}
        </div>
      </section>

      {/* ══════════════════════ HIRING MADE EASY ══════════════════════ */}
      <section style={{ padding: '80px 40px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400, color: '#0F172A', marginBottom: 10,
          }}>Hiring Made Easy</h2>
          <p style={{ fontSize: 15, color: '#64748B' }}>for Small &amp; Medium Businesses</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="resdex-grid">
          {[
            { 
              tag: 'JOB POSTING', 
              title: 'Post a job and get relevant applies', 
              features: ['Attract qualified candidates', 'Customise job posting'], 
              target: '#job-plans',
              icon: FiBriefcase,
              color: '#2563EB'
            },
            { 
              tag: 'RESDEX', 
              title: 'Search India’s resume database', 
              features: ['Discover local talent', 'Find the right fit'], 
              target: '#resdex-plans',
              icon: FiSearch,
              color: '#059669'
            },
            { 
              tag: 'ASSISTED HIRING', 
              title: 'Get a dedicated hiring expert', 
              features: ['Experts assess needs', 'Profiles screened & shared'], 
              target: '#expert-plans',
              icon: FiUsers,
              color: '#7C3AED',
              badge: 'Newly launched'
            },
          ].map((item, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div key={i} ref={ref} style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 24, padding: '36px',
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                display: 'flex', flexDirection: 'column',
                position: 'relative'
              }}>
                {item.badge && (
                  <div style={{ 
                    position: 'absolute', top: 12, right: -25, 
                    background: '#EA580C', color: 'white', 
                    fontSize: 10, fontWeight: 800, padding: '4px 30px', 
                    transform: 'rotate(45deg)', boxShadow: '0 2px 8px rgba(234,88,12,0.3)'
                  }}>NEW</div>
                )}
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: item.color, marginBottom: 12 }}>{item.tag}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', marginBottom: 20, lineHeight: 1.4, flex: 1 }}>{item.title}</h3>
                
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {item.features.map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#64748B' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={item.target} style={{
                  fontSize: 14, fontWeight: 700, color: item.color, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content'
                }}
                  onMouseEnter={e => { e.currentTarget.style.gap = '10px'; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}
                >
                  View plans <FiArrowRight style={{ transition: 'all 0.2s ease' }} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════ HIGHLIGHTS ══════════════════════ */}
      <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="highlights-grid" style={{ display: 'flex', gap: 20 }}>
          {[
            { Icon: FiUsers, color: '#2563EB', bg: '#EFF6FF', title: 'Hire skilled candidates', desc: 'for your business across all industries and roles' },
            { Icon: FiBriefcase, color: '#7C3AED', bg: '#F5F3FF', title: 'Relevant industry experience', desc: 'Match with candidates who truly understand your domain' },
            { Icon: FiSearch, color: '#059669', bg: '#ECFDF5', title: 'Budget-friendly plans', desc: 'Starting from just ₹400 — perfect for SMBs and startups' },
          ].map(({ Icon, color, bg, title, desc }, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div key={i} ref={ref} style={{
                flex: 1, background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 20, padding: '32px 28px',
                display: 'flex', gap: 18, alignItems: 'flex-start',
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon style={{ width: 22, height: 22, color }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════ PRICING — JOB POSTING ══════════════════════ */}
      <section id="job-plans" style={{ padding: '20px 40px 80px', maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#EA580C', background: '#FFF7ED', border: '1px solid #FED7AA',
            padding: '5px 14px', borderRadius: 100, marginBottom: 16,
          }}>Job Posting</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400,
            color: '#0F172A', marginBottom: 12,
          }}>
            Attract the <em style={{ color: '#2563EB', fontStyle: 'italic' }}>right candidates</em>
          </h2>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
            Quick and easy plans on India's leading job portal for small &amp; medium businesses
          </p>
        </div>

        <div className="plans-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {JOB_PLANS.map((plan, i) => (
            <div key={i} className="plan-card-hover">
              <PlanCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center', fontSize: 12.5, color: '#94A3B8',
          marginTop: 20,
        }}>
          * All prices are exclusive of GST as applicable
        </p>
      </section>

      {/* ══════════════════════ RESDEX ══════════════════════ */}
      <section id="resdex-plans" style={{ padding: '20px 40px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          background: '#0F172A',
          borderRadius: 28, overflow: 'hidden',
          position: 'relative',
          padding: '60px 60px',
        }}>
          {/* BG decorations */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#60A5FA', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(96,165,250,0.3)',
                padding: '5px 14px', borderRadius: 100, marginBottom: 16,
              }}>Resdex</span>
              <h2 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 400,
                color: '#F8FAFC', marginBottom: 10,
              }}>
                India's largest <em style={{ color: '#60A5FA', fontStyle: 'italic' }}>resume database</em>
              </h2>
              <p style={{ fontSize: 15, color: '#94A3B8', maxWidth: 460, margin: '0 auto' }}>
                Search by location, industry, skills &amp; more to find exactly the right fit
              </p>
            </div>

            <div className="resdex-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Resdex Lite */}
              <div className="resdex-card" style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '36px 32px',
                backdropFilter: 'blur(12px)',
              }}>
                <h4 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', marginBottom: 6 }}>Resdex Lite</h4>
                <p style={{ fontSize: 13.5, color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
                  Best for small &amp; medium businesses with focused hiring needs
                </p>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 38, fontWeight: 800, color: '#FFFFFF' }}>₹4,000</span>
                  <span style={{ fontSize: 13, color: '#64748B', marginLeft: 6 }}>+GST</span>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 28 }}>per requirement</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {['100 CV views per requirement', 'Up to 500 search results', 'Candidates active in last 6 months', '10+ advanced filters', 'Single user access'].map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#CBD5E1' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiCheck style={{ width: 10, height: 10, color: '#4ADE80', strokeWidth: 3 }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: '100%', padding: '13px 0', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                }}>Buy now →</button>
              </div>

              {/* Resdex Pro */}
              <div className="resdex-card" style={{
                background: '#FFFFFF', borderRadius: 20, padding: '36px 32px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h4 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>Resdex Pro</h4>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                    background: '#FFF7ED', color: '#EA580C', border: '1px solid #FED7AA',
                    padding: '4px 10px', borderRadius: 100,
                  }}>Enterprise</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 24, lineHeight: 1.6 }}>
                  Custom solutions and dedicated support for large-scale hiring needs
                </p>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#0F172A' }}>Custom</span>
                  <p style={{ fontSize: 12.5, color: '#94A3B8', marginTop: 4 }}>Based on your plan &amp; requirements</p>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {['CV views as per plan', 'Unlimited search results', 'All available candidates', '20+ advanced filters', 'Multiple user access', 'Bulk CV downloads'].map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#334155' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiCheck style={{ width: 10, height: 10, color: '#16A34A', strokeWidth: 3 }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: '100%', padding: '13px 0', borderRadius: 12,
                  border: '2px solid #2563EB', background: 'transparent',
                  color: '#2563EB', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.target.style.background = '#EFF6FF'; }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                >
                  Contact sales →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ EXPERT ASSISTANCE ══════════════════════ */}
      <section id="expert-plans" style={{ padding: '20px 40px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#7C3AED', background: '#F5F3FF', border: '1px solid #DDD6FE',
            padding: '5px 14px', borderRadius: 100, marginBottom: 16,
          }}>Expert Assist</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400,
            color: '#0F172A', marginBottom: 12,
          }}>
            Get our <em style={{ color: '#7C3AED', fontStyle: 'italic' }}>hiring expertise</em>
          </h2>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 500, margin: '0 auto' }}>
            Source, screen, and handpick top talent with the help of Maven's recruitment experts
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          {[
            {
              title: "Assisted Hiring for Job Posting",
              price: "₹4,000",
              validity: "90 days",
              steps: [
                'Personalized consultation with hiring expert',
                'Job posting on MavenJobs for maximum reach',
                'Shortlisting of most relevant applicants',
                'Shortlisted profiles shared for final selection'
              ]
            },
            {
              title: "Assisted Hiring for Resdex",
              price: "₹5,000",
              validity: "15 days",
              steps: [
                'Personalized consultation with hiring expert',
                'Tailored search in Resdex for your specific needs',
                'Direct connection with top 10Cr+ resume pool',
                'Access to 100 CV views per requirement'
              ]
            }
          ].map((item, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div key={i} ref={ref} style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 24, padding: '40px',
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle at top right, rgba(124,58,237,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
                
                <h4 style={{ fontSize: 19, fontWeight: 700, color: '#1E293B', marginBottom: 12, lineHeight: 1.4 }}>{item.title}</h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#0F172A' }}>{item.price}</span>
                  <span style={{ fontSize: 13, color: '#94A3B8' }}>+GST</span>
                </div>
                <div style={{
                  fontSize: 11.5, fontWeight: 700, color: '#64748B',
                  background: '#F1F5F9', padding: '3px 10px', borderRadius: 100,
                  width: 'fit-content', marginBottom: 32,
                }}>
                  Validity: {item.validity}
                </div>

                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>How it works</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {item.steps.map((step, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 14, color: '#475569', lineHeight: 1.5 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <FiCheck style={{ width: 12, height: 12, color: '#7C3AED', strokeWidth: 3 }} />
                        </div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <button style={{
                  width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                  color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.3)'; }}
                >
                  Request Assistance →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section style={{ padding: '0 40px 100px', maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400, color: '#0F172A', marginBottom: 10,
          }}>Frequently asked questions</h2>
          <p style={{ fontSize: 15, color: '#64748B' }}>Everything you need to know about our plans and billing.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i} faq={faq} index={i}
              isOpen={activeFaq === i}
              onToggle={() => setActiveFaq(activeFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ══════════════════════ */}
      <section style={{ padding: '0 40px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)',
          borderRadius: 28, padding: '72px 60px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400,
              color: '#FFFFFF', marginBottom: 14, lineHeight: 1.2,
            }}>
              Ready to find your next<br /><em style={{ fontStyle: 'italic' }}>great hire?</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
              Join 1.5 lakh+ companies using MavenJobs to build their dream teams. Start for free today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button style={{
                background: 'white', color: '#1E40AF', border: 'none',
                padding: '15px 32px', borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)'; }}
              >
                Get started — it's free <FiArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button style={{
                background: 'rgba(255,255,255,0.1)', color: 'white',
                border: '1.5px solid rgba(255,255,255,0.3)',
                padding: '15px 32px', borderRadius: 12,
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              >
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer style={{ background: '#0F172A', padding: '56px 40px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
            <div>
              <img src={mavenLogo} alt="MavenJobs" style={{ height: 28, filter: 'brightness(0) invert(1)', opacity: 0.9, marginBottom: 16 }} />
              <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.6, maxWidth: 260 }}>
                India's leading platform connecting employers with top talent across industries.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
              {[
                { title: 'Product', links: ['Job Posting', 'Resdex', 'Maven Talent Cloud', 'Pricing'] },
                { title: 'Company', links: ['About us', 'Blog', 'Careers', 'Contact us'] },
                { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 16 }}>{title}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {links.map(l => (
                      <li key={l}>
                        <a href="#" style={{ fontSize: 13.5, color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                          onMouseEnter={e => { e.target.style.color = '#F1F5F9'; }}
                          onMouseLeave={e => { e.target.style.color = '#94A3B8'; }}
                        >{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #1E293B', paddingTop: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ fontSize: 13, color: '#475569' }}>© 2026 MavenJobs. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
              <span style={{ fontSize: 12.5, color: '#475569' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}