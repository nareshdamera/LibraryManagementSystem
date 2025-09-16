import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [borrowStatus, setBorrowStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book details:", err));
  }, [bookId]);

  const borrowBook = () => {
    fetch(`http://localhost:8080/borrow/${bookId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // If the student user needs authentication or info, add it here.
      body: JSON.stringify({ /* studentId: ... */ })
    })
      .then((res) => {
        if (res.ok) setBorrowStatus("Successfully borrowed!");
        else throw new Error("Borrow failed!");
      })
      .catch((err) => setBorrowStatus("Borrowing failed!"));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img src={`data:image/jpeg;base64,${book.image}`} alt={book.title} className="w-full h-75 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700"><b>Author:</b> {book.author}</p>
          <p className="text-gray-700"><b>Description:</b> {book.description}</p>
          <p className="text-gray-700"><b>Available:</b> {book.availableQuantity}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={borrowBook}
            disabled={book.availableQuantity <= 0}
          >
            Borrow
          </button>
          {borrowStatus && <p className="mt-2 text-green-600">{borrowStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
