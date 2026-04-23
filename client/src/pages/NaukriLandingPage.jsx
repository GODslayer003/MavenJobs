import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCompass,
  FiEdit3,
  FiEye,
  FiHeart,
  FiMapPin,
  FiMonitor,
  FiSearch,
  FiShoppingBag,
  FiTool,
  FiTrendingUp,
  FiUsers,
  FiVideo,
  FiZap,
} from "react-icons/fi";
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import "./NaukriLandingPage.css";

const topCategories = ["MNCs", "Fintech", "FMCG & Retail", "Startups", "Edtech", "IT Services"];

const companies = [
  {
    name: "TechCorp India",
    logo: "TC",
    color: "#2563eb",
    rating: 4.2,
    reviews: "12.4K",
    desc: "Building India's most innovative tech ecosystem.",
    jobs: 248,
    category: "MNCs",
  },
  {
    name: "FinEdge",
    logo: "FE",
    color: "#059669",
    rating: 3.9,
    reviews: "5.2K",
    desc: "Reimagining financial services for 1.4B Indians.",
    jobs: 134,
    category: "Fintech",
  },
  {
    name: "CloudNine AI",
    logo: "CN",
    color: "#7c3aed",
    rating: 4.5,
    reviews: "2.1K",
    desc: "AI-first solutions for enterprise transformation.",
    jobs: 89,
    category: "Startups",
  },
  {
    name: "GreenRetail",
    logo: "GR",
    color: "#d97706",
    rating: 3.7,
    reviews: "8.9K",
    desc: "Sustainable retail for modern India.",
    jobs: 312,
    category: "FMCG & Retail",
  },
  {
    name: "NovaSec",
    logo: "NS",
    color: "#dc2626",
    rating: 4.1,
    reviews: "1.8K",
    desc: "Cybersecurity solutions at scale.",
    jobs: 56,
    category: "IT Services",
  },
  {
    name: "DataPulse",
    logo: "DP",
    color: "#0891b2",
    rating: 4.3,
    reviews: "3.4K",
    desc: "Analytics-driven decisions for every business.",
    jobs: 178,
    category: "MNCs",
  },
  {
    name: "Healify",
    logo: "HF",
    color: "#16a34a",
    rating: 4.0,
    reviews: "6.7K",
    desc: "Healthcare technology for a healthier nation.",
    jobs: 203,
    category: "Startups",
  },
  {
    name: "EduBase",
    logo: "EB",
    color: "#ea580c",
    rating: 3.8,
    reviews: "4.5K",
    desc: "Democratizing quality education across India.",
    jobs: 145,
    category: "Edtech",
  },
];

const interviewCompanies = [
  { name: "TCS", logo: "TCS", color: "#2563eb", count: "2.5K+ Interviews" },
  { name: "Flipkart", logo: "FK", color: "#f59e0b", count: "488 Interviews" },
  { name: "Byjus", logo: "BY", color: "#7c3aed", count: "816 Interviews" },
  { name: "Cognizant", logo: "CG", color: "#0891b2", count: "1.6K+ Interviews" },
  { name: "Accenture", logo: "AC", color: "#dc2626", count: "2K+ Interviews" },
  { name: "Amazon", logo: "AMZ", color: "#d97706", count: "1.7K+ Interviews" },
];

const interviewRoles = [
  { name: "Software Engineer", count: "7.2K+ questions" },
  { name: "Business Analyst", count: "2.8K+ questions" },
  { name: "Consultant", count: "2.4K+ questions" },
  { name: "Financial Analyst", count: "894 questions" },
  { name: "Sales & Marketing", count: "991 questions" },
  { name: "Quality Engineer", count: "1.3K+ questions" },
  { name: "Product Manager", count: "1.1K+ questions" },
  { name: "Data Scientist", count: "2.0K+ questions" },
];

