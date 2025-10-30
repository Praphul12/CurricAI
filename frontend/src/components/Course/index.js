import React, { useState } from "react";
import "./index.css";
import { FaPenAlt } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import {CourseContext} from "../../context/CourseContext.js" 


const Course = () => {

  const navigate = useNavigate();
  const {openModuleIndex,setSelectedCourseModules, setOpenModuleIndex,selectedCourse,selectedCourseModules} = useContext(CourseContext);
  const {getAccessTokenSilently,user} = useAuth0();
  const handlemoduleSelect = (moduleIndex)=>{
    setOpenModuleIndex((prev)=>
      prev === moduleIndex? null :moduleIndex
    );
  }

  const handleLessonSelect = async(lesson)=>{
    console.log('Type of isEnriched:', typeof lesson.isEnriched, 'Value:', lesson.isEnriched);

    const token = await getAccessTokenSilently();
    if(lesson.isEnriched === true){

      try {
        const options = {
          method: "GET",
          headers:{
            "content-type": "application/json",
            authorization : `Bearer ${token}`
          }
        }
  
        const res = await fetch(`http://localhost:5000/api/lesson/${lesson._id}`,options);
        const data = await res.json();
        const lessonData = data.lesson?.content?.[0]?.content;
        navigate(`/lesson/${lesson._id}`,{state: {lesson : lessonData}});

      }
      catch (error) {

           throw new Error("Unable to load lesson "+ error.message);

      }
        
    } //Generate course
    else{

      try {
        
  
        const options = {
          method: "POST",
          headers:{
            "content-type":"application/json",
             authorization: `Bearer ${token}`
          },
          body:
            JSON.stringify({
              "courseTitle":selectedCourse?.title,
              "moduleTitle": selectedCourseModules?.modules[openModuleIndex].title,
              "lessonTitle": lesson?.title
          })
        }
        // console.log(selectedCourse?.title,course?.modules[openModuleIndex].title,lesson?.title);
        const res = await fetch(`http://localhost:5000/api/lesson/${lesson?._id}/generate`,options);
        const data = await res.json();
        console.log("generating lesson");
        const lessonData = data.lesson?.content?.[0]?.content;
        navigate(`/lesson/${lesson._id}`,{state: {lesson : lessonData}});
        
        //We need to update the selected course with the new fetched course
                //Update the selected course
        try {
    
        const options = {
          "method": "GET",
          "headers":{
            'content-type':'application/json',
            authorization : `Bearer ${token}`
          }
        }
        const res = await fetch(`http://localhost:5000/api/modules/${selectedCourseModules._id}`,options);
        const moduleData = await res.json();
        setSelectedCourseModules(moduleData);
        console.log(moduleData);
        } catch (error) {
           throw new Error("Unable to load selected course "+ error.message);
        }

      
        
      } catch (error) {
          throw new Error("Unable to load lesson "+ error.message);
      }
    }
  } 
//  console.log(course);
  return(
    selectedCourseModules && selectedCourseModules?.modules?.length > 0 ? (
      <div className="course">
          <ul className="course-modules">
            {
              selectedCourseModules.modules.map((module,index)=>(
                <div className= "module-container"key={module._id}>
                  <button onClick={()=>handlemoduleSelect(index)}className="btn-module">
                    <span className="course-logo" ><FaPenAlt size={30}/></span> Module {index+1}: {module.title}
                  </button>
                
                    {openModuleIndex!= null && openModuleIndex === index &&(
                        module.lessons.map((lesson,index)=>(
                          <button key= {index} onClick={()=>handleLessonSelect(lesson)} className="btn-lesson-title">{lesson.title}</button>
                        
                        ))
                       
                    )}
                
                </div>
              ))
            }
          </ul>
      </div>
  
  ):(<p className="Default-text">{`Hi ${user.name},\n Got a topic? I'll turn it into a course!`}</p>)
)

};

export default Course;
