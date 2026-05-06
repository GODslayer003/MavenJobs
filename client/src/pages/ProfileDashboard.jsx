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
import EarlyAccessModal from '../components/EarlyAccessModal';
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
  const [showEarlyAccessModal, setShowEarlyAccessModal] = useState(false);
  const [showKnowMoreModal, setShowKnowMoreModal] = useState(false);
  const jobScrollRef = useRef(null);
  const earlyScrollRef = useRef(null);
  const matchScrollRef = useRef(null);
  const pfpInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [skills, setSkills] = useState(['React.js', 'Node.js', 'UI/UX Design', 'TypeScript', 'MongoDB']);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState('');
  const [activeTip, setActiveTip] = useState(null); // 'experience', 'summary', 'skills'
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

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

  const addSkill = () => {
    const s = newSkillValue.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setNewSkillValue('');
      setIsAddingSkill(false);
    }
  };

  const removeSkill = (s) => {
    setSkills(skills.filter(item => item !== s));
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
            <button className="pd-btn-black" onClick={() => setShowPreview(true)}>
              <FiEye size={14} /> View Profile
            </button>
            <div className="pd-cta-row">
              <button className="pd-btn-white"><FiShare2 size={14} /> Share</button>
              <button className="pd-btn-white"><FiDownload size={14} /> Resume</button>
            </div>
            <button className="pd-btn-black" onClick={() => navigate('/info')}>
              <FiInfo size={14} /> Information
            </button>
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
              {[
                { id: 'experience', label: 'Add work experience' },
                { id: 'summary', label: 'Add a profile summary' },
                { id: 'skills', label: 'Add your skills' }
              ].map(tip => (
                <div className="pd-tip-item" key={tip.id} onClick={() => setActiveTip(tip.id)}>
                  <FiPlus size={13} />
                  <span>{tip.label}</span>
                </div>
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
              <button className="pd-pro-btn" onClick={() => navigate('/pro')}>✦ Become Pro Member</button>
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
              <button className="pd-text-btn" onClick={() => setShowEarlyAccessModal(true)}>View all <FiChevronRight size={14} /></button>
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
              <button className="pd-btn-primary sm" onClick={() => setShowKnowMoreModal(true)}><FiZap size={13} /> Know More</button>
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

          <Link to="/premium" style={{ textDecoration: 'none' }}>
            <div className="pd-card pd-premium-card" style={{ cursor: 'pointer' }}>
              <div className="pd-premium-glow" />
              <div className="pd-premium-eyebrow">FOR RECRUITERS</div>
              <h3 className="pd-premium-title">PremiumX</h3>
              <p className="pd-premium-desc">AI-powered premium talent discovery for modern teams.</p>
              <span className="pd-premium-link">Explore →</span>
            </div>
          </Link>

          <div className="pd-card pd-skills-card">
            <div className="pd-section-header">
              <h4>Top Skills</h4>
              <button className="pd-icon-btn" onClick={() => setIsAddingSkill(!isAddingSkill)}>
                {isAddingSkill ? <FiX size={15} /> : <FiPlus size={15} />}
              </button>
            </div>
            {isAddingSkill && (
              <div className="pd-skill-add-row">
                <input 
                  type="text" 
                  placeholder="Type skill..." 
                  value={newSkillValue}
                  onChange={e => setNewSkillValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  autoFocus
                />
                <button onClick={addSkill}><FiCheckCircle size={14} /></button>
              </div>
            )}
            <div className="pd-skills-wrap">
              {skills.map(s => (
                <span className="pd-skill-pill" key={s}>
                  {s}
                  <button className="pd-skill-remove" onClick={() => removeSkill(s)}>
                    <FiX size={10} />
                  </button>
                </span>
              ))}
              {skills.length === 0 && !isAddingSkill && <p className="pd-no-skills">No skills added yet.</p>}
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
                    <button className="ppm-pro-btn" onClick={() => navigate('/pro')}>Become Pro · 25% off</button>
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
      {/* ─── Early Access Modal ─── */}
      <EarlyAccessModal 
        isOpen={showEarlyAccessModal} 
        onClose={() => setShowEarlyAccessModal(false)} 
      />
      {/* ─── Know More Modal ─── */}
      {showKnowMoreModal && (
        <div className="km-modal-overlay" onClick={() => setShowKnowMoreModal(false)}>
          <div className="km-modal-box" onClick={e => e.stopPropagation()}>
            <div className="km-modal-glow" />
            <button className="km-modal-close" onClick={() => setShowKnowMoreModal(false)}><FiX size={20} /></button>

            <div className="km-modal-content">
              <div className="km-modal-left">
                <div className="km-sticky-top">
                  <div className="km-eyebrow">RECRUITER SPOTLIGHT</div>
                  <h2 className="km-title">Stand out to the <span>Top 1%</span> of recruiters</h2>
                  <p className="km-subtitle">Highlight your application and get noticed by top recruiters instantly with our priority matching engine.</p>
                </div>

                <div className="km-features-list">
                  {[
                    { icon: <FiTrendingUp />, title: 'Priority Ranking', desc: 'Your application appears at the top of the recruiter\'s list for every job you apply.' },
                    { icon: <FiCheckCircle />, title: 'Verified Badge', desc: 'Get a distinct "Verified Premium" badge on your profile to build instant trust.' },
                    { icon: <FiZap />, title: 'AI-Enhanced Pitch', desc: 'Our AI crafts the perfect elevator pitch for each application based on your profile.' },
                    { icon: <FiSend />, title: 'Direct Messaging', desc: 'Unlock the ability to message hiring managers directly before they even see your resume.' },
                    { icon: <FiAward />, title: 'Profile Boost', desc: 'Get up to 4x more visibility in recruiter search results compared to standard members.' },
                    { icon: <FiEye />, title: 'Advanced Analytics', desc: 'See exactly who viewed your profile and which companies are interested in your skills.' }
                  ].map((f, i) => (
                    <div key={i} className="km-feat-item">
                      <div className="km-feat-icon">{f.icon}</div>
                      <div className="km-feat-text">
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="km-modal-actions-fixed">
                  <button className="km-btn-premium" onClick={() => navigate('/pro')}>Upgrade to Pro Member</button>
                  <button className="km-btn-ghost" onClick={() => setShowKnowMoreModal(false)}>Maybe Later</button>
                </div>
              </div>

              <div className="km-modal-right">
                <div className="km-insights-scroll">
                  <div className="km-insight-header">PERFORMANCE INSIGHTS</div>
                  
                  {/* Rohan Profile Card */}
                  <div className="km-visual-card">
                    <div className="km-user-mini">
                      <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="" />
                      <div>
                        <div className="km-mini-name">{user.name} <FiCheckCircle size={10} color="#10b981" /></div>
                        <div className="km-mini-role">{user.headline || 'MERN Stack Developer'}</div>
                      </div>
                      <span className="km-mini-tag">TOP MATCH</span>
                    </div>
                    <div className="km-visual-stats">
                      <div className="km-vstat"><strong>4.2x</strong><span>Profile Views</span></div>
                      <div className="km-vstat"><strong>98%</strong><span>Match Score</span></div>
                    </div>
                    <div className="km-visual-graph">
                      {[40, 70, 45, 90, 65, 100].map((h, i) => (
                        <div key={i} className="km-graph-bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <p className="km-visual-label">Real-time Recruiter Interest</p>
                  </div>

                  {/* Job Application Stats */}
                  <div className="km-stat-card">
                    <div className="km-sc-header">
                      <FiBriefcase color="#10b981" />
                      <span>Applications Sent</span>
                      <strong className="km-sc-val">49</strong>
                    </div>
                    <div className="km-mini-trend">
                      <div className="km-mt-bar" style={{ width: '40%' }} />
                      <div className="km-mt-bar active" style={{ width: '85%' }} />
                      <div className="km-mt-bar" style={{ width: '60%' }} />
                    </div>
                    <p className="km-sc-sub">+12% increase from last week</p>
                  </div>

                  {/* Recruiter Actions */}
                  <div className="km-stat-card">
                    <div className="km-sc-header">
                      <FiUsers color="#3b82f6" />
                      <span>Shortlisted</span>
                      <strong className="km-sc-val">14</strong>
                    </div>
                    <div className="km-shortlist-circles">
                      {[1,2,3,4,5].map(i => <div key={i} className={`km-sc-dot ${i < 4 ? 'filled' : ''}`} />)}
                      <span className="km-sc-pct">80% Success Rate</span>
                    </div>
                  </div>

                  {/* New Insight: Interview Performance */}
                  <div className="km-stat-card dark">
                    <div className="km-sc-header">
                      <FiTrendingUp color="#8b5cf6" />
                      <span>Interview Invitations</span>
                      <strong className="km-sc-val">6</strong>
                    </div>
                    <div className="km-interview-graph">
                      <svg viewBox="0 0 100 30">
                        <path d="M0,25 L20,15 L40,20 L60,5 L80,18 L100,10" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                        <circle cx="60" cy="5" r="3" fill="#8b5cf6" />
                      </svg>
                    </div>
                    <p className="km-sc-sub">Peak performance reached today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .km-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: kmFadeIn 0.3s ease;
        }
        @keyframes kmFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .km-modal-box {
          background: #0a0f18; width: 100%; max-width: 920px;
          border-radius: 28px; position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          animation: kmSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes kmSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .km-modal-glow {
          position: absolute; top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .km-modal-close {
          position: absolute; top: 24px; right: 24px;
          background: rgba(255,255,255,0.05); border: none;
          color: rgba(255,255,255,0.6); width: 40px; height: 40px;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.2s;
          z-index: 10;
        }
        .km-modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; transform: rotate(90deg); }

        .km-modal-content { display: flex; height: 620px; overflow: hidden; }
        
        /* Left Column Scrolling */
        .km-modal-left { 
          flex: 1.2; 
          display: flex; flex-direction: column;
          position: relative;
        }
        .km-sticky-top {
          padding: 56px 56px 24px;
          background: #0a0f18;
          z-index: 5;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .km-features-list {
          flex: 1;
          overflow-y: auto;
          padding: 32px 56px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .km-features-list::-webkit-scrollbar { width: 4px; }
        .km-features-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .km-modal-actions-fixed {
          padding: 24px 56px 40px;
          background: #0a0f18;
          display: flex; gap: 16px; align-items: center;
          border-top: 1px solid rgba(255,255,255,0.03);
        }

        /* Right Column Scrolling */
        .km-modal-right { 
          flex: 0.8; 
          background: rgba(255,255,255,0.015); 
          border-left: 1px solid rgba(255,255,255,0.05); 
          overflow-y: auto;
          scrollbar-width: none;
        }
        .km-modal-right::-webkit-scrollbar { display: none; }
        
        .km-insights-scroll {
          padding: 56px 40px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .km-insight-header {
          font-size: 10px; color: rgba(255,255,255,0.3); font-weight: 800;
          letter-spacing: 0.15em; margin-bottom: 8px;
        }

        .km-eyebrow { color: #10b981; font-weight: 800; font-size: 11px; letter-spacing: 0.2em; margin-bottom: 16px; }
        .km-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 34px; color: #fff; line-height: 1.1; margin-bottom: 16px; }
        .km-title span { color: #10b981; }
        .km-subtitle { color: rgba(255,255,255,0.5); font-size: 15px; line-height: 1.6; }

        .km-feat-item { display: flex; gap: 16px; margin-bottom: 28px; }
        .km-feat-item:last-child { margin-bottom: 0; }
        .km-feat-icon { width: 36px; height: 36px; background: rgba(16,185,129,0.1); border-radius: 10px; color: #10b981; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .km-feat-text h4 { color: #fff; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .km-feat-text p { color: rgba(255,255,255,0.4); font-size: 12px; line-height: 1.5; }

        .km-btn-premium { background: #10b981; color: #fff; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .km-btn-premium:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(16,185,129,0.2); }
        .km-btn-ghost { background: transparent; color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1); padding: 14px 24px; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .km-btn-ghost:hover { background: rgba(255,255,255,0.05); color: #fff; }

        .km-visual-card {
          background: #111827; width: 100%; border-radius: 20px;
          padding: 24px; border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .km-user-mini { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .km-user-mini img { width: 44px; height: 44px; border-radius: 12px; object-fit: cover; border: 2px solid #10b981; }
        .km-mini-name { color: #fff; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 4px; }
        .km-mini-role { color: rgba(255,255,255,0.4); font-size: 11px; }
        .km-mini-tag { margin-left: auto; background: rgba(16,185,129,0.1); color: #10b981; font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 4px; }

        .km-visual-stats { display: flex; gap: 20px; margin-bottom: 24px; }
        .km-vstat { flex: 1; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; }
        .km-vstat strong { display: block; color: #10b981; font-size: 20px; margin-bottom: 2px; }
        .km-vstat span { color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; }

        .km-visual-graph { display: flex; align-items: flex-end; gap: 6px; height: 80px; margin-bottom: 12px; }
        .km-graph-bar { flex: 1; background: linear-gradient(to top, #10b981, #6ee7b7); border-radius: 4px 4px 0 0; opacity: 0.6; }
        .km-graph-bar:last-child { opacity: 1; box-shadow: 0 0 15px rgba(16,185,129,0.4); }
        .km-visual-label { text-align: center; color: rgba(255,255,255,0.3); font-size: 10px; font-style: italic; }

        /* Performance Stat Cards */
        .km-stat-card {
          background: rgba(255,255,255,0.03); border-radius: 20px;
          padding: 20px; border: 1px solid rgba(255,255,255,0.05);
        }
        .km-stat-card.dark { background: #000; border-color: rgba(139, 92, 246, 0.2); }
        .km-sc-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .km-sc-header span { flex: 1; color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 600; }
        .km-sc-val { color: #fff; font-size: 18px; font-weight: 800; }
        .km-sc-sub { color: rgba(255,255,255,0.3); font-size: 11px; margin-top: 12px; }

        .km-mini-trend { display: flex; gap: 4px; height: 20px; align-items: flex-end; }
        .km-mt-bar { background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; }
        .km-mt-bar.active { background: #10b981; height: 18px; }

        .km-shortlist-circles { display: flex; align-items: center; gap: 8px; }
        .km-sc-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); }
        .km-sc-dot.filled { background: #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); }
        .km-sc-pct { color: #3b82f6; font-size: 11px; font-weight: 700; margin-left: 8px; }

        .km-interview-graph { height: 30px; margin-top: 8px; }

        @media (max-width: 850px) {
          .km-modal-content { flex-direction: column; }
          .km-modal-right { display: none; }
          .km-features-grid { grid-template-columns: 1fr; gap: 20px; }
          .km-modal-left { padding: 40px; }
        }

        /* Dynamic Skills Styles */
        .pd-skill-add-row {
          display: flex; gap: 8px; margin-bottom: 16px;
          animation: kmFadeIn 0.2s ease;
        }
        .pd-skill-add-row input {
          flex: 1; background: #f8fafc; border: 1px solid #e2e8f0;
          padding: 8px 12px; border-radius: 8px; font-size: 13px;
          outline: none; transition: border-color 0.2s;
        }
        .pd-skill-add-row input:focus { border-color: #2563eb; }
        .pd-skill-add-row button {
          background: #2563eb; color: #fff; border: none;
          padding: 0 10px; border-radius: 8px; cursor: pointer;
          transition: background 0.2s; display: flex; align-items: center; justify-content: center;
        }
        .pd-skill-add-row button:hover { background: #1d4ed8; }

        .pd-skill-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; color: #1e40af; padding: 6px 12px;
          border-radius: 100px; font-size: 13px; font-weight: 500;
          transition: all 0.2s; border: 1px solid transparent;
        }
        .pd-skill-pill:hover { border-color: rgba(30, 64, 175, 0.2); background: #e0e7ff; }

        .pd-skill-remove {
          background: rgba(30, 64, 175, 0.1); border: none;
          color: #1e40af; width: 16px; height: 16px;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.2s;
          padding: 0; margin-right: -4px;
        }
        .pd-skill-remove:hover { background: #1e40af; color: #fff; transform: scale(1.1); }

        .pd-no-skills { color: #94a3b8; font-size: 12px; font-style: italic; margin-top: 4px; }

        /* Completion Modal Styles */
        .cm-modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px); z-index: 20000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: kmFadeIn 0.3s ease;
        }
        .cm-modal-box {
          background: #ffffff; width: 100%; max-width: 540px;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: kmSlideUp 0.3s ease;
        }
        .cm-modal-header {
          padding: 24px 32px; border-bottom: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between;
          background: #fff;
        }
        .cm-modal-header h3 { color: #0f172a; font-size: 18px; font-weight: 800; }
        .cm-modal-close {
          background: transparent; border: none; color: #64748b;
          cursor: pointer; transition: color 0.2s; display: flex;
        }
        .cm-modal-close:hover { color: #0f172a; }

        .cm-modal-body { padding: 32px; max-height: 70vh; overflow-y: auto; }
        
        .cm-form-group { margin-bottom: 20px; }
        .cm-form-group label { display: block; font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .cm-form-group input, .cm-form-group textarea {
          width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0;
          border-radius: 12px; font-size: 14px; transition: all 0.2s; outline: none;
        }
        .cm-form-group input:focus, .cm-form-group textarea:focus {
          border-color: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .cm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .cm-helper-text { color: #64748b; font-size: 13px; margin-bottom: 24px; }
        .cm-summary-area { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px; outline: none; resize: none; font-size: 14px; line-height: 1.6; }
        .cm-summary-area:focus { border-color: #10b981; }

        .cm-skill-input-wrap { display: flex; gap: 12px; margin-bottom: 24px; }
        .cm-skill-input-wrap input { flex: 1; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; }
        .cm-add-btn { background: #0f172a; color: #fff; border: none; padding: 0 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }

        .cm-skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .cm-skill-chip {
          background: #f1f5f9; color: #0f172a; padding: 6px 14px;
          border-radius: 100px; font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
        }
        .cm-skill-chip svg { cursor: pointer; color: #94a3b8; transition: color 0.2s; }
        .cm-skill-chip svg:hover { color: #ef4444; }

        .cm-modal-footer {
          padding: 24px 32px; background: #f8fafc;
          display: flex; justify-content: flex-end; gap: 12px;
        }
        .cm-btn-cancel { background: transparent; border: none; color: #64748b; font-weight: 700; cursor: pointer; padding: 10px 20px; }
        .cm-btn-save { background: #10b981; color: #fff; border: none; padding: 10px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .cm-btn-save:hover { background: #059669; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }

        /* Strictly Professional Circular Checkbox */
        .cm-checkbox-group { margin: 12px 0 24px; }
        .cm-checkbox-label {
          display: inline-flex; align-items: center; gap: 10px;
          cursor: pointer; font-size: 14px; color: #475569; font-weight: 700;
          user-select: none; white-space: nowrap; transition: all 0.2s;
        }
        .cm-checkbox-label input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
        .cm-checkbox-box {
          width: 16px; height: 16px; border: 2px solid #cbd5e1;
          border-radius: 50%; background: #fff; position: relative;
          flex-shrink: 0; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; align-items: center; justify-content: center;
        }
        .cm-checkbox-label input:checked ~ .cm-checkbox-box {
          background: #10b981; border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        .cm-checkbox-box::after {
          content: ""; position: absolute; display: none;
          width: 3px; height: 6.5px;
          border: solid white; border-width: 0 1.8px 1.8px 0;
          transform: rotate(45deg); margin-top: -1px;
        }
        .cm-checkbox-label input:checked ~ .cm-checkbox-box::after {
          display: block;
        }
        .cm-checkbox-label:hover .cm-checkbox-box {
          border-color: #10b981;
        }
      `}</style>
      {/* ─── Profile Completion Modal ─── */}
      {activeTip && (
        <div className="cm-modal-overlay" onClick={() => setActiveTip(null)}>
          <div className="cm-modal-box" onClick={e => e.stopPropagation()}>
            <div className="cm-modal-header">
              <h3>
                {activeTip === 'experience' && 'Add Work Experience'}
                {activeTip === 'summary' && 'Professional Summary'}
                {activeTip === 'skills' && 'Manage Core Skills'}
              </h3>
              <button className="cm-modal-close" onClick={() => setActiveTip(null)}><FiX size={20} /></button>
            </div>
            
            <div className="cm-modal-body">
              {activeTip === 'experience' && (
                <div className="cm-form">
                  <div className="cm-form-group">
                    <label>Job Title</label>
                    <input type="text" placeholder="e.g. Senior Software Engineer" />
                  </div>
                  <div className="cm-form-group">
                    <label>Company Name</label>
                    <input type="text" placeholder="e.g. Google India" />
                  </div>
                  <div className="cm-checkbox-group">
                    <label className="cm-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={isCurrentlyWorking} 
                        onChange={e => setIsCurrentlyWorking(e.target.checked)} 
                      />
                      <span className="cm-checkbox-box" />
                      I am currently working in this role
                    </label>
                  </div>
                  <div className="cm-form-row">
                    <div className="cm-form-group">
                      <label>Start Date</label>
                      <input type="month" />
                    </div>
                    <div className="cm-form-group" style={{ 
                      opacity: isCurrentlyWorking ? 0.4 : 1, 
                      filter: isCurrentlyWorking ? 'blur(1.5px)' : 'none',
                      pointerEvents: isCurrentlyWorking ? 'none' : 'auto',
                      transition: 'all 0.3s'
                    }}>
                      <label>End Date</label>
                      <input type="month" disabled={isCurrentlyWorking} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your key responsibilities and achievements..." rows={4} />
                  </div>
                </div>
              )}

              {activeTip === 'summary' && (
                <div className="cm-form">
                  <p className="cm-helper-text">Briefly highlight your expertise and what you bring to the table.</p>
                  <textarea 
                    className="cm-summary-area"
                    placeholder="Results-driven professional with expertise in..." 
                    rows={8} 
                    autoFocus
                  />
                </div>
              )}

              {activeTip === 'skills' && (
                <div className="cm-skills-editor">
                  <p className="cm-helper-text">Add skills to get 40% better job recommendations.</p>
                  <div className="cm-skill-input-wrap">
                    <input 
                      type="text" 
                      placeholder="Add a skill (e.g. Python, Figma)..." 
                      value={newSkillValue}
                      onChange={e => setNewSkillValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSkill()}
                    />
                    <button className="cm-add-btn" onClick={addSkill}>Add</button>
                  </div>
                  <div className="cm-skills-list">
                    {skills.map(s => (
                      <span key={s} className="cm-skill-chip">
                        {s} <FiX size={12} onClick={() => removeSkill(s)} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="cm-modal-footer">
              <button className="cm-btn-cancel" onClick={() => setActiveTip(null)}>Cancel</button>
              <button className="cm-btn-save" onClick={() => setActiveTip(null)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}