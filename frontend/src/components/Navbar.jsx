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
  };

  return (
    <nav className="bg-gray-900/80 border-b border-gray-700/50 backdrop-blur-md fixed w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
           NeuroNotes
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
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
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Get Started
              </Link>
            </>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-white/10 focus:outline-none hover:text-white"
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-600/30 rounded md:bg-transparent md:text-white md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-white md:p-0"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/chatbot"
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