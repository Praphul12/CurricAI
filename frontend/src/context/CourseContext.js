import React, { useState, createContext, useMemo, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const APP_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [sidebarState, setSidebarState] = useState(window.innerWidth < 600 ? false:true);
  const [openModuleIndex, setOpenModuleIndex] = useState(null); 
  const [courses, setCourses] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseModules, setSelectedCourseModules] = useState(null);
 
  const getUserCourses = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${APP_URL}/api/course/allCourse`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCourses(data.courses);
      setSelectedCourseId(null);
    } catch (error) {
      console.error(error);
    }
  }, [getAccessTokenSilently]);

  const value = useMemo(
    () => ({
        
      openModuleIndex,
      setOpenModuleIndex,
      courses,
      setCourses,
      selectedCourseId,
      setSelectedCourseId,
      sidebarState,
      setSidebarState,
      selectedCourse,
      setSelectedCourse,
      selectedCourseModules,
      setSelectedCourseModules,
      getUserCourses,

    }),
    [
      openModuleIndex,
      courses,
      selectedCourseId,
      sidebarState,
      selectedCourse,
      selectedCourseModules,
      getUserCourses,
     
    ]
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
