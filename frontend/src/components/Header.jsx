import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.jpeg";  // adjust path if Header.jsx is in another folder


export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // redirect to login
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Library Logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-blue-800">Library Management</span>
        </a>

        {/* Search Bar */}
        <form className="flex-1 mx-6 max-w-lg">
          <label htmlFor="search" className="sr-only">Search books</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search books, authors..."
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Auth & Profile */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              {/* Show only if not logged in */}
              <button
                onClick={() => navigate('/login')}
                className="text-sm px-4 py-2 text-blue-800 rounded hover:bg-blue-50 font-medium border border-blue-200"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="text-sm px-4 py-2 text-blue-800 rounded hover:bg-blue-50 font-medium border border-blue-200"
              >
                Sign In
              </button>
            </>
          ) : (
            /* Show only if logged in */
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <img src="/profile.png" alt="Profile" className="h-8 w-8 rounded-full" />
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user.name || "Profile"}
                </span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-10">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Account</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Borrowed Books</a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
