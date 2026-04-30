import React, { useState } from 'react';
import { 
  FiSearch, FiMapPin, FiBriefcase, FiUsers, FiClock, FiStar, 
  FiChevronRight, FiChevronLeft, FiFilter, FiCheckCircle, FiBell, FiLogOut,
  FiTrendingUp, FiSettings, FiFileText, FiArrowRight, FiX, FiAward, FiZap
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import mavenLogo from '../../assets/maven-logo-BdiSsfJk.svg';

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [sortBy, setSortBy] = useState('Most Popular');

  const initialCompanies = [
    { id: 1, name: 'Skylark Information Technolog...', rating: 3.6, reviews: 42, tags: ['Financial Services', 'Founded: 2013'], logo: 'S', color: '#2563eb', popularity: 88 },
    { id: 2, name: 'Bren', rating: 4.0, reviews: 100, tags: ['Corporate', 'Real Estate', 'Founded: 1973'], logo: 'B', color: '#6366f1', popularity: 95 },
    { id: 3, name: 'Aforeserve', rating: 3.4, reviews: 1400, tags: ['Corporate', 'IT Services & Consulting'], logo: 'A', color: '#f59e0b', popularity: 76 },
    { id: 4, name: 'Capital Numbers Infotech', rating: 4.1, reviews: 580, tags: ['Indian MNC', 'IT Services & Consulting'], logo: 'C', color: '#10b981', popularity: 92 },
    { id: 5, name: '3Di Systems', rating: 3.4, reviews: 61, tags: ['Corporate', 'Software Product', 'Founded: 1995'], logo: '3', color: '#ef4444', popularity: 65 },
    { id: 6, name: 'Experience Commerce', rating: 2.7, reviews: 49, tags: ['Advertising & Marketing', 'Founded: 2006'], logo: 'E', color: '#111827', popularity: 50 },
    { id: 7, name: 'Ovaledge', rating: 4.0, reviews: 38, tags: ['IT Services & Consulting'], logo: 'O', color: '#8b5cf6', popularity: 70 },
    { id: 8, name: 'Simplilearn', rating: 3.8, reviews: 877, tags: ['Foreign MNC', 'e-Learning / EdTech'], logo: 'S', color: '#0ea5e9', popularity: 85 },
    { id: 9, name: 'Tychon Solutions', rating: 4.0, reviews: 47, tags: ['Corporate', 'IT Services & Consulting'], logo: 'T', color: '#3b82f6', popularity: 68 },
    { id: 10, name: 'Now100', rating: 2.4, reviews: 10, tags: ['Foreign MNC', 'IT Services & Consulting'], logo: 'N', color: '#1e40af', popularity: 40 },
  ];

  const getSortedCompanies = () => {
    let sorted = [...initialCompanies];
    if (sortBy === 'Highest Rated') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Most Popular') {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'Recently Added') {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  };

  const companies = getSortedCompanies();

  const categories = [
    { name: 'MNCs', count: '2.3K+ Companies', color: 'bg-[#f0fdf4]', textColor: 'text-[#166534]' },
    { name: 'Internet', count: '247 Companies', color: 'bg-blue-50', textColor: 'text-[#1e40af]' },
    { name: 'Manufacturing', count: 'bg-slate-50', textColor: 'text-slate-700' },
    { name: 'Fortune 500', count: '164 Companies', color: 'bg-amber-50', textColor: 'text-amber-700' },
    { name: 'Product', count: '1.3K+ Companies', color: 'bg-purple-50', textColor: 'text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#002366]/10 selection:text-[#002366]">
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-10">
          <Link to="/" className="flex items-center hover:opacity-80 transition-all duration-300">
            <img src={mavenLogo} alt="MavenJobs" className="h-10 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {['Jobs', 'Companies', 'Services'].map((item) => (
              <Link
                key={item}
                to={item === 'Companies' ? '/companies' : '#'}
                className={`px-5 py-2.5 rounded-xl text-[0.95rem] font-bold transition-all duration-300 relative group ${
                  item === 'Companies' ? 'text-[#002366]' : 'text-slate-500 hover:text-[#002366]'
                }`}
              >
                {item}
                {item === 'Companies' && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#002366] rounded-full"></span>
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#002366] rounded-full transition-all group-hover:w-4"></span>
              </Link>
            ))}
          </div>

          <div className="flex-1 max-w-lg relative group hidden md:block">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#002366] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search companies, industries or roles..."
              className="w-full bg-slate-100/80 border-2 border-transparent rounded-2xl py-3 pl-14 pr-6 text-[0.9rem] font-medium focus:bg-white focus:border-[#002366]/10 focus:ring-4 focus:ring-[#002366]/5 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-6">
            <button 
              className="relative p-3 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all group"
              onClick={() => setShowNotifications(true)}
            >
              <FiBell size={22} className="group-hover:text-[#002366]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <Link to="/profile" className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-slate-100 cursor-pointer hover:border-[#002366] hover:shadow-lg transition-all">
              <img src="https://i.pinimg.com/736x/26/89/19/268919fb14ab9fb609647d7011140ab7.jpg" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-[#002366] tracking-tight mb-2">Top companies hiring now</h1>
              <p className="text-slate-500 font-medium">Explore 9,000+ premium workplaces for your next career move</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-[#002366] transition-all"><FiChevronLeft size={20} /></button>
              <button className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:bg-white hover:text-[#002366] transition-all"><FiChevronRight size={20} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat, i) => (
              <div key={i} className={`${cat.color} group p-6 rounded-[2.5rem] border border-slate-200/50 hover:border-[#002366]/20 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer`}>
                <h3 className={`font-black ${cat.textColor} mb-2 text-lg tracking-tight`}>{cat.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-bold">{cat.count}</span>
                  <FiArrowRight className="text-slate-400 group-hover:text-[#002366] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-black text-[#002366] text-xl flex items-center gap-3">
                  <FiFilter className="text-[#10b981]" />
                  Filters
                </h2>
                <button className="text-[0.7rem] font-black text-[#002366] uppercase tracking-[0.15em] hover:text-[#10b981] transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">Clear all</button>
              </div>

              {/* Filter Group */}
              {[
                { title: 'Company type', items: ['Corporate', 'Foreign MNC', 'Startup', 'Indian MNC'] },
                { title: 'Location', items: ['Bengaluru', 'Delhi / NCR', 'Mumbai', 'Pune'], searchable: true },
                { title: 'Industry', items: ['IT Services', 'Software Product', 'Recruitment', 'Manufacturing'], searchable: true },
              ].map((group, i) => (
                <div key={i} className="mb-10 last:mb-0">
                  <h3 className="font-extrabold text-slate-900 text-[0.85rem] uppercase tracking-wider mb-5 flex items-center justify-between">
                    {group.title}
                    <FiChevronRight className="text-slate-300 rotate-90" size={14} />
                  </h3>
                  {group.searchable && (
                    <div className="relative mb-5">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input type="text" placeholder={`Search ${group.title}...`} className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-[0.8rem] font-bold text-slate-600 focus:ring-2 focus:ring-[#002366]/5" />
                    </div>
                  )}
                  <div className="space-y-4">
                    {group.items.map((item, j) => (
                      <label key={j} className="flex items-center gap-4 group cursor-pointer">
                        <div className="relative flex items-center">
                          <input type="checkbox" className="peer w-5 h-5 rounded-lg border-2 border-slate-200 text-[#002366] focus:ring-0 cursor-pointer transition-all checked:border-[#002366]" />
                          <FiCheckCircle className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none p-0.5" />
                        </div>
                        <span className="text-sm font-bold text-slate-500 group-hover:text-[#002366] transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                  <button className="text-xs font-black text-[#10b981] mt-6 hover:underline uppercase tracking-tighter transition-all">+ 89 more locations</button>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between px-2">
              <p className="text-sm text-slate-500 font-bold">Showing <span className="text-[#002366] font-black">9,936</span> elite companies</p>
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort by</span>
                <select 
                  className="bg-white border-2 border-slate-100 rounded-xl px-4 py-2 text-xs font-black text-[#002366] focus:ring-0 focus:border-[#002366]/10 cursor-pointer shadow-sm outline-none transition-all hover:border-[#002366]/20"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Highest Rated">Highest Rated</option>
                  <option value="Recently Added">Recently Added</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {companies.map((company) => (
                <div 
                  key={company.id} 
                  className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,35,102,0.08)] hover:border-[#002366]/10 transition-all duration-400 group cursor-pointer flex items-center gap-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#002366]/[0.01] rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                  
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 relative z-10 transition-transform duration-400 group-hover:-translate-y-0.5"
                    style={{ background: company.color, boxShadow: `${company.color}22 0px 10px 20px -5px` }}
                  >
                    {company.logo}
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-black text-[#002366] text-base leading-tight group-hover:text-[#10b981] transition-colors pr-4 truncate">{company.name}</h4>
                      <FiArrowRight className="text-slate-200 group-hover:text-[#002366] group-hover:translate-x-1 transition-all" size={16} />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100/50">
                        <FiStar className="fill-amber-500 text-amber-500" size={12} />
                        <span className="text-xs font-black text-amber-700">{company.rating}</span>
                      </div>
                      <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-tighter">{company.reviews} Reviews</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {company.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#f8fafc] text-[0.65rem] font-bold text-slate-500 rounded-lg border border-slate-100 uppercase tracking-tighter group-hover:bg-white group-hover:border-[#002366]/10 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center py-12 gap-3">
              <button className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#002366] hover:text-white transition-all shadow-sm">
                <FiChevronLeft size={20} />
              </button>
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${
                    p === 1 ? 'bg-[#002366] text-white shadow-xl shadow-blue-900/30 ring-4 ring-blue-900/5' : 'bg-white border-2 border-slate-50 text-slate-600 hover:border-[#002366]/20'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#002366] hover:text-white transition-all shadow-sm">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
            <img src={mavenLogo} alt="MavenJobs" className="h-8 w-auto" />
          </div>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Help Center', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs font-black text-slate-400 hover:text-[#002366] uppercase tracking-widest transition-colors">{item}</a>
            ))}
          </div>
          <p className="text-slate-300 text-[0.7rem] font-bold uppercase tracking-[0.2em]">© 2026 MavenJobs Intelligence Portal. All rights reserved.</p>
        </div>
      </footer>

      {/* Notification Sidebar */}
      <div 
        className={`fixed inset-0 bg-[#002366]/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${showNotifications ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setShowNotifications(false)} 
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[101] shadow-[-20px_0_50px_rgba(0,35,102,0.1)] transform transition-transform duration-500 ease-out flex flex-col ${showNotifications ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]/50">
          <h3 className="text-xl font-black text-[#002366] flex items-center gap-3">
            <FiBell className="text-[#10b981]" />
            Notifications
          </h3>
          <button 
            className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400"
            onClick={() => setShowNotifications(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          <div className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Today</div>

          {[
            {
              icon: <FiAward />,
              color: '#7c3aed',
              bg: '#f5f3ff',
              title: '🚀 Practice interview questions for your Fortified Infotech application!',
              desc: 'Instant feedback to ace your Software & Sr Software roles...',
              time: '2h ago',
              action: 'Practice Now'
            },
            {
              icon: <FiFileText />,
              color: '#f59e0b',
              bg: '#fffbeb',
              title: 'Your resume for job application was viewed',
              desc: 'Application History: Infrrd Tech Solutions',
              time: '3h ago'
            },
            {
              icon: <FiUsers />,
              color: '#2563eb',
              bg: '#eff6ff',
              title: 'Let AI help you ace your next job interview. Try now!',
              desc: '🚀 Unlock Your Interview Success!',
              time: '3h ago',
              action: 'Practice Now'
            },
            {
              icon: <FiCheckCircle />,
              color: '#10b981',
              bg: '#f0fdf4',
              title: 'Apply by 11:10 AM for a job just posted for you by Infrrd.',
              desc: 'Neo-AI Job Agent: Top Match Found',
              time: '4h ago'
            },
            {
              icon: <FiX />,
              color: '#ef4444',
              bg: '#fef2f2',
              title: 'Your application was marked not shortlisted',
              desc: 'Application History: Zepto Deliveries',
              time: '5h ago'
            }
          ].map((notif, idx) => (
            <div className="flex gap-4 p-5 rounded-[1.5rem] bg-white border border-slate-50 hover:border-[#002366]/10 hover:shadow-lg transition-all cursor-pointer group" key={idx}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: notif.bg, color: notif.color }}>
                {React.cloneElement(notif.icon, { size: 20 })}
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-[#002366] leading-snug mb-1 group-hover:text-[#10b981] transition-colors">{notif.title}</div>
                <div className="text-xs font-bold text-slate-500 mb-3">{notif.desc}</div>
                {notif.action && (
                  <button className="px-4 py-2 bg-[#002366] text-white text-[0.7rem] font-black rounded-lg hover:bg-[#10b981] transition-all shadow-lg shadow-blue-900/10 uppercase tracking-tighter">
                    {notif.action}
                  </button>
                )}
                <div className="text-[0.65rem] font-bold text-slate-300 mt-2 uppercase tracking-widest">{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
