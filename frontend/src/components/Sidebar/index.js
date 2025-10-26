import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import './index.css';
import { IoLogOutOutline } from "react-icons/io5";
const Sidebar = ({selectedCourseModules,setSelectedCourseModules,sidebarState}) => {
  const { getAccessTokenSilently, user, logout } = useAuth0(); 
  const [courses, setCourses] =  useState(null); //Save the user courses
  const [selectedCourseId,setSelectedCourseId] = useState(null);

  const handleCourseSelect = (course)=>{
    setSelectedCourseId(course._id);
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

        const res = await fetch(`http://localhost:5000/api/modules/${course._id}`,options);
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
    const getUserCourses = async () => {
      try {
        const token = await getAccessTokenSilently();
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
          }
        };
       
        const res = await fetch('http://localhost:5000/api/course/allCourse', options);
        const data = await res.json();
        setCourses(data.courses);
        setSelectedCourseId(data?.courses[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    getUserCourses();
  }, [getAccessTokenSilently,setSelectedCourseId]);

  return (
<div className={`sidebar-container ${sidebarState?"open":"collapse"}`}>
  <div className="sidebar-top">
    <h3>Courses</h3>
    <ul className='sidebar-course-list'>
      {courses && courses.length > 0 ? (
        courses.map((course, index) => (
          <div className = "course-title" key={course._id}>
            <button  className={`btn-title ${selectedCourseId &&  selectedCourseId === course._id? "selected":""}`} onClick = {()=>handleCourseSelect(course)}>{course.title}</button>
          </div>
        ))
      ) : (
        <p>Generate Course</p>
      )}
    </ul>
  </div>

  {user && (
    <div className="sidebar-bottom">
      <img src={user.picture} alt={user.name} className="avatar" />
      <div className="user-name">{user.name}</div>
      <button className="logout" onClick={logout}><IoLogOutOutline size={24}/></button>
    </div>
  )}
</div>

  );
}

export default Sidebar;
