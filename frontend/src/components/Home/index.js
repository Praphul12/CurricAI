import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./index.css";
import Course from "../Course";

const Home = ({handleTheme}) => {

  const { getAccessTokenSilently } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const [course, setCourse] = useState(null);
  const [sidebarState, setSidebarState] = useState(1);
  const [selectedCourseModules,setSelectedCourseModules] = useState(null);

  console.log(sidebarState);
  const handleSidebarState = ()=>{
    setSidebarState(!sidebarState);
  }
  const handlePrompt = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:5000/api/generateCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Home-container">
   
        <div className="topbar-container">
            <Topbar
             changeTheme = {handleTheme}
             handleSidebarState = {handleSidebarState}
            />
        </div>
       <div className="main-content">
        <div className="Sidebar-container">
            <Sidebar 
             setSelectedCourseModules={setSelectedCourseModules}
             selectedCourseModules = {selectedCourseModules} 
             sidebarState = {sidebarState}
            />
        </div>
      <div className="Course-chat">
        <div className="Course-container">
            <Course course={selectedCourseModules}/>
        </div>
        <div className="Chat-container">
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="chat-input"
                value={prompt}
                onChange={handlePrompt}
                placeholder="Enter your course description"
              />
            <button type="submit" className="chat-button">Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
