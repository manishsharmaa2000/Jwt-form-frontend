import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    // Verify token
    fetch("http://localhost:5000/api/auth/home", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  }, [navigate]);

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h1>Home Page</h1>

      {user && (
        <div>
          <h3>Welcome {user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;