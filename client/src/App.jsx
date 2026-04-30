import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaukriLandingPage from "./pages/NaukriLandingPage";
import EmployerLandingPage from "./pages/EmployerLandingPage";
import JobListingPage from "./pages/JobListingPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Buyonline from "./pages/Buyonline";
import ProfileDashboard from "./pages/ProfileDashboard";
import CompaniesPage from "./pages/CompaniesPage";
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}