import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      console.log(result);

      // Login Success
      if (result.token) {
        localStorage.setItem("token", result.token);

        // Current Logic
        if (loginData.email === "admin@gmail.com") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }

        alert("Login Successful");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);

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
          Login Here
        </h1>

        <form className="userForm" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
          />

          <p className="error">{errors.email}</p>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
          />

          <p className="error">{errors.password}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="authText">
            Don't have an account?
            <Link to="/register" className="authLink">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
