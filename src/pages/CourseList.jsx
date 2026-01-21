import { Link } from 'react-router-dom';
import { useCourses } from '../context/CoursesContext';

function CourseList() {
  const { courses } = useCourses();

  return (
    <div className="page">
      <h1>Course List</h1>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.shortDescription}</p>
            <Link to={`/course/${course.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
