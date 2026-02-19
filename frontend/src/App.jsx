import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/userPage/Home";
import Service from "./pages/userPage/Services";
import Blog from "./pages/userPage/Blog";
import Contact from "./pages/userPage/Contact";
import Portfolio from "./pages/userPage/Portfolio";
import Career from "./pages/userPage/Career";
import AIAssistant from "./components/AIAssistant";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import ServicesFixed from "./pages/userPage/Servicesfixed";
import AuthPage from "./pages/admin/auth-page";
import AboutUs from "./components/About";
import AboutUsPage from "./pages/userPage/AboutUs";
import BlogDetails from "./pages/userPage/BlogDetails";
import CustomCursor from "./components/CustomCursor";
import ServiceDetails from "./pages/userPage/ServiceDetails";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesFixed />} />
        {/* <Route path="/services/:slug" element={<ServicesFixed />} /> */}
        <Route path="/services/:slug" element={<ServiceDetails />} />
        {/* admin */}
        <Route path="/admin/create-blog" element={<AdminCreateBlog />} />
        <Route path="/admin/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
      <CustomCursor />
      {/* AI Assistant Hub */}
      <AIAssistant />
    </BrowserRouter>
  );
}

export default App;
