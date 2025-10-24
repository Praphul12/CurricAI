import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
import { Menu } from "lucide-react"; // ✅ nice icon

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth0();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="hamburger" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className="topbar__logo">CurricAI</h1>
      </div>

      {user && (
        <div className="topbar__profile">
          <img
            src={user.picture}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="topbar__avatar"
          />
          <span className="topbar__name">{user.name}</span>
          <button className="topbar__logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Topbar;
