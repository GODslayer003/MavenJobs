import React, { useState } from 'react';
import { 
  FiMapPin, FiBriefcase, FiUsers, FiStar, FiGlobe, FiCalendar, 
  FiArrowLeft, FiHeart, FiShare2, FiExternalLink, FiSearch, 
  FiChevronRight, FiClock, FiPlus, FiCheckCircle, FiInfo, FiSend,
  FiBookmark, FiArrowRight, FiBell, FiLogOut, FiBookOpen, FiActivity, FiTruck, FiX
} from 'react-icons/fi';
import { FaRupeeSign, FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import mavenLogo from '../../assets/maven-logo-BdiSsfJk.svg';

const Jobprofile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock Company Data
  const company = {
    name: 'Hosmac',
    fullName: 'Hosmac India Private Limited',
    logo: 'H',
    bg: '#002366', // Royal Blue
    accent: '#10b981', // Light Green
    industry: 'Medical Services / Hospital',
    type: 'Private',
    size: '51-200',
    founded: '1996',
    website: 'https://www.hosmac.com/',
    location: 'Mumbai Suburban',
    followers: '600',
    rating: 3.4,
    reviews: '39',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    tags: ['Private', 'Corporate', 'B2C', 'B2B'],
    about: 'Hosmac India Private Limited is a pioneering name in the field of Hospital Planning & Management consultancy in India. Since its inception in 1996, Hosmac has grown rapidly to become a Unique hub of skill sets which cuts across various facets of a health care facility be it architecture, engineering, management, or information technology.',
    departments: [
      { name: 'UX, Design & Architecture', openings: 6 },
      { name: 'Construction & Site Engineering', openings: 4 },
      { name: 'Business Development', openings: 2 }
    ],
    benefits: [
      { name: 'JOB/SOFT SKILL TRAINING', count: 3, icon: <FiBookOpen size={28} className="text-indigo-500" /> },
      { name: 'HEALTH INSURANCE', count: 2, icon: <FiActivity size={28} className="text-rose-500" /> },
      { name: 'OFFICE CAB/SHUTTLE', count: 2, icon: <FiTruck size={28} className="text-purple-500" /> }
    ],
    jobs: [
      { id: 101, title: 'Architect', exp: '0-6 Yrs', loc: 'Mumbai Suburban', posted: '8 Days Ago', salary: 'Not disclosed', desc: 'Working on hospital architectural plans, Revit modeling, and site coordination.', tags: ['REVIT', 'Sketchup', 'Rhino', 'Lumion', 'AutoCAD'] },
      { id: 102, title: 'Sr. MEP Manager / MEP Head', exp: '15-20 Yrs', loc: 'Mumbai Suburban (Goregaon)', posted: '9 Days Ago', salary: '15-25 Lakhs', desc: 'Leading MEP engineering teams for large scale healthcare projects.', tags: ['Plumbing', 'HVAC', 'REVIT', 'Electrical Design'] },
      { id: 103, title: 'Interior Designer / Sr. Interior Designer', exp: '5-10 Yrs', loc: 'Mumbai Suburban', posted: '21 Days Ago', salary: '8-12 Lakhs', desc: 'Focusing on clinical interior aesthetics and functional healthcare spaces.', tags: ['Rhino', 'AutoCAD 2D', 'Grasshopper', 'MS Office'] }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] font-sans text-slate-900 pb-20">
      
      {/* ─── Navbar ─── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src={mavenLogo} alt="MavenJobs" className="h-8" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/jobs" className="text-sm font-bold text-slate-600 hover:text-[#002366]">Jobs</Link>
              <Link to="/companies" className="text-sm font-bold text-[#002366]">Companies</Link>
              <Link to="/services" className="text-sm font-bold text-slate-600 hover:text-[#002366]">Services</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
              <FiBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <Link to="/profile" className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#002366]">
                  <img src={user.profilePic || "https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg"} alt="User" className="w-full h-full object-cover" />
                </Link>
                <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <FiLogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── LinkedIn Style Header ─── */}
      <div className="max-w-6xl mx-auto mt-4">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full relative overflow-hidden bg-slate-100">
            <img src={company.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all">
              <FiArrowLeft size={20} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="px-8 pb-8 relative">
            {/* Logo (Overlapping) */}
            <div className="absolute -top-16 left-8 w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white p-2 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
               <div 
                className="w-full h-full rounded-xl flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-inner"
                style={{ background: company.bg }}
              >
                {company.logo}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-end gap-3 pt-6 mb-8">
              <button className="px-8 py-2.5 bg-[#002366] text-white rounded-full font-black shadow-lg shadow-blue-900/10 hover:bg-blue-900 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <FiPlus size={20} /> Follow
              </button>
              <a href={company.website} target="_blank" rel="noreferrer" className="px-8 py-2.5 border-2 border-[#002366] text-[#002366] rounded-full font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                Visit website <FiExternalLink size={16} />
              </a>
              <button className="p-2.5 border border-slate-200 text-slate-400 rounded-full hover:bg-slate-50 transition-all">
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Company Basic Info */}
            <div className="mt-4 md:mt-0">
              <h1 className="text-3xl font-black text-[#002366] mb-2">{company.name}</h1>
              <p className="text-lg font-bold text-slate-600 mb-4">{company.industry} · {company.location}</p>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
                <span className="flex items-center gap-1.5"><FiUsers className="text-slate-300" /> {company.size} employees</span>
                <span className="flex items-center gap-1.5 text-[#002366]"><FiCheckCircle /> {company.followers} followers</span>
              </div>
            </div>

            {/* LinkedIn Style Navigation Tabs */}
            <div className="flex items-center gap-8 border-t border-slate-100 pt-4">
              {['Overview', 'About', 'Jobs'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 text-sm font-black transition-all relative ${
                    activeTab === tab 
                    ? 'text-[#002366]' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#002366] rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Layout ─── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* Main Content Area (Left) */}
          <div className="space-y-6">
            
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* About Section (Card style same as profile) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-lg font-black text-[#002366] mb-4 flex items-center gap-2">
                    <FiInfo className="text-blue-500" /> About {company.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {company.about}
                  </p>
                </div>

                {/* Benefits (Simplified UI) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-lg font-black text-[#002366] mb-6">Company Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {company.benefits.map(ben => (
                      <div key={ben.name} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all group">
                        <div className="p-4 bg-white rounded-xl shadow-sm mb-5 group-hover:scale-110 transition-transform duration-500">
                          {ben.icon}
                        </div>
                        <span className="text-[10px] font-black text-[#002366] uppercase tracking-wider mb-1 leading-tight">{ben.name}</span>
                        <span className="text-xs font-bold text-slate-400">({ben.count} reviews)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Jobs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-[#002366]">Active Openings</h3>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-[#002366] transition-all">
                       Filter <FiChevronRight className="inline rotate-90" />
                     </button>
                  </div>
                </div>

                {/* ─── JOB CARDS (MATCHING JOBLISTINGPAGE.JSX) ─── */}
                {company.jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all relative group">
                    <div className="flex gap-4 mb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-[#002366] font-black text-lg border border-slate-200 shadow-inner">
                        {company.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-black text-[#002366] group-hover:text-blue-600 transition-colors leading-tight mb-1">{job.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                          {company.name} 
                          <div className="flex items-center gap-0.5 bg-green-50 text-[#10b981] px-1.5 py-0.5 rounded text-[10px] font-black border border-green-100">
                            {company.rating} ★
                          </div>
                          <span className="text-slate-300 font-normal">({company.reviews} Reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <FiBriefcase className="text-slate-400" /> <span>{job.exp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <FaRupeeSign className="text-slate-400" size={12} /> <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <FiMapPin className="text-slate-400" /> <span>{job.loc}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <FiClock className="text-slate-400" /> <span>{job.posted}</span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                      {job.desc}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-50">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 rounded-lg border border-slate-100 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="p-2.5 text-slate-400 hover:text-[#002366] hover:bg-slate-50 rounded-xl transition-all">
                          <FiBookmark size={18} />
                        </button>
                        <button 
                          onClick={() => navigate(`/job/${job.id}`)}
                          className="px-6 py-2.5 bg-[#002366] text-white rounded-xl text-sm font-black hover:bg-blue-900 transition-all flex items-center gap-2 shadow-md shadow-blue-900/10"
                        >
                          Quick Apply <FiArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'About' && (
              <div className="space-y-6">
                {/* Detailed About Section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-xl font-black text-[#002366] mb-6">About {company.name}</h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed font-medium mb-4">
                      {company.about}
                    </p>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Over the decades, we have successfully managed over 500+ projects across the globe, bringing together architectural excellence and medical operational efficiency. Our team consists of seasoned professionals dedicated to transforming healthcare delivery.
                    </p>
                  </div>
                  
                  {/* Specialties Grid */}
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Healthcare Planning', 'Hospital Architecture', 'MEP Design', 'Clinical Strategy', 'Operations Management', 'Medical Equipment Planning'].map(spec => (
                        <span key={spec} className="px-4 py-2 bg-blue-50 text-[#002366] text-xs font-bold rounded-full border border-blue-100">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Company Highlights / Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                      <FiGlobe className="text-indigo-600" size={24} />
                    </div>
                    <h4 className="text-[#002366] font-black mb-2">Global Presence</h4>
                    <p className="text-slate-500 text-sm font-medium">Headquartered in Mumbai with operational footprints in Middle East and Africa.</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                      <FiCheckCircle className="text-emerald-600" size={24} />
                    </div>
                    <h4 className="text-[#002366] font-black mb-2">Quality Standards</h4>
                    <p className="text-slate-500 text-sm font-medium">ISO 9001:2015 certified consulting firm ensuring top-tier medical excellence.</p>
                  </div>
                </div>

                {/* Basic Details Section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-lg font-black text-[#002366] mb-6">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'Type', value: company.type },
                      { label: 'Founded', value: company.founded },
                      { label: 'Employees', value: company.size },
                      { label: 'Industry', value: company.industry },
                      { label: 'Website', value: company.website, isLink: true }
                    ].map(info => (
                      <div key={info.label} className="border-b border-slate-50 pb-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</div>
                        {info.isLink ? (
                          <a href={info.value} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline text-xs break-all">{info.value}</a>
                        ) : (
                          <div className="font-bold text-slate-700">{info.value}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              
              {/* Stats Sidebar Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black text-[#002366] mb-6">Reviews & Rating</h3>
                
                <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-slate-100">
                  <div className="text-5xl font-black text-[#002366] mb-2">{company.rating}</div>
                  <div className="flex items-center gap-1 text-amber-400 text-xl mb-2">
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar />
                  </div>
                  <div className="text-sm font-bold text-slate-400">Based on {company.reviews} reviews</div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Skill Development', val: 82 },
                    { label: 'Work Satisfaction', val: 75 },
                    { label: 'Career Growth', val: 68 },
                    { label: 'Work Life', val: 72 }
                  ].map(r => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                        <span>{r.label}</span>
                        <span>{r.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#10b981] rounded-full"
                          style={{ width: `${r.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowReviewModal(true)}
                  className="w-full mt-8 py-3 px-4 border border-blue-100 text-[#002366] bg-blue-50/50 rounded-xl font-black text-sm hover:bg-blue-100 transition-all"
                >
                  Write a Review
                </button>
              </div>

              {/* Quick Action Sidebar Widget */}
              <div className="bg-gradient-to-br from-[#002366] to-blue-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-3">Work with {company.name}</h3>
                  <p className="text-blue-100/80 text-sm font-medium mb-6">Explore all openings and apply directly with your Maven profile.</p>
                  <button className="w-full py-4 bg-[#10b981] text-white rounded-xl font-black shadow-lg shadow-green-900/20 hover:bg-[#059669] transition-all flex items-center justify-center gap-2">
                    <FiSend size={18} /> Send Application
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ─── Write a Review Modal ─── */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#002366]/40 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-[#002366] p-8 text-white relative">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-2xl font-black mb-2">Write a Review</h2>
              <p className="text-blue-200 text-sm font-medium">Share your experience with {company.name}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="mb-8">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">
                  Overall Rating
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)}
                      className="p-1 transition-transform hover:scale-125 duration-200"
                    >
                      {(hoverRating || selectedRating) >= star ? (
                        <FaStar size={36} className="text-amber-400" />
                      ) : (
                        <FaRegStar size={36} className="text-slate-200" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-center mt-3 h-4 text-xs font-bold text-amber-500 uppercase tracking-tighter">
                  {selectedRating === 1 && "Poor"}
                  {selectedRating === 2 && "Fair"}
                  {selectedRating === 3 && "Good"}
                  {selectedRating === 4 && "Very Good"}
                  {selectedRating === 5 && "Excellent!"}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Share more details
                </label>
                <textarea
                  rows="4"
                  placeholder="What's it like working here? (Optional)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-[#002366] focus:border-transparent outline-none transition-all resize-none"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-4 text-slate-500 font-black text-sm hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={!selectedRating}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm shadow-lg transition-all ${
                    selectedRating 
                    ? 'bg-[#002366] text-white shadow-blue-900/20 hover:bg-blue-900' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                  }`}
                  onClick={() => {
                    alert('Review submitted successfully!');
                    setShowReviewModal(false);
                    setSelectedRating(0);
                    setReviewText('');
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobprofile;
