import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaukriLandingPage from "./pages/NaukriLandingPage";
import EmployerLandingPage from "./pages/EmployerLandingPage";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NaukriLandingPage />} />
          <Route path="/employer-login" element={<EmployerLandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
