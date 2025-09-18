import React, { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  UserPlus,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialRequests = [
  { id: "S001", book: "React for Beginners", status: "" },
  { id: "S002", book: "Operating Systems", status: "" },
  { id: "S003", book: "Data Structures", status: "" },
  { id: "S004", book: "JavaScript Fundamentals", status: "" },
];

export default function AdminDashboard({ adminName = "Admin" }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(initialRequests);

  const displayedRequests = search
    ? requests.filter((r) => r.id.includes(search))
    : requests.slice(0, 20);

  const toggleStatus = (index, newStatus) => {
    const updated = [...requests];
    updated[index].status =
      updated[index].status === newStatus ? "" : newStatus;
    setRequests(updated);
    // TODO: Update backend API here
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login
  };

  // Close menu if clicking outside sidebar
  const handleOverlayClick = () => setSideMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow sticky top-0 z-40">
        {/* Hamburger - always visible */}
        <button
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
          aria-label={sideMenuOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
        >
          {sideMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Brand */}
        <h1 className="text-xl font-bold text-gray-800">📚 Library Admin</h1>

        {/* Search */}
        <div className="flex-grow hidden md:flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Student ID..."
            className="w-80 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Admin Menu */}
        <div className="relative">
          <button
            onClick={() => setAdminMenuOpen(!adminMenuOpen)}
            aria-haspopup="true"
            aria-expanded={adminMenuOpen}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
          >
            <span className="font-medium">{adminName}</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {adminMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
              <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-blue-50">
                <UserPlus className="w-4 h-4" /> Add New Admin
              </button>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-blue-50"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar & Overlay */}
      <div>
        {/* Sidebar menu slide in/out */}
        <aside
          className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-40 py-6 flex flex-col transform transition-transform duration-300
            ${sideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          aria-hidden={!sideMenuOpen}
        >
          <div className="px-4 pb-4 border-b border-gray-200 flex justify-end">
            <button
              onClick={() => setSideMenuOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col mt-4">
            <button
              onClick={() => {
                navigate("/addbook"); // Navigate to addbook route
                setSideMenuOpen(false); // Optionally close sidebar on navigation
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-left focus:bg-blue-100 rounded"
            >
              <BookOpen className="w-5 h-5" /> Add Book
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-left focus:bg-blue-100 rounded">
              <ClipboardList className="w-5 h-5" /> Clearance
            </button>
          </nav>
        </aside>

        {/* Overlay to close menu on outside click */}
        {sideMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-20 z-30"
            onClick={handleOverlayClick}
          />
        )}
      </div>

      {/* Main content shifted right when sidebar is open */}
      <main
        className={`flex-1 container mx-auto mt-8 px-4 transition-all duration-300 ${
          sideMenuOpen ? "ml-56" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Book Requests
          </h2>
          <div className="md:hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Student ID..."
              className="w-60 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-hidden bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Student ID
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Book Name
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
              {displayedRequests.map((req, idx) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{req.id}</td>
                  <td className="py-3 px-4">{req.book}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className={`px-3 py-1 text-sm rounded-full transition ${
                          req.status === "collected"
                            ? "bg-blue-500 text-white shadow"
                            : "bg-gray-100 hover:bg-blue-50"
                        }`}
                        onClick={() => toggleStatus(idx, "collected")}
                      >
                        Collected
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded-full transition ${
                          req.status === "returned"
                            ? "bg-green-500 text-white shadow"
                            : "bg-gray-100 hover:bg-green-50"
                        }`}
                        onClick={() => toggleStatus(idx, "returned")}
                      >
                        Returned
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
