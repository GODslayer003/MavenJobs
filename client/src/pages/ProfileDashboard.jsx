import React, { useState, useRef } from 'react';
import {
  FiEdit2, FiBriefcase, FiMapPin, FiZap, FiCheckCircle,
  FiChevronRight, FiHome, FiFileText, FiMonitor, FiShare2,
  FiDownload, FiPlus, FiUsers, FiEye, FiTrendingUp, FiAward,
  FiBell, FiSettings, FiLogOut, FiPhone, FiMail, FiX,
  FiCalendar, FiClock, FiChevronLeft, FiInfo, FiSend, FiChevronDown,
  FiStar, FiBookmark, FiGlobe
} from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GiCrown } from 'react-icons/gi';
import { useAuth } from '../AuthContext';
import RecommendedJobs from './RecommendedJobs';
import './ProfileDashboard.css';
import mavenLogo from '../../assets/maven-logo-BdiSsfJk.svg';

export default function ProfileDashboard() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(user?.name || '');
  const [activeTab, setActiveTab] = useState('Profile (18)');
  const [coverImage, setCoverImage] = useState("https://i.pinimg.com/736x/15/8e/a9/158ea9c22bfbb6e5003b693b91d30e48.jpg");
  const [showPreview, setShowPreview] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNavDropdown, setActiveNavDropdown] = useState(null);
  const [showJobsModal, setShowJobsModal] = useState(false);
  const jobScrollRef = useRef(null);
  const earlyScrollRef = useRef(null);
  const matchScrollRef = useRef(null);
  const pfpInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const recommendedJobs = {
    'Profile (18)': [
      { code: 'PE', title: 'Product Engineer', company: 'SmartDocs Tech', rating: 3.1, loc: 'Hyderabad', ago: '4d ago', bg: '#EEF2FF', col: '#4338CA' },
      { code: 'UI', title: 'UI/UX Designer', company: 'Onebanc Tech', rating: 4.8, loc: 'Gurugram', ago: '1d ago', bg: '#FFF7ED', col: '#C2410C' },
      { code: 'A', title: 'Software Tester', company: 'Aarons Visions', rating: 4.2, loc: 'Remote', ago: '2d ago', bg: '#F0FDF4', col: '#15803D' },
      { code: 'FE', title: 'Frontend Developer', company: 'DevMatrix', rating: 4.5, loc: 'Bengaluru', ago: '3d ago', bg: '#EFF6FF', col: '#1D4ED8' },
      { code: 'BE', title: 'Backend Lead', company: 'NodeMasters', rating: 4.9, loc: 'Pune', ago: '12h ago', bg: '#FDF2F8', col: '#9D174D' },
    ],
    'Applies (29)': [
      { code: 'DS', title: 'Data Scientist', company: 'Analytica', rating: 4.6, loc: 'Mumbai', ago: '2d ago', bg: '#ECFDF5', col: '#047857' },
      { code: 'ML', title: 'ML Engineer', company: 'DeepMind India', rating: 4.7, loc: 'Bengaluru', ago: '5d ago', bg: '#F5F3FF', col: '#6D28D9' },
      { code: 'QA', title: 'Quality Analyst', company: 'TestRig', rating: 3.9, loc: 'Chennai', ago: '1w ago', bg: '#FFF7ED', col: '#C2410C' },
    ],
    'Preferences (4)': [
      { code: 'FS', title: 'Full Stack Dev', company: 'MetaScale', rating: 4.4, loc: 'Remote', ago: '1d ago', bg: '#F0F9FF', col: '#0369A1' },
      { code: 'DO', title: 'DevOps Architect', company: 'CloudFlow', rating: 4.8, loc: 'Hyderabad', ago: '6h ago', bg: '#F8FAFC', col: '#334155' },
    ],
    'You might like (10)': [
      { code: 'GD', title: 'Graphic Designer', company: 'CreativeCo', rating: 4.3, loc: 'New Delhi', ago: '3d ago', bg: '#FDF4FF', col: '#A21CAF' },
      { code: 'PM', title: 'Product Manager', company: 'Innova', rating: 4.5, loc: 'Bengaluru', ago: '4d ago', bg: '#F0FDF4', col: '#166534' },
    ]
  };

  const handleScroll = (ref, dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if (!user) return <Navigate to="/" />;

  const handleNameSave = () => { updateUser({ name: editNameValue }); setIsEditingName(false); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleNameSave(); if (e.key === 'Escape') setIsEditingName(false); };

  const handlePfpChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateUser({ profilePic: ev.target.result });
    reader.readAsDataURL(file); e.target.value = '';
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverImage(ev.target.result);
    reader.readAsDataURL(file); e.target.value = '';
  };

  return (
    <div className="pd-root">
      <input ref={pfpInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePfpChange} />
      <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverChange} />

      {/* ─── Navbar ─── */}
      <header className="pd-navbar">
        <div className="pd-navbar-inner">
          <Link to="/" className="pd-navbar-brand">
            <img src={mavenLogo} alt="MavenJobs" className="pd-navbar-logo-img" />
          </Link>

          <nav className="pd-navbar-links">
            <Link to="/jobs" className="pd-nav-link">Jobs</Link>
            <div className="pd-nav-dropdown-wrapper"
              onMouseEnter={() => setActiveNavDropdown('Companies')}
              onMouseLeave={() => setActiveNavDropdown(null)}>
              <Link to="/companies" className="pd-nav-link">
                Companies <FiChevronDown size={13} className="pd-nav-chevron" />
              </Link>
              {activeNavDropdown === 'Companies' && (
                <div className="pd-megamenu">
                  <div className="pd-megamenu-col">
                    <span className="pd-mega-label">EXPLORE CATEGORIES</span>
                    {['Unicorn', 'MNC', 'Startup', 'Product Based', 'Internet'].map(i => <Link key={i} to="/companies">{i}</Link>)}
                  </div>
                  <div className="pd-megamenu-col">
                    <span className="pd-mega-label">COLLECTIONS</span>
                    {['Top Companies', 'IT Companies', 'Fintech', 'Sponsored', 'Featured'].map(i => <Link key={i} to="/companies">{i}</Link>)}
                  </div>
                  <div className="pd-megamenu-col">
                    <span className="pd-mega-label">RESEARCH</span>
                    {['Interview Questions', 'Company Salaries', 'Reviews', 'Salary Calculator'].map(i => <Link key={i} to="/companies">{i}</Link>)}
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="pd-nav-link">Services</a>
            <a href="#" className="pd-nav-link">Courses</a>
          </nav>

          <div className="pd-navbar-actions">
            <div className="pd-nav-search">
              <FiGlobe size={15} className="pd-search-icon" />
              <input type="text" placeholder="Search jobs, companies…" />
            </div>
            <button className={`pd-navbar-bell ${showNotifications ? 'active' : ''}`} onClick={() => setShowNotifications(true)}>
              <FiBell size={19} />
              <span className="pd-nav-badge">3</span>
            </button>
            <div className="pd-navbar-avatar" onClick={() => navigate('/profile')}>
              <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="You" />
              <span className="pd-avatar-status" />
            </div>
            <button className="pd-navbar-logout" onClick={logout}>
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* ─── Cover ─── */}
      <div className="pd-cover" style={{ backgroundImage: `url(${coverImage})` }}>
        <div className="pd-cover-overlay" />
        <button className="pd-cover-edit" onClick={() => coverInputRef.current.click()}>
          <FiEdit2 size={13} /> Change Cover
        </button>
      </div>

      {/* ─── Identity Bar ─── */}
      <div className="pd-identity-bar">
        <div className="pd-identity-inner">
          <div className="pd-avatar-wrap">
            <img
              src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"}
              alt="Profile" className="pd-big-avatar"
            />
            <button className="pd-avatar-edit" onClick={() => pfpInputRef.current.click()}>
              <FiEdit2 size={11} />
            </button>
            <div className="pd-avatar-online" />
          </div>

          <div className="pd-identity-info">
            <div className="pd-name-row">
              {isEditingName ? (
                <div className="pd-name-edit-row">
                  <input className="pd-name-input" value={editNameValue} onChange={e => setEditNameValue(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
                  <button className="pd-save-btn" onClick={handleNameSave}>Save</button>
                  <button className="pd-cancel-btn" onClick={() => setIsEditingName(false)}>✕</button>
                </div>
              ) : (
                <h1 className="pd-name">
                  {user.name}
                  <span className="pd-verified"><FiCheckCircle size={16} /></span>
                  <button className="pd-edit-icon-btn" onClick={() => { setEditNameValue(user.name); setIsEditingName(true); }}>
                    <FiEdit2 size={13} />
                  </button>
                </h1>
              )}
              <span className="pd-open-badge">● Open to Work</span>
            </div>

            <p className="pd-headline">{user.headline || 'MERN Stack Developer · Software Engineer'}</p>
            <p className="pd-location"><FiMapPin size={12} /> Bengaluru, Karnataka, India</p>

            <div className="pd-quick-stats">
              <div className="pd-qs-item">
                <FiEye size={15} />
                <div><strong>130</strong><span>Profile views</span></div>
              </div>
              <div className="pd-qs-divider" />
              <div className="pd-qs-item">
                <FiUsers size={15} />
                <div><strong>6</strong><span>Recruiter actions</span></div>
              </div>
              <div className="pd-qs-divider" />
              <div className="pd-qs-item">
                <FiTrendingUp size={15} />
                <div><strong>18</strong><span>Job matches</span></div>
              </div>
            </div>
          </div>

          <div className="pd-identity-cta">
            <button className="pd-btn-primary" onClick={() => setShowPreview(true)}>
              <FiEye size={14} /> View Profile
            </button>
            <div className="pd-cta-row">
              <button className="pd-btn-outline"><FiShare2 size={14} /> Share</button>
              <button className="pd-btn-outline"><FiDownload size={14} /> Resume</button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="pd-main">

        {/* Left Sidebar */}
        <aside className="pd-left">
          <div className="pd-card pd-completion-card">
            <div className="pd-completion-top">
              <div>
                <div className="pd-completion-label">Profile Strength</div>
                <div className="pd-completion-pct">72% Complete</div>
              </div>
              <div className="pd-completion-ring">
                <svg viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" />
                  <circle cx="22" cy="22" r="18" style={{ strokeDashoffset: `calc(113 - (113 * 72) / 100)` }} />
                </svg>
                <span>72</span>
              </div>
            </div>
            <div className="pd-completion-bar-track">
              <div className="pd-completion-bar" style={{ width: '72%' }} />
            </div>
            <div className="pd-completion-tips">
              {['Add work experience', 'Add a profile summary', 'Add your skills'].map(tip => (
                <div className="pd-tip-item" key={tip}><FiPlus size={13} /><span>{tip}</span></div>
              ))}
            </div>
          </div>

          <div className="pd-card pd-sidenav-card">
            <Link to="#" className="pd-sidenav-item active"><FiHome size={17} /><span>My Home</span></Link>
            <button className="pd-sidenav-item" onClick={() => setShowJobsModal(true)}><FiBriefcase size={17} /><span>Jobs</span></button>
            <Link to="#" className="pd-sidenav-item"><FiMonitor size={17} /><span>Companies</span></Link>
            <Link to="#" className="pd-sidenav-item"><FiFileText size={17} /><span>Blogs</span></Link>
            <Link to="#" className="pd-sidenav-item"><FiSettings size={17} /><span>Settings</span></Link>
          </div>

          <div className="pd-card pd-perf-card">
            <div className="pd-perf-title">Performance <FiTrendingUp size={15} /></div>
            <div className="pd-perf-grid">
              <div className="pd-perf-stat">
                <span className="pd-perf-val">130</span>
                <span className="pd-perf-label">Search appearances</span>
              </div>
              <div className="pd-perf-stat">
                <span className="pd-perf-val">6</span>
                <span className="pd-perf-label">Recruiter actions</span>
              </div>
            </div>
            <div className="pd-boost-banner">
              <FiZap size={14} />
              <span>Get 3× profile boost</span>
              <FiChevronRight size={13} className="pd-boost-arrow" />
            </div>
          </div>
        </aside>

        {/* Center Feed */}
        <section className="pd-center">

          {/* PRO Banner */}
          <div className="pd-card pd-pro-card">
            <div className="pd-pro-left">
              <div className="pd-pro-eyebrow">UPGRADE YOUR CAREER</div>
              <h3 className="pd-pro-heading">Get hired <em>3× faster</em> with Pro</h3>
              <button className="pd-pro-btn">✦ Become Pro Member</button>
            </div>
            <div className="pd-pro-features">
              {['Hidden job invitations', 'AI-enhanced profile', 'Auto-Apply on MavenJobs', 'Priority recruiter access'].map(f => (
                <div className="pd-pro-feat" key={f}><FiCheckCircle size={14} /> {f}</div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="pd-card">
            <div className="pd-section-header">
              <h3>Recommended for you</h3>
              <button className="pd-text-btn" onClick={() => setShowJobsModal(true)}>View all <FiChevronRight size={14} /></button>
            </div>
            <div className="pd-tabs">
              {Object.keys(recommendedJobs).map(tab => (
                <button key={tab} className={`pd-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>
            <div className="pd-scroll-wrap">
              <button className="pd-scroll-btn left" onClick={() => handleScroll(jobScrollRef, 'left')}><FiChevronLeft size={18} /></button>
              <div className="pd-job-scroll" ref={jobScrollRef}>
                {(recommendedJobs[activeTab] || []).map(job => (
                  <div className="pd-job-card" key={job.title}>
                    <div className="pd-job-header">
                      <div className="pd-job-logo" style={{ background: job.bg, color: job.col }}>{job.code}</div>
                      <span className="pd-job-ago">{job.ago}</span>
                    </div>
                    <h4 className="pd-job-title">{job.title}</h4>
                    <p className="pd-job-company">{job.company} <span className="pd-job-rating"><FiStar size={11} /> {job.rating}</span></p>
                    <p className="pd-job-loc"><FiMapPin size={11} /> {job.loc}</p>
                    <div className="pd-job-actions">
                      <button className="pd-job-apply">Quick Apply</button>
                      <button className="pd-job-save"><FiBookmark size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="pd-scroll-btn right" onClick={() => handleScroll(jobScrollRef, 'right')}><FiChevronRight size={18} /></button>
            </div>
          </div>

          {/* NVites */}
          <div className="pd-card pd-nvites-card">
            <div className="pd-nvites-left">
              <div className="pd-nvites-icon"><FiMail size={28} /><span className="pd-nvites-dot" /></div>
              <h3>NVites</h3>
              <p>Invitation to apply</p>
              <Link to="#" className="pd-text-btn-sm">View all →</Link>
            </div>
            <div className="pd-nvites-list">
              {[
                { code: 'N', title: 'NOC/SOC Analyst', company: 'Naukri e-Hire', when: '16d ago', bg: '#E0E7FF', col: '#3730A3' },
                { code: 'Z', title: 'Survey Developer', company: 'ZoomRx Healthcare', when: '22d ago', bg: '#1E293B', col: '#F8FAFC' },
                { code: 'F', title: 'Figma Specialist', company: 'IT Services Co.', when: '8d ago', bg: '#FEF3C7', col: '#92400E' },
              ].map(inv => (
                <div className="pd-nvite-row" key={inv.title}>
                  <div className="pd-nvite-logo" style={{ background: inv.bg, color: inv.col }}>{inv.code}</div>
                  <div className="pd-nvite-info">
                    <div className="pd-nvite-title">{inv.title}</div>
                    <div className="pd-nvite-meta"><strong>{inv.company}</strong> · {inv.when}</div>
                  </div>
                  <button className="pd-nvite-apply">Apply</button>
                </div>
              ))}
            </div>
          </div>

          {/* Early Access */}
          <div className="pd-card pd-early-card">
            <div className="pd-section-header">
              <div className="pd-early-hd">
                <div className="pd-early-icon-wrap"><FiSend size={20} /></div>
                <div>
                  <h3>11 Early access roles <FiInfo size={13} className="pd-info-icon" /></h3>
                  <p>Exclusive roles before they go public</p>
                </div>
              </div>
              <button className="pd-text-btn" onClick={() => setShowJobsModal(true)}>View all <FiChevronRight size={14} /></button>
            </div>
            <div className="pd-scroll-wrap">
              <button className="pd-scroll-btn left" onClick={() => handleScroll(earlyScrollRef, 'left')}><FiChevronLeft size={18} /></button>
              <div className="pd-early-scroll" ref={earlyScrollRef}>
                {[
                  { role: 'Front End Developer', type: 'Foreign IT Consulting MNC', rating: '3.5+', tags: ['Foreign MNC', 'Service'], exp: '0-2 Yrs', salary: '2–5 L P.A.', loc: 'Bengaluru', logos: ['A', 'N', 'B', 'I', 'X'] },
                  { role: 'Product Designer', type: 'Corporate in B2C Health', rating: '4.2+', tags: ['Corporate', 'HealthTech'], exp: '0-4 Yrs', salary: '5–8 L P.A.', loc: 'Remote', logos: ['H', 'R', 'K', 'V', 'D'] },
                  { role: 'Back End Lead', type: 'Fintech Unicorn', rating: '4.8+', tags: ['Unicorn', 'Product'], exp: '5-8 Yrs', salary: '25–35 L P.A.', loc: 'Pune', logos: ['P', 'F', 'M', 'S', 'L'] },
                ].map((r, i) => (
                  <div className="pd-early-role-card" key={i}>
                    <div className="pd-early-role-badge">{r.tags[0]}</div>
                    <h4>{r.role}</h4>
                    <p className="pd-early-type">{r.type}</p>
                    <div className="pd-early-tags">
                      <span className="pd-early-rating">★ {r.rating}</span>
                      {r.tags.map(t => <span key={t} className="pd-early-tag">{t}</span>)}
                    </div>
                    <div className="pd-early-meta">
                      <span><FiBriefcase size={12} /> {r.exp}</span>
                      <span><FiZap size={12} /> {r.salary}</span>
                      <span><FiMapPin size={12} /> {r.loc}</span>
                    </div>
                    <div className="pd-early-hiring">
                      <p>Hiring from one of these</p>
                      <div className="pd-early-logos">{r.logos.map((l, i) => <div key={i} className="pd-early-logo">{l}</div>)}</div>
                    </div>
                    <button className="pd-early-cta">Share interest</button>
                  </div>
                ))}
              </div>
              <button className="pd-scroll-btn right" onClick={() => handleScroll(earlyScrollRef, 'right')}><FiChevronRight size={18} /></button>
            </div>
          </div>

          {/* Stand Out Banner */}
          <div className="pd-card pd-standout-card">
            <div className="pd-standout-text">
              <div className="pd-standout-eyebrow">RECRUITER SPOTLIGHT</div>
              <h3>Stand out from the crowd</h3>
              <p>Highlight your application and get noticed by top recruiters instantly.</p>
              <button className="pd-btn-primary sm"><FiZap size={13} /> Know More</button>
            </div>
            <div className="pd-standout-graphic">
              <div className="pd-graphic-rings">
                <div className="pd-ring r1" />
                <div className="pd-ring r2" />
                <div className="pd-ring r3" />
              </div>
              <FiUsers size={36} className="pd-standout-icon" />
            </div>
          </div>

          {/* Match Card */}
          <div className="pd-card pd-match-card">
            <div className="pd-section-header">
              <h3>Apply match — last 7 days</h3>
              <button className="pd-text-btn" onClick={() => setShowJobsModal(true)}>View all <FiChevronRight size={14} /></button>
            </div>
            <div className="pd-scroll-wrap">
              <button className="pd-scroll-btn left" onClick={() => handleScroll(matchScrollRef, 'left')}><FiChevronLeft size={18} /></button>
              <div className="pd-match-scroll" ref={matchScrollRef}>
                <div className="pd-match-card-item summary">
                  <div className="pd-match-low-ring"><span>LOW</span></div>
                  <p><strong>1 of 49</strong> applies matched</p>
                </div>
                {[
                  { label: 'Work Experience', val: '0.08 yr', pct: 84, icon: <FiBriefcase /> },
                  { label: 'Location', val: 'Dehradun', pct: 86, icon: <FiMapPin /> },
                  { label: 'Key Skills', val: 'Ui/Ux, Redux…', pct: 37, icon: <FiEdit2 /> },
                  { label: 'Industry', val: 'IT Services…', pct: 57, icon: <FiMonitor /> },
                  { label: 'Department', val: 'Engineering…', pct: 67, icon: <FiUsers /> },
                  { label: 'Early Applicant', val: 'Fresh jobs', pct: 37, icon: <FiTrendingUp /> },
                ].map((m, i) => (
                  <div className="pd-match-card-item" key={i}>
                    <div className="pd-match-ring-wrap">
                      <svg viewBox="0 0 50 50" className="pd-match-svg">
                        <circle cx="25" cy="25" r="21" />
                        <circle cx="25" cy="25" r="21" style={{ strokeDashoffset: `calc(132 - (132 * ${m.pct}) / 100)` }} />
                      </svg>
                      <span className="pd-match-ring-icon">{m.icon}</span>
                    </div>
                    <div className="pd-match-info">
                      <h4>{m.label}</h4>
                      <p>{m.val}</p>
                      <span className="pd-match-pct">{m.pct}%</span>
                    </div>
                  </div>
                ))}
                <div className="pd-match-card-item update">
                  <h4>Review your profile</h4>
                  <p>Improve job recommendations</p>
                  <Link to="#" className="pd-update-link">Update Profile →</Link>
                </div>
              </div>
              <button className="pd-scroll-btn right" onClick={() => handleScroll(matchScrollRef, 'right')}><FiChevronRight size={18} /></button>
            </div>
          </div>

        </section>

        {/* Right Sidebar */}
        <aside className="pd-right">
          <div className="pd-card pd-app-card">
            <div className="pd-qr-box"><img src={mavenLogo} alt="QR" style={{ width: 32, opacity: 0.4 }} /></div>
            <p className="pd-app-stat"><strong>3,587</strong> downloads in last 30 mins</p>
            <p className="pd-app-sub">Scan to download the app</p>
            <div className="pd-app-badges">
              <span className="pd-badge-pill">🍎 App Store</span>
              <span className="pd-badge-pill">▶ Play Store</span>
            </div>
          </div>

          <div className="pd-card pd-premium-card">
            <div className="pd-premium-glow" />
            <div className="pd-premium-eyebrow">FOR RECRUITERS</div>
            <h3 className="pd-premium-title">PremiumX</h3>
            <p className="pd-premium-desc">AI-powered premium talent discovery for modern teams.</p>
            <Link to="#" className="pd-premium-link">Explore →</Link>
          </div>

          <div className="pd-card pd-skills-card">
            <div className="pd-section-header">
              <h4>Top Skills</h4>
              <button className="pd-icon-btn"><FiPlus size={15} /></button>
            </div>
            <div className="pd-skills-wrap">
              {['React.js', 'Node.js', 'UI/UX Design', 'TypeScript', 'MongoDB'].map(s => (
                <span className="pd-skill-pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ─── Profile Preview Modal ─── */}
      {showPreview && (
        <div className="ppm-overlay" onClick={() => setShowPreview(false)}>
          <div className="ppm-content" onClick={e => e.stopPropagation()}>
            <button className="ppm-close" onClick={() => setShowPreview(false)}><FiX size={22} /></button>
            <div className="ppm-body">
              <div className="ppm-card ppm-header-card">
                <div className="ppm-header-row">
                  <div className="ppm-avatar-wrap">
                    <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="Profile" />
                    <div className="ppm-score">100%</div>
                  </div>
                  <div className="ppm-header-info">
                    <h2>{user.name} <FiEdit2 size={14} className="ppm-inline-edit" /></h2>
                    <p className="ppm-role">MERN Stack Developer</p>
                    <p className="ppm-company-at">at Dr Design Private Limited</p>
                    <span className="ppm-updated">Last updated · Yesterday</span>
                  </div>
                </div>
                <div className="ppm-meta-grid">
                  <div className="ppm-meta-item"><FiMapPin size={14} /> Dehradun, INDIA</div>
                  <div className="ppm-meta-item"><FiPhone size={14} /> 8126977256 <FiCheckCircle size={13} color="#10b981" /></div>
                  <div className="ppm-meta-item"><FiBriefcase size={14} /> 0 Yr 8 Months</div>
                  <div className="ppm-meta-item"><FiMail size={14} /> {user.email || 'user@example.com'} <FiCheckCircle size={13} color="#10b981" /></div>
                  <div className="ppm-meta-item">₹ 2,00,000</div>
                  <div className="ppm-meta-item"><FiClock size={14} /> 15 Days notice period</div>
                </div>
              </div>

              <div className="ppm-layout">
                <div className="ppm-left-col">
                  <div className="ppm-card ppm-links-card">
                    <h3>Quick links</h3>
                    {['Resume', 'Resume headline', 'Key skills', 'Employment', 'Education', 'IT skills', 'Projects', 'Profile summary', 'Career profile'].map(link => (
                      <div className="ppm-link-row" key={link}>
                        <span>{link}</span>
                        <FiChevronRight size={13} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ppm-right-col">
                  <div className="ppm-pro-banner">
                    <div className="ppm-pro-label">MavenJobs<span>Pro</span> <GiCrown className="ppm-crown" /></div>
                    <div className="ppm-pro-pitch">Up to <strong>4× profile views</strong></div>
                    <button className="ppm-pro-btn">Become Pro · 25% off</button>
                  </div>
                  {[
                    {
                      title: 'Resume', content: (
                        <div>
                          <div className="ppm-resume-row">
                            <FiFileText size={20} color="#64748b" />
                            <div><div className="ppm-fname">PranjalKundliyaResume.pdf</div><div className="ppm-fdate">Uploaded Apr 28, 2026</div></div>
                            <div className="ppm-file-actions"><FiDownload size={16} /><FiSettings size={16} /></div>
                          </div>
                          <div className="ppm-upload-zone"><button className="ppm-upload-btn">Update resume</button><p>doc, docx, rtf, pdf — max 2MB</p></div>
                        </div>
                      )
                    },
                    { title: 'Resume headline', content: <p className="ppm-body-text">Hi, I'm Pranjal Kundliya, a MERN stack developer at DR Design Pvt. Ltd., building scalable apps including projects for Indian Railways. I specialize in React, Node.js, and MongoDB.</p> },
                    {
                      title: 'Key skills', content: (
                        <div className="ppm-skills-wrap">
                          {['Ui/Ux', 'Redux', 'NoSQL', 'Figma', 'MongoDB', 'API', 'Express', 'Mern Stack', 'Node.js', 'React.js', 'JavaScript'].map(s => (
                            <span key={s} className="ppm-skill-chip">{s}</span>
                          ))}
                        </div>
                      )
                    },
                    {
                      title: 'Employment', content: (
                        <div className="ppm-exp-item">
                          <div className="ppm-exp-title">MERN Stack Developer <FiEdit2 size={13} /></div>
                          <div className="ppm-exp-co">Dr Design Private Limited</div>
                          <div className="ppm-exp-meta">Full-time · Oct 2025 – Present · 7 months</div>
                          <p className="ppm-body-text">Results-driven MERN Stack Developer with 8 months of experience building scalable, production-grade web applications. Proficient in React.js, Node.js, Express.js, and MongoDB. <span className="ppm-readmore">Read More</span></p>
                        </div>
                      )
                    },
                    {
                      title: 'Education', content: (
                        <div>
                          <div className="ppm-edu-item"><div className="ppm-edu-deg">B.Tech Computer Science & Engineering <FiEdit2 size={13} /></div><div className="ppm-edu-school">Graphic Era University, Dehradun</div><div className="ppm-exp-meta">2021–2025 · Full Time</div></div>
                          <div className="ppm-edu-item mt"><div className="ppm-edu-deg">Class XII <FiEdit2 size={13} /></div><div className="ppm-edu-school">CBSE · 2020</div></div>
                          <div className="ppm-edu-item mt"><div className="ppm-edu-deg">Class X <FiEdit2 size={13} /></div><div className="ppm-edu-school">CBSE · 2018</div></div>
                        </div>
                      )
                    },
                    {
                      title: 'Projects', content: (
                        <div className="ppm-project-item">
                          <div className="ppm-exp-title">MyQuoteMate <FiEdit2 size={13} /></div>
                          <div className="ppm-exp-meta">Jan 2026 – Mar 2026 · Full Time</div>
                          <p className="ppm-body-text">Scalable backend with Node.js, Express, and MongoDB. AI orchestration layer integrating OpenAI models with deterministic prompt engineering. <span className="ppm-readmore">Read More</span></p>
                        </div>
                      )
                    },
                  ].map(sec => (
                    <div className="ppm-card" key={sec.title}>
                      <div className="ppm-sec-header"><h3>{sec.title}</h3></div>
                      {sec.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Notification Sidebar ─── */}
      <div className={`pd-notif-overlay ${showNotifications ? 'show' : ''}`} onClick={() => setShowNotifications(false)} />
      <div className={`pd-notif-sidebar ${showNotifications ? 'show' : ''}`}>
        <div className="pd-notif-head">
          <h3>Notifications</h3>
          <button className="pd-notif-close" onClick={() => setShowNotifications(false)}><FiX size={18} /></button>
        </div>
        <div className="pd-notif-body">
          <div className="pd-notif-date">Today</div>
          {[
            { icon: <FiAward />, color: '#7C3AED', bg: '#F5F3FF', title: '🚀 Practice 4 interview questions for your Fortified Infotech application', desc: 'Get instant feedback to ace your interview', time: '2h ago', cta: 'Practice Now' },
            { icon: <FiFileText />, color: '#D97706', bg: '#FFFBEB', title: 'Your resume was viewed by a recruiter', desc: 'Application History', time: '3h ago' },
            { icon: <FiUsers />, color: '#2563EB', bg: '#EFF6FF', title: 'Let AI help you ace your next job interview', desc: 'Unlock Your Interview Success!', time: '3h ago', cta: 'Practice Now' },
            { icon: <FiCheckCircle />, color: '#059669', bg: '#ECFDF5', title: 'Apply by 11:10 AM for a job posted by Infrrd', desc: 'Neo-AI Job Agent', time: '4h ago' },
            { icon: <FiX />, color: '#DC2626', bg: '#FEF2F2', title: 'Your application was not shortlisted', desc: 'Application History', time: '5h ago' },
            { icon: <FiZap />, color: '#7C3AED', bg: '#F5F3FF', title: 'AI wrote interview Q&A from your resume', desc: '✨ Personalized for you', time: '6h ago' },
          ].map((n, i) => (
            <div className="pd-notif-item" key={i}>
              <div className="pd-notif-icon" style={{ background: n.bg, color: n.color }}>{n.icon}</div>
              <div className="pd-notif-content">
                <div className="pd-notif-title">{n.title}</div>
                <div className="pd-notif-desc">{n.desc}</div>
                {n.cta && <button className="pd-notif-cta">{n.cta}</button>}
                <div className="pd-notif-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Jobs Modal ─── */}
      {showJobsModal && (
        <div className="pd-modal-overlay" onClick={() => setShowJobsModal(false)}>
          <div className="pd-modal-box" onClick={e => e.stopPropagation()}>
            <button className="pd-modal-close" onClick={() => setShowJobsModal(false)}><FiX size={22} /></button>
            <div className="pd-modal-scroll">
              <RecommendedJobs onBack={() => setShowJobsModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}