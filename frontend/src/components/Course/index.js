import React, { useState } from "react";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";

const Course = ({ course }) => {
  
 console.log(course);
  return(
    course && course.modules.length > 0 ? (
      <div className="course">
          <ul className="course-modules">
            {
              course.modules.map((module,index)=>(
                <div className= "module-container"key={module._id}>
                  <button className="btn-module">
                    {module.title}
                  </button>
                </div>
              ))
            }
          </ul>
      </div>
  
  ):(<p>Hello</p>)
)

};

export default Course;
