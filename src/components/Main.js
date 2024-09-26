import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
