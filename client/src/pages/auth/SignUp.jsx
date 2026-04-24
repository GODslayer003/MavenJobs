import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiX,
  FiCheck,
  FiUserCheck,
  FiCheckCircle,
  FiBriefcase,
} from "react-icons/fi";
import { FaGraduationCap, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import mavenLogo from "../../../assets/maven-logo-BdiSsfJk.svg";
import "./AuthModals.css";

export default function SignUp({ isOpen, onClose, openLogin }) {
  const [workStatus, setWorkStatus] = useState("experienced"); // 'experienced' | 'fresher'
  const [updatesAccepted, setUpdatesAccepted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-backdrop" onClick={onClose}></div>
      <div className="register-modal-content">
        <button 
          className="register-modal-close" 
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FiX aria-hidden="true" />
        </button>
        
        <div className="register-layout">
          {/* Left Column: Visuals & Benefits */}
          <div className="register-left">
            <div className="register-logo-container">
              <img src={mavenLogo} alt="Maven Jobs" className="register-modal-logo" />
            </div>
            <div className="register-left-content">
              <div className="register-illustration">
                <div className="illustration-circle">
                  <FiUserCheck aria-hidden="true" className="illustration-icon" />
                  <div className="illustration-accent"></div>
                  <div className="illustration-accent-2"></div>
                </div>
              </div>
              
              <h3>On registering, you can</h3>
              
              <ul className="register-benefits-list">
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Build your profile and let recruiters find you</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Get job postings delivered right to your email</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Find a job and grow your career</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className="register-right">
            <div className="register-header-top">
              <h2>Create your Maven profile</h2>
              <div className="register-login-link">
                Already Registered? <button 
                  type="button" 
                  className="link-button" 
                  onClick={() => {
                    onClose();
                    if (openLogin) openLogin();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-blue)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                >
                  Login
                </button> here
              </div>
            </div>
            <p className="register-sub">Search & apply to jobs from India's No.1 Job Site</p>
            
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full name<span className="required">*</span></label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" aria-hidden="true" />
                  <input type="text" placeholder="What is your name?" className="register-input" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email ID<span className="required">*</span></label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" aria-hidden="true" />
                  <input type="email" placeholder="Tell us your Email ID" className="register-input" />
                </div>
                <span className="input-hint">We'll send relevant jobs and updates to this email</span>
              </div>
              
              <div className="form-group">
                <label>Password<span className="required">*</span></label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" aria-hidden="true" />
                  <input type="password" placeholder="(Minimum 6 characters)" className="register-input" />
                </div>
                <span className="input-hint">This helps your account stay protected</span>
              </div>
              
              <div className="form-group">
                <label>Mobile number<span className="required">*</span></label>
                <div className="input-wrapper mobile-wrapper">
                  <span className="mobile-prefix">+91</span>
                  <input type="tel" placeholder="Enter your mobile number" className="register-input mobile-input" />
                </div>
                <span className="input-hint">Recruiters will contact you on this number</span>
              </div>
              
              <div className="form-group">
                <label>Work status<span className="required">*</span></label>
                <div className="work-status-cards">
                  <div 
                    className={`work-status-card ${workStatus === 'experienced' ? 'active' : ''}`}
                    onClick={() => setWorkStatus('experienced')}
                  >
                    <div className="ws-card-content">
                      <div className="ws-card-title">I'm experienced</div>
                      <div className="ws-card-desc">I have work experience (excluding internships)</div>
                    </div>
                    <FiBriefcase className="ws-card-icon" aria-hidden="true" />
                    {workStatus === 'experienced' && <div className="ws-card-check"><FiCheck aria-hidden="true" /></div>}
                  </div>
                  
                  <div 
                    className={`work-status-card ${workStatus === 'fresher' ? 'active' : ''}`}
                    onClick={() => setWorkStatus('fresher')}
                  >
                    <div className="ws-card-content">
                      <div className="ws-card-title">I'm a fresher</div>
                      <div className="ws-card-desc">I am a student/ Haven't worked after graduation</div>
                    </div>
                    <FaGraduationCap className="ws-card-icon" aria-hidden="true" />
                    {workStatus === 'fresher' && <div className="ws-card-check"><FiCheck aria-hidden="true" /></div>}
                  </div>
                </div>
              </div>
              
              <div className="updates-checkbox">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={updatesAccepted} 
                    onChange={(e) => setUpdatesAccepted(e.target.checked)} 
                  />
                  <span className="checkmark">
                    {updatesAccepted && <FiCheck aria-hidden="true" />}
                  </span>
                  <span className="checkbox-text">Send me important updates & promotions via SMS, email, and <span className="whatsapp-text"><FaInstagram style={{color: '#25D366'}}/> WhatsApp</span></span>
                </label>
              </div>
              
              <div className="register-terms">
                By clicking Register, you agree to the <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a> of MavenJobs.com
              </div>
              
              <div className="register-actions-row">
                <button type="submit" className="btn-register-submit">
                  Register now
                </button>
                
                <div className="auth-separator">
                  <span>Or</span>
                </div>
                
                <div className="google-auth-container">
                  <span className="google-auth-label">Continue with</span>
                  <button type="button" className="btn-google">
                    <FcGoogle className="google-icon" aria-hidden="true" />
                    Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
