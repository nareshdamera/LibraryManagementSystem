import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^b\d{6}@rgukt\.ac\.in$/.test(form.email))
      errs.email = "Enter a valid RGUKT student email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const data = await response.json();
          // Assume backend returns user info (name, email, role,studentId)
          localStorage.setItem("user", JSON.stringify(data.user));
          setSubmitted(true);
          if(data.user.role === "ADMIN") {
            navigate("/admin");
          }else{
            navigate("/");
          }
          
        } else {
          setErrors({ password: "Invalid login" });
          setSubmitted(false);
        }
      } catch (err) {
        setErrors({ password: "Server error" });
        setSubmitted(false);
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
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
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
        <div className="mb-6">
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
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        {submitted && (
          <p className="mt-4 text-green-600 text-center">Login successful!</p>
        )}
        <div className="flex justify-between mt-4 text-sm">
          <a href="/signin" className="text-blue-600 hover:underline">
            Create New Account
          </a>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
