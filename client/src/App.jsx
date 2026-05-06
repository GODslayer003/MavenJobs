import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}