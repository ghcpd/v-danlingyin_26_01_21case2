import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CoursesContext';

function CourseDetail() {
  const { id } = useParams();
  const { courses, enrollInCourse, isEnrolled } = useCourses();
  
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="page">
        <h1>Course Not Found</h1>
        <Link to="/" className="btn">Back to Course List</Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    enrollInCourse(course.id);
  };

  return (
    <div className="page">
      <h1>{course.title}</h1>
      <div className="course-detail">
        <h3>Description</h3>
        <p>{course.fullDescription}</p>
        
        <div className="course-actions">
          <button 
            onClick={handleEnroll} 
            disabled={enrolled}
            className={`btn ${enrolled ? 'btn-disabled' : 'btn-success'}`}
          >
            {enrolled ? 'Already Enrolled' : 'Enroll Now'}
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
