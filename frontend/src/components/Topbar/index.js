import "./index.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {CourseContext} from "../../context/CourseContext.js" 
import { useContext } from "react";


const Topbar = ({handleSidebarState}) => {

  
  return (
    <header className="Topbar">
    <button className="HamMenu" onClick={handleSidebarState}>
      <GiHamburgerMenu  size={24}/>
    </button>
    <div className="SiteName">
        <h1>Curric AI</h1>  
    </div>
     
      {/* <div className="ThemeSelect">
        <button onClick={changeTheme}>Change theme</button>
      </div> */}
    </header>

  );
};

export default Topbar;
