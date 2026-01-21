# Online Course Catalog

A complete frontend application for browsing and enrolling in online courses.

## Features

- **Course List Page**: Browse all available courses with title and short description
- **Course Detail Page**: View full course description and enroll in courses
- **My Courses Page**: View all courses you've enrolled in
- **State Management**: Enrollment state shared across all pages
- **Routing**: Navigate seamlessly between pages

## Tech Stack

- React 18
- React Router v6
- Vite
- Context API for state management

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── pages/
│   │   ├── CourseList.jsx      # Main course listing page
│   │   ├── CourseDetail.jsx    # Individual course details
│   │   └── MyCourses.jsx       # Enrolled courses page
│   ├── context/
│   │   └── CoursesContext.jsx  # Global state management
│   ├── data/
│   │   └── mockCourses.js      # Mock course data
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. **Browse Courses**: Start on the Course List page to see all available courses
2. **View Details**: Click "View Details" to see full course information
3. **Enroll**: Click "Enroll Now" on the course detail page to enroll
4. **View My Courses**: Navigate to "My Courses" to see all enrolled courses
5. **Enrollment Status**: The enroll button becomes disabled after enrolling

## Notes

- No persistence: Enrolled courses are stored in memory only
- No authentication: All features available without login
- Mock data only: Courses are defined in mockCourses.js
