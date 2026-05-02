import React, { useState } from 'react';
import { 
  FiBriefcase, FiMapPin, FiClock, FiBookmark, FiChevronRight, 
  FiX, FiPlus, FiEye, FiCheck, FiInfo, FiEdit2, FiShield, FiSend, FiStar, FiZap, FiUsers
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_RECOMMENDED_JOBS = [
  {
    id: 1,
    title: "Process Coordinator",
    company: "Finvin Advisor",
    rating: 2.3,
    reviews: 3,
    exp: "0-1 Yrs",
    salary: "1.2-2.4 Lacs PA",
    location: "Mumbai(Andheri)",
    desc: "Responsibilities:* Ensure timely follow-ups on tasks* Maintain accurate records an...",
    tags: ["Office Coordination", "Coordination", "Follow Ups", "Process", "UPS", "Office"],
    posted: "2 Days Ago",
    logoCode: "F",
    logoBg: "#EFF6FF",
    logoCol: "#2563EB"
  },
  {
    id: 2,
    title: "Java Developer",
    company: "Ignitefortune Tech",
    rating: 4.1,
    reviews: 12,
    exp: "0-1 Yrs",
    salary: "Not disclosed",
    location: "Remote",
    desc: "Internship Experience or experience on self accomplished projects is preferred Pr...",
    tags: ["Java", "JDBC", "Spring Boot", "Microservices", "Web Services", "Hibernate", "MySQL", "SQL"],
    posted: "3 Days Ago",
    logoCode: "I",
    logoBg: "#F5F3FF",
    logoCol: "#7C3AED"
  },
  {
    id: 3,
    title: "Sales Coordinator",
    company: "Siana International",
    rating: 4.6,
    reviews: 2,
    exp: "0-2 Yrs",
    salary: "2-2.5 Lacs PA",
    location: "Pune(Model Colony)",
    desc: "Processing orders & tracking delivery Primary POC for clients, handling inquiries, ...",
    tags: ["Sales Coordination", "Proforma Invoice", "Sales Support", "Sales Order Processing"],
    posted: "2 Days Ago",
    logoCode: "S",
    logoBg: "#FEF2F2",
    logoCol: "#EF4444"
  },
  {
    id: 4,
    title: "Java Developer",
    company: "Jugla Technologies",
    rating: 3.8,
    reviews: 45,
    exp: "0-1 Yrs",
    salary: "Not disclosed",
    location: "Remote",
    desc: "Candidate with Prior Self Project Or Internship ExperienceMust have HandsOn Co...",
    tags: ["Java", "JDBC", "Spring Boot", "MySQL", "Microservices", "Web Services", "SQL"],
    posted: "6 Days Ago",
    logoCode: "J",
    logoBg: "#EEF2FF",
    logoCol: "#4F46E5"
  },
  {
    id: 5,
    title: "R & D Engineer",
    company: "ABB",
    rating: 4.0,
    reviews: 3397,
    exp: "0-3 Yrs",
    salary: "Not disclosed",
    location: "Hybrid - Bengaluru",
    desc: "Must have exposure to agile software development methodologies, with good trac...",
    tags: ["Research and Development", "plc scada", "test automation", "jmeter", "java", "automation"],
    posted: "2 Days Ago",
    logoCode: "ABB",
    logoBg: "#F1F5F9",
    logoCol: "#DC2626"
  }
];

export default function RecommendedJobs({ onBack }) {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('Profile (15)');

  const tabs = [
    { name: 'Applies (5)', count: 5 },
    { name: 'Profile (15)', count: 15 },
    { name: 'Preferences (3)', count: 3 },
    { name: 'You might like (6)', count: 6 }
  ];

  const handleToggleJob = (jobId) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) return prev.filter(id => id !== jobId);
      if (prev.length >= 10) return prev;
      return [...prev, jobId];
    });
  };

  return (
    <div className="rj-root">
      <div className="rj-container">
        
        {/* Header */}
        <div className="rj-header">
          <div className="rj-header-left">
            <h1 className="rj-title">Recommended jobs for you</h1>
          </div>
          
          <div className="rj-header-right">
            <span className="rj-helper-text">Select up to 10 jobs to apply</span>
            <button 
              className={`rj-apply-main ${selectedJobs.length > 0 ? 'active' : ''}`}
              disabled={selectedJobs.length === 0}
            >
              Apply {selectedJobs.length} Job{selectedJobs.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="rj-tabs-wrap">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`rj-tab ${activeTab === tab.name ? 'active' : ''}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rj-layout">
          
          {/* Left Column */}
          <div className="rj-list">
            {MOCK_RECOMMENDED_JOBS.map(job => (
              <div 
                key={job.id} 
                className={`rj-job-card ${selectedJobs.includes(job.id) ? 'selected' : ''}`}
              >
                <div className="rj-job-row">
                  <div className="rj-check-col">
                    <label className="rj-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleToggleJob(job.id)}
                      />
                      <span className="rj-checkmark"><FiCheck size={12} /></span>
                    </label>
                  </div>

                  <div className="rj-job-content">
                    <div className="rj-job-header">
                      <div className="rj-job-info">
                        <h3 className="rj-job-title">{job.title}</h3>
                        <div className="rj-company-row">
                          <span className="rj-company-name">{job.company}</span>
                          {job.rating && (
                            <span className="rj-rating-pill">
                              <FiStar size={10} /> {job.rating} <span>|</span> {job.reviews} Reviews
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="rj-job-logo" style={{ background: job.logoBg, color: job.logoCol }}>
                        {job.logoCode}
                      </div>
                    </div>

                    <div className="rj-job-meta">
                      <span><FiBriefcase size={13} /> {job.exp}</span>
                      <span><FiZap size={13} /> {job.salary}</span>
                      <span><FiMapPin size={13} /> {job.location}</span>
                    </div>

                    <div className="rj-job-desc">
                      <FiEdit2 size={13} />
                      <p>{job.desc}</p>
                    </div>

                    <div className="rj-job-tags">
                      {job.tags.map(tag => (
                        <span key={tag} className="rj-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="rj-job-footer">
                      <span className="rj-posted">{job.posted}</span>
                      <div className="rj-job-actions">
                        <button className="rj-action-btn"><FiEye size={15} /> Hide</button>
                        <button className="rj-action-btn"><FiBookmark size={15} /> Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="rj-disclaimer">
              IEIL ensures site authenticity. <br />
              <Link to="#">Security Guidelines</Link> · <Link to="#">Terms & Conditions</Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="rj-sidebar">
            
            <div className="rj-card">
              <div className="rj-card-head">
                <h3>Add preferences to get matching jobs</h3>
              </div>
              <div className="rj-pref-group">
                <div className="rj-pref-item">
                  <div className="rj-pref-label">PREFERRED JOB ROLE <FiEdit2 size={12} /></div>
                  <div className="rj-pref-tags">
                    {['Front End', 'MERN Stack', 'Software Developer'].map(r => <span key={r}>{r}</span>)}
                  </div>
                </div>
                <div className="rj-pref-item">
                  <div className="rj-pref-label">PREFERRED LOCATION <FiEdit2 size={12} /></div>
                  <div className="rj-pref-tags">
                    {['Pune', 'Noida', 'Mumbai', 'Bengaluru'].map(l => <span key={l}>{l}</span>)}
                  </div>
                </div>
                <div className="rj-pref-item">
                  <div className="rj-pref-label">PREFERRED SALARY <FiEdit2 size={12} /></div>
                  <div className="rj-pref-val">₹ 5,00,000</div>
                </div>
              </div>
            </div>

            <div className="rj-card rj-webinar-card">
              <div className="rj-webinar-head">
                <h3>Join webinar for career growth</h3>
                <p>Powered by <span>Coding Ninjas</span></p>
              </div>
              <div className="rj-webinar-img">
                <img src="https://images.unsplash.com/photo-1591115765373-520b7a0d4c8d?q=80&w=2070&auto=format&fit=crop" alt="Webinar" />
                <div className="rj-webinar-overlay">
                  <span className="rj-webinar-badge">LIVE WORKSHOP</span>
                  <div className="rj-webinar-info">
                    <div className="rj-webinar-timer">Entry closes in 9h</div>
                    <h4>Multi-Agent AI Systems: Live Workshop for 25L+ CTC</h4>
                  </div>
                </div>
              </div>
              <div className="rj-webinar-body">
                <div className="rj-webinar-tags">
                  <span>Interview Prep</span>
                  <span>Career Guidance</span>
                </div>
                <div className="rj-webinar-stats">
                  <span><FiClock size={12} /> 1 May, 8:30 PM</span>
                  <span><FiUsers size={12} /> 54 Enrolled</span>
                </div>
                <div className="rj-webinar-foot">
                  <button className="rj-webinar-cta"><FiSend size={13} /> Learn from experts</button>
                  <button className="rj-text-btn">Details</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedJobs.length > 0 && (
        <div className="rj-float-bar">
          <div className="rj-float-info">
            <strong>{selectedJobs.length} Job{selectedJobs.length > 1 ? 's' : ''} Selected</strong>
            <span>Max 10 per application</span>
          </div>
          <div className="rj-float-sep" />
          <button className="rj-btn-primary">Apply Now</button>
          <button onClick={() => setSelectedJobs([])} className="rj-float-close"><FiX size={18} /></button>
        </div>
      )}
    </div>
  );
}
