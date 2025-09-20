import React, { useEffect, useState } from "react";

export default function BorrowedBooks() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch borrowed books for logged-in user
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/requests/student/${user.studentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setError(err.message);
        setRequests([]);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-6">Please log in to view borrowed books.</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">My Borrowed Books</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">You haven’t borrowed any books yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req.requestId}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {req.bookTitle}
                </h3>
                <p className="text-sm text-gray-600">
                  <b>Book Code:</b> {req.book?.bookCode || "N/A"}
                </p>
                <p className="mt-2 text-sm">
                  <b>Status:</b>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.status === "APPROVED"
                        ? "bg-green-500"
                        : req.status === "RETURNED"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
