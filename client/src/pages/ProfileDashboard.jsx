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
  FiLogOut
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
  const [activeTab, setActiveTab] = useState('Profile');
  const [coverImage, setCoverImage] = useState("https://i.pinimg.com/736x/15/8e/a9/158ea9c22bfbb6e5003b693b91d30e48.jpg");
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
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
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
            <button className="pd-btn-primary"><FiEdit2 size={15} /> Edit Profile</button>
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
              {['Profile (18)', 'Applies (29)', 'Preferences (4)', 'You might like (10)'].map(tab => (
                <button
                  key={tab}
                  className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >{tab}</button>
              ))}
            </div>
            <div className="pd-job-scroll">
              {[
                { code: 'PE', title: 'Product Engineer', company: 'SmartDocs Tech', rating: 3.1, loc: 'Hyderabad', ago: '4d ago', bg: '#eff6ff', col: '#1e40af' },
                { code: 'UI', title: 'UI/UX Designer', company: 'Onebanc Tech', rating: 4.8, loc: 'Gurugram', ago: '1d ago', bg: '#fef3c7', col: '#b45309' },
                { code: 'A', title: 'Software Tester', company: 'Aarons Visions', rating: 4.2, loc: 'Remote', ago: '2d ago', bg: '#f0fdf4', col: '#166534' },
              ].map(job => (
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
          </div>

          {/* NVites */}
          <div className="pd-card pd-nvites-card">
            <div className="pd-nvites-left">
              <div className="pd-nvites-icon">
                <FiFileText size={28} color="#6b7280" />
              </div>
              <div>
                <h3>NVites: Invitation to apply</h3>
                <Link to="#" className="pd-view-all">View all →</Link>
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
                    <div className="pd-nvite-title">{inv.title}</div>
                    <div className="pd-nvite-meta">{inv.company} · Invited {inv.when}</div>
                  </div>
                  <button className="pd-nvite-apply">Apply</button>
                </div>
              ))}
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
    </div>
  );
}