const categories = [
  {
    icon: FiMonitor,
    label: "IT & Software",
    count: "1.2L+ jobs",
    description: "Frontend, backend, cloud, QA, and platform engineering roles.",
  },
  {
    icon: FiBarChart2,
    label: "Finance & Banking",
    count: "38K+ jobs",
    description: "Analyst, risk, audit, lending, fintech, and operations openings.",
  },
  {
    icon: FiHeart,
    label: "Healthcare",
    count: "52K+ jobs",
    description: "Clinical operations, health-tech, diagnostics, and care delivery.",
  },
  {
    icon: FiBookOpen,
    label: "Education",
    count: "24K+ jobs",
    description: "Academic, edtech, content, and training roles across institutions.",
  },
  {
    icon: FiTrendingUp,
    label: "Marketing",
    count: "31K+ jobs",
    description: "Performance, brand, growth, CRM, and demand generation teams.",
  },
  {
    icon: FiTool,
    label: "Engineering",
    count: "67K+ jobs",
    description: "Core engineering, plant operations, design, and manufacturing.",
  },
  {
    icon: FiShoppingBag,
    label: "Retail & FMCG",
    count: "19K+ jobs",
    description: "Store leadership, supply chain, merchandising, and category roles.",
  },
  {
    icon: FiCompass,
    label: "Travel & Tourism",
    count: "11K+ jobs",
    description: "Hospitality, booking ops, guest success, and travel coordination.",
  },
];

const events = [
  {
    title: "Zero to Data Analyst: Amazon Analyst Roadmap for 30L+ CTC",
    provider: "Coding Ninjas",
    badge: "Webinar",
    timeLeft: "Entry closes in 20h",
    tags: ["Interview Preparation", "Career Guidance", "Data"],
    date: "18 Apr, 12:00 PM",
    enrolled: 145,
    color: "#17306f",
  },
  {
    title: "Get hired with 25L+ CTC Interview-ready GenAI project at Amazon",
    provider: "Coding Ninjas",
    badge: "Webinar",
    timeLeft: "Entry closes in 4h",
    tags: ["Interview Preparation", "Career Guidance"],
    date: "17 Apr, 8:30 PM",
    enrolled: 133,
    color: "#12445a",
  },
  {
    title: "Full Stack Engineer Bootcamp with live interview practice",
    provider: "SkillUP Pro",
    badge: "Live",
    timeLeft: "Starts in 2d",
    tags: ["Technical", "Full Stack", "Placement"],
    date: "19 Apr, 11:00 AM",
    enrolled: 287,
    color: "#21426f",
  },
];

const popularSearches = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "DevOps",
  "UI/UX Designer",
  "Business Analyst",
  "Python Developer",
  "Machine Learning",
  "React Developer",
  "Sales Executive",
];

const jobRoles = [
  { name: "Software Developer", count: "1.2L+ jobs" },
  { name: "Data Analyst", count: "42K+ jobs" },
  { name: "Product Manager", count: "18K+ jobs" },
  { name: "DevOps Engineer", count: "29K+ jobs" },
  { name: "UI/UX Designer", count: "14K+ jobs" },
  { name: "Sales Executive", count: "88K+ jobs" },
  { name: "HR Manager", count: "35K+ jobs" },
  { name: "Digital Marketer", count: "27K+ jobs" },
  { name: "Business Analyst", count: "38K+ jobs" },
  { name: "Cloud Architect", count: "11K+ jobs" },
  { name: "Machine Learning Eng.", count: "22K+ jobs" },
  { name: "Finance Manager", count: "19K+ jobs" },
];

const statItems = [
  { num: "1Cr+", label: "Active Job Listings" },
  { num: "10M+", label: "Registered Job Seekers" },
  { num: "1.5L+", label: "Companies Hiring" },
  { num: "98K+", label: "Offers This Month" },
];

const trendingTags = ["Remote", "Python", "Product", "ML Engineer", "Bangalore", "20L+ CTC"];

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "LinkedIn", icon: FaLinkedinIn },
  { label: "X", icon: FaXTwitter },
  { label: "Instagram", icon: FaInstagram },
];

const trustedBrands = ["TechCorp India", "FinEdge", "CloudNine AI", "NovaSec", "DataPulse"];

const qrPattern = [
  "1110011",
  "1010010",
  "1111101",
  "0001010",
  "1110011",
  "1001110",
  "1110101",
];

