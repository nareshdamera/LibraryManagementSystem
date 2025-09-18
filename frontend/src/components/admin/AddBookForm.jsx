import React, { useState } from "react";

export default function AddBookForm() {
  const [form, setForm] = useState({
    bookCode: "",
    title: "",
    author: "",
    category: "fiction",
    description: "",
    quantity: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);

  const categories = ["fiction", "non-fiction", "educational", "others"];

  const validate = () => {
    const errs = {};
    if (!form.bookCode.trim()) errs.bookCode = "Book code is required";
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.author.trim()) errs.author = "Author is required";
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) < 1)
      errs.quantity = "Available quantity must be a positive number";
    if (!form.image) errs.image = "Image is required";
    return errs;
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm((f) => ({ ...f, image: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }
    setErrors((errs) => ({ ...errs, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("bookCode", form.bookCode);
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("image", form.image);

      try {
        const response = await fetch("http://localhost:8080/addbook", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setSubmitted(true);
          setForm({
            bookCode: "",
            title: "",
            author: "",
            category: "fiction",
            description: "",
            quantity: "",
            image: null,
          });
          setPreview(null);
        } else {
          const data = await response.json();
          setErrors({ form: data.message || "Failed to add book" });
          setSubmitted(false);
        }
      } catch (err) {
        setErrors({ form: "Server error" });
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          📚 Add New Book
        </h2>

        {errors.form && (
          <p className="mb-4 text-red-600 font-medium bg-red-50 p-2 rounded">
            {errors.form}
          </p>
        )}
        {submitted && (
          <p className="mb-4 text-green-600 font-medium bg-green-50 p-2 rounded">
            ✅ Book added successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          {/* Grid layout for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Code */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Code*
              </label>
              <input
                name="bookCode"
                type="text"
                value={form.bookCode}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.bookCode ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.bookCode && (
                <p className="text-red-500 text-xs mt-1">{errors.bookCode}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Quantity*
              </label>
              <input
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.quantity ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Title */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.title ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author*
              </label>
              <input
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.author ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.author && (
                <p className="text-red-500 text-xs mt-1">{errors.author}</p>
              )}
            </div>
          </div>

          {/* Category & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              ></textarea>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Image*
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 ${
                errors.image ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}

            {preview && (
              <div className="mt-3 flex flex-col items-start">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <div className="rounded-lg overflow-hidden shadow-md border">
                  <img
                    src={preview}
                    alt="Book Preview"
                    className="h-40 w-32 object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ➕ Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
