import Home from "./landing-page/home/Home.jsx";
import Header from "./landing-page/common/header/Header.jsx";
import Footer from "./landing-page/common/footer/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
import ChangePassword from "./Teacher/TeacherChangePassword.js";
import CourseDetail from "./CourseDetail";
import Privacy from "./landing-page/privacy/Privacy.jsx";
import Terms from "./landing-page/terms/Terms.jsx";
import Cookies from "./landing-page/cookies/Cookies.jsx";
import Refund from "./landing-page/refund/Refund.jsx";
import Intellect from "./landing-page/intellect/Intellect.jsx";
import CourseHome from "./landing-page/allcourses/CourseHome.jsx";
import About from "./landing-page/about/About.jsx";
import Contact from "./landing-page/contact/Contact.jsx";
import Payment from "./landing-page/payment/Payment.jsx";
import AllCourses from "./AllCourses";
import AllPopularCourses from "./AllPopularCourses";
import AllTeachers from "./AllTeachers";
import CategoryCourses from "./CategoryCourses.js";

// Student-related imports
import Login from "./User/Login";
import StudentForgotPassword from "./User/StudentForgotPassword.js";
import StudentRegister from "./User/Register";
import Dashboard from "./User/DashBoard";
import MyCourses from "./User/MyCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import FavouriteCourses from "./User/FavouriteCourses";
import ProfileSetting from "./User/ProfileSetting";
// import ChangePassword from "./User/ChangePassword";
import StudentLogout from "./User/StudentLogout.js";
import VerifyStudent from "./User/VerifyStudent.js";
import StudentAssignment from "./User/StudentAssignment.js";
import MyTeachers from "./User/MyTeachers.js";
import StudentChangeForgottenPassword from "./User/StudentChangeForgottenPassword.js";

// Teacher-related imports
import TeacherLogin from "./Teacher/TeacherLogin";
import ForgotPassword from "./Teacher/ForgotPassword.js";

import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashBoard";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangeForgottenPassword from "./Teacher/ChangePassword";
import TeacherChangePasswordPanel from "./Teacher/TeacherChangePassword.js";
import TeacherCourses from "./Teacher/TeacherCourses";
import AddCourse from "./Teacher/AddCourse";
import EditCourse from "./Teacher/EditCourse.js";
import AddChapter from "./Teacher/AddChapter.js";
import EditChapter from "./Teacher/EditChapter.js";
import CourseChapters from "./Teacher/CourseChapters.js";
import EnrolledStudents from "./Teacher/EnrolledStudents.js";
import MyStudents from "./Teacher/MyStudents.js";
import AddAssignment from "./Teacher/AddAssignment.js";
import ShowAssignment from "./Teacher/ShowAssignment.js";
import VerifyTeacher from "./Teacher/VerifyTeacher.js";
import TeacherLogout from "./Teacher/TeacherLogOut.js";

// Miscellaneous imports
import TeacherDetail from "./TeacherDetail";


function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* ========== Public Routes =====================*/}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course" element={<CourseHome />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-popular-courses" element={<AllPopularCourses />} />
        <Route path="/all-teachers" element={<AllTeachers />} />

        {/* ========== Student Routes =====================*/}
        <Route path="/student-login" element={<Login />} />
        <Route path="/student-forgot-password" element={<StudentForgotPassword />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favorite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        {/* <Route path="/change-password" element={<ChangePassword />} /> */}
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/verify-student/:student_id" element={<VerifyStudent />} />
        <Route path="/my-assignments/" element={<StudentAssignment />} />
        <Route path="/my-teachers" element={<MyTeachers />} />
        <Route path="/student-change-forgotten-password/:student_id" element={<StudentChangeForgottenPassword />} />

        {/* ========== Teacher Routes =====================*/}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher-change-forgotten-password/:teacher_id" element={<TeacherChangeForgottenPassword />} />
        <Route path="/teacher-change-password" element={<TeacherChangePasswordPanel />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
       
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/course-chapters/:course_id" element={<CourseChapters />} />
        <Route path="/enrolled-students/:course_id" element={<EnrolledStudents />} />
        <Route path="/my-students" element={<MyStudents />} />
        <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment />} />
        <Route path="/show-assignment/:student_id/:teacher_id" element={<ShowAssignment />} />
        <Route path="/verify-teacher/:teacher_id" element={<VerifyTeacher />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />

        {/* ========== Miscellaneous Routes =====================*/}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms_and_conditions" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/payment_policy" element={<Payment />} />
        <Route path="/intellectual_property" element={<Intellect />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
