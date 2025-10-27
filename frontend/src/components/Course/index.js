import React, { useState } from "react";
import "./index.css";
import { FaPenAlt } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Course = ({ course }) => {
  const [openModuleIndex,setOpenModuleIndex] = useState(null);

  const handlemoduleSelect = (moduleIndex)=>{
    setOpenModuleIndex((prev)=>
      prev === moduleIndex? null :moduleIndex
    );
  }
 console.log(course);
  return(
    course && course.modules.length > 0 ? (
      <div className="course">
          <ul className="course-modules">
            {
              course.modules.map((module,index)=>(
                <div className= "module-container"key={module._id}>
                  <button onClick={()=>handlemoduleSelect(index)}className="btn-module">
                    <span className="course-logo" ><FaPenAlt size={30}/></span> Module {index+1}: {module.title}
                  </button>
                
                    {openModuleIndex && openModuleIndex === index &&(
                        module.lessons.map((lesson,index)=>(
                          <button key= {index} className="btn-lesson-title">{lesson.title}</button>
                        
                        ))
                       
                    )}
                
                </div>
              ))
            }
          </ul>
      </div>
  
  ):(<p>Hello</p>)
)

};

export default Course;
