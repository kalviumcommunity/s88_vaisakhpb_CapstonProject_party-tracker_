import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PartyPopper, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-zinc-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 relative z-50 group transition-transform duration-200 hover:scale-105">
            <PartyPopper className="h-8 w-8 text-purple-500 transform transition-transform group-hover:rotate-12" />
            <span className="text-2xl font-bold text-white">
              Party<span className="text-purple-500">Tracker</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/events', label: 'Events' },
              { path: '/clubs', label: 'Clubs' },
              { path: '/student-zone', label: 'Student Zone' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative py-2 px-1 transition-colors duration-200 group ${
                  isActive(path) ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform transition-transform duration-200 ${
                  isActive(path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button 
                  className="text-zinc-400 hover:text-white hover:scale-110 transition-all duration-200"
                  title="Notifications"
                >
                  <Bell className="h-6 w-6" />
                </button>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-white hover:text-purple-400 hover:scale-105 transition-all duration-200"
                >
                  <User className="h-6 w-6" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={logout}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/auth/login"
                  className="text-white hover:text-purple-400 transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/auth/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 text-white hover:text-purple-400 hover:scale-110 transition-all duration-200"
            title={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 bg-zinc-950/98 backdrop-filter backdrop-blur-xl z-40">
              <div className="flex flex-col items-center justify-center min-h-screen space-y-8 text-lg">
                <Link 
                  to="/" 
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/events" 
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  to="/clubs" 
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Clubs
                </Link>
                <Link 
                  to="/student-zone" 
                  className="text-white hover:text-purple-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Student Zone
                </Link>
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-4">
                    <Link 
                      to="/auth/login" 
                      className="text-white hover:text-purple-400 transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/auth/register" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-lg transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;