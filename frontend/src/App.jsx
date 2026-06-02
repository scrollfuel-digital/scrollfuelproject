import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

/* Lazy-loaded user pages */
const Home = lazy(() => import("./pages/userPage/Home"));
const Blog = lazy(() => import("./pages/userPage/Blog"));
const BlogDetails = lazy(() => import("./pages/userPage/BlogDetails"));
const Contact = lazy(() => import("./pages/userPage/Contact"));
const Portfolio = lazy(() => import("./pages/userPage/Portfolio"));
const VideoPortfolio = lazy(() => import("./pages/userPage/VideoPortfolio"));
const SocialMediaPortfolio = lazy(() => import("./pages/userPage/SocialMediaPortfolio"));
const Career = lazy(() => import("./pages/userPage/Career"));
const ServicesFixed = lazy(() => import("./pages/userPage/Servicesfixed"));
const ServiceDetails = lazy(() => import("./pages/userPage/ServiceDetails"));
const AboutUs = lazy(() => import("./components/About"));
const AboutUsPage = lazy(() => import("./pages/userPage/AboutUs"));

/* Lazy-loaded admin pages */
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdminCreateBlog = lazy(() => import("./pages/admin/AdminCreateBlog"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminEditBlog = lazy(() => import("./pages/admin/AdminEditBlog"));
const AuthPage = lazy(() => import("./pages/admin/auth-page"));
const ContactMessage = lazy(() => import("./components/admin/ContactMessage"));
const AdminCarrerPage = lazy(() => import("./components/admin/AdminCarrerPage"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));

/* Lazy-loaded non-critical layout pieces */
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const AIAssistant = lazy(() => import("./components/AIAssistant"));

/* Full-page loader fallback */
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-black">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin" />
  </div>
);

/* Wraps any lazy element in its own Suspense — valid inside <Route element={...}> */
const S = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;

  /* Theme initialization */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // GOOGLE ANALYTICS TRACKING
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<S><Home /></S>} />
        <Route path="/about" element={<S><AboutUs /></S>} />
        <Route path="/aboutus" element={<S><AboutUsPage /></S>} />
        <Route path="/blog" element={<S><Blog /></S>} />
        <Route path="/blog/:slug" element={<S><BlogDetails /></S>} />
        <Route path="/portfolio/social-media-marketing" element={<S><SocialMediaPortfolio /></S>} />
        <Route path="/portfolio/video" element={<S><VideoPortfolio /></S>} />
        <Route path="/portfolio/:category" element={<S><Portfolio /></S>} />
        <Route path="/career" element={<S><Career /></S>} />
        <Route path="/contact" element={<S><Contact /></S>} />
        <Route path="/services" element={<S><ServicesFixed /></S>} />
        <Route path="/services/:slug" element={<S><ServiceDetails /></S>} />

        {/* ADMIN AUTH */}
        <Route path="/admin/auth" element={<S><AuthPage /></S>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout active="dashboard"><S><AdminDashboard /></S></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminLayout active="messages"><S><ContactMessage /></S></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/careers" element={<ProtectedRoute><AdminLayout active="careers"><S><AdminCarrerPage /></S></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminLayout active="jobs"><S><AdminJobs /></S></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute><S><AdminBlogs /></S></ProtectedRoute>} />
        <Route path="/admin/create-blog" element={<ProtectedRoute><S><AdminCreateBlog /></S></ProtectedRoute>} />
        <Route path="/admin/edit-blog/:id" element={<ProtectedRoute><S><AdminEditBlog /></S></ProtectedRoute>} />
      </Routes>

      {!isAdminRoute && <Footer />}

      <Suspense fallback={null}>
        {!isAdminRoute && isDesktop && <CustomCursor />}
      </Suspense>

      <Suspense fallback={null}>
        {!isAdminRoute && <AIAssistant />}
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;