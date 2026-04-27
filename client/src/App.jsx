import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaukriLandingPage from "./pages/NaukriLandingPage";
import EmployerLandingPage from "./pages/EmployerLandingPage";
import JobListingPage from "./pages/JobListingPage";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NaukriLandingPage />} />
          <Route path="/employer-login" element={<EmployerLandingPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
