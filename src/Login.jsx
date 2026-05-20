import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    // Navigation
    const navigate = useNavigate();

    // State
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    // Handle Input Change
    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Login
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Backend API Call
            const response = await fetch(
                "https://jwt-form-backend.onrender.com/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(loginData)
                }
            );

            // Convert Response
            const result = await response.json();

            console.log(result);

            // Login Success
            if (result.token) {

                 // Save Token
                localStorage.setItem("token", result.token);

                // Check Email
                if (loginData.email === "admin@gmail.com") {

                    // Admin Panel
                    navigate("/admin");

                } else {

                    // Normal User
                    navigate("/home");
                }

            } else {

                // Error Message
                alert(result.message);
            }

        } catch (error) {

            console.log(error);

            alert("Server Error");
        }
    };

    return (

        <div className="cardContainer">

            <div className="card">

                <h1
                    style={{
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    Login Here
                </h1>

                <form
                    className="userForm"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
                    </button>

                    <p className="authText">

                        Don't have an account ?

                        <Link
                            to="/register"
                            className="authLink"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;