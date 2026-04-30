import React, { useState, useRef } from 'react';
import {
  FiEdit2,
  FiBriefcase,
  FiMapPin,
  FiZap,
  FiCheckCircle,
  FiChevronRight,
  FiHome,
  FiFileText,
  FiMonitor,
  FiShare2,
  FiDownload,
  FiPlus,
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiAward,
  FiBell,
  FiSettings,
  FiLogOut,
  FiPhone,
  FiMail,
  FiX,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiInfo,
  FiSend
} from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
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
  const jobScrollRef = useRef(null);
  const earlyScrollRef = useRef(null);
  const matchScrollRef = useRef(null);

  const recommendedJobs = {
    'Profile (18)': [
      { code: 'PE', title: 'Product Engineer', company: 'SmartDocs Tech', rating: 3.1, loc: 'Hyderabad', ago: '4d ago', bg: '#eff6ff', col: '#1e40af' },
      { code: 'UI', title: 'UI/UX Designer', company: 'Onebanc Tech', rating: 4.8, loc: 'Gurugram', ago: '1d ago', bg: '#fef3c7', col: '#b45309' },
      { code: 'A', title: 'Software Tester', company: 'Aarons Visions', rating: 4.2, loc: 'Remote', ago: '2d ago', bg: '#f0fdf4', col: '#166534' },
      { code: 'FE', title: 'Frontend Developer', company: 'DevMatrix', rating: 4.5, loc: 'Bengaluru', ago: '3d ago', bg: '#eef2ff', col: '#4338ca' },
      { code: 'BE', title: 'Backend Lead', company: 'NodeMasters', rating: 4.9, loc: 'Pune', ago: '12h ago', bg: '#fdf2f8', col: '#9d174d' },
    ],
    'Applies (29)': [
      { code: 'DS', title: 'Data Scientist', company: 'Analytica', rating: 4.6, loc: 'Mumbai', ago: '2d ago', bg: '#ecfdf5', col: '#047857' },
      { code: 'ML', title: 'ML Engineer', company: 'DeepMind India', rating: 4.7, loc: 'Bengaluru', ago: '5d ago', bg: '#f5f3ff', col: '#6d28d9' },
      { code: 'QA', title: 'Quality Analyst', company: 'TestRig', rating: 3.9, loc: 'Chennai', ago: '1w ago', bg: '#fff7ed', col: '#c2410c' },
    ],
    'Preferences (4)': [
      { code: 'FS', title: 'Full Stack Dev', company: 'MetaScale', rating: 4.4, loc: 'Remote', ago: '1d ago', bg: '#f0f9ff', col: '#0369a1' },
      { code: 'DO', title: 'DevOps Architect', company: 'CloudFlow', rating: 4.8, loc: 'Hyderabad', ago: '6h ago', bg: '#f8fafc', col: '#334155' },
    ],
    'You might like (10)': [
      { code: 'GD', title: 'Graphic Designer', company: 'CreativeCo', rating: 4.3, loc: 'New Delhi', ago: '3d ago', bg: '#fdf4ff', col: '#a21caf' },
      { code: 'PM', title: 'Product Manager', company: 'Innova', rating: 4.5, loc: 'Bengaluru', ago: '4d ago', bg: '#f0fdf4', col: '#166534' },
    ]
  };

  const handleScroll = (direction) => {
    if (jobScrollRef.current) {
      const scrollAmount = 300;
      jobScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleEarlyScroll = (direction) => {
    if (earlyScrollRef.current) {
      const scrollAmount = 300;
      earlyScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMatchScroll = (direction) => {
    if (matchScrollRef.current) {
      const scrollAmount = 300;
      matchScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  const pfpInputRef = useRef(null);
  const coverInputRef = useRef(null);

  if (!user) return <Navigate to="/" />;

  const handleNameSave = () => {
    updateUser({ name: editNameValue });
    setIsEditingName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNameSave();
    if (e.key === 'Escape') setIsEditingName(false);
  };

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateUser({ profilePic: ev.target.result });
    };
    reader.readAsDataURL(file);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCoverImage(ev.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="pd-root">
      {/* Hidden file inputs */}
      <input
        ref={pfpInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePfpChange}
      />
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleCoverChange}
      />

      {/* ─── Premium Navbar ─── */}
      <header className="pd-navbar">
        <div className="pd-navbar-inner">
          <Link to="/" className="pd-navbar-logo">
            <img src={mavenLogo} alt="MavenJobs" />
          </Link>

          <nav className="pd-navbar-links">
            <Link to="/jobs" className="pd-nav-link">Jobs</Link>
            <a href="#" className="pd-nav-link">Companies</a>
            <a href="#" className="pd-nav-link">Services</a>
          </nav>

          <div className="pd-navbar-actions">
            <div className="pd-nav-search">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input type="text" placeholder="Search jobs, companies…" />
            </div>

            <button className="pd-navbar-bell" aria-label="Notifications">
              <FiBell size={20} />
              <span className="pd-nav-dot">3</span>
            </button>

            <div className="pd-navbar-profile" onClick={() => navigate('/profile')} title="View Profile">
              <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="You" />
            </div>

            <button className="pd-navbar-logout" onClick={logout}>
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ─── Cover Photo Hero ─── */}
      <div
        className="pd-cover"
        style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {false && <div className="pd-cover-gradient" />}
        <button className="pd-cover-edit-btn" onClick={() => coverInputRef.current.click()}>
          <FiEdit2 size={14} /> Edit Cover
        </button>
      </div>

      {/* ─── Profile Identity Bar ─── */}
      <div className="pd-identity-bar">
        <div className="pd-identity-inner">
          <div className="pd-avatar-ring">
            <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="Profile" className="pd-big-avatar" />
            <button className="pd-avatar-cam" onClick={() => pfpInputRef.current.click()} title="Change profile picture">
              <FiEdit2 size={12} />
            </button>
          </div>

          <div className="pd-identity-info">
            <div className="pd-identity-top">
              {isEditingName ? (
                <div className="pd-name-edit-row">
                  <input
                    className="pd-name-input"
                    value={editNameValue}
                    onChange={e => setEditNameValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                  <button className="pd-save-btn" onClick={handleNameSave}>Save</button>
                  <button className="pd-cancel-btn" onClick={() => setIsEditingName(false)}>✕</button>
                </div>
              ) : (
                <h1 className="pd-name">
                  {user.name}
                  <button className="pd-edit-name-icon" onClick={() => { setEditNameValue(user.name); setIsEditingName(true); }}>
                    <FiEdit2 size={14} />
                  </button>
                </h1>
              )}
              <p className="pd-headline">{user.headline || 'Software Engineer • Open to Opportunities'}</p>
              <p className="pd-location"><FiMapPin size={13} /> Bengaluru, Karnataka, India · <span className="pd-open-badge">Open to Work</span></p>
            </div>

            <div className="pd-quick-stats">
              <div className="pd-qs-item">
                <FiEye size={16} />
                <span><strong>130</strong> Profile views</span>
              </div>
              <div className="pd-qs-sep" />
              <div className="pd-qs-item">
                <FiUsers size={16} />
                <span><strong>6</strong> Recruiter actions</span>
              </div>
              <div className="pd-qs-sep" />
              <div className="pd-qs-item">
                <FiTrendingUp size={16} />
                <span><strong>18</strong> Job matches</span>
              </div>
            </div>
          </div>

          <div className="pd-identity-cta">
            <button className="pd-btn-primary" onClick={() => setShowPreview(true)}>
              <FiEye size={15} /> View Profile
            </button>
            <button className="pd-btn-secondary"><FiShare2 size={15} /> Share</button>
            <button className="pd-btn-secondary"><FiDownload size={15} /> Resume</button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="pd-main">

        {/* Left Sidebar */}
        <aside className="pd-left">

          {/* Profile Completion */}
          <div className="pd-card pd-completion-card">
            <div className="pd-completion-header">
              <span>Profile Strength</span>
              <FiAward size={16} color="#10b981" />
            </div>
            <div className="pd-completion-bar-track">
              <div className="pd-completion-bar" style={{ width: '72%' }} />
            </div>
            <div className="pd-completion-pct">72% Complete</div>
            <div className="pd-completion-tips">
              <div className="pd-tip-item">
                <FiPlus size={14} color="#2563eb" />
                <span>Add work experience</span>
              </div>
              <div className="pd-tip-item">
                <FiPlus size={14} color="#2563eb" />
                <span>Add a profile summary</span>
              </div>
              <div className="pd-tip-item">
                <FiPlus size={14} color="#2563eb" />
                <span>Add skills</span>
              </div>
            </div>
          </div>

          {/* Sidebar Nav */}
          <div className="pd-card pd-sidenav-card">
            <nav>
              <Link to="#" className="pd-sidenav-link active"><FiHome size={18} /> My Home</Link>
              <Link to="/jobs" className="pd-sidenav-link"><FiBriefcase size={18} /> Jobs</Link>
              <Link to="#" className="pd-sidenav-link"><FiMonitor size={18} /> Companies</Link>
              <Link to="#" className="pd-sidenav-link"><FiFileText size={18} /> Blogs</Link>
              <Link to="#" className="pd-sidenav-link"><FiSettings size={18} /> Settings</Link>
            </nav>
          </div>

          {/* Performance Stats */}
          <div className="pd-card pd-perf-card">
            <div className="pd-perf-header">
              <span>Performance</span>
              <FiCheckCircle size={16} color="#10b981" />
            </div>
            <div className="pd-perf-grid">
              <div className="pd-perf-item">
                <span className="pd-perf-val">130 <FiChevronRight size={14} /></span>
                <span className="pd-perf-label">Search appearances</span>
              </div>
              <div className="pd-perf-item">
                <span className="pd-perf-val">6 <FiChevronRight size={14} /></span>
                <span className="pd-perf-label">Recruiter actions</span>
              </div>
            </div>
            <div className="pd-boost-pill">
              <FiZap className="pd-boost-zap" />
              <span>Get 3X boost to your profile</span>
              <FiChevronRight size={14} style={{ marginLeft: 'auto' }} />
            </div>
          </div>

        </aside>

        {/* Center Feed */}
        <section className="pd-center">

          {/* PRO Banner */}
          <div className="pd-card pd-pro-card">
            <div className="pd-pro-left">
              <div className="pd-pro-label">With <span className="pd-pro-text">PRO</span></div>
              <p className="pd-pro-sub">you get hired <strong>3× faster</strong></p>
              <button className="pd-pro-btn">✦ Become a Pro</button>
            </div>
            <div className="pd-pro-features">
              {['Hidden job invitations', 'AI-enhanced profile', 'Auto-Apply on MavenJobs', 'Priority recruiter access'].map(f => (
                <div className="pd-pro-feature" key={f}>
                  <FiCheckCircle size={15} className="pd-pro-check" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="pd-card">
            <div className="pd-section-header">
              <h3>Recommended jobs for you</h3>
              <Link to="/jobs" className="pd-view-all">View all →</Link>
            </div>
            <div className="pd-tabs">
              {Object.keys(recommendedJobs).map(tab => (
                <button
                  key={tab}
                  className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >{tab}</button>
              ))}
            </div>

            <div className="pd-job-scroll-container">
              <button className="pd-scroll-btn pd-scroll-left" onClick={() => handleScroll('left')}>
                <FiChevronLeft size={20} />
              </button>

              <div className="pd-job-scroll" ref={jobScrollRef}>
                {(recommendedJobs[activeTab] || []).map(job => (
                  <div className="pd-job-card" key={job.title}>
                    <div className="pd-job-card-top">
                      <div className="pd-job-logo" style={{ background: job.bg, color: job.col }}>{job.code}</div>
                      <span className="pd-job-ago">{job.ago}</span>
                    </div>
                    <h4 className="pd-job-title">{job.title}</h4>
                    <p className="pd-job-company">{job.company} <span className="pd-job-rating">★ {job.rating}</span></p>
                    <p className="pd-job-loc"><FiMapPin size={12} /> {job.loc}</p>
                    <button className="pd-job-apply-btn">Quick Apply</button>
                  </div>
                ))}
              </div>

              <button className="pd-scroll-btn pd-scroll-right" onClick={() => handleScroll('right')}>
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* NVites */}
          <div className="pd-card pd-nvites-card">
            <div className="pd-nvites-left">
              <div className="pd-nvites-icon-group">
                <div className="pd-nvites-main-icon">
                  <FiMail size={32} />
                  <span className="pd-nvites-badge-dot" />
                </div>
                <h3>NVites</h3>
                <p>Invitation to apply</p>
                <Link to="#" className="pd-view-all-inv">View all invites →</Link>
              </div>
            </div>
            <div className="pd-nvites-list">
              {[
                { code: 'N', title: 'NOC/SOC Analyst', company: 'Naukri e-Hire', when: '16d ago', bg: '#e0e7ff', col: '#3730a3' },
                { code: 'Z', title: 'Survey Developer', company: 'ZoomRx Healthcare', when: '22d ago', bg: '#111827', col: '#fff' },
                { code: 'F', title: 'Figma Specialist', company: 'IT Services Co.', when: '8d ago', bg: '#fef3c7', col: '#92400e' },
              ].map(inv => (
                <div className="pd-nvite-item" key={inv.title}>
                  <div className="pd-nvite-logo" style={{ background: inv.bg, color: inv.col }}>{inv.code}</div>
                  <div className="pd-nvite-info">
                    <div className="pd-nvite-title">
                      {inv.title}
                    </div>
                    <div className="pd-nvite-meta">
                      <strong>{inv.company}</strong> · Invited {inv.when}
                    </div>
                  </div>
                  <button className="pd-nvite-apply">Apply Now</button>
                </div>
              ))}
            </div>
          </div>
          {/* Early Access Section */}
          <div className="pd-card pd-early-access-card">
            <div className="pd-section-header">
              <div className="pd-early-header-left">
                <FiSend className="pd-early-icon" size={24} />
                <div className="pd-early-titles">
                  <h3>11 Early access roles from top companies <FiInfo size={14} className="pd-info-trigger" /></h3>
                  <p>See what recruiters are searching for...</p>
                </div>
              </div>
              <Link to="#" className="pd-view-all">View all</Link>
            </div>

            <div className="pd-early-container">
              <button className="pd-early-scroll-btn pd-early-left" onClick={() => handleEarlyScroll('left')}>
                <FiChevronLeft size={18} />
              </button>

              <div className="pd-early-scroll" ref={earlyScrollRef}>
                {[
                  {
                    role: 'Front End Developer',
                    type: 'Foreign IT Consulting MNC',
                    rating: '3.5+',
                    tags: ['Foreign MNC', 'Service'],
                    exp: '0-2 Yrs',
                    salary: '2-5 Lacs P.A.',
                    loc: 'Bengaluru',
                    logos: ['A', 'N', 'B', 'I', 'X']
                  },
                  {
                    role: 'Product Designer',
                    type: 'Corporate in B2C Health',
                    rating: '4.2+',
                    tags: ['Corporate', 'HealthTech'],
                    exp: '0-4 Yrs',
                    salary: '5-8 Lacs P.A.',
                    loc: 'Remote',
                    logos: ['H', 'R', 'K', 'V', 'D']
                  },
                  {
                    role: 'Back End Lead',
                    type: 'Fintech Unicorn',
                    rating: '4.8+',
                    tags: ['Unicorn', 'Product'],
                    exp: '5-8 Yrs',
                    salary: '25-35 Lacs P.A.',
                    loc: 'Pune',
                    logos: ['P', 'F', 'M', 'S', 'L']
                  }
                ].map((role, idx) => (
                  <div className="pd-early-role-card" key={idx}>
                    <div className="pd-early-role-top">
                      <h4>{role.role}</h4>
                      <p>{role.type}</p>
                    </div>

                    <div className="pd-early-tags">
                      <span className="pd-early-rating">★ {role.rating}</span>
                      {role.tags.map(tag => <span key={tag} className="pd-early-tag">{tag}</span>)}
                    </div>

                    <div className="pd-early-details">
                      <span><FiBriefcase size={14} /> {role.exp}</span>
                      <span><FiZap size={14} /> {role.salary}</span>
                      <span><FiMapPin size={14} /> {role.loc}</span>
                    </div>

                    <div className="pd-early-hiring">
                      <p>Hiring for one of these companies</p>
                      <div className="pd-early-logos">
                        {role.logos.map((l, i) => (
                          <div key={i} className="pd-early-logo-circle">{l}</div>
                        ))}
                      </div>
                    </div>

                    <button className="pd-early-share-btn">Share interest</button>
                  </div>
                ))}
              </div>

              <button className="pd-early-scroll-btn pd-early-right" onClick={() => handleEarlyScroll('right')}>
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>


          {/* Highlight Banner */}
          <div className="pd-card pd-highlight-card">
            <div className="pd-highlight-text">
              <h3>Stand out from the crowd</h3>
              <p>Highlight your application and get noticed by top recruiters instantly.</p>
              <button className="pd-btn-primary"><FiZap size={15} /> Know More</button>
            </div>
            <div className="pd-highlight-graphic">
              <div className="pd-highlight-circle" />
              <FiUsers size={40} color="#3b82f6" style={{ position: 'relative', zIndex: 1 }} />
            </div>
          </div>

          {/* Applies Match Section */}
          <div className="pd-card pd-match-card">
            <div className="pd-section-header">
              <h3>How your applies matched your profile in last 7 days?</h3>
              <Link to="#" className="pd-view-all">View all</Link>
            </div>

            <div className="pd-match-container">
              <button className="pd-match-scroll-btn pd-match-left" onClick={() => handleMatchScroll('left')}>
                <FiChevronLeft size={18} />
              </button>

              <div className="pd-match-scroll" ref={matchScrollRef}>
                {/* Summary Card */}
                <div className="pd-match-metric-card pd-match-summary">
                  <div className="pd-match-circle-main">
                    <span className="pd-match-status-low">LOW</span>
                    <div className="pd-match-dot-indicator" />
                  </div>
                  <p><strong>1 out of 49</strong> applies showed a match</p>
                </div>

                {[
                  { label: 'Work Experience', val: '0.08 yr experience', pct: '84%', icon: <FiBriefcase /> },
                  { label: 'Location', val: 'Dehradun', pct: '86%', icon: <FiMapPin /> },
                  { label: 'Keyskills', val: 'Ui/Ux, Redux, NoSQL...', pct: '37%', icon: <FiEdit2 /> },
                  { label: 'Industry', val: 'IT Services & Consulti...', pct: '57%', icon: <FiMonitor /> },
                  { label: 'Department', val: 'Engineering - Softwar...', pct: '67%', icon: <FiUsers /> },
                  { label: 'Early Applicant', val: 'Applied to fresh jobs', pct: '37%', icon: <FiTrendingUp /> },
                ].map((m, i) => (
                  <div className="pd-match-metric-card" key={i}>
                    <div className="pd-match-circle">
                      <div className="pd-match-icon">{m.icon}</div>
                      <svg className="pd-match-svg">
                        <circle cx="25" cy="25" r="21" />
                        <circle cx="25" cy="25" r="21" style={{ strokeDashoffset: `calc(132 - (132 * ${parseInt(m.pct)}) / 100)` }} />
                      </svg>
                    </div>
                    <div className="pd-match-info">
                      <h4>{m.label}</h4>
                      <p>{m.val}</p>
                      <span className="pd-match-pct">{m.pct} match</span>
                    </div>
                  </div>
                ))}

                {/* Update Card */}
                <div className="pd-match-metric-card pd-match-update">
                  <h3>Want to review your profile information?</h3>
                  <p>This will improve your job recommendations</p>
                  <Link to="#" className="pd-update-link">Update Profile</Link>
                </div>
              </div>

              <button className="pd-match-scroll-btn pd-match-right" onClick={() => handleMatchScroll('right')}>
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

        </section>

        {/* Right Sidebar */}
        <aside className="pd-right">

          {/* App Download */}
          <div className="pd-card pd-app-card">
            <div className="pd-qr">
              <img src={mavenLogo} alt="QR" style={{ width: 40, opacity: 0.5 }} />
            </div>
            <p className="pd-app-stat"><strong>3,587</strong> users downloaded our app in the last 30 mins!</p>
            <p className="pd-app-sub">Scan to download from App Store</p>
            <div className="pd-app-badges">
              <span className="pd-store-badge">🍎 App Store</span>
              <span className="pd-store-badge">▶ Play Store</span>
            </div>
          </div>

          {/* Premium Ad */}
          <div className="pd-card pd-premium-card">
            <div className="pd-premium-glow" />
            <h3 className="pd-premium-title">PremiumX</h3>
            <p className="pd-premium-desc">AI-powered premium talent discovery for modern recruiters.</p>
            <Link to="#" className="pd-premium-link">Know more →</Link>
          </div>

          {/* Skills Widget */}
          <div className="pd-card pd-skills-card">
            <div className="pd-section-header">
              <h4>Top Skills</h4>
              <button className="pd-edit-name-icon"><FiPlus size={14} /></button>
            </div>
            {['React.js', 'Node.js', 'UI/UX Design', 'TypeScript', 'MongoDB'].map(skill => (
              <div className="pd-skill-tag" key={skill}>{skill}</div>
            ))}
          </div>

        </aside>

      </div>
      {/* ─── Profile Preview Modal ─── */}
      {showPreview && (
        <div className="ppm-overlay" onClick={() => setShowPreview(false)}>
          <div className="ppm-content" onClick={e => e.stopPropagation()}>
            <button className="ppm-close" onClick={() => setShowPreview(false)}><FiX size={24} /></button>

            <div className="ppm-body">
              {/* Header Card */}
              <div className="ppm-card ppm-header-card">
                <div className="ppm-header-top">
                  <div className="ppm-avatar-wrapper">
                    <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="Profile" />
                    <div className="ppm-completion-ring">100%</div>
                  </div>
                  <div className="ppm-header-info">
                    <h2>{user.name} <FiEdit2 size={14} className="ppm-edit-inline" /></h2>
                    <p className="ppm-headline-main">Mern Stack Developer</p>
                    <p className="ppm-at">at Dr Design Private Limited</p>
                    <span className="ppm-updated">Profile last updated - Yesterday</span>
                  </div>
                </div>

                <div className="ppm-header-grid">
                  <div className="ppm-grid-item"><FiMapPin size={16} /> Dehradun, INDIA</div>
                  <div className="ppm-grid-item"><FiPhone size={16} /> 8126977256 <FiCheckCircle size={14} color="#10b981" /></div>
                  <div className="ppm-grid-item"><FiBriefcase size={16} /> 0 Year 8 Months</div>
                  <div className="ppm-grid-item"><FiMail size={16} /> {user.email || 'rohankundliya1@gmail.com'} <FiCheckCircle size={14} color="#10b981" /></div>
                  <div className="ppm-grid-item">₹ 2,00,000</div>
                  <div className="ppm-grid-item"><FiClock size={16} /> 15 Days or less notice period</div>
                </div>
              </div>

              <div className="ppm-main-layout">
                {/* Left side: Quick Links */}
                <div className="ppm-left">
                  <div className="ppm-card ppm-links-card">
                    <h3>Quick links</h3>
                    <div className="ppm-link-item">Resume <span>Update</span></div>
                    <div className="ppm-link-item">Resume headline</div>
                    <div className="ppm-link-item">Key skills</div>
                    <div className="ppm-link-item">Employment <span>Add</span></div>
                    <div className="ppm-link-item">Education <span>Add</span></div>
                    <div className="ppm-link-item">IT skills <span>Add</span></div>
                    <div className="ppm-link-item">Projects</div>
                    <div className="ppm-link-item">Profile summary</div>
                    <div className="ppm-link-item">Accomplishments</div>
                    <div className="ppm-link-item">Career profile</div>
                    <div className="ppm-link-item">Personal details</div>
                  </div>
                </div>

                {/* Right side: Detailed Sections */}
                <div className="ppm-right">
                  {/* Pro Banner */}
                  <div className="ppm-pro-banner">
                    <div className="ppm-pro-title">MavenJobs<span>Pro</span> 👑</div>
                    <div className="ppm-pro-text">Power up with <strong>up to 4x profile views</strong></div>
                    <button className="ppm-pro-btn">Become a Pro | 25% off</button>
                  </div>

                  {/* Resume Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Resume</h3>
                    </div>
                    <div className="ppm-resume-file">
                      <FiFileText size={20} color="#64748b" />
                      <div className="ppm-file-info">
                        <div className="ppm-file-name">PranjalKundliyaResume.pdf</div>
                        <div className="ppm-file-date">Uploaded on Apr 28, 2026</div>
                      </div>
                      <div className="ppm-file-actions">
                        <FiDownload size={18} />
                        <FiSettings size={18} />
                      </div>
                    </div>
                    <div className="ppm-resume-upload">
                      <button className="ppm-upload-btn">Update resume</button>
                      <p>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
                    </div>
                  </div>

                  {/* Headline Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Resume headline <FiEdit2 size={14} /></h3>
                    </div>
                    <p className="ppm-text-content">
                      Hi, I'm Pranjal Kundliya, a MERN stack developer currently working at DR Design Pvt. Ltd., where I build scalable, real-world applications including projects for Indian Railways and corporate platforms. I specialize in React, Node.js, and MongoDB.
                    </p>
                  </div>

                  {/* Key Skills Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Key skills <FiEdit2 size={14} /></h3>
                    </div>
                    <div className="ppm-skills-grid">
                      {['Ui/Ux', 'Redux', 'NoSQL', 'Figma', 'MongoDB', 'Alpha Testing', 'API', 'Express', 'Mern Stack', 'Node.js', 'Front End Engineer', 'Javascript', 'React.js'].map(skill => (
                        <span key={skill} className="ppm-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Employment Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Employment</h3>
                      <button className="ppm-add-btn">Add employment</button>
                    </div>
                    <div className="ppm-experience-item">
                      <div className="ppm-exp-header">
                        <h4>Mern Stack Developer <FiEdit2 size={14} /></h4>
                        <div className="ppm-company">Dr Design Private Limited</div>
                      </div>
                      <div className="ppm-exp-meta">Full-time | Oct 2025 to Present (7 months)</div>
                      <div className="ppm-exp-meta">15 Days or less Notice Period</div>
                      <p className="ppm-exp-desc">
                        Results-driven MERN Stack Developer with 8 months of experience in building scalable, production-grade web applications. Proficient in React.js, Node.js, Express.js, and MongoDB with hands-on experience in developing end-to-end full-stack solutions. Worked on real-world client projec... <span className="ppm-read-more">Read More</span>
                      </p>
                      <div className="ppm-exp-skills"><strong>Top 5 key skills:</strong> React.js, Mern Stack, Mern Full Stack, node.js, Node.js, Javascript, api, API Testing, Express, html</div>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Education</h3>
                      <button className="ppm-add-btn">Add education</button>
                    </div>
                    <div className="ppm-edu-item">
                      <h4>B.Tech / B.E. Computer Science and Engi... <FiEdit2 size={14} /></h4>
                      <div className="ppm-school">Graphic Era University, Dehradun</div>
                      <div className="ppm-edu-meta">2021-2025 | Full Time</div>
                    </div>
                    <div className="ppm-edu-sub">
                      <div className="ppm-edu-item">
                        <h4>Class XII <FiEdit2 size={14} /></h4>
                        <div className="ppm-school">CBSE</div>
                        <div className="ppm-edu-meta">2020</div>
                      </div>
                      <div className="ppm-edu-item">
                        <h4>Class X <FiEdit2 size={14} /></h4>
                        <div className="ppm-school">CBSE</div>
                        <div className="ppm-edu-meta">2018</div>
                      </div>
                    </div>
                  </div>

                  {/* IT Skills Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>IT skills</h3>
                      <button className="ppm-add-btn">Add details</button>
                    </div>
                    <p className="ppm-muted-text">Show your technical expertise by mentioning softwares and skills you know</p>
                  </div>

                  {/* Projects Section */}
                  <div className="ppm-card">
                    <div className="ppm-section-header">
                      <h3>Projects</h3>
                      <button className="ppm-add-btn">Add project</button>
                    </div>
                    <div className="ppm-project-item">
                      <h4>MyQuoteMate <FiEdit2 size={14} /></h4>
                      <div className="ppm-project-sub">My Quote Mate (Onsite)</div>
                      <div className="ppm-project-meta">Jan 2026 to Mar 2026 (Full Time)</div>
                      <p className="ppm-project-desc">
                        Built a scalable backend with Node.js, Express, and MongoDB to process and analyze contractor quotes, with strict authentication, rate limiting, and tiered access controls. Designed an AI orchestration layer that integrates OpenAI models with deterministic prompt engineering... <span className="ppm-read-more">Read More</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
