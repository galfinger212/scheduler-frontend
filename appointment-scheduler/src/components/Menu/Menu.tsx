import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css"; // Add styling

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sliding Menu */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li
            onClick={() => {
              navigate("/scheduler");
              setIsMenuOpen(false);
            }}
          >
            Scheduler
          </li>
          <li
            onClick={() => {
              navigate("/appointments");
              setIsMenuOpen(false);
            }}
          >
            My Appointments
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Overlay (to close the menu on clicking outside) */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Menu;
