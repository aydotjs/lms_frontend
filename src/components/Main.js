import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom"; // Avoid aliasing Routes as Switch
import AboutUsPage from "./AboutUsPage";
import CourseDetail from "./CourseDetail";
import Login from "./User/Login";
import Register from "./User/Register";
import Dashboard from "./User/DashBoard";
import MyCourses from "./User/MyCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import FavouriteCourses from "./User/FavouriteCourses";
import ProfileSetting from "./User/ProfileSetting";
import ChangePassword from "./User/ChangePassword";
// =============Teacher Panels=======---
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherLogout from "./Teacher/TeacherLogOut.js";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashBoard";
import AddCourse from "./Teacher/AddCourse";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import TeacherCourses from "./Teacher/TeacherCourses";
import TeacherDetail from "./TeacherDetail";
import AllCourses from "./AllCourses";
import AllPopularCourses from "./AllPopularCourses";
import AllTeachers from "./AllTeachers";
import CategoryCourses from "./CategoryCourses.js";
import AddChapter from "./Teacher/AddChapter.js";
import EditChapter from "./Teacher/EditChapter.js";
import EditCourse from "./Teacher/EditCourse.js";
import CourseChapters from "./Teacher/CourseChapters.js";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />

        {/* ==========Student Panels =====================*/}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favorite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* ==========Teacher Panels =====================*/}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-popular-courses" element={<AllPopularCourses />} />
        <Route path="/all-teachers" element={<AllTeachers />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/course-chapters/:course_id" element={<CourseChapters />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
