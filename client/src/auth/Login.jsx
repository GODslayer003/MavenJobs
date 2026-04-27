import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiX,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import "./AuthModals.css";

export default function Login({ isOpen, onClose, openSignUp }) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-backdrop" onClick={onClose}></div>
      <div className="register-modal-content" style={{ maxWidth: '1000px' }}>
        <button 
          className="register-modal-close" 
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FiX aria-hidden="true" />
        </button>
        
        <div className="register-layout" style={{ gridTemplateColumns: '400px 1fr' }}>
          {/* Left Column: New User Promo */}
          <div className="register-left">
            <div className="register-logo-container">
              <img src={mavenLogo} alt="Maven Jobs" className="register-modal-logo" />
            </div>
            <div className="register-left-content">
              <h3>New to MavenJobs?</h3>
              
              <ul className="register-benefits-list">
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>One click apply using MavenJobs profile.</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Get relevant job recommendations.</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Showcase profile to top companies and consultants.</span>
                </li>
                <li>
                  <FiCheckCircle className="benefit-icon" aria-hidden="true" />
                  <span>Know application status on applied jobs.</span>
                </li>
              </ul>
              
              <button 
                type="button" 
                className="btn-outline" 
                style={{ marginTop: '36px', width: '100%' }}
                onClick={() => {
                  onClose();
                  if (openSignUp) openSignUp();
                }}
              >
                Register for Free
              </button>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className="register-right">
            <div className="register-header-top">
              <h2>Login to your account</h2>
            </div>
            <p className="register-sub">Welcome back! Please enter your details.</p>
            
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Email ID / Username</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" aria-hidden="true" />
                  <input type="text" placeholder="Enter Email ID / Username" className="register-input" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" aria-hidden="true" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
                    className="register-input" 
                  />
                  <button 
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-blue)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <a href="#" style={{ color: 'var(--brand-blue)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '500' }}>Forgot Password?</a>
                </div>
              </div>
              
              <div className="register-actions-row" style={{ flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <button type="submit" className="btn-register-submit" style={{ width: '100%' }}>
                  Login
                </button>
                
                <a href="#" style={{ color: 'var(--brand-blue)', fontSize: '0.95rem', fontWeight: '600', textDecoration: 'none' }}>
                  Use OTP to Login
                </a>
                
                <div className="auth-separator" style={{ width: '100%', margin: '10px 0' }}>
                  <span>Or</span>
                </div>
                
                <button type="button" className="btn-google" style={{ width: '100%', justifyContent: 'center' }}>
                  <FcGoogle className="google-icon" aria-hidden="true" />
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
