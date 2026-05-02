import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiUsers,
  FiZap,
  FiSearch,
  FiAward,
  FiMessageSquare,
  FiCheckCircle,
  FiTrendingUp,
  FiBriefcase,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import './EmployerLandingPage.css';

const EmployerLandingPage = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [hiringFor, setHiringFor] = useState('company');
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Select range');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const offerings = [
    {
      title: "Job Posting",
      desc: "Receive applications and quickly connect with high-quality, relevant candidates.",
      icon: <FiBriefcase />,
      link: "View plans"
    },
    {
      title: "Resume Database (Resdex)",
      desc: "Access & attract from a pool of 10 crore+ jobseekers - all in real-time!",
      icon: <FiSearch />,
      link: "View plans"
    },
    {
      title: "Expert Assist",
      desc: "Leave sourcing & shortlisting to our hiring experts, you focus on interviewing.",
      icon: <FiUsers />,
      link: "View plans"
    },
    {
      title: "Employer Branding",
      desc: "Stand out as a top workplace and attract passive talent through custom campaigns.",
      icon: <FiAward />,
      link: "View plans"
    },
    {
      title: "Hiring Automation",
      desc: "Streamline your recruitment workflow with our AI-powered ATS and screening tools.",
      icon: <FiZap />,
      link: "View plans"
    },
    {
      title: "Talent Planning",
      desc: "Get insights into market trends and salary benchmarks to plan your hiring better.",
      icon: <FiTrendingUp />,
      link: "View plans"
    }
  ];

  return (
    <div className="employer-app">
      {/* Header */}
      <nav className={`employer-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="employer-logo">
          <img src={mavenLogo} alt="MavenJobs" style={{ height: '40px' }} />
        </Link>

        <div className="employer-nav-links">
          <a href="#" className="employer-nav-link">Our offerings</a>
          <a href="#" className="employer-nav-link">Naukri Talent Cloud</a>
          <a href="#" className="employer-nav-link">Resources</a>
        </div>

        <div className="employer-nav-actions">
          <Link to="/buy-online" className="btn-employer-outline" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>Buy online</Link>
          <button className="btn-employer-filled">Post a job</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="employer-hero">
        <div className="employer-spline-bg">
          <iframe 
            src="https://my.spline.design/robotfollowcursorforlandingpage-hS0YvCWqGXh7qtQLoI7hRBJR/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            title="Spline Background"
          ></iframe>
          <div className="employer-spline-overlay" />
        </div>
        
        <div className="employer-hero-container">
          <div className="employer-hero-content">
            <span className="section-tag" style={{ textAlign: 'left', color: '#60a5fa', marginBottom: '24px' }}>Talent Decoded</span>
            <h1 style={{ textShadow: '0 10px 30px rgba(0,0,0,0.3)', marginBottom: '16px' }}>
              Decode India’s largest <br />
              talent pool with the <br />
              power of <span>AI</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: '1.6', marginBottom: '40px' }}>
              Accelerate your success with data-driven precision. Scale your workforce with
              unparalleled intelligence and seamless recruitment workflows.
            </p>

            <div className="employer-hero-stats">
              <div className="hero-stat-item">
                <FiUsers className="hero-stat-icon" style={{ color: '#60a5fa' }} />
                <span><strong style={{ color: '#fff' }}>10 crore+ registered</strong> jobseekers for all your talent needs</span>
              </div>
              <div className="hero-stat-item">
                <FiZap className="hero-stat-icon" style={{ color: '#34d399' }} />
                <span><strong style={{ color: '#fff' }}>Most advanced</strong> recruitment AI for precision hiring</span>
              </div>
            </div>

            <button className="btn-employer-filled" style={{ marginTop: '32px', padding: '18px 48px', fontSize: '1.15rem' }}>
              Explore our products
            </button>
          </div>

          {/* Callback Form Card */}
          <div className="callback-card">
            <div className="callback-tabs">
              <button
                className={`callback-tab ${activeTab === 'sales' ? 'active' : ''}`}
                onClick={() => setActiveTab('sales')}
              >
                Sales enquiry
              </button>
              <button
                className={`callback-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Register/Log In
              </button>
            </div>

            <form className="callback-form">
              <div className="form-group">
                <label>Full name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Mobile number</label>
                <input type="tel" placeholder="Enter mobile number" />
              </div>
              <div className="form-group">
                <label>Work email</label>
                <input type="email" placeholder="Enter your work email" />
              </div>

              <div className="form-group">
                <label>Hiring for</label>
                <div className="hiring-options">
                  <div
                    className={`hiring-option ${hiringFor === 'company' ? 'active' : ''}`}
                    onClick={() => {
                      setHiringFor('company');
                      setIsModalOpen(true);
                    }}
                  >
                    Your company
                  </div>
                  <div
                    className={`hiring-option ${hiringFor === 'consultancy' ? 'active' : ''}`}
                    onClick={() => {
                      setHiringFor('consultancy');
                      setIsModalOpen(true);
                    }}
                  >
                    Your consultancy
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-callback">
                Request callback
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Partners */}
      <div className="partners-strip">
        <div className="partners-container">
          <span className="partner-logo">TCS</span>
          <span className="partner-logo">FLIPKART</span>
          <span className="partner-logo">AMAZON</span>
          <span className="partner-logo">MICROSOFT</span>
          <span className="partner-logo">GOOGLE</span>
          <span className="partner-logo">BYJUS</span>
        </div>
      </div>

      {/* What we offer */}
      <section className="employer-section">
        <span className="section-tag">Our Solutions</span>
        <h2>What MavenJobs offers</h2>
        <p className="subtitle">We handle everything—from planning and branding to sourcing, so you can focus on hiring the best talent.</p>

        <div className="offerings-grid">
          {offerings.map((item, index) => (
            <div className="offering-card" key={index}>
              <div className="offering-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href="#" className="offering-link">
                {item.link} <FiArrowRight />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Hiring Section */}
      <section className="employer-section" style={{ background: '#f8fafc', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span className="section-tag">Business Focus</span>
          <h2>Hiring made simple for every business</h2>
          <p className="subtitle">Big or small, we've got you covered every step of the way.</p>

          <div className="offerings-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="offering-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaBuilding style={{ fontSize: '4rem', color: '#cbd5e1' }} />
              </div>
              <div style={{ padding: '30px' }}>
                <h3>Large companies & enterprises</h3>
                <ul style={{ listStyle: 'none', padding: '0', color: 'var(--employer-muted)', lineHeight: '2' }}>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Fill any role, from bulk hiring to leadership</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Get AI-powered candidate insights</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Boost brand visibility with custom solutions</li>
                </ul>
                <button className="btn-employer-outline" style={{ width: '100%', marginTop: '20px' }}>Request callback</button>
              </div>
            </div>

            <div className="offering-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiZap style={{ fontSize: '4rem', color: '#cbd5e1' }} />
              </div>
              <div style={{ padding: '30px' }}>
                <h3>Small & medium businesses</h3>
                <ul style={{ listStyle: 'none', padding: '0', color: 'var(--employer-muted)', lineHeight: '2' }}>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Find local candidates across India</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Hire candidates with relevant experience</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Start hiring with low-cost plans</li>
                </ul>
                <button className="btn-employer-outline" style={{ width: '100%', marginTop: '20px' }}>Request callback</button>
              </div>
            </div>

            <div className="offering-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiMessageSquare style={{ fontSize: '4rem', color: '#cbd5e1' }} />
              </div>
              <div style={{ padding: '30px' }}>
                <h3>Consultants & agencies</h3>
                <ul style={{ listStyle: 'none', padding: '0', color: 'var(--employer-muted)', lineHeight: '2' }}>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Speed up your hiring with faster turnaround</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Track your team performance with data</li>
                  <li><FiCheckCircle style={{ color: '#10b981', marginRight: '8px' }} /> Instantly connect with candidates</li>
                </ul>
                <button className="btn-employer-outline" style={{ width: '100%', marginTop: '20px' }}>Request callback</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer style={{ background: '#020617', color: 'rgba(255,255,255,0.6)', padding: '60px 5%', textAlign: 'center' }}>
        <img src={mavenLogo} alt="MavenJobs" style={{ height: '30px', filter: 'brightness(0) invert(1)', marginBottom: '20px' }} />
        <p>&copy; 2026 MavenJobs. All rights reserved.</p>
      </footer>
      {/* Callback Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <FiX />
            </button>

            <div className="modal-header">
              <h2>Request a Callback</h2>
              <p>Fill in the details below and our team will get back to you shortly.</p>
            </div>

            <form className="modal-form">
              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Mobile number</label>
                  <input type="tel" placeholder="Enter mobile number" />
                </div>
                <div className="form-group">
                  <label>Work email</label>
                  <input type="email" placeholder="Enter your work email" />
                </div>
              </div>

              <div className="form-group">
                <label>Hiring for</label>
                <div className="hiring-options modal-hiring">
                  <div
                    className={`hiring-option ${hiringFor === 'company' ? 'active' : ''}`}
                    onClick={() => setHiringFor('company')}
                  >
                    Your company
                  </div>
                  <div
                    className={`hiring-option ${hiringFor === 'consultancy' ? 'active' : ''}`}
                    onClick={() => setHiringFor('consultancy')}
                  >
                    Your consultancy
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Designation name</label>
                <input type="text" placeholder="e.g. Talent Acquisition Manager" />
              </div>

              <div className="form-group">
                <label>Company name</label>
                <input type="text" placeholder="Enter your company name" />
              </div>

              <div className="form-group dropdown-container">
                <label>Select range</label>
                <div className="custom-dropdown" onClick={() => setRangeOpen(!rangeOpen)}>
                  <span>{selectedRange}</span>
                  <FiChevronDown style={{ transform: rangeOpen ? 'rotate(180deg)' : 'none' }} />

                  {rangeOpen && (
                    <div className="dropdown-menu">
                      {['1-14', '15-49', '50-100', '101-200', '201-500', '501 and above'].map(range => (
                        <div
                          key={range}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRange(range);
                            setRangeOpen(false);
                          }}
                        >
                          {range}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="Enter your city" className="error-border" />
                <span className="error-msg">Enter a valid city. Allowed characters are alphabets, numbers, space, @ - () & , . / [] _ ' " !*</span>
              </div>

              <div className="recaptcha-placeholder">
                <div className="recaptcha-box">
                  <div className="recaptcha-check"></div>
                  <span>I'm not a robot</span>
                  <div className="recaptcha-logo">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="" />
                    <span>reCAPTCHA</span>
                    <small>Privacy - Terms</small>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-callback modal-submit">
                Request callback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerLandingPage;