export default function NaukriLandingPage() {
  const [activeTopCat, setActiveTopCat] = useState("MNCs");
  const pageRef = useRef(null);

  const filteredCompanies = companies.filter((company) => company.category === activeTopCat);
  const visibleCompanies = filteredCompanies.length > 0 ? filteredCompanies : companies;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const introTargets = gsap.utils.toArray("[data-hero-intro]");

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .from(".nav", {
          y: -24,
          autoAlpha: 0,
          duration: 0.7,
        })
        .to(
          introTargets,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.2"
        );

      gsap.from(".stats-strip .stat-item", {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.35,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(".hero-bg-orb-1", {
        x: 20,
        y: -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-bg-orb-2", {
        x: -14,
        y: 16,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="naukri-app" ref={pageRef}>
      <nav className="nav">
        <div className="nav-logo">
          <img src={mavenLogo} alt="Maven Jobs" className="nav-logo-image" />
        </div>

        <div className="nav-links">
          <a href="#jobs">Jobs</a>
          <a href="#companies">Companies</a>
          <a href="#services">Services</a>
          <a href="#courses">Courses</a>
        </div>

        <div className="nav-actions">
          <button type="button" className="btn-outline">
            Login
          </button>
          <button type="button" className="btn-filled">
            Register
          </button>
          <div className="nav-employer">
            For employers
            <FiChevronDown aria-hidden="true" />
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" data-section>
          <div className="hero-bg-orb hero-bg-orb-1" />
          <div className="hero-bg-orb hero-bg-orb-2" />

          <div className="hero-shell">
            <div className="hero-inner">
              <div className="hero-eyebrow" data-hero-intro>
                <div className="hero-eyebrow-dot" />
                Maven Jobs hiring platform
              </div>

              <h1 data-hero-intro>
                <span className="hero-title-line">
                  Find Your <span>Next Career Move</span>
                </span>
                <span className="hero-title-line">With More Clarity</span>
              </h1>

              <p className="hero-sub" data-hero-intro>
                Maven Jobs connects talent with fast-moving teams across India through
                cleaner search, stronger employer discovery, and practical career tools
                that help candidates move with confidence.
              </p>

              <div className="search-bar" id="jobs" data-hero-intro>
                <div className="search-field">
                  <FiSearch className="search-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    aria-label="Job title, skills, or company"
                  />
                </div>

                <div className="search-field">
                  <FiMapPin className="search-field-icon" aria-hidden="true" />
                  <input type="text" placeholder="City or remote" aria-label="City or remote" />
                </div>

                <div className="search-field search-field-compact">
                  <FiBriefcase className="search-field-icon" aria-hidden="true" />
                  <input type="text" placeholder="Experience" aria-label="Experience" />
                </div>

                <button type="button" className="search-btn">
                  <FiSearch aria-hidden="true" />
                  Search Jobs
                </button>
              </div>

              <div className="hero-tags" data-hero-intro>
                <span className="hero-tags-label">Trending:</span>
                {trendingTags.map((tag) => (
                  <span className="hero-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="trusted-strip" data-hero-intro>
                <span className="trusted-label">Recruiters active from</span>
                <div className="trusted-row">
                  {trustedBrands.map((brand) => (
                    <span className="trusted-item" key={brand}>
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="stats-strip" data-section>
          {statItems.map((item) => (
            <div className="stat-item" key={item.label} data-card>
              <div className="stat-num">{item.num}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        <section data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Explore</span>
            <h2>Explore by Category</h2>
            <p>Find the right opportunity in your domain</p>
          </div>

          <div className="cat-grid">
            {categories.map((category) => (
              <div className="cat-chip" key={category.label} data-card>
                <span className="cat-chip-icon">
                  <category.icon aria-hidden="true" />
                </span>
                <div className="cat-chip-body">
                  <div className="cat-chip-text">{category.label}</div>
                  <div className="cat-chip-count">{category.count}</div>
                  <p className="cat-chip-description">{category.description}</p>
                </div>
                <div className="cat-chip-arrow">
                  <FiArrowRight aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-alt" id="companies" data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Employers</span>
            <h2>Top Companies Hiring Now</h2>
            <p>Explore opportunities at industry leaders</p>
          </div>

          <div className="top-cats">
            {topCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`top-cat${activeTopCat === category ? " top-cat-active" : ""}`}
                onClick={() => setActiveTopCat(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cards-scroll">
            {visibleCompanies.map((company) => (
              <div className="company-card" key={company.name} data-card>
                <div className="company-logo" style={{ background: `${company.color}22`, color: company.color }}>
                  {company.logo}
                </div>
                <div>
                  <div className="company-name">{company.name}</div>
                  <div className="company-rating">
                    <FaStar className="company-rating-star" aria-hidden="true" />
                    {company.rating} | {company.reviews} reviews
                  </div>
                </div>
                <div className="company-desc">{company.desc}</div>
                <div className="company-jobs">{company.jobs} active jobs</div>
                <button type="button" className="company-btn">
                  View Jobs <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="view-all-btn">
            View All Companies
          </button>
        </section>

        <section data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Roles</span>
            <h2>Browse by Job Role</h2>
            <p>Discover jobs matched to your expertise</p>
          </div>

          <div className="roles-grid">
            {jobRoles.map((role) => (
              <div className="role-card" key={role.name} data-card>
                <div className="role-card-left">
                  <h4>{role.name}</h4>
                  <span>{role.count}</span>
                </div>
                <div className="role-card-arrow">
                  <FiArrowRight aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-alt" data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Interview Prep</span>
            <h2>Prepare for Your Next Interview</h2>
            <p>Access thousands of real interview questions from top companies</p>
          </div>

          <div className="interview-grid">
            <div className="interview-col" data-card>
              <div className="interview-col-header">
                <h3>Interview Questions by Company</h3>
              </div>
              {interviewCompanies.map((company) => (
                <div className="interview-item" key={company.name}>
                  <div className="interview-item-left">
                    <div className="interview-item-logo" style={{ background: company.color }}>
                      {company.logo}
                    </div>
                    <div>
                      <div className="interview-item-name">{company.name}</div>
                      <div className="interview-item-count">{company.count}</div>
                    </div>
                  </div>
                  <div className="interview-item-arrow">
                    <FiChevronRight aria-hidden="true" />
                  </div>
                </div>
              ))}
              <div className="interview-view-all">
                View all companies <FiArrowRight aria-hidden="true" />
              </div>
            </div>

            <div className="interview-col" data-card>
              <div className="interview-col-header">
                <h3>Interview Questions by Role</h3>
              </div>
              {interviewRoles.map((role) => (
                <div className="interview-item" key={role.name}>
                  <div className="interview-item-left">
                    <div className="interview-role-icon">
                      <FiBriefcase aria-hidden="true" />
                    </div>
                    <div>
                      <div className="interview-item-name">{role.name}</div>
                      <div className="interview-item-count">{role.count}</div>
                    </div>
                  </div>
                  <div className="interview-item-arrow">
                    <FiChevronRight aria-hidden="true" />
                  </div>
                </div>
              ))}
              <div className="interview-view-all">
                View all roles <FiArrowRight aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Live Events</span>
            <h2>Upcoming Events and Challenges</h2>
            <p>Level up your career with expert-led sessions</p>
          </div>

          <div className="events-grid">
            {events.map((eventItem) => (
              <div className="event-card" key={eventItem.title} data-card>
                <div
                  className="event-card-img"
                  style={{ background: `linear-gradient(135deg, ${eventItem.color} 0%, #0a0f1e 100%)` }}
                >
                  <div className="event-badge">{eventItem.badge}</div>
                  <div className="event-time-badge">
                    <FiClock aria-hidden="true" />
                    {eventItem.timeLeft}
                  </div>
                </div>

                <div className="event-card-body">
                  <div className="event-provider">
                    <div className="event-provider-logo">
                      <FiVideo aria-hidden="true" />
                    </div>
                    <span className="event-provider-name">{eventItem.provider}</span>
                  </div>
                  <div className="event-title">{eventItem.title}</div>
                  <div className="event-tags">
                    {eventItem.tags.map((tag) => (
                      <span className="event-tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="event-meta">
                    <span className="event-meta-info">
                      <span className="event-meta-detail">
                        <FiClock aria-hidden="true" />
                        {eventItem.date}
                      </span>
                      <span className="event-meta-separator" aria-hidden="true">
                        |
                      </span>
                      <span className="event-meta-detail">
                        <FiUsers aria-hidden="true" />
                        {eventItem.enrolled} enrolled
                      </span>
                    </span>
                    <span className="event-meta-link">
                      View details <FiArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-alt" id="courses" data-section>
          <div className="section-header" data-section-head>
            <span className="section-kicker">Search Trends</span>
            <h2>Popular Job Searches</h2>
            <p>What job seekers are looking for right now</p>
          </div>

          <div className="popular-grid">
            {popularSearches.map((search) => (
              <div className="pop-chip" key={search} data-card>
                {search}
              </div>
            ))}
          </div>
        </section>

        <div className="premium-banner" data-section>
          <div className="premium-banner-left" data-section-head>
            <span className="section-kicker">Premium</span>
            <h3>Accelerate Your Job Search with Premium</h3>
            <p>
              Get ahead of the competition with resume writing, priority applicant status,
              and direct recruiter visibility. Trusted by 5M+ job seekers.
            </p>
            <div className="premium-chips">
              <span className="premium-chip" data-card>
                <FiEdit3 aria-hidden="true" />
                Resume Writing
              </span>
              <span className="premium-chip" data-card>
                <FiZap aria-hidden="true" />
                Priority Applicant
              </span>
              <span className="premium-chip" data-card>
                <FiEye aria-hidden="true" />
                Resume Display
              </span>
            </div>
          </div>

          <div className="premium-banner-actions" data-card>
            <button type="button" className="btn-filled premium-btn">
              Learn More <FiArrowRight aria-hidden="true" />
            </button>
            <div className="premium-note">Includes paid services</div>
          </div>
        </div>

        <div className="app-section" data-section>
          <div className="app-section-left" data-section-head>
            <span className="section-kicker">Mobile Experience</span>
            <h2>10M+ Users Are on the Maven Jobs App</h2>
            <p>
              Get real-time job updates, personalized alerts, and AI-powered career tools
              right on your phone.
            </p>
            <div className="app-btns">
              <a className="app-btn" href="#" data-card>
                <span className="app-btn-icon">
                  <FaGooglePlay aria-hidden="true" />
                </span>
                <div>
                  <div className="app-btn-text-small">GET IT ON</div>
                  <div className="app-btn-text-big">Google Play</div>
                </div>
              </a>
              <a className="app-btn" href="#" data-card>
                <span className="app-btn-icon">
                  <FaApple aria-hidden="true" />
                </span>
                <div>
                  <div className="app-btn-text-small">Download on the</div>
                  <div className="app-btn-text-big">App Store</div>
                </div>
              </a>
            </div>
          </div>

          <div className="app-section-right" data-card>
            <div className="qr-box">
              <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
                {qrPattern.map((row, rowIndex) =>
                  row.split("").map((cell, columnIndex) => (
                    <rect
                      key={`${rowIndex}-${columnIndex}`}
                      x={columnIndex * 10}
                      y={rowIndex * 10}
                      width="9"
                      height="9"
                      fill={cell === "1" ? "#000" : "#fff"}
                    />
                  ))
                )}
              </svg>
            </div>
            <div className="qr-label">Scan to download the app</div>
          </div>
        </div>
      </main>

      <footer data-section>
        <div className="footer-grid">
          <div className="footer-brand" data-card>
            <img src={mavenLogo} alt="Maven Jobs" className="footer-brand-logo" />
            <p>
              Maven Jobs helps candidates discover better opportunities and helps teams
              hire faster with a cleaner, more focused recruiting experience.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a href="#" key={social.label} aria-label={social.label}>
                  <social.icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col" data-card>
            <h4>Company</h4>
            <ul>
              {["About Us", "Careers", "Press", "Blog", "Sitemap"].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" data-card>
            <h4>Support</h4>
            <ul>
              {["Help Center", "Grievances", "Fraud Alert", "Trust & Safety", "Report Issue"].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" data-card>
            <h4>Legal</h4>
            <ul>
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "GDPR", "Credits"].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Info Edge (India) Ltd. All rights reserved. All trademarks are the
            property of their respective owners.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Our Businesses</a>
            <a href="#">iimjobs</a>
            <a href="#">Shiksha</a>
            <a href="#">Jeevansathi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
