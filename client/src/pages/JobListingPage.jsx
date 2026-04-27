import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch, FiMapPin, FiBriefcase, FiChevronDown, FiFilter,
  FiCheck, FiClock, FiBookmark, FiArrowRight, FiTrendingUp, FiAward,
  FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { FaRupeeSign, FaStar, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../AuthContext";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import "./JobListingPage.css";

const FILTER_CATEGORIES = [
  { id: "dept", label: "Department", options: ["Engineering", "Product", "Design", "Marketing", "Sales", "HR"] },
  { id: "mode", label: "Work Mode", options: ["Work from office", "Remote", "Hybrid"] },
  {
    id: "loc", label: "Location", options: [
      "Delhi / NCR", "Bengaluru", "Mumbai", "Hyderabad", "Pune", "Chennai",
      "Kolkata", "Ahmedabad", "Surat", "Jaipur", "Indore", "Nagpur", "Thane",
      "Nashik", "Chandigarh", "Mohali", "Gurugram", "Noida", "Dehradun", "Kochi"
    ]
  },
  { id: "salary", label: "Salary", options: ["0–3 Lakhs", "3–6 Lakhs", "6–10 Lakhs", "10–15 Lakhs", "15+ Lakhs"] },
  { id: "type", label: "Company Type", options: ["Corporate", "Foreign MNC", "Indian MNC", "Startup"] },
];

const BASE_JOBS = [
  {
    id: 1, title: "Senior Software Engineer", company: "TechCorp India", logo: "TC",
    rating: 4.5, reviews: "1.2K", exp: "3–6 Yrs", salary: "15–25 Lacs PA",
    location: "Bengaluru (Hybrid)", posted: "1 day ago", featured: true,
    desc: "Lead our core platform team. Architect scalable, high-performance solutions used by millions of Indian professionals every day.",
    tags: ["React", "Node.js", "AWS", "TypeScript"],
    dept: "Engineering", mode: "Hybrid", loc: "Bengaluru", salaryRange: "15+ Lakhs", type: "Foreign MNC", date: new Date(Date.now() - 86400000)
  },
  {
    id: 2, title: "Product Designer (UI/UX)", company: "FinEdge", logo: "FE",
    rating: 4.2, reviews: "850", exp: "2–4 Yrs", salary: "12–18 Lacs PA",
    location: "Mumbai", posted: "3 days ago",
    desc: "Create the next generation of fintech product experiences. You will work alongside PMs and engineers to ship elegant, user-first designs.",
    tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    dept: "Design", mode: "Work from office", loc: "Mumbai", salaryRange: "10–15 Lakhs", type: "Startup", date: new Date(Date.now() - 86400000 * 3)
  },
  {
    id: 3, title: "Backend Developer (Go / Python)", company: "CloudNine AI", logo: "CN",
    rating: 4.8, reviews: "320", exp: "1–3 Yrs", salary: "Not disclosed",
    location: "Pune", posted: "Just now",
    desc: "Build high-throughput AI services using Go and Python. Experience with distributed systems, microservices, and gRPC is a plus.",
    tags: ["Golang", "Python", "Kubernetes", "gRPC"],
    dept: "Engineering", mode: "Remote", loc: "Pune", salaryRange: "6–10 Lakhs", type: "Indian MNC", date: new Date()
  },
  {
    id: 4, title: "Full Stack Developer – Internship", company: "NovaSec", logo: "NS",
    rating: 4.0, reviews: "150", exp: "0–1 Yrs", salary: "4–6 Lacs PA",
    location: "Delhi / NCR", posted: "2 hours ago",
    desc: "Kickstart your career at a high-growth cybersecurity startup. Build secure web applications and ship production features from day one.",
    tags: ["JavaScript", "Express", "MongoDB", "React"],
    dept: "Engineering", mode: "Hybrid", loc: "Delhi / NCR", salaryRange: "3–6 Lakhs", type: "Startup", date: new Date(Date.now() - 7200000)
  },
  {
    id: 5, title: "Data Scientist", company: "DataPulse", logo: "DP",
    rating: 4.3, reviews: "700", exp: "2–5 Yrs", salary: "18–28 Lacs PA",
    location: "Bengaluru", posted: "5 hours ago",
    desc: "Build ML models that power analytics decisions for enterprise clients. Own the full lifecycle from data wrangling to deployment.",
    tags: ["Python", "ML", "TensorFlow", "SQL"],
    dept: "Engineering", mode: "Work from office", loc: "Bengaluru", salaryRange: "15+ Lakhs", type: "Corporate", date: new Date(Date.now() - 18000000)
  },
];

const TOP_CATEGORIES = [
  "Head - Engineering Jobs", "Architect Jobs", "Game Developer / Programmer Jobs",
  "DevOps Manager Jobs", "Engineering Manager Jobs", "Database Administrator Jobs",
  "Android App Developer Jobs", "Full Stack Developer Jobs", "Data Scientist Jobs",
  "Product Manager Jobs"
];

// Generate more jobs to test pagination and filters
const JOBS = [
  ...BASE_JOBS,
  ...Array.from({ length: 145 }, (_, i) => {
    const base = BASE_JOBS[i % BASE_JOBS.length];
    return {
      ...base,
      id: i + 6,
      title: `${base.title} ${Math.floor(i / 5) + 2}`,
      posted: `${i + 2} days ago`,
      featured: false,
      date: new Date(Date.now() - (i + 6) * 86400000), // different dates for sorting
      // Vary some properties
      dept: i % 2 === 0 ? "Marketing" : "Sales",
      mode: i % 3 === 0 ? "Remote" : "Hybrid",
      loc: i % 4 === 0 ? "Hyderabad" : "Pune",
    };
  }),
];

export default function JobListingPage() {
  const scrollRef = React.useRef(null);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [showSort, setShowSort] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // stores catId if modal is open
  const [draftFilters, setDraftFilters] = useState({}); // local state for modal

  const JOBS_PER_PAGE = 15;
  const { openLogin, openRegister } = useAuth();

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFilter = (catId, option) => {
    setFilters(prev => {
      const cur = prev[catId] || [];
      const updated = cur.includes(option) ? cur.filter(o => o !== option) : [...cur, option];
      return { ...prev, [catId]: updated };
    });
    setCurrentPage(1);
  };

  const openFilterModal = (catId) => {
    setDraftFilters({ ...filters }); // Copy current filters to draft
    setActiveModal(catId);
  };

  const toggleDraftFilter = (catId, option) => {
    setDraftFilters(prev => {
      const cur = prev[catId] || [];
      const updated = cur.includes(option) ? cur.filter(o => o !== option) : [...cur, option];
      return { ...prev, [catId]: updated };
    });
  };

  const applyModalFilters = () => {
    setFilters(draftFilters);
    setCurrentPage(1);
    setActiveModal(null);
  };

  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  // Filter and Sort Logic
  const filteredJobs = JOBS.filter(job => {
    // Search match
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.company.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    // Category match
    for (const [catId, selectedOpts] of Object.entries(filters)) {
      if (selectedOpts.length === 0) continue;

      const jobVal =
        catId === "dept" ? job.dept :
          catId === "mode" ? job.mode :
            catId === "loc" ? job.loc :
              catId === "salary" ? job.salaryRange :
                catId === "type" ? job.type : null;

      if (!selectedOpts.includes(jobVal)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.date - a.date;
    if (sortBy === "salary") {
      // Very crude salary sort
      const getSal = s => parseInt(s.split("–")[0]) || 0;
      return getSal(b.salary) - getSal(a.salary);
    }
    return a.id - b.id; // relevance/default
  });

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <div className="jlp-root">
      {/* ── Header ── */}
      <header className={`jlp-header${scrolled ? " scrolled" : ""}`}>
        <div className="jlp-header-inner">
          <Link to="/">
            <img src={mavenLogo} alt="Maven Jobs" className="jlp-logo" />
          </Link>

          <div className="jlp-search-bar">
            <div className="jlp-search-field">
              <FiSearch size={16} />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="jlp-search-field">
              <FiMapPin size={16} />
              <input type="text" placeholder="Location" />
            </div>
            <button className="jlp-search-btn" aria-label="Search">
              <FiSearch size={18} />
            </button>
          </div>

          <div className="jlp-header-actions">
            <button className="jlp-btn-login" onClick={openLogin}>Login</button>
            <button className="jlp-btn-register" onClick={openRegister}>Register Free</button>
          </div>
        </div>
      </header>

      {/* ── Top Categories Strip ── */}
      <div className="jlp-top-categories-wrapper">
        <div className="jlp-top-categories-inner">
          <button className="jlp-scroll-btn left" onClick={scrollLeft}>
            <FiChevronLeft size={20} />
          </button>
          
          <div className="jlp-top-categories-container" ref={scrollRef}>
            {TOP_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="jlp-top-category-chip">
                {cat}
              </div>
            ))}
          </div>

          <button className="jlp-scroll-btn right" onClick={scrollRight}>
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="jlp-body">

        {/* Left: Filters */}
        <aside className="jlp-sidebar">
          <div className="jlp-filter-card">
            <div className="jlp-filter-header">
              <div className="jlp-filter-title">
                <FiFilter size={16} /> All Filters
              </div>
              {hasFilters && (
                <button className="jlp-clear-btn" onClick={() => setFilters({})}>Clear All</button>
              )}
            </div>

            {FILTER_CATEGORIES.map(cat => {
              const displayOptions = cat.options.slice(0, 5);
              const hasMore = cat.options.length > 5;
              return (
                <div className="jlp-filter-group" key={cat.id}>
                  <div className="jlp-filter-group-label">{cat.label}</div>
                  <div className="jlp-filter-options">
                    {displayOptions.map(opt => {
                      const isChecked = (filters[cat.id] || []).includes(opt);
                      return (
                        <div
                          key={opt}
                          className="jlp-filter-option"
                          onClick={() => toggleFilter(cat.id, opt)}
                        >
                          <div className={`jlp-checkbox${isChecked ? " checked" : ""}`}>
                            {isChecked && <FiCheck strokeWidth={3} size={10} />}
                          </div>
                          <span className={`jlp-option-label${isChecked ? " active" : ""}`}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                  {hasMore && (
                    <button 
                      className="jlp-view-more-btn" 
                      onClick={() => openFilterModal(cat.id)}
                    >
                      View More
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center: Job Listings */}
        <section className="jlp-center">
          <div className="jlp-results-bar">
            <div>
              <div className="jlp-results-title">
                {filteredJobs.length > 0 ? (
                  <>
                    {Math.min((currentPage - 1) * JOBS_PER_PAGE + 1, filteredJobs.length)} – {Math.min(currentPage * JOBS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} <span>Jobs Found</span>
                  </>
                ) : (
                  <span>No Jobs Found</span>
                )}
              </div>
              <div className="jlp-results-sub">Recommended based on your preferences</div>
            </div>
            <div className="jlp-sort-row">
              <span className="jlp-sort-label">Sort by:</span>
              <div className="jlp-sort-wrapper">
                <button className="jlp-sort-btn" onClick={() => setShowSort(!showSort)}>
                  {sortBy === "relevance" ? "Relevance" : sortBy === "newest" ? "Newest" : "Salary"} <FiChevronDown size={14} />
                </button>
                {showSort && (
                  <div className="jlp-sort-dropdown">
                    <div onClick={() => { setSortBy("relevance"); setShowSort(false); }}>Relevance</div>
                    <div onClick={() => { setSortBy("newest"); setShowSort(false); }}>Newest</div>
                    <div onClick={() => { setSortBy("salary"); setShowSort(false); }}>Salary</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {currentJobs.map(job => (
            <div key={job.id} className={`jlp-job-card${job.featured ? " featured" : ""}`}>
              {job.featured && <div className="jlp-featured-badge">⭐ Featured</div>}

              <div className="jlp-card-top">
                <div className="jlp-company-logo">{job.logo}</div>
                <div className="jlp-card-meta">
                  <div className="jlp-job-title">{job.title}</div>
                  <div className="jlp-company-row">
                    <span className="jlp-company-name">{job.company}</span>
                    <div className="jlp-rating-badge">
                      {job.rating} <FaStar size={9} />
                    </div>
                    <span className="jlp-reviews">{job.reviews} Reviews</span>
                  </div>
                </div>
              </div>

              <div className="jlp-card-details">
                <div className="jlp-detail-item">
                  <div className="jlp-detail-icon"><FiBriefcase size={15} /></div>
                  <span className="jlp-detail-text">{job.exp}</span>
                </div>
                <div className="jlp-detail-item">
                  <div className="jlp-detail-icon"><FaRupeeSign size={13} /></div>
                  <span className="jlp-detail-text">{job.salary}</span>
                </div>
                <div className="jlp-detail-item">
                  <div className="jlp-detail-icon"><FiMapPin size={15} /></div>
                  <span className="jlp-detail-text">{job.location}</span>
                </div>
                <div className="jlp-detail-item">
                  <div className="jlp-detail-icon"><FiClock size={15} /></div>
                  <span className="jlp-detail-text">{job.posted}</span>
                </div>
              </div>

              <p className="jlp-card-desc">{job.desc}</p>

              <div className="jlp-card-footer">
                <div className="jlp-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="jlp-tag">{tag}</span>
                  ))}
                </div>
                <div className="jlp-card-actions">
                  <button className="jlp-save-btn" aria-label="Save job">
                    <FiBookmark size={17} />
                  </button>
                  <button className="jlp-apply-btn">
                    Quick Apply <FiArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="jlp-pagination">
            <button
              className="jlp-page-btn nav-btn"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(prev => prev - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Previous
            </button>
            <div className="jlp-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`jlp-page-btn num-btn${currentPage === num ? " active" : ""}`}
                  onClick={() => {
                    setCurrentPage(num);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              className="jlp-page-btn nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </button>
          </div>
        </section>

        {/* Right: Companies & Trending */}
        <aside className="jlp-right-sidebar">
          <div className="jlp-right-card">
            <div className="jlp-right-card-title">Top Companies Hiring</div>
            <div className="jlp-company-list">
              {[
                { name: "Virtusa", jobs: 12 },
                { name: "Accenture", jobs: 24 },
                { name: "Conduent", jobs: 8 },
                { name: "DataPulse", jobs: 17 },
              ].map(c => (
                <div key={c.name} className="jlp-company-item">
                  <div className="jlp-company-item-left">
                    <div className="jlp-company-item-logo">{c.name[0]}</div>
                    <div>
                      <div className="jlp-company-item-name">{c.name}</div>
                      <div className="jlp-company-item-jobs">{c.jobs} Open Roles</div>
                    </div>
                  </div>
                  <div className="jlp-company-item-arrow"><FiArrowRight size={14} /></div>
                </div>
              ))}
            </div>
            <button className="jlp-view-all-btn">View All Companies</button>
          </div>

          <div className="jlp-trending-card">
            <div className="jlp-trending-icon"><FiTrendingUp /></div>
            <div className="jlp-trending-title">Trending Career Paths</div>
            <div className="jlp-trending-desc">Roles seeing 40%+ more hiring this quarter.</div>
            <div className="jlp-trending-paths">
              {["Data Engineering", "Cloud Architecture", "Product Operations", "AI / ML Engineering"].map(p => (
                <div key={p} className="jlp-trending-path">
                  <div className="jlp-trending-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>

      {/* ── Footer (same as NaukriLandingPage) ── */}
      <footer className="jlp-footer">
        <div className="jlp-footer-grid">
          <div className="jlp-footer-brand">
            <img src={mavenLogo} alt="Maven Jobs" className="jlp-footer-brand-logo" />
            <p>
              Maven Jobs helps candidates discover better opportunities and helps teams
              hire faster with a cleaner, more focused recruiting experience.
            </p>
            <div className="jlp-footer-social">
              {[
                { label: "Facebook", icon: FaFacebookF },
                { label: "LinkedIn", icon: FaLinkedinIn },
                { label: "X", icon: FaXTwitter },
                { label: "Instagram", icon: FaInstagram },
              ].map(({ label, icon: Icon }) => (
                <a key={label} href="#" aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>

          <div className="jlp-footer-col">
            <h4>Company</h4>
            <ul>
              {["About Us", "Careers", "Press", "Blog", "Sitemap"].map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="jlp-footer-col">
            <h4>Support</h4>
            <ul>
              {["Help Center", "Grievances", "Fraud Alert", "Trust & Safety", "Report Issue"].map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="jlp-footer-col">
            <h4>Legal</h4>
            <ul>
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "GDPR", "Credits"].map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="jlp-footer-bottom">
          <p>&copy; 2026 MavenJobs. All rights reserved. All trademarks are the property of their respective owners.</p>
          <div className="jlp-footer-bottom-links">
            <a href="#">iimjobs</a>
            <a href="#">Shiksha</a>
            <a href="#">Jeevansathi</a>
            <a href="#">Our Businesses</a>
          </div>
        </div>
      </footer>

      {/* ── Filter Modal ── */}
      {activeModal && (
        <div className="jlp-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="jlp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="jlp-modal-header">
              <h3 className="jlp-modal-title">
                {FILTER_CATEGORIES.find(c => c.id === activeModal)?.label}
              </h3>
              <button className="jlp-modal-close" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            
            <div className="jlp-modal-body">
              <div className="jlp-modal-grid">
                {FILTER_CATEGORIES.find(c => c.id === activeModal)?.options.map(opt => {
                  const isChecked = (draftFilters[activeModal] || []).includes(opt);
                  // Mock count for professional look
                  const mockCount = Math.floor(Math.random() * 900) + 15;
                  return (
                    <div
                      key={opt}
                      className="jlp-filter-option"
                      onClick={() => toggleDraftFilter(activeModal, opt)}
                    >
                      <div className={`jlp-checkbox${isChecked ? " checked" : ""}`}>
                        {isChecked && <FiCheck strokeWidth={3} size={10} />}
                      </div>
                      <span className={`jlp-option-label${isChecked ? " active" : ""}`}>
                        {opt} <span className="jlp-option-count">({mockCount})</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="jlp-modal-footer">
              <button className="jlp-modal-apply-btn" onClick={applyModalFilters}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
