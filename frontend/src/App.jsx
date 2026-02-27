import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import AIAssistant from "./components/AIAssistant";

import Home from "./pages/userPage/Home";
import Blog from "./pages/userPage/Blog";
import BlogDetails from "./pages/userPage/BlogDetails";
import Contact from "./pages/userPage/Contact";
import Portfolio from "./pages/userPage/Portfolio";
import Career from "./pages/userPage/Career";
import ServicesFixed from "./pages/userPage/Servicesfixed";
import ServiceDetails from "./pages/userPage/ServiceDetails";
import AboutUs from "./components/About";
import AboutUsPage from "./pages/userPage/AboutUs";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminEditBlog from "./pages/admin/AdminEditBlog";
import AuthPage from "./pages/admin/auth-page";

import ProtectedRoute from "./components/admin/ProtectedRoute";

function Layout() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide Navbar for admin */}
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* USER ROUTES */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesFixed />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />


        {/* ADMIN AUTH (PUBLIC) */}

        <Route path="/admin/auth" element={<AuthPage />} />


        {/* ADMIN ROUTES (PROTECTED) */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-blog"
          element={
            <ProtectedRoute>
              <AdminCreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-blog/:id"
          element={
            <ProtectedRoute>
              <AdminEditBlog />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Hide Footer for admin */}
      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <CustomCursor />}

      {!isAdminRoute && <AIAssistant />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;