import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CoursesProvider } from './context/CoursesContext';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import MyCourses from './pages/MyCourses';
import './App.css';

function App() {
  return (
    <CoursesProvider>
      <BrowserRouter>
        <div className="app">
          <nav className="navbar">
            <div className="nav-brand">
              <h2>Online Course Catalog</h2>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Course List</Link></li>
              <li><Link to="/my-courses">My Courses</Link></li>
            </ul>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<CourseList />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/my-courses" element={<MyCourses />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CoursesProvider>
  );
}

export default App;
