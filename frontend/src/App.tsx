import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import PodsPage from './pages/PodsPage';
import DecksPage from './pages/DecksPage';
import LandingPage from './pages/LandingPage';
import UserProfilePage from './pages/UserProfilePage'; // Import UserProfilePage
import Layout from './components/Layout'; // New Layout
import { AuthProvider, useAuth } from './hooks/useAuth.tsx';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // Render child routes
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes that use their own full-page layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes that share the main application layout */}
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/pods" element={<PodsPage />} />
              <Route path="/decks" element={<DecksPage />} />
              <Route path="/profile" element={<UserProfilePage />} /> {/* New User Profile Route */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
