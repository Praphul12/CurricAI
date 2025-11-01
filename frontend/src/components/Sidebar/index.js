import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import './index.css';
import { IoLogOutOutline } from "react-icons/io5";
import {CourseContext} from "../../context/CourseContext.js" 
import { useContext } from 'react';
const Sidebar = () => {
  const {setSelectedCourseModules,getUserCourses,sidebarState,setSelectedCourse,courses,setCourses,selectedCourseId,setSelectedCourseId} = useContext(CourseContext);
  const { getAccessTokenSilently, user, logout } = useAuth0(); 
  const APP_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleCourseSelect = (course)=>{
    setSelectedCourseId(course._id);
    setSelectedCourse(course);
    const getCourseModules = async()=>{
      try {
        const token = await getAccessTokenSilently();
        const options = {
          "method": "GET",
          "headers":{
            'content-type':'application/json',
            authorization : `Bearer ${token}`
          }
        }
        

        //Fetch the selected course from the backend  
        const res = await fetch(`${APP_URL}/api/modules/${course._id}`,options);
        const moduleData = await res.json();
        setSelectedCourseModules(moduleData);
        // console.log(moduleData);
      } catch (error) {
          console.error(error);
      }

    }
    getCourseModules();
  }
  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return (
<div className={"sidebar-container"}>
  <div className="sidebar-top">
    <h3 className='course-heading'>Courses</h3>
    <ul className='sidebar-course-list'>
      {courses && courses.length > 0 ? (
        courses.map((course, index) => (
          <div className = "course-title" key={course._id}>
            <button  className={`btn-title ${selectedCourseId &&  selectedCourseId === course._id? "selected":""}`} onClick = {()=>handleCourseSelect(course)}>{course.title.length > 50 ? course.title.slice(0,50) + ".." : course.title }</button>
          </div>
        ))
      ) : (
        <p>No Course</p>
      )}
    </ul>
  </div>

  {user && (
    <div className="sidebar-bottom">
      <img src={user.picture} alt={user.name} className="avatar" referrerPolicy='no-referrer'/>
      <div className="user-name">{user.name}</div>
      <button className="logout" onClick={logout}><IoLogOutOutline size={24}/></button>
    </div>
  )}
</div>

  );
}

export default Sidebar;
