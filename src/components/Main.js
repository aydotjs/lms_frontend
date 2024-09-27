import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes as Switch } from "react-router-dom";
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
// =============Teacher Panels
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherRegister from "./Teacher/TeacherRegister"
import TeacherDashboard from "./Teacher/TeacherDashBoard";
import AddCourse from "./Teacher/AddCourse";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./Teacher/TeacherChangePassword"
import TeacherCourses from "./Teacher/TeacherCourses";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/detail/:course_id" element={<CourseDetail/>} />
        <Route path="/user-login" element={<Login/>} />
        <Route path="/user-register" element={<Register/>} />
        <Route path="/user-dashboard" element={<Dashboard/>} />
        <Route path="/my-courses" element={<MyCourses/>} />
        <Route path="/favorite-courses" element={<FavouriteCourses/>} />
        <Route path="/recommended-courses" element={<RecommendedCourses/>} />
        <Route path="/profile-setting" element={<ProfileSetting/>} />
        <Route path='/change-password' element={<ChangePassword/>} />
        {/* ==========Teacher Panels =====================*/}
        <Route path="/teacher-login" element={<TeacherLogin/>} />
        <Route path="/teacher-register" element={<TeacherRegister/>} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />
        <Route path="/add-course" element={<AddCourse/>} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting/>} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword/>} />
        <Route path="/teacher-courses" element={<TeacherCourses/>} />
        

      </Switch>

      <Footer />
    </div>
  );
}

export default App;
