import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z ]{2,50}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^[0-9]{10}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should contain only letters (2-50 characters)";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number & special character (min 8 chars)";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        alert("User Registered Successfully");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "",
        });

        setErrors({});
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);

      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cardContainer">
      <div className="card">
        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Create User
        </h1>

        <form className="userForm" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className="error">{errors.name}</p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="error">{errors.email}</p>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="error">{errors.password}</p>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <p className="error">{errors.phone}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register User"}
          </button>

          <p className="authText">
            Already have an account?
            <Link to="/" className="authLink">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
