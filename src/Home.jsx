import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // Logout Function
    const handleLogout = () => {

        // Remove Token
        localStorage.removeItem("token");

        // Redirect Login Page
        navigate("/", { replace: true });
    };

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        // No Token
        if (!token) {

            navigate("/", { replace: true });

            return;
        }

        // Verify Token
        fetch(
            "https://jwt-form-backend.onrender.com/api/auth/home",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())

            .then((data) => {

                if (data.success) {

                    setUser(data.user);

                } else {

                    localStorage.removeItem(
                        "token"
                    );

                    navigate("/", {
                        replace: true
                    });
                }
            })

            .catch((error) => {

                console.log(error);

                localStorage.removeItem(
                    "token"
                );

                navigate("/", {
                    replace: true
                });
            });

    }, [navigate]);

    return (

        <div
            style={{
                color: "white",
                textAlign: "center",
                marginTop: "50px"
            }}
        >

            <h1>
                Home Page
            </h1>

            {
                user && (

                    <div>

                        <h3>
                            Welcome {user.name}
                        </h3>

                        

                    </div>
                )
            }

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    border: "none",
                    background: "red",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
            >
                Logout
            </button>

        </div>
    );
}

export default Home;