import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NaukriLandingPage from "./pages/NaukriLandingPage";
import EmployerLandingPage from "./pages/EmployerLandingPage";
import JobListingPage from "./pages/JobListingPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Buyonline from "./pages/Buyonline";
import ProfileDashboard from "./pages/ProfileDashboard";
import CompaniesPage from "./pages/CompaniesPage";
import Jobprofile from "./pages/Jobprofile";
import Services from "./pages/Services";
import MavenPro from "./pages/MavenPro";
import Premium from "./pages/Premium";
import Info from "./pages/Info";
import Blogs from "./pages/Blogs";
import BlogAIRex from "./pages/Blogsx";
import DailyQuiz from "./pages/DailyQuiz";
import DailyQuizNotification from "./components/DailyQuizNotification";
import { AuthProvider, useAuth } from "./AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function AppContent() {
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Trigger only once per login session
    const isLoggedIn = user || localStorage.getItem("user");
    const alreadyShown = sessionStorage.getItem("dailyQuizShown");
    
    if (isLoggedIn && !alreadyShown) {
      const timer = setTimeout(() => {
        setShowQuizPopup(true);
        sessionStorage.setItem("dailyQuizShown", "true");
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NaukriLandingPage />} />
        <Route path="/employer-login" element={<EmployerLandingPage />} />
        <Route path="/jobs" element={<JobListingPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/buy-online" element={<Buyonline />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/company/:id" element={<Jobprofile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pro" element={<MavenPro />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/info" element={<Info />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-article" element={<BlogAIRex />} />
        <Route path="/daily-quiz" element={<DailyQuiz />} />
      </Routes>
      <DailyQuizNotification
        isOpen={showQuizPopup}
        duration={20}
        onClose={() => setShowQuizPopup(false)}
        onTakeQuiz={() => navigate("/daily-quiz")}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}