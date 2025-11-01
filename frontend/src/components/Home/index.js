import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./index.css";
import Course from "../Course";
import { IoSend } from "react-icons/io5";
import {CourseContext} from "../../context/CourseContext.js" 
import { useContext } from "react";
import Spinner from "../../utils/Spinner.js";
import { useEffect } from "react";
const Home = ({handleTheme}) => {
  const APP_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { getAccessTokenSilently } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const {selectedCourse,selectedCourseId,setSelectedCourseId,getUserCourses,setSelectedCourse,sidebarState,setSidebarState,selectedCourseModules,setSelectedCourseModules} = useContext(CourseContext);
  const [courseLoading, setCourseLoading] = useState(false);
  // const [selectedCourse,setSelectedCourse] = useState(null);
  // const [sidebarState, setSidebarState] = useState(1);
  // const [selectedCourseModules,setSelectedCourseModules] = useState(null);

  // console.log(sidebarState);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setSidebarState(false); // collapse
    } else {
      setSidebarState(true);  // expand
    }
  };

  handleResize(); // run on mount
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, [setSidebarState]);

  const handleSidebarState = ()=>{
    setSidebarState(!sidebarState);
  }
  const handlePrompt = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    setCourseLoading(true);
    console.log(setCourseLoading);
    e.preventDefault();

    //Geenrate the course
    try {

      const token = await getAccessTokenSilently();
      const res = await fetch(`${APP_URL}/api/course/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const course = await res.json();
        await getUserCourses();
        setPrompt("");
        // console.log(data);
        setSelectedCourseId(course?.course?._id );
        setSelectedCourse(course?.course);
        // console.log(course?.course?._id );
  
      try {
        const token = await getAccessTokenSilently();
        const options = {
          "method": "GET",
          "headers":{
            'content-type':'application/json',
            authorization : `Bearer ${token}`
          }
        }
        

        //Fetch the modules of selected course from the backend  
        const res = await fetch(`${APP_URL}/api/modules/${course?.course?._id }`,options);
        const moduleData = await res.json();
        setSelectedCourseModules(moduleData);
         setCourseLoading(false)
        // console.log(moduleData);
      } catch (error) {
          console.error(error);
      }

    }
    } catch (error) {
      console.error(error);
      setCourseLoading(false);
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
        <div className={`Sidebar-container ${sidebarState? "open":"collapse"}`}>
            <Sidebar 
             setSelectedCourseModules={setSelectedCourseModules}
             selectedCourseModules = {selectedCourseModules} 
             sidebarState = {sidebarState}
             setSelectedCourse = {setSelectedCourse}
            />
        </div>
      <div className="Course-chat">
        <div className="Course-container">
            {courseLoading ? <Spinner/> : <Course />}
        </div>
        <div className="Chat-container">
          <form className="chat-form" onSubmit={handleSubmit}> 
            <input
                type="text"
                className="chat-input"
                value={prompt}
                onChange={handlePrompt}
                placeholder="  Enter your course description"
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
