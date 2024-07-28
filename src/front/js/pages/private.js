import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/protected`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Private Area</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.username}</h3>
          <p>This is a private area only accessible to logged-in users.</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
