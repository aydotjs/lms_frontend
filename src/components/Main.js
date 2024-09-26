import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes as Switch } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
import CourseDetail from "./CourseDetail";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/detail/:course_id" element={<CourseDetail/>} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
