import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./login";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLoginSuccess = () => {
    setShowDropdown(false); // Close the dropdown on successful login
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/private">
            <button className="btn btn-primary">Private</button>
          </Link>
          <div
            className="dropdown"
            style={{ display: "inline-block", marginLeft: "10px" }}
          >
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              aria-expanded={showDropdown ? "true" : "false"}
              style={{ width: "200px" }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Login
            </button>
            <div
              className={`dropdown-menu ${showDropdown ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
