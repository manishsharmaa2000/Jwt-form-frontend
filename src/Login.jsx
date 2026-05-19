import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";

function Login() {
     // Page navigate karne ke liye
    const navigate = useNavigate();

   
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    
    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

   
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Backend API call
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

            // Response ko JSON me convert karna
            const result = await response.json();

            console.log(result);

            // Agar token mila to login success
            if (result.token) {

                // Token save karo
                localStorage.setItem("token", result.token);

                // Home page par bhejo
                navigate("/home");

            } else {

                // Error message show karo
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

                <h1 style={{color:"white",textAlign:"center"}}>Login Here</h1>

                <form className="userForm" onSubmit={handleSubmit}>

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