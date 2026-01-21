import { createContext, useContext, useState } from 'react';
import { mockCourses } from '../data/mockCourses';

const CoursesContext = createContext();

export function CoursesProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  const getEnrolledCoursesList = () => {
    return mockCourses.filter(course => enrolledCourses.includes(course.id));
  };

  return (
    <CoursesContext.Provider value={{
      courses: mockCourses,
      enrolledCourses,
      enrollInCourse,
      isEnrolled,
      getEnrolledCoursesList
    }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}
