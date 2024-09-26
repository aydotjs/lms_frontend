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
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
