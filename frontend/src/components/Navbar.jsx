import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Appcontext';
import { UserCircleIcon, ArrowRightOnRectangleIcon, CogIcon } from '@heroicons/react/24/outline';
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
      if (isProfileOpen && !event.target.closest('.profile-menu-container')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isProfileOpen]);

  return (
    <nav className="bg-gray-900/80 border-b border-gray-700/50 backdrop-blur-md fixed w-full z-50 h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 h-full">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
              NeuroNotes
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex md:order-2 items-center gap-2">
          {isAuthenticated ? (
            <div className="relative profile-menu-container">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User profile"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-white" />
                <span className="hidden md:inline text-sm font-medium text-gray-300 hover:text-white">
                  {user?.name}
                </span>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      Profile
                    </div>
                  </Link>
                  <Link
                    to="/chatbot"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <CogIcon className="h-5 w-5 mr-2" />
                      ChatBot
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Get Started
              </Link>
            </div>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-white/10 focus:outline-none hover:text-white"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`mobile-menu-container w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-white bg-blue-600/30 rounded md:bg-transparent md:text-white md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/chatbot"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Chatbot
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;