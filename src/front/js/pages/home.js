import React, { useContext } from "react";
import { Context } from "../store/appContext";
import welcomeImage from "../../img/welcome.jpg"; 
import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {store.user ? (
        <>
          <h1>Welcome, {store.user.email}!</h1>
          <p>This is your dashboard.</p>
          <img
            src={welcomeImage}
            alt="Welcome"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </>
      ) : (
        <h1>Please log in to see your dashboard</h1>
      )}
    </div>
  );
};
