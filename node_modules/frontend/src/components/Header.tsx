import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="text-xl font-bold hover:text-gray-300">
          PodTracker
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700">Dashboard</Link>
              <Link to="/pods" className="px-3 py-2 rounded hover:bg-gray-700">Pods</Link>
              <Link to="/games" className="px-3 py-2 rounded hover:bg-gray-700">Games</Link>
              <Link to="/profile" className="px-3 py-2 rounded hover:bg-gray-700">Profile</Link> {/* New Profile Link */}
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded hover:bg-gray-700">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded hover:bg-gray-700">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
