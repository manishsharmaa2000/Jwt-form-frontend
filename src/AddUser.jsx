import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Change
  const handleChange = (e) => {
    setUserData({
      ...userData,
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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9]{10}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (
      !nameRegex.test(userData.name)
    ) {
      newErrors.name =
        "Name should contain only letters (2-50 characters)";
    }

    if (
      !emailRegex.test(userData.email)
    ) {
      newErrors.email =
        "Enter valid email address";
    }

    if (
      !phoneRegex.test(userData.phone)
    ) {
      newErrors.phone =
        "Phone number must be exactly 10 digits";
    }

    if (
      !passwordRegex.test(
        userData.password
      )
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number & special character (min 8 chars)";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // Submit Form
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/user/createuser`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            userData
          ),
        }
      );

      const result =
        await response.json();

      console.log(result);

      if (result.success) {
        alert(
          "User Added Successfully"
        );

        setUserData({
          name: "",
          email: "",
          password: "",
          phone: "",
        });

        setErrors({});

        navigate("/admin/user");
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
          Add User
        </h1>

        <form
          className="userForm"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={userData.name}
            onChange={
              handleChange
            }
          />
          <p className="error">
            {errors.name}
          </p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={userData.email}
            onChange={
              handleChange
            }
          />
          <p className="error">
            {errors.email}
          </p>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={userData.password}
            onChange={
              handleChange
            }
          />
          <p className="error">
            {errors.password}
          </p>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            value={userData.phone}
            onChange={
              handleChange
            }
          />
          <p className="error">
            {errors.phone}
          </p>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Adding..."
              : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;