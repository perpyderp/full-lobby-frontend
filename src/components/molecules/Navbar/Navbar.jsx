import React from "react";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Full Lobby
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/games">
              Games
            </a>
          </li>
          <li className="nav-item">
            <img
              src="/profile-image.png"
              alt="Profile"
              className="nav-link rounded-circle"
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
