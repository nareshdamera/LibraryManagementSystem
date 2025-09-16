import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Library Books</h1> */}

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.bookId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate(`/books/${book.bookId}`)}
          >
            <img
              src={`data:image/jpeg;base64,${book.image}`}
              alt={book.title}
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">
                <b>Author:</b> {book.author}
              </p>
              <p className="text-gray-600">
                <b>Available:</b> {book.availableQuantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
