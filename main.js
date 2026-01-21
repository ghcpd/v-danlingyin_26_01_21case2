const courses = [
  {
    id: "ui-design",
    title: "UI Design Fundamentals",
    shortDescription: "Principles, patterns, and practical heuristics for modern interfaces.",
    fullDescription:
      "Learn how to craft interfaces that balance aesthetics and clarity. This course covers layout systems, typography fundamentals, color strategy, component patterns, and accessibility-first thinking. You will also practice translating product goals into intentional UI decisions with critique-ready mockups.",
    level: "Beginner",
  },
  {
    id: "js-essentials",
    title: "JavaScript Essentials",
    shortDescription: "From variables to async flows, build confidence with core JavaScript.",
    fullDescription:
      "Master the fundamentals that power the web. You will work through data types, functions, scope, the DOM, events, asynchronous patterns, and modular code organization. Finish with a hands-on mini project that ties the concepts together.",
    level: "Foundations",
  },
  {
    id: "react-pro",
    title: "Advanced React Patterns",
    shortDescription: "Scale React apps with composition, state machines, and data fetching patterns.",
    fullDescription:
      "Go beyond the basics with patterns for complex React applications. Explore state management trade-offs, hooks composition, suspense-ready data fetching, performance tuning, and testable UI architecture. Build a capstone that demonstrates predictable, maintainable UI flows.",
    level: "Intermediate",
  },
  {
    id: "data-viz",
    title: "Data Visualization",
    shortDescription: "Tell stories with data using charts, narratives, and dashboards.",
    fullDescription:
      "Design visualizations that are accurate, clear, and compelling. Learn chart selection, color scales, annotation, and interactive storytelling. Apply best practices to craft dashboards that surface insights without overwhelming the audience.",
    level: "Intermediate",
  },
];

const state = {
  enrolled: new Set(),
};

const appEl = document.getElementById("app");
const navLinks = document.querySelectorAll(".nav-link");

const routes = {
  courses: "courses",
  myCourses: "my-courses",
};

function parseHash() {
  const hash = window.location.hash || "#/courses";
  const [, path, maybeId] = hash.split("/");
  if (path === "courses" && maybeId) {
    return { view: "course-detail", courseId: maybeId };
  }
  if (path === "my-courses") {
    return { view: "my-courses" };
  }
  return { view: "courses" };
}

function setActiveNav(route) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.link === route);
  });
}

function render() {
  const route = parseHash();
  if (!appEl) return;

  switch (route.view) {
    case "courses":
      setActiveNav(routes.courses);
      appEl.innerHTML = renderCourseList();
      attachListHandlers();
      break;
    case "course-detail":
      setActiveNav(routes.courses);
      appEl.innerHTML = renderCourseDetail(route.courseId);
      attachDetailHandlers(route.courseId);
      break;
    case "my-courses":
      setActiveNav(routes.myCourses);
      appEl.innerHTML = renderMyCourses();
      attachMyCoursesHandlers();
      break;
    default:
      setActiveNav(routes.courses);
      appEl.innerHTML = renderCourseList();
      attachListHandlers();
  }
}

function renderCourseList() {
  const cards = courses
    .map(
      (course) => `
        <article class="course-card">
          <div class="badge">${course.level}</div>
          <h3>${course.title}</h3>
          <p class="meta">${course.shortDescription}</p>
          <div class="actions">
            <a class="button secondary" href="#/courses/${course.id}">View details</a>
            <button class="button primary enroll" data-course="${course.id}" ${
              state.enrolled.has(course.id) ? "disabled" : ""
            }>${state.enrolled.has(course.id) ? "Enrolled" : "Enroll"}</button>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="page" aria-label="Course list">
      <h1>Courses</h1>
      <p class="lead">Browse available courses and jump into the ones that fit your goals.</p>
      <div class="course-grid">${cards}</div>
    </section>
  `;
}

function renderCourseDetail(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return `
      <section class="page">
        <h1>Course not found</h1>
        <p class="lead">We couldn't find that course. Head back to the catalog.</p>
        <div class="actions">
          <a class="button secondary" href="#/courses">Back to list</a>
        </div>
      </section>
    `;
  }

  const enrolled = state.enrolled.has(course.id);
  return `
    <section class="page detail" aria-label="Course detail">
      <div class="hero">
        <p class="badge">${course.level}</p>
        <h1>${course.title}</h1>
        <p class="meta">${course.shortDescription}</p>
      </div>
      <div class="body">${course.fullDescription}</div>
      <div class="actions">
        <button class="button primary enroll" data-course="${course.id}" ${
          enrolled ? "disabled" : ""
        }>${enrolled ? "Enrolled" : "Enroll"}</button>
        <a class="button secondary" href="#/courses">Back to list</a>
      </div>
    </section>
  `;
}

function renderMyCourses() {
  const enrolledCourses = courses.filter((course) => state.enrolled.has(course.id));

  const list = enrolledCourses
    .map(
      (course) => `
        <article class="course-card">
          <div class="badge">${course.level}</div>
          <h3>${course.title}</h3>
          <p class="meta">${course.shortDescription}</p>
          <div class="actions">
            <a class="button secondary" href="#/courses/${course.id}">View again</a>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="page" aria-label="My courses">
      <h1>My Courses</h1>
      <p class="lead">Enrolled courses stay here until you unenroll (no persistence).</p>
      ${
        enrolledCourses.length
          ? `<div class="course-grid">${list}</div>`
          : '<div class="empty">You have not enrolled yet. Browse the catalog to start learning.</div>'
      }
    </section>
  `;
}

function handleEnroll(courseId) {
  state.enrolled.add(courseId);
  render();
}

function attachListHandlers() {
  const buttons = document.querySelectorAll(".enroll");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const courseId = btn.dataset.course;
      handleEnroll(courseId);
    });
  });
}

function attachDetailHandlers(courseId) {
  const btn = document.querySelector(".enroll");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    handleEnroll(courseId);
  });
}

function attachMyCoursesHandlers() {
  // Currently no actions needed; reserved for future UX tweaks.
}

window.addEventListener("hashchange", render);

render();
