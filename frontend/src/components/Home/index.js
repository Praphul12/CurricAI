import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./index.css";
import Course from "../Course";
import { IoSend } from "react-icons/io5";
import {CourseContext} from "../../context/CourseContext.js" 
import { useContext } from "react";
const Home = ({handleTheme}) => {

  const { getAccessTokenSilently } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const {selectedCourse,getUserCourses,setSelectedCourse,sidebarState,setSidebarState,selectedCourseModules,setSelectedCourseModules} = useContext(CourseContext);

  // const [selectedCourse,setSelectedCourse] = useState(null);
  // const [sidebarState, setSidebarState] = useState(1);
  // const [selectedCourseModules,setSelectedCourseModules] = useState(null);

  console.log(sidebarState);
  const handleSidebarState = ()=>{
    setSidebarState(!sidebarState);
  }
  const handlePrompt = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:5000/api/course/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        await res.json();
        await getUserCourses();
        setPrompt("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Home-container">
   
        <div className="topbar-container">
            <Topbar
             handleSidebarState = {handleSidebarState}
            />
        </div>
       <div className="main-content">
        <div className="Sidebar-container">
            <Sidebar 
             setSelectedCourseModules={setSelectedCourseModules}
             selectedCourseModules = {selectedCourseModules} 
             sidebarState = {sidebarState}
             setSelectedCourse = {setSelectedCourse}
            />
        </div>
      <div className="Course-chat">
        <div className="Course-container">
            <Course 
             course={selectedCourseModules}
             selectedCourse = {selectedCourse}

             />
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
            <button  type="submit" className="chat-button"><IoSend size={24}/></button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
