import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiMapPin, FiBriefcase, FiClock, FiBookmark, FiArrowRight,
  FiShare2, FiMoreVertical, FiCheckCircle, FiXCircle, FiPlus,
  FiChevronRight, FiBookOpen, FiActivity, FiCoffee, FiTruck, FiAward
} from "react-icons/fi";
import { FaRupeeSign, FaStar, FaFacebookF, FaLinkedinIn, FaDumbbell } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../AuthContext";
import { JOBS, EXTENDED_JOBS } from "../data/jobs";
import mavenLogo from "../../assets/maven-logo-BdiSsfJk.svg";
import "./JobDetailsPage.css";

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openLogin, logout } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find job in shared data
    const allJobs = [...JOBS, ...EXTENDED_JOBS];
    const foundJob = allJobs.find(j => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <div className="jdp-root flex items-center justify-center">
        <div className="text-center p-20">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <Link to="/jobs" className="text-blue-600 font-semibold hover:underline">Back to Job Search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="jdp-root">
      {/* ── Sticky Header ── */}
      <header className="jdp-header">
        <div className="jdp-header-inner">
          <Link to="/">
            <img src={mavenLogo} alt="Maven Jobs" className="jdp-logo" />
          </Link>
          <div className="jdp-nav-links">
            <Link to="/jobs" className="jdp-nav-link active">Jobs</Link>
            <Link to="#" className="jdp-nav-link">Companies</Link>
            <Link to="#" className="jdp-nav-link">Services</Link>
          </div>
          <div className="jdp-search-mock border border-gray-200 rounded-full px-6 py-2 flex items-center gap-4 bg-gray-50 w-96">
            <input type="text" placeholder="Search jobs here..." className="bg-transparent border-none outline-none text-sm w-full" />
            <FiArrowRight className="text-blue-600" />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
                <button 
                  className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50" onClick={openLogin}>Login</button>
                <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-md">Register</button>
              </div>
            )}
            <div className="relative ml-2">
              <FiBookmark size={20} className="text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="jdp-container">
        {/* ── Left Column ── */}
        <main className="jdp-main">
          
          {/* 1. Job Header Card */}
          <section className="jdp-card jdp-job-header-card">
            <div className="jdp-job-header">
              <div>
                <h1 className="jdp-job-title">{job.title}</h1>
                <div className="jdp-company-row">
                  <span className="jdp-company-name">{job.company}</span>
                  <div className="jdp-rating">
                    <FaStar size={10} /> {job.rating}
                  </div>
                  <span className="jdp-reviews">{job.reviews} Reviews</span>
                </div>
                <div className="jdp-job-meta">
                  <div className="jdp-meta-item">
                    <FiBriefcase className="jdp-meta-icon" /> {job.exp}
                  </div>
                  <div className="jdp-meta-item">
                    <FaRupeeSign className="jdp-meta-icon" size={12} /> {job.salary}
                  </div>
                  <div className="jdp-meta-item">
                    <FiMapPin className="jdp-meta-icon" /> {job.location}
                  </div>
                </div>
              </div>
              <div className="jdp-company-logo-large w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-blue-900 border border-gray-200">
                {job.logo}
              </div>
            </div>

            <div className="jdp-job-footer">
              <div className="jdp-posted-info">
                Posted: <span className="font-semibold">{job.posted}</span> | Openings: <span className="font-semibold">200</span> | Applicants: <span className="font-semibold">100+</span>
              </div>
              <div className="jdp-actions">
                <button className="jdp-save-btn">Save</button>
                {user ? (
                  <button className="jdp-apply-btn">Apply</button>
                ) : (
                  <button className="jdp-apply-btn" onClick={openLogin}>Log In to apply</button>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <input type="checkbox" checked readOnly className="rounded" />
              <span>Follow {job.company} as you apply to stay updated</span>
            </div>
          </section>

          {/* 2. Job Highlights */}
          <section className="jdp-card">
            <h2 className="jdp-section-title">Job highlights</h2>
            <ul className="jdp-highlights-list">
              {job.jobHighlights ? job.jobHighlights.map((h, i) => (
                <li key={i}>{h}</li>
              )) : (
                <>
                  <li>Full-time position with competitive benefits.</li>
                  <li>Collaborate with cross-functional teams to deliver high-quality features.</li>
                </>
              )}
            </ul>

            <div className="jdp-match-score">
              <h3 className="text-sm font-bold mb-4">Job match score</h3>
              <div className="jdp-match-items">
                <div className="jdp-match-item error"><FiXCircle /> Early Applicant</div>
                <div className="jdp-match-item error"><FiXCircle /> Keyskills</div>
                <div className="jdp-match-item success"><FiCheckCircle /> Location</div>
                <div className="jdp-match-item success"><FiCheckCircle /> Work Experience</div>
              </div>
            </div>
          </section>

          {/* 3. Job Description */}
          <section className="jdp-card jdp-description">
            <h2 className="jdp-section-title">Job description</h2>
            
            <h4>About the Role</h4>
            <p>{job.jobDescription?.aboutRole || "We are looking for a skilled professional to join our growing team. You will be responsible for building and maintaining critical business infrastructure."}</p>

            <h4>Key Responsibilities</h4>
            <ul>
              {(job.jobDescription?.responsibilities || [
                "Develop and maintain high-quality software features",
                "Participate in daily stand-ups and sprint planning",
                "Ensure code quality through testing and reviews"
              ]).map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <h4>Required Skills</h4>
            <div>
              {job.jobDescription?.requiredSkills ? (
                Object.entries(job.jobDescription.requiredSkills).map(([cat, skills]) => (
                  <div key={cat} className="mb-4">
                    <p className="font-bold text-xs uppercase text-gray-500 mb-1">{cat.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm">{skills.join(", ")}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm">Skills required for this role include expertise in relevant technologies and strong communication skills.</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div><span className="text-gray-500">Role:</span> {job.title}</div>
                <div><span className="text-gray-500">Industry Type:</span> {job.type || "IT Services"}</div>
                <div><span className="text-gray-500">Department:</span> {job.dept || "Engineering"}</div>
                <div><span className="text-gray-500">Employment Type:</span> {job.mode || "Full Time"}</div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <FaFacebookF className="text-gray-400 cursor-pointer hover:text-blue-600" />
              <FaXTwitter className="text-gray-400 cursor-pointer hover:text-black" />
              <FaLinkedinIn className="text-gray-400 cursor-pointer hover:text-blue-700" />
              <div className="flex-1 text-right text-blue-600 text-sm font-semibold cursor-pointer">Report this job</div>
            </div>
          </section>

          {/* 4. About Company */}
          <section className="jdp-card">
            <h2 className="jdp-section-title">About company</h2>
            <p className="text-sm leading-relaxed mb-4">
              {job.companyInfo?.about || `${job.company} is a leading provider of innovative solutions in the ${job.dept} sector. We pride ourselves on our inclusive culture and commitment to excellence.`}
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-1">Company Info</h4>
              <p className="text-sm text-gray-600">{job.companyInfo?.address || "Mumbai, Maharashtra, India"}</p>
            </div>
          </section>

          {/* 5. Beware Notice */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h4 className="font-bold text-sm mb-2">Beware of imposters!</h4>
            <p className="text-xs text-gray-500">MavenJobs.com does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee... <span className="text-blue-600 font-bold cursor-pointer">Read more</span></p>
          </div>

          {/* 6. Similar Jobs */}
          <section className="jdp-similar-jobs">
            <h2 className="jdp-section-title">Similar jobs</h2>
            <div className="jdp-similar-grid">
              {JOBS.filter(j => j.id !== job.id).slice(0, 4).map(sj => (
                <div key={sj.id} className="jdp-card flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/job/${sj.id}`)}>
                  <div className="flex gap-4">
                    <div className="jdp-mini-logo">{sj.logo}</div>
                    <div>
                      <h4 className="font-bold text-sm">{sj.title}</h4>
                      <p className="text-xs text-gray-500">{sj.company} • {sj.rating} <FaStar size={8} className="inline" /></p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><FiMapPin size={10} /> {sj.location}</span>
                        <span className="flex items-center gap-1"><FiClock size={10} /> {sj.posted}</span>
                      </div>
                    </div>
                  </div>
                  <FiChevronRight className="text-gray-300" />
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ── Right Column Sidebar ── */}
        <aside className="jdp-sidebar">
          
          <div className="jdp-sidebar-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="jdp-sidebar-title">Jobs you might be interested in</h3>
            </div>
            {JOBS.slice(0, 3).map(j => (
              <div key={j.id} className="jdp-mini-job">
                <div className="jdp-mini-logo">{j.logo}</div>
                <div className="jdp-mini-content">
                  <h5>{j.title}</h5>
                  <p>{j.company}</p>
                  <div className="jdp-mini-meta">
                    <span className="flex items-center gap-1"><FaStar size={10} /> {j.rating}</span>
                    <span>|</span>
                    <span>{j.reviews} reviews</span>
                  </div>
                  <p className="mt-2 text-xs"><FiMapPin className="inline mr-1" /> {j.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="jdp-sidebar-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="jdp-sidebar-title">Reviews</h3>
              <span className="text-blue-600 text-sm font-bold cursor-pointer">View all</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <span className="font-bold">3.0</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">rated by SDE-2 in Bengaluru</p>
              <div className="mb-4">
                <h5 className="text-xs font-bold uppercase text-gray-400 mb-1">Likes</h5>
                <p className="text-xs italic">"Better than other service based companies. As this is a service based company, your experience depend..."</p>
              </div>
              <div className="mb-4">
                <h5 className="text-xs font-bold uppercase text-gray-400 mb-1">Dislikes</h5>
                <p className="text-xs italic">"Networking is very important in the company. If you are not having good relations with the senior..."</p>
              </div>
              <span className="text-blue-600 text-xs font-bold cursor-pointer">Read full review</span>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold">Follow {job.company} to receive alerts</p>
                <button className="flex items-center gap-1 bg-white text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  <FiPlus /> Follow
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-right">1343.3k followers</p>
            </div>
          </div >

          <div className="jdp-sidebar-card">
            <h3 className="jdp-sidebar-title">Salary insights</h3>
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <p className="text-xs text-gray-600 mb-2">{job.title} in {job.company} typically earns between</p>
              <h4 className="text-xl font-bold text-gray-900 mb-4">₹11.3 - ₹15.9 L/yr</h4>
              <span className="text-blue-600 text-xs font-bold cursor-pointer flex items-center gap-1">See detailed salary breakup <FiArrowRight /></span>
            </div>
          </div >

          <div className="jdp-sidebar-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="jdp-sidebar-title">Benefits & Perks</h3>
              <span className="text-blue-600 text-sm font-bold cursor-pointer">View all</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Job/Soft skill training", icon: <FiBookOpen className="text-blue-500" /> },
                { label: "Health insurance", icon: <FiActivity className="text-red-500" /> },
                { label: "Cafeteria", icon: <FiCoffee className="text-orange-500" /> },
                { label: "Office gym", icon: <FaDumbbell className="text-gray-700" /> },
                { label: "Office cab/shuttle", icon: <FiTruck className="text-green-500" /> },
                { label: "Professional degree assist", icon: <FiAward className="text-purple-500" /> }
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-lg">{b.icon}</div>
                  <span className="text-[10px] text-gray-500 leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>

      <div className="jdp-footer-links">
        <a href="#">About Us</a> | <a href="#">Help Center</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
        <p className="mt-4">© 2026 MavenJobs. All rights reserved.</p>
      </div>

    </div>
  );
}
