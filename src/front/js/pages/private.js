import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/error");
    }
  }, [store.token, navigate]);

  return store.token ? (
    <div className="container mt-5">
      <h1>Welcome to the private page, {store.user.email}!</h1>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
          title="YouTube Video"
          style={{ width: "100%", height: "500px" }}
        ></iframe>
      </div>
    </div>
  ) : null;
};
