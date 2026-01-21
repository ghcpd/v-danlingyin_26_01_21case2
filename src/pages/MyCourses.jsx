import { Link } from 'react-router-dom';
import { useCourses } from '../context/CoursesContext';

function MyCourses() {
  const { getEnrolledCoursesList } = useCourses();
  const enrolledCourses = getEnrolledCoursesList();

  return (
    <div className="page">
      <h1>My Courses</h1>
      
      {enrolledCourses.length === 0 ? (
        <div className="empty-state">
          <p>You haven't enrolled in any courses yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="course-list">
          {enrolledCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.shortDescription}</p>
              <Link to={`/course/${course.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
