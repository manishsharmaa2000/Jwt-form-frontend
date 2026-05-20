import React, { useState, useEffect } from "react";

function User() {

    const [users, setUsers] = useState([]);

    // Fetch Users
    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await fetch(
                "https://jwt-form-backend.onrender.com/api/user/users"
            );

            const result = await response.json();

            console.log(result);

            // Backend sends: users
            setUsers(result.users);

        } catch (error) {

            console.log(
                "Fetch Users Error:",
                error
            );
        }
    };

    // Delete User
    const deleteUser = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/user/deleteuser/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("User Deleted");

                // Refresh Users
                fetchUsers();

            } else {

                alert(result.message);
            }

        } catch (error) {

            console.log(
                "Delete Error:",
                error
            );
        }
    };

    return (

        <div>

            <h2>
                All Users
            </h2>

            {
                users.length > 0 ? (

                    users.map((user) => (

                        <div
                            key={user._id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "15px",
                                marginBottom: "10px",
                                background: "#f1f1f1",
                                borderRadius: "8px"
                            }}
                        >

                            <div>

                                <h3>
                                    {user.name}
                                </h3>

                                <p>
                                    {user.email}
                                </p>

                                <p>
                                    {user.phone}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    deleteUser(user._id)
                                }
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>

                        </div>
                    ))

                ) : (

                    <p>
                        No Users Found
                    </p>
                )
            }

        </div>
    );
}

export default User;