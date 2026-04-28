import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  FiHome,
  FiActivity,
  FiBox,
  FiDollarSign,
  FiAward,
} from "react-icons/fi";
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
  FaGraduationCap,
  FaBuilding,
  FaRupeeSign,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import qrImage from "../../assets/QR.png";
import "./NaukriLandingPage.css";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import { useAuth } from "../AuthContext";

const topCategories = ["All", "MNCs", "Fintech", "FMCG & Retail", "Startups", "Edtech", "IT Services"];

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
  { name: "Wipro", logo: "WP", color: "#16a34a", count: "1.2K+ Interviews" },
  { name: "Infosys", logo: "INF", color: "#0284c7", count: "1.4K+ Interviews" },
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
    image: "https://i.pinimg.com/1200x/59/8e/c4/598ec42e15c85716c6954c26840d4f4b.jpg",
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
    image: "https://i.pinimg.com/1200x/c1/0a/86/c10a86560fe721210e6d5397438d3c2b.jpg",
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
    image: "https://i.pinimg.com/736x/ea/c6/cb/eac6cb24e593ae2d2c3329516e0126eb.jpg",
  },
  {
    title: "Mastering System Design: Architecting Scalable Applications",
    provider: "Maven Academy",
    badge: "Masterclass",
    timeLeft: "Starts in 5d",
    tags: ["Architecture", "System Design", "Advanced"],
    date: "22 Apr, 06:00 PM",
    enrolled: 412,
    color: "#0a244d",
    image: "https://i.pinimg.com/1200x/82/4b/4b/824b4b2c74e3b4f66f2cd0575c76dcb0.jpg",
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

const trendingTags = [
  { label: "Remote", icon: FiHome, color: "#eef2ff" },
  { label: "MNC", icon: FaBuilding, color: "#fffbeb" },
  { label: "Analytics", icon: FiSearch, color: "#f0fdfa" },
  { label: "Supply Chain", icon: FiBox, color: "#f8fafc" },
  { label: "Data Science", icon: FiBarChart2, color: "#fffbeb" },
  { label: "Software & IT", icon: FiMonitor, color: "#f8fafc" },
  { label: "Fresher", icon: FaGraduationCap, color: "#fffbeb" },
  { label: "Fortune 500", icon: FiAward, color: "#f0fdfa" },
  { label: "Banking & Finance", icon: FaRupeeSign, color: "#f8fafc" },
  { label: "Internship", icon: FiBookOpen, color: "#f8fafc" },
  { label: "Sales", icon: FiBriefcase, color: "#f0fdfa" },
];

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
  const { user, logout, openLogin, openRegister } = useAuth();
  const [activeTopCat, setActiveTopCat] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEmployerDropdownOpen, setIsEmployerDropdownOpen] = useState(false);
  const [activeNavDropdown, setActiveNavDropdown] = useState(null);
  const [discoverRolePage, setDiscoverRolePage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyPage, setCompanyPage] = useState(0);
  const [experienceValue, setExperienceValue] = useState("");
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);

  const experienceOptions = [
    "Fresher (less than 1 year)",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years"
  ];

  const pageRef = useRef(null);

  const filteredCompanies =
    activeTopCat === "All"
      ? companies
      : companies.filter((company) => company.category === activeTopCat);
  const visibleCompanies = filteredCompanies;
  const maxCompanyPage = Math.ceil(visibleCompanies.length / 4) - 1;

  useEffect(() => {
    setCompanyPage(0);
  }, [activeTopCat]);

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

      // Scroll Progress Logic
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="naukri-app" ref={pageRef}>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <nav className={`nav${isScrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <img src={mavenLogo} alt="Maven Jobs" className="nav-logo-image" />
        </Link>

        <div className="nav-links">
          {/* JOBS MENU */}
          <div 
            className="nav-link-item"
            onMouseEnter={() => setActiveNavDropdown('Jobs')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <Link to="/jobs">Jobs</Link>
            {activeNavDropdown === 'Jobs' && (
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Popular categories</h4>
                  <Link to="/jobs">IT jobs</Link>
                  <Link to="/jobs">Sales jobs</Link>
                  <Link to="/jobs">Marketing jobs</Link>
                  <Link to="/jobs">Data Science jobs</Link>
                  <Link to="/jobs">HR jobs</Link>
                  <Link to="/jobs">Engineering jobs</Link>
                </div>
                <div className="mega-column">
                  <h4>Jobs in demand</h4>
                  <Link to="/jobs">Fresher jobs</Link>
                  <Link to="/jobs">MNC jobs</Link>
                  <Link to="/jobs">Remote jobs</Link>
                  <Link to="/jobs">Work from home jobs</Link>
                  <Link to="/jobs">Walk-in jobs</Link>
                  <Link to="/jobs">Part-time jobs</Link>
                </div>
                <div className="mega-column">
                  <h4>Jobs by location</h4>
                  <Link to="/jobs">Jobs in Delhi</Link>
                  <Link to="/jobs">Jobs in Mumbai</Link>
                  <Link to="/jobs">Jobs in Bangalore</Link>
                  <Link to="/jobs">Jobs in Hyderabad</Link>
                  <Link to="/jobs">Jobs in Chennai</Link>
                  <Link to="/jobs">Jobs in Pune</Link>
                </div>
              </div>
            )}
          </div>

          {/* COMPANIES MENU */}
          <div 
            className="nav-link-item"
            onMouseEnter={() => setActiveNavDropdown('Companies')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <a href="#companies">Companies</a>
            {activeNavDropdown === 'Companies' && (
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Explore categories</h4>
                  <a href="#">Unicorn</a>
                  <a href="#">MNC</a>
                  <a href="#">Startup</a>
                  <a href="#">Product based</a>
                  <a href="#">Internet</a>
                </div>
                <div className="mega-column">
                  <h4>Explore collections</h4>
                  <a href="#">Top companies</a>
                  <a href="#">IT companies</a>
                  <a href="#">Fintech companies</a>
                  <a href="#">Sponsored companies</a>
                  <a href="#">Featured companies</a>
                </div>
                <div className="mega-column">
                  <h4>Research companies</h4>
                  <a href="#">Interview questions</a>
                  <a href="#">Company salaries</a>
                  <a href="#">Company reviews</a>
                  <a href="#">Salary Calculator</a>
                </div>
              </div>
            )}
          </div>

          {/* SERVICES MENU */}
          <div 
            className="nav-link-item"
            onMouseEnter={() => setActiveNavDropdown('Services')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <a href="#services">Services</a>
            {activeNavDropdown === 'Services' && (
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Resume writing</h4>
                  <a href="#">Text resume</a>
                  <a href="#">Visual resume</a>
                  <a href="#">Resume critique</a>
                  
                  <h4 style={{ marginTop: '20px' }}>Find Jobs</h4>
                  <a href="#">Jobs4u</a>
                  <a href="#">Priority applicant</a>
                  <a href="#">Contact us</a>
                </div>
                <div className="mega-column">
                  <h4>Get recruiter's attention</h4>
                  <a href="#">Resume display</a>
                  
                  <h4 style={{ marginTop: '20px' }}>Monthly subscriptions</h4>
                  <a href="#">Basic & premium plans</a>
                </div>
                <div className="mega-column">
                  <h4>Free resume resources</h4>
                  <a href="#">Resume maker</a>
                  <a href="#">Resume quality score</a>
                  <a href="#">Resume samples</a>
                  <a href="#">Job letter samples</a>
                </div>
              </div>
            )}
          </div>

          {/* COURSES MENU */}
          <div 
            className="nav-link-item"
            onMouseEnter={() => setActiveNavDropdown('Courses')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <a href="#courses">Courses</a>
            {activeNavDropdown === 'Courses' && (
              <div className="mega-menu">
                <div className="mega-column">
                  <h4>Tech courses</h4>
                  <a href="#">Full Stack Development</a>
                  <a href="#">Data Science & ML</a>
                  <a href="#">Cloud Computing</a>
                  <a href="#">Cybersecurity</a>
                  <a href="#">DevOps & Automation</a>
                </div>
                <div className="mega-column">
                  <h4>Business & management</h4>
                  <a href="#">Project Management</a>
                  <a href="#">Product Management</a>
                  <a href="#">Business Analytics</a>
                  <a href="#">Digital Marketing</a>
                  <a href="#">HR Management</a>
                </div>
                <div className="mega-column">
                  <h4>Career prep</h4>
                  <a href="#">Resume building</a>
                  <a href="#">Interview preparation</a>
                  <a href="#">Communication skills</a>
                  <a href="#">Leadership training</a>
                  <a href="#">Aptitude & reasoning</a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
              <button
                type="button"
                className="btn-outline"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn-outline"
                onClick={openLogin}
              >
                Login
              </button>
              <button
                type="button"
                className="btn-filled"
                onClick={openRegister}
              >
                Register
              </button>
            </>
          )}
          <div
            className="nav-employer-container"
            onMouseEnter={() => setIsEmployerDropdownOpen(true)}
            onMouseLeave={() => setIsEmployerDropdownOpen(false)}
          >
            <div className="nav-employer">
              For employers
              <FiChevronDown aria-hidden="true" style={{ transform: isEmployerDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </div>

            {/* Employer Dropdown Menu */}
            {isEmployerDropdownOpen && (
              <div className="employer-dropdown">
                <div className="employer-dropdown-inner">
                  <Link to="/buy-online" className="employer-dropdown-item">Buy online</Link>
                  <a href="#" className="employer-dropdown-item">Naukri Talent Cloud</a>
                  <div className="employer-dropdown-divider"></div>
                  <Link to="/employer-login" className="employer-dropdown-item employer-login-item">
                    Employer Login <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
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

                <div className="search-field search-field-compact dropdown-field" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FiBriefcase className="search-field-icon" aria-hidden="true" />
                  <input 
                    type="text" 
                    placeholder="Select experience" 
                    aria-label="Experience" 
                    value={experienceValue}
                    onChange={(e) => setExperienceValue(e.target.value)}
                    onFocus={() => setIsExperienceDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsExperienceDropdownOpen(false), 200)}
                    style={{ paddingRight: '24px' }}
                  />
                  <FiChevronDown className="search-field-chevron" aria-hidden="true" style={{ position: 'absolute', right: '16px', color: 'var(--text-muted)', transition: 'transform 0.2s ease', transform: isExperienceDropdownOpen ? 'rotate(180deg)' : 'none', pointerEvents: 'none' }} />
                  
                  {isExperienceDropdownOpen && (
                    <div className="experience-dropdown-menu">
                      {experienceOptions.map(opt => (
                        <div 
                          key={opt} 
                          className="experience-dropdown-item"
                          onClick={() => {
                            setExperienceValue(opt);
                            setIsExperienceDropdownOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="search-field">
                  <FiMapPin className="search-field-icon" aria-hidden="true" />
                  <input type="text" placeholder="Enter location" aria-label="Location" />
                </div>

                <button type="button" className="search-btn">
                  <FiSearch aria-hidden="true" />
                  Search Jobs
                </button>
              </div>

              <div className="hero-tags" data-hero-intro>
                {trendingTags.map((tag) => (
                  <button className="hero-tag-badge" key={tag.label} type="button">
                    <span className="hero-tag-icon" style={{ backgroundColor: tag.color }}>
                      <tag.icon aria-hidden="true" />
                    </span>
                    <span className="hero-tag-text">{tag.label}</span>
                    <FiChevronRight className="hero-tag-arrow" aria-hidden="true" />
                  </button>
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

          <div className="companies-carousel-wrapper">
            <button 
              className={`carousel-nav-btn carousel-nav-prev${companyPage === 0 ? ' disabled' : ''}`}
              onClick={() => setCompanyPage(p => Math.max(0, p - 1))}
              aria-label="Previous companies"
              disabled={companyPage === 0}
            >
              <FiChevronRight style={{ transform: 'rotate(180deg)' }} />
            </button>

            <div className="cards-scroll-viewport">
              <div 
                className="cards-scroll"
                style={{ transform: `translateX(-${companyPage * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
              >
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
            </div>

            <button 
              className={`carousel-nav-btn carousel-nav-next${companyPage >= maxCompanyPage ? ' disabled' : ''}`}
              onClick={() => setCompanyPage(p => Math.min(maxCompanyPage, p + 1))}
              aria-label="Next companies"
              disabled={companyPage >= maxCompanyPage}
            >
              <FiChevronRight />
            </button>
          </div>

          <button type="button" className="view-all-btn">
            View All Companies
          </button>
        </section>

        <section className="discover-roles-section" data-section>
          <div className="discover-roles-container" data-card>
            {/* Left side */}
            <div className="discover-left">
              <div className="discover-illustration">
                <div className="illustration-backdrop"></div>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="magnifier-svg">
                  <circle cx="10" cy="10" r="7" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />
                  <line x1="21" y1="21" x2="15" y2="15" stroke="#1e293b" strokeWidth="2" />
                  <path d="M10 7a3 3 0 0 0-3 3" stroke="#ea580c" strokeWidth="2" />
                </svg>
                <div className="floating-badge">
                  <FiBriefcase />
                </div>
              </div>
              <h2>Discover jobs across<br />popular roles</h2>
              <p>Select a role and we'll show you relevant jobs for it!</p>
            </div>

            {/* Right side card */}
            <div className="discover-right-card">
              <div className="discover-nav-controls">
                <button 
                  className={`discover-nav-btn prev ${discoverRolePage === 0 ? 'disabled' : ''}`}
                  onClick={() => setDiscoverRolePage(0)}
                  aria-label="Previous page"
                  disabled={discoverRolePage === 0}
                >
                  <FiChevronRight style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button 
                  className={`discover-nav-btn next ${discoverRolePage === 1 ? 'disabled' : ''}`}
                  onClick={() => setDiscoverRolePage(1)}
                  aria-label="Next page"
                  disabled={discoverRolePage === 1}
                >
                  <FiChevronRight />
                </button>
              </div>

              <div className="discover-roles-grid">
                {jobRoles.slice(discoverRolePage * 6, discoverRolePage * 6 + 6).map((role) => (
                  <div className="discover-role-item" key={role.name}>
                    <div className="discover-role-info">
                      <h4>{role.name}</h4>
                      <span>{role.count} <FiChevronRight className="role-chevron" /></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="discover-pagination">
                <span className={`dot ${discoverRolePage === 0 ? 'long active' : ''}`} onClick={() => setDiscoverRolePage(0)}></span>
                <span className={`dot ${discoverRolePage === 1 ? 'long active' : ''}`} onClick={() => setDiscoverRolePage(1)}></span>
              </div>
            </div>
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
                  style={{ backgroundImage: `url(${eventItem.image})` }}
                >
                  <div className="event-card-overlay" />
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
              <img src={qrImage} alt="Scan to download" className="qr-image" />
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
