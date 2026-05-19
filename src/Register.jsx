import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    // Handle Input Change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {

                alert("User Registered Successfully");

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.log("Register Error:", error);

            alert("Server Error");
        }
    };

    return (

        <div className="cardContainer">

            <div className="card">

                <h1 style={{ color: "white", textAlign: "center" }}>
                    Signup Here
                </h1>

                <form
                    className="userForm"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                    />

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

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>
						<p className="authText">
							Already have an account ?
							
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