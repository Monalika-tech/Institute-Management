/** Central route paths — must match app/routes.jsx */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  CLASSES: "/classes",
  STUDENTS: "/students",
  ADD_CLASS: "/addClass",
  EDIT_CLASS: (id) => `/editClass/${id}`,
  ADD_STUDENT: "/addStudent",
  EDIT_STUDENT: (id) => `/editStudent/${id}`,
  EDIT_PROFILE: "/editProfile",
  ATTENDANCE: "/attendance",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  CLASS_DETAIL: (id) => `/class/${id}`,
  teacherProfile: (id) => `/Teacher/${id}`,
  studentProfile: (id) => `/student/${id}`,
};
