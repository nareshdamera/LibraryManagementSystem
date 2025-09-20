import React, { useState, useEffect } from "react";

export default function EditBookModal({ book, onClose, onUpdate }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description);
  const [availableQuantity, setAvailableQuantity] = useState(book.availableQuantity);
  const [image, setImage] = useState(null); // for new image upload
  const [saving, setSaving] = useState(false);

  const categories = ["Fiction", "Non-Fiction", "Educational", "Others"];

  // Trap focus inside modal for accessibility
  useEffect(() => {
    const firstFocusable = document.querySelector(
      "#edit-book-modal button, #edit-book-modal input, #edit-book-modal textarea, #edit-book-modal select"
    );
    firstFocusable?.focus();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", availableQuantity);
      if (image) formData.append("image", image);

      const res = await fetch(`http://localhost:8080/books/${book.bookCode}`, {
        method: "PUT",
        body: formData
      });

      if (!res.ok) throw new Error("Failed to update book");

      const updatedBook = await res.json();
      onUpdate(updatedBook);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      id="edit-book-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Edit Book</h2>

        {/* Title */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
          />
        </label>

        {/* Author */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Author</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
          />
        </label>

        {/* Category */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm resize-none h-24"
          />
        </label>

        {/* Available Quantity */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Available Quantity</span>
          <input
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            min={0}
          />
        </label>

        {/* Image */}
        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Book Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors font-medium"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
