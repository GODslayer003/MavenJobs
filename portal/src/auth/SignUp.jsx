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
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
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
              
              <h3>Join our community of professionals</h3>
              
              <ul className="register-benefits-list">
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Build a standout profile for top recruiters</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Get personalized job alerts daily</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Accelerate your career growth with Maven</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className="register-right">
            <div className="register-header-top">
              <h2>Create Profile</h2>
              <div className="register-login-link">
                Joined already? <button 
                  type="button" 
                  className="link-button" 
                  onClick={() => {
                    onClose();
                    if (openLogin) openLogin();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#143f86',
                    fontWeight: '700',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                >
                  Login here
                </button>
              </div>
            </div>
            <p className="register-sub">India's leading platform for career opportunities</p>
            
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
              <div className="auth-form-group">
                <label>FULL NAME <span className="required-dot"></span></label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" aria-hidden="true" />
                  <input type="text" placeholder="What is your name?" className="register-input" />
                </div>
              </div>
              
              <div className="auth-form-group">
                <label>EMAIL ID <span className="required-dot"></span></label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" aria-hidden="true" />
                  <input type="email" placeholder="Tell us your Email ID" className="register-input" />
                </div>
                <span className="input-hint">We'll send relevant jobs and updates to this email</span>
              </div>
              
              <div className="auth-form-group">
                <label>PASSWORD <span className="required-dot"></span></label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" aria-hidden="true" />
                  <input type="password" placeholder="(Minimum 6 characters)" className="register-input" />
                </div>
                <span className="input-hint">Use a strong password to protect your account</span>
              </div>
              
              <div className="auth-form-group">
                <label>MOBILE NUMBER <span className="required-dot"></span></label>
                <div className="input-wrapper mobile-wrapper">
                  <span className="mobile-prefix">+91</span>
                  <input type="tel" placeholder="Enter your mobile number" className="register-input mobile-input" />
                </div>
                <span className="input-hint">Recruiters will contact you on this number</span>
              </div>
              
              <div className="auth-form-group">
                <label>WORK STATUS <span className="required-dot"></span></label>
                <div className="work-status-cards">
                  <div 
                    className={`work-status-card ${workStatus === 'experienced' ? 'active' : ''}`}
                    onClick={() => setWorkStatus('experienced')}
                  >
                    <div className="ws-card-content">
                      <div className="ws-card-title">Experienced</div>
                      <div className="ws-card-desc">I have work experience</div>
                    </div>
                    <FiBriefcase className="ws-card-icon" aria-hidden="true" />
                    {workStatus === 'experienced' && <div className="ws-card-check"><FiCheck aria-hidden="true" /></div>}
                  </div>
                  
                  <div 
                    className={`work-status-card ${workStatus === 'fresher' ? 'active' : ''}`}
                    onClick={() => setWorkStatus('fresher')}
                  >
                    <div className="ws-card-content">
                      <div className="ws-card-title">Fresher</div>
                      <div className="ws-card-desc">I am a student/grad</div>
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
                  <span className="checkbox-text">Send me important updates via SMS, Email, and <span className="whatsapp-text"><FaWhatsapp /> WhatsApp</span></span>
                </label>
              </div>
              
              <div className="register-terms">
                By registering, you agree to our <a href="#" style={{color: '#143f86'}}>Terms</a> & <a href="#" style={{color: '#143f86'}}>Privacy Policy</a>
              </div>
              
              <div className="register-actions-row">
                <button type="submit" className="btn-register-submit">
                  Register Now
                </button>
                
                <div className="auth-separator">
                  <span>Or</span>
                </div>
                
                <button type="button" className="btn-google">
                  <FcGoogle className="google-icon" aria-hidden="true" />
                  Sign up with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
