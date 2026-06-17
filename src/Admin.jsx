import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import "./static/admin.css";

import Home from "./Home";
import AddDetails from "./AddDetails";
import User from "./User";
import Dashboard from "./Dashboard";
import Blog from "./Blog";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="mainContainer">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2 className="logo">CMS</h2>

          <Link className="menuLink" to="/dashboard">
            Dashboard
          </Link>

          <Link className="menuLink" to="/dashboard/adddetails">
            Add Details
          </Link>

          <Link className="menuLink" to="/dashboard/user">
            Users
          </Link>

          <Link className="menuLink" to="/dashboard/blog">
            Blogs
          </Link>
        </div>

        {/* Logout Button Bottom */}
        <div className="logoutSection">
          <button className="menuLink logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="contentArea">
        {/* Fixed Navbar */}
        <nav className="navbar">
          <h2>College Management System</h2>
        </nav>

        {/* Page Content */}
        <div className="pageContent">
          <Routes>
            <Route index element={<Dashboard />} />

            <Route path="adddetails" element={<AddDetails />} />

            <Route path="user" element={<User />} />
            <Route path="blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
