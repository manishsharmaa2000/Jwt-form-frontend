import React from "react";

import {
    Link,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import "../src/static/admin.css";

import Home from "./Home";
import AddUser from "./AddUser";
import User from "./User";

function Admin() {

    const navigate = useNavigate();

    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/", { replace: true });
    };

    return (

        <div className="mainContainer">

            {/* Sidebar */}
            <div className="sidebar">

                <h2 className="logo">
                    Admin Panel
                </h2>

                <Link
                    className="menuLink"
                    to="/admin/adduser"
                >
                    Add User
                </Link>
                <Link
                    className="menuLink"
                    to="/admin/user"
                >
                     Users
                </Link>

                <button
                    className="menuLink"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            {/* Main Content */}
            <div className="contentArea">

                {/* Navbar */}
                <nav className="navbar">

                    <h2>
                        Welcome Admin
                    </h2>

                </nav>

                {/* Page Content */}
                <div className="pageContent">

                    <Routes>

                        {/* Default Admin Home */}
                        <Route
                            path="/"
                            element={<Home />}
                        />

                        {/* Add User */}
                        <Route
                            path="adduser"
                            element={<AddUser />}
                        />

                        <Route
                            path="user"
                            element={<User/>}
                        />

                    </Routes>

                </div>

            </div>

        </div>
    );
}

export default Admin;