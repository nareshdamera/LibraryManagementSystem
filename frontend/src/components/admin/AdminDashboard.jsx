import React, { useEffect, useState } from "react";
import { Menu, X, LogOut, UserPlus, BookOpen, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditBookModal from "./EditBookModal";

export default function AdminDashboard({ adminName = "Admin" }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [view, setView] = useState("requests");
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  // Fetch requests
  useEffect(() => {
    fetch("http://localhost:8080/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Failed to fetch requests:", err));
  }, []);

  // Displayed requests filtered by student ID
  const displayedRequests = search
    ? requests.filter((r) =>
        r.studentId?.toLowerCase().includes(search.toLowerCase())
      )
    : requests;

  // Displayed books filtered by title
  const displayedBooks = search
    ? books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    : books;

  // Update request status
  const updateStatus = (requestId, newStatus) => {
    fetch(`http://localhost:8080/requests/${requestId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        setRequests((prev) =>
          prev.map((r) =>
            r.requestId === requestId ? { ...r, status: newStatus } : r
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleOverlayClick = () => setSideMenuOpen(false);

  // Fetch books
  const fetchBooks = () => {
    setView("books");
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
    setSideMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white shadow sticky top-0 z-40">
        <button
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
          aria-label={sideMenuOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
        >
          {sideMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-bold text-gray-800">📚 Library Admin</h1>
        <div className="flex-grow hidden md:flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              view === "requests"
                ? "Search by Student ID..."
                : "Search by Book Title..."
            }
            className="w-80 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
        <aside
          className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-40 py-6 flex flex-col transform transition-transform duration-300
          ${sideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          inert={!sideMenuOpen ? true : undefined}
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
                navigate("/addbook");
                setSideMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-left focus:bg-blue-100 rounded"
            >
              <BookOpen className="w-5 h-5" /> Add Book
            </button>
            <button
              onClick={fetchBooks}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-left focus:bg-blue-100 rounded"
            >
              <BookOpen className="w-5 h-5" /> All Books
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-left focus:bg-blue-100 rounded">
              <ClipboardList className="w-5 h-5" /> Clearance
            </button>
          </nav>
        </aside>
        {sideMenuOpen && (
          <div className="fixed inset-0 bg-black opacity-20 z-30" onClick={handleOverlayClick} />
        )}
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 container mx-auto mt-8 px-4 transition-all duration-300 ${
          sideMenuOpen ? "ml-56" : ""
        }`}
      >
        {/* Requests Table */}
        {view === "requests" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Book Requests
            </h2>
            <div className="overflow-hidden bg-white shadow rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Student ID</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Book Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRequests.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-500">
                        No requests found.
                      </td>
                    </tr>
                  ) : (
                    displayedRequests.map((req, index) => (
                      <tr key={req.requestId || index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{req.studentId}</td>
                        <td className="py-3 px-4">{req.bookTitle}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 items-center">
                            <span className="mr-2 font-medium">{req.status || "Pending"}</span>
                            <button
                              className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600"
                              onClick={() => updateStatus(req.requestId, "APPROVED")}
                            >
                              Approve
                            </button>
                            <button
                              className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                              onClick={() => updateStatus(req.requestId, "RETURNED")}
                            >
                              Returned
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Books View */}
        {view === "books" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBooks.map((book, index) => (
                <div key={book.bookCode || index} className="relative bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img
                    src={book.image ? `data:image/jpeg;base64,${book.image}` : ""}
                    alt={book.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-gray-700"><b>Author:</b> {book.author}</p>
                    <p className="text-gray-700"><b>Category:</b> {book.category}</p>
                    <p className="text-gray-700"><b>Available:</b> {book.availableQuantity}</p>
                  </div>
                  <button
                    className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => setSelectedBook(book)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Edit Book Modal */}
      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdate={(updatedBook) =>
            setBooks((prev) =>
              prev.map((b) => (b.bookCode === updatedBook.bookCode ? updatedBook : b))
            )
          }
        />
      )}
    </div>
  );
}
