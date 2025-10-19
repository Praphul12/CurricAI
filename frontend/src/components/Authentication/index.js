import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import logo from '../../assets/logo.png'
import './index.css'
const Authentication = () => {
  const { loginWithRedirect } = useAuth0();

  

  return (
    <div className="LoginContainer">
      <div className="LoginCard">
        <img src={logo} alt="CurriAI Logo" className="AppLogo" />
        <h1 className="AppTitle">CurriAI</h1>
        <p className="AppSubtitle">Generate structured courses from your ideas.</p>
        <button className="LoginButton" onClick={()=> {loginWithRedirect()}}>
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
