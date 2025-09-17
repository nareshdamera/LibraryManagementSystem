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

  const categories = ["fiction", "non-fiction", "educational", "others"];

  const validate = () => {
    const errs = {};
    if (!form.bookCode.trim()) errs.bookCode = "Book code is required";
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.author.trim()) errs.author = "Author is required";
    // quantity should be positive integer
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) < 1)
      errs.quantity = "Available quantity must be a positive number";
    if (!form.image) errs.image = "Image is required";
    return errs;
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm((f) => ({ ...f, image: e.target.files[0] }));
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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      {errors.form && (
        <p className="mb-4 text-red-600 font-semibold">{errors.form}</p>
      )}
      {submitted && (
        <p className="mb-4 text-green-600 font-semibold">
          Book added successfully!
        </p>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <label className="block mb-2 font-medium">Book Code*</label>
        <input
          name="bookCode"
          type="text"
          value={form.bookCode}
          onChange={handleChange}
          className={`w-full p-2 mb-2 border rounded ${
            errors.bookCode ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.bookCode && (
          <p className="mb-2 text-red-500 text-sm">{errors.bookCode}</p>
        )}

        <label className="block mb-2 font-medium">Title*</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className={`w-full p-2 mb-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="mb-2 text-red-500 text-sm">{errors.title}</p>
        )}

        <label className="block mb-2 font-medium">Author*</label>
        <input
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          className={`w-full p-2 mb-2 border rounded ${
            errors.author ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.author && (
          <p className="mb-2 text-red-500 text-sm">{errors.author}</p>
        )}

        <label className="block mb-2 font-medium">Category*</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        ></textarea>

        <label className="block mb-2 font-medium">Available Quantity*</label>
        <input
          name="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          className={`w-full p-2 mb-2 border rounded ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.quantity && (
          <p className="mb-2 text-red-500 text-sm">{errors.quantity}</p>
        )}

        <label className="block mb-2 font-medium">Book Image*</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={`w-full mb-4 ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.image && (
          <p className="mb-2 text-red-500 text-sm">{errors.image}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
