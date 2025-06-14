import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggle menu clicked");
    setMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path, state = {}) => {
    setMenuOpen(false);
    router(path, { state });
  };

  return (
    <div className="landingPageContainer">
      <nav className="nav">
        <div className="navHeader">
          <h2>Connectify</h2>

          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={`navlist ${menuOpen ? "active" : ""}`}>
          <p onClick={() => handleNavigate("/aljk23")}>Join as Guest</p>
          <p onClick={() => handleNavigate("/auth", { authMode: "signup" })}>
            Register
          </p>
          <div
            onClick={() => handleNavigate("/auth", { authMode: "login" })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigate("/auth", { authMode: "login" });
              }
            }}
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="landingTextContainer">
          <h1 className="landingTitle">
            <span style={{ color: "#FFD93D" }}>Connect</span> with your loved
            Ones
          </h1>
          <p className="landingSubtitle">Cover a distance by Connectify</p>
          <div role="button">
            <Link
              to="/auth"
              state={{ authMode: "signup" }}
              style={{ color: "#1e1e2f" }}
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="landingImageContainer">
          <img src="/mobile.png" alt="Mobile app preview" />
        </div>
      </div>
    </div>
  );
}
