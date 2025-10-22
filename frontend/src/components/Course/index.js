import React, { useState } from "react";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";

const Course = ({ data }) => {
  const [openModuleIndex, setOpenModuleIndex] = useState(null);
  const [openLessonIndex, setOpenLessonIndex] = useState({}); // store open lesson per module
  const navigate = useNavigate();

  
  if (!data) return <p>Loading...</p>;
  const rawContent = data.choices[0].message.content;
  const course = JSON.parse(rawContent); // Extract the actual course
  const toggleModule = (index) => {
      setOpenModuleIndex(openModuleIndex === index ? null : index);
    };
    
    const openLesson = (moduleTitle,lessonTitle)=>{
        navigate(`/lesson/${course.title}/${moduleTitle}/${lessonTitle}`);
    }
    
  return (
    <div className="course-container">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>

      <ul className="module-list">
        {course.modules.map((module, i) => (
          <li key={i} className="module-item">
            <button 
              className={`module-button ${openModuleIndex === i ? "open" : ""}`}
              onClick={() => toggleModule(i)}
            >
              {module.title}
            </button>

            {openModuleIndex === i && (
              <ul className="lesson-list">
                {module.lessons.map((lesson, j) => (
                  <li key={j} className="lesson-item">
                    <button
                      className={`lesson-button ${
                        openLessonIndex[i] === j ? "open" : ""
                      }`}
                      onClick={() => openLesson(module.title, lesson.title)}
                    >
                      {lesson.title || lesson}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
