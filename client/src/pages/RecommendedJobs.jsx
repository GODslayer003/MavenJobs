import React, { useState } from 'react';
import { 
  FiBriefcase, FiMapPin, FiClock, FiBookmark, FiChevronRight, 
  FiX, FiPlus, FiEye, FiCheck, FiInfo, FiEdit2, FiShield, FiSend
} from 'react-icons/fi';

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
    logoBg: "bg-blue-50",
    logoCol: "text-blue-600"
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
    logoBg: "bg-purple-50",
    logoCol: "text-purple-600"
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
    logoBg: "bg-red-50",
    logoCol: "text-red-600"
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
    logoBg: "bg-indigo-50",
    logoCol: "text-indigo-600"
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
    logoBg: "bg-gray-100",
    logoCol: "text-red-600"
  },
  {
    id: 6,
    title: "Software Engineer",
    company: "TechNova Solutions",
    rating: 4.2,
    reviews: 156,
    exp: "1-3 Yrs",
    salary: "6-10 Lacs PA",
    location: "Bengaluru",
    desc: "We are looking for a passionate Software Engineer to join our core product team...",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    posted: "1 Day Ago",
    logoCode: "T",
    logoBg: "bg-green-50",
    logoCol: "text-green-600"
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
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        if (prev.length >= 10) {
          alert("You can select up to 10 jobs to apply at once.");
          return prev;
        }
        return [...prev, jobId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-10">
      <div className="max-w-[1240px] mx-auto px-6 py-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 hover:bg-white rounded-full transition-all text-slate-600 shadow-sm border border-slate-200 bg-slate-50/50"
                title="Back to Dashboard"
              >
                <FiX size={20} />
              </button>
            )}
            <h1 className="text-2xl font-bold text-slate-800">Recommended jobs for you</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">
              You can select upto 10 jobs to apply
            </span>
            <button 
              className={`px-8 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg flex items-center gap-2 ${
                selectedJobs.length > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105' 
                : 'bg-blue-200 text-white cursor-not-allowed'
              }`}
              disabled={selectedJobs.length === 0}
            >
              Apply {selectedJobs.length} Job{selectedJobs.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-6 py-4 text-[15px] font-semibold whitespace-nowrap transition-all relative ${
                activeTab === tab.name 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.name}
              {activeTab === tab.name && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          
          {/* Left Column: Job List */}
          <div className="space-y-4">
            {MOCK_RECOMMENDED_JOBS.map(job => (
              <div 
                key={job.id} 
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 group hover:shadow-xl ${
                  selectedJobs.includes(job.id) ? 'border-blue-500 bg-blue-50/10' : 'border-transparent hover:border-blue-100'
                }`}
              >
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="mt-1">
                    <label className="relative flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleToggleJob(job.id)}
                      />
                      <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                        {selectedJobs.includes(job.id) && <FiCheck className="text-white text-xs" />}
                      </div>
                    </label>
                  </div>

                  {/* Job Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-slate-600 font-medium flex items-center gap-2">
                          {job.company}
                          {job.rating && (
                            <span className="flex items-center text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold">
                              ★ {job.rating} <span className="mx-1 text-slate-300 font-normal">|</span> {job.reviews} Reviews
                            </span>
                          )}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${job.logoBg} ${job.logoCol}`}>
                        {job.logoCode}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 mb-4 text-[13px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <FiBriefcase className="text-slate-400" /> {job.exp}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-400">₹</span> {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiMapPin className="text-slate-400" /> {job.location}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mb-4">
                      <FiEdit2 className="text-slate-400 mt-1 flex-shrink-0" size={14} />
                      <p className="text-sm text-slate-500 line-clamp-1">{job.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-2 py-1 rounded-md bg-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">{job.posted}</span>
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                          <FiEye className="text-lg" /> Hide
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                          <FiBookmark className="text-lg" /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="py-10 text-center text-slate-400 text-sm">
              IEIL has taken all reasonable steps to ensure that information on this site is authentic. 
              <br />
              <div className="mt-2 space-x-4">
                <a href="#" className="text-blue-500 hover:underline">Security Guidelines</a>
                <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>
              </div>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="space-y-6">
            
            {/* Preferences Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Add preferences to get matching jobs</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred job role</span>
                    <FiEdit2 className="text-blue-600 cursor-pointer" size={14} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Front End Developer', 'Mern Stack Developer', 'Software Developer'].map(role => (
                      <span key={role} className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred work location</span>
                    <FiEdit2 className="text-blue-600 cursor-pointer" size={14} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Pune', 'Noida', 'New Delhi', 'Mumbai (All Areas)', 'Mumbai', 'Hyderabad/Secunderabad', 'Gurgaon/Gurugram', 'Delhi / NCR', 'Dehradun', 'Bangalore/Bengaluru'].map(loc => (
                      <span key={loc} className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred salary</span>
                    <FiEdit2 className="text-blue-600 cursor-pointer" size={14} />
                  </div>
                  <div className="text-sm font-bold text-slate-700">₹ 5,00,000</div>
                </div>
              </div>
            </div>

            {/* Webinar Widget */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group">
              <div className="p-6 pb-4">
                <h3 className="font-bold text-slate-800 mb-1">Join webinar for career growth</h3>
                <p className="text-xs text-slate-500">Powered by <span className="font-bold text-amber-600 italic">Coding Ninjas</span></p>
              </div>
              
              <div className="relative h-48 overflow-hidden mx-4 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1591115765373-520b7a0d4c8d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Webinar" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-tighter">Webinar</div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Entry closes in 9h</p>
                  <h4 className="text-sm font-bold leading-tight">Multi-Agent AI Systems: Live Workshop for 25L+ CTC at Google</h4>
                </div>
              </div>

              <div className="p-6 pt-4 space-y-4">
                <p className="text-xs font-bold text-slate-600">Coding Ninjas</p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase font-bold tracking-tighter">Interview Preparation</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase font-bold tracking-tighter">Career Guidance</span>
                </div>
                
                <div className="flex flex-col gap-2 pt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <FiClock /> 1 May, 8:30 PM
                  </div>
                  <div className="flex items-center gap-2">
                    <FiEye /> 54 Enrolled
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                    <FiSend /> Learn from experts
                  </button>
                  <button className="text-xs font-bold text-slate-400 hover:text-blue-600">View details</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fixed bottom selection bar */}
      {selectedJobs.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{selectedJobs.length} Job{selectedJobs.length > 1 ? 's' : ''} Selected</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Max 10 per application</span>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Apply Now
          </button>
          <button 
            onClick={() => setSelectedJobs([])}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
