import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignInForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // store backend message
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    studentId: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[b]\d{6}@rgukt\.ac\.in$/)) {
      errs.email = "Email must be your Student Id followed by @rgukt.ac.in";
    }
    if (!form.password) errs.password = "Password is required";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (!form.studentId.match(/^[Bb]\d{6}$/)) {
      errs.studentId =
        "Please enter valid Id";
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            studentId: form.studentId,
          }),
        });

        const data = await response.json(); // always JSON now

        if (response.ok) {
          setSubmitted(true);
          setErrors({});
          setMessage(data.message);
          setMessageType("success");

          localStorage.setItem(
            "user",
            JSON.stringify({ email: form.email, name: form.name, studentId: form.studentId, role: "STUDENT" })
          );

          navigate("/");
        }

        setSubmitted(true);
        setErrors({});
        setMessage(data.message);
        setMessageType("success");

        navigate("/");
      } catch (err) {
        setSubmitted(false);
        setMessage(err.message);
        setMessageType("error");
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Student Sign In
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            name="name"
            type="text"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Id
          </label>
          <input
            name="studentId"
            type="text"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.studentId ? "border-red-500" : "border-gray-300"
            }`}
            value={form.studentId}
            onChange={handleChange}
            maxLength={7}
            placeholder="B201013"
          />
          {errors.studentId && (
            <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Email ID
          </label>
          <input
            name="email"
            type="email"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            name="confirm"
            type="password"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.confirm ? "border-red-500" : "border-gray-300"
            }`}
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && (
            <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${
              messageType === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
