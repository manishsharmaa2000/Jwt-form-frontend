import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function AddUser() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    // Handle Change
    const handleChange = (e) => {

        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    // Submit Form
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            // API Call
            const response = await fetch(
                "https://jwt-form-backend.onrender.com/api/user/createuser",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );

            const result = await response.json();

            console.log(result);

            // Success
            if (result.success) {

                alert("User Added Successfully");

                // Clear Form
                setUserData({
                    name: "",
                    email: "",
                    password: "",
                    phone: ""
                });

                // Redirect To Users Page
                navigate("/admin/user");

            } else {

                alert(result.message);
            }

        } catch (error) {

            console.log(error);

            alert("Server Error");
        }

        setLoading(false);
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
                    Add User
                </h1>

                <form
                    className="userForm"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                            ? "Adding..."
                            : "Add User"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddUser;