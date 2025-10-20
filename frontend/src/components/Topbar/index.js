import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";

const Topbar = () => {
  const { user, logout } = useAuth0();

  return (
    <header className="topbar">
      <h1 className="topbar__logo">CurricAI</h1>

      {user && (
        <div className="topbar__profile">
          <img src={user.picture} alt={user.name} className="topbar__avatar" />
          <span className="topbar__name">{user.name}</span>
          <button
            className="topbar__logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Topbar;
