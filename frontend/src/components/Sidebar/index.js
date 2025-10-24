import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import './index.css';
import logo from '../../assets/logo.png'
const Sidebar = () => {
  const { getAccessTokenSilently, user, logout } = useAuth0(); 
  const [courses, setCourses] = useState([]); 

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
      } catch (error) {
        console.error(error);
      }
    };
    getUserCourses();
  }, [getAccessTokenSilently]);

  return (
<div className='sidebar-container'>
  <div className='sidebar-header'>
    <img src={logo} alt='CurricAI' className='sidebar-logo' />
    <h2 className='sidebar-title'>Curric AI</h2>
  </div>

  <div className="sidebar-top">
    <h3>Courses</h3>
    <ul className='course-list'>
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <li key={index}>
            <button className='course-btn'>{course.title}</button>
          </li>
        ))
      ) : (
        <p>No courses</p>
      )}
    </ul>
  </div>

  {user && (
    <div className="sidebar-bottom">
      <img src={user.picture} alt={user.name} className="sidebar-avatar" />
      <span className="sidebar-name">{user.name}</span>
      <button className="sidebar-logout" onClick={logout}>Logout</button>
    </div>
  )}
</div>

  );
}

export default Sidebar;
