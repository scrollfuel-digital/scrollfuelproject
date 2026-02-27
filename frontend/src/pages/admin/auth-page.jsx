import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // If already logged in redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  useEffect(() => {

    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 8 + 12
    }));

    setParticles(newParticles);

    const interval = setInterval(() => {
      setOrbitAngle(prev => (prev + 1) % 360);
    }, 30);

    return () => clearInterval(interval);

  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15
    });
  };


  // LOGIN / SIGNUP
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const url = isLogin
        ? `${API}/api/admin/login`
        : `${API}/api/admin/signup`;

      const payload = isLogin
        ? {
          email: formData.email,
          password: formData.password,
        }
        : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Something went wrong");
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // reset form
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // Redirect to Admin Dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const toggleAuthMode = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };


  // GOOGLE LOGIN
  const googleLogin = () => {

    // backend will redirect after auth
    window.location.href = `${API}/api/admin/google`;

  };

  return (
    <div
      className="min-h-screen bg-dark flex overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.id % 2 === 0 ? '#8bc53f' : '#ffc93b',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto flex items-center">
        <div className="grid lg:grid-cols-2 gap-0 w-full min-h-screen">

          {/* LEFT COLUMN - Animated Illustration */}
          <div className="relative bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8 lg:p-16 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${isLogin ? '#8bc53f' : '#ffc93b'} 0%, transparent 70%)`,
                  transition: 'background 0.6s ease'
                }}
              />
              <div
                className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${isLogin ? '#ffc93b' : '#8bc53f'} 0%, transparent 70%)`,
                  transition: 'background 0.6s ease'
                }}
              />
            </div>

            <div className="relative z-10 w-full max-w-lg">
              {/* Main animated illustration container */}
              <div
                className="relative transition-all duration-700"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)`,
                }}
              >
                {/* Central illustration scene */}
                <div className="relative h-500px flex items-center justify-center">

                  {/* Orbiting elements */}
                  <div className="absolute inset-0">
                    {[0, 60, 120, 180, 240, 300].map((offset, idx) => {
                      const angle = (orbitAngle + offset) * (Math.PI / 180);
                      const radius = 180;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius * 0.5;

                      return (
                        <div
                          key={idx}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                            opacity: isLogin ? (idx % 2 === 0 ? 1 : 0.3) : (idx % 2 === 1 ? 1 : 0.3)
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg shadow-lg transform rotate-45"
                            style={{
                              backgroundColor: idx % 2 === 0 ? '#8bc53f' : '#ffc93b',
                              animation: 'float 3s ease-in-out infinite',
                              animationDelay: `${idx * 0.2}s`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Central device illustration */}
                  <div className="relative z-20">
                    {/* Login: Laptop illustration */}
                    <div
                      className={`transition-all duration-700 ${isLogin
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-75 -rotate-12 pointer-events-none'
                        }`}
                      style={{ position: isLogin ? 'relative' : 'absolute', top: isLogin ? 0 : '50%', left: isLogin ? 0 : '50%' }}
                    >
                      {/* Laptop screen */}
                      <div className="relative">
                        <div
                          className="w-72 h-48 bg-dark rounded-t-2xl border-8 border-dark relative overflow-hidden shadow-2xl"
                          style={{
                            animation: 'float 4s ease-in-out infinite'
                          }}
                        >
                          {/* Screen content */}
                          <div className="absolute inset-2 bg-white rounded-lg overflow-hidden">
                            {/* Browser chrome */}
                            <div className="h-6 bg-gray-100 flex items-center px-2 gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#27c93f' }} />
                            </div>

                            {/* Screen content - Login form preview */}
                            <div className="p-4 space-y-3">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: focusedField === 'email' ? '100%' : '75%',
                                  backgroundColor: '#8bc53f'
                                }}
                              />
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: focusedField === 'password' ? '100%' : '60%',
                                  backgroundColor: '#ffc93b'
                                }}
                              />
                              <div className="flex gap-2 mt-4">
                                <div
                                  className="w-16 h-6 rounded-lg"
                                  style={{
                                    backgroundColor: '#8bc53f',
                                    animation: 'pulse 2s ease-in-out infinite'
                                  }}
                                />
                              </div>

                              {/* Animated check icon when fields are filled */}
                              {formData.email && formData.password && (
                                <div className="flex justify-center mt-4">
                                  <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{
                                      backgroundColor: '#8bc53f',
                                      animation: 'float 2s ease-in-out infinite'
                                    }}
                                  >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Laptop base */}
                        <div className="w-80 h-3 bg-dark rounded-b-xl relative mx-auto">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-muted rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Signup: Digital Marketing Dashboard illustration */}
                    <div
                      className={`transition-all duration-700 ${!isLogin
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-75 rotate-12 pointer-events-none'
                        }`}
                      style={{ position: !isLogin ? 'relative' : 'absolute', top: !isLogin ? 0 : '50%', left: !isLogin ? 0 : '50%' }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Dashboard screen */}
                        <div
                          className="w-80 h-64 bg-dark rounded-2xl border-8 border-dark relative overflow-hidden shadow-2xl"
                          style={{
                            animation: 'float 4s ease-in-out infinite',
                            animationDelay: '0.5s'
                          }}
                        >
                          {/* Screen content */}
                          <div className="absolute inset-2 bg-white rounded-lg overflow-hidden">
                            {/* Dashboard header */}
                            <div className="h-8 bg-gray-100 flex items-center justify-between px-3 border-b border-gray-200">
                              <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                              </div>
                              <span className="text-xs font-semibold text-dark">Analytics Dashboard</span>
                              <div className="w-12" />
                            </div>

                            {/* Dashboard content */}
                            <div className="p-3 space-y-2">
                              {/* Stats cards */}
                              <div className="grid grid-cols-3 gap-2">
                                <div
                                  className="h-10 rounded-lg flex flex-col justify-center px-2"
                                  style={{
                                    backgroundColor: '#f0fdf4',
                                    animation: 'pulse 2s ease-in-out infinite'
                                  }}
                                >
                                  <div className="w-8 h-1 rounded-full mb-1" style={{ backgroundColor: '#8bc53f' }} />
                                  <div className="w-6 h-1 rounded-full" style={{ backgroundColor: '#8bc53f', opacity: 0.5 }} />
                                </div>
                                <div
                                  className="h-10 rounded-lg flex flex-col justify-center px-2"
                                  style={{
                                    backgroundColor: '#fffef0',
                                    animation: 'pulse 2s ease-in-out infinite',
                                    animationDelay: '0.3s'
                                  }}
                                >
                                  <div className="w-8 h-1 rounded-full mb-1" style={{ backgroundColor: '#ffc93b' }} />
                                  <div className="w-6 h-1 rounded-full" style={{ backgroundColor: '#ffc93b', opacity: 0.5 }} />
                                </div>
                                <div
                                  className="h-10 rounded-lg flex flex-col justify-center px-2"
                                  style={{
                                    backgroundColor: '#f0fdf4',
                                    animation: 'pulse 2s ease-in-out infinite',
                                    animationDelay: '0.6s'
                                  }}
                                >
                                  <div className="w-8 h-1 rounded-full mb-1" style={{ backgroundColor: '#8bc53f' }} />
                                  <div className="w-6 h-1 rounded-full" style={{ backgroundColor: '#8bc53f', opacity: 0.5 }} />
                                </div>
                              </div>

                              {/* Bar chart */}
                              <div className="flex items-end gap-1 h-20 px-2 pt-2 bg-gray-50 rounded-lg">
                                {[0.4, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7].map((height, idx) => (
                                  <div
                                    key={idx}
                                    className="flex-1 rounded-t transition-all duration-500"
                                    style={{
                                      height: `${height * 100}%`,
                                      backgroundColor: idx % 2 === 0 ? '#8bc53f' : '#ffc93b',
                                      animation: 'float 3s ease-in-out infinite',
                                      animationDelay: `${idx * 0.1}s`,
                                      opacity: focusedField ? 1 : 0.7
                                    }}
                                  />
                                ))}
                              </div>

                              {/* Line chart */}
                              <div className="relative h-16 bg-gray-50 rounded-lg p-2">
                                <svg width="100%" height="100%" viewBox="0 0 200 50" preserveAspectRatio="none">
                                  <polyline
                                    fill="none"
                                    stroke="#8bc53f"
                                    strokeWidth="2"
                                    points="0,40 30,25 60,30 90,15 120,20 150,10 180,15 200,5"
                                    style={{
                                      animation: 'float 4s ease-in-out infinite'
                                    }}
                                  />
                                  <polyline
                                    fill="none"
                                    stroke="#ffc93b"
                                    strokeWidth="2"
                                    points="0,45 30,35 60,40 90,30 120,35 150,25 180,30 200,20"
                                    style={{
                                      animation: 'float 4s ease-in-out infinite',
                                      animationDelay: '0.5s'
                                    }}
                                  />
                                </svg>
                              </div>

                              {/* Progress indicators */}
                              {(formData.username || formData.email || formData.password) && (
                                <div className="flex justify-center gap-2 mt-2">
                                  {['username', 'email', 'password'].map((field, idx) => (
                                    <div
                                      key={field}
                                      className="flex items-center gap-1"
                                    >
                                      <div
                                        className="w-2 h-2 rounded-full transition-all duration-300"
                                        style={{
                                          backgroundColor: formData[field] ? (idx % 2 === 0 ? '#8bc53f' : '#ffc93b') : '#e5e5e5'
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating icons around devices */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Lock icon - Login */}
                    <div
                      className="absolute top-12 right-8 transition-all duration-700"
                      style={{
                        animation: 'float 3s ease-in-out infinite',
                        animationDelay: '0.5s',
                        opacity: isLogin ? 1 : 0,
                        transform: isLogin ? 'scale(1)' : 'scale(0.5)'
                      }}
                    >
                      <div className="w-16 h-16 bg-primary rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>

                    {/* Chart/Analytics icon - Signup */}
                    <div
                      className="absolute top-20 left-12 transition-all duration-700"
                      style={{
                        animation: 'float 3.5s ease-in-out infinite',
                        animationDelay: '1s',
                        opacity: !isLogin ? 1 : 0,
                        transform: !isLogin ? 'scale(1)' : 'scale(0.5)'
                      }}
                    >
                      <div className="w-14 h-14 bg-secondary rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Email icon */}
                    <div
                      className="absolute bottom-24 left-16 transition-all duration-700"
                      style={{
                        animation: 'float 4s ease-in-out infinite',
                        animationDelay: '0.3s',
                        opacity: isLogin ? 1 : 0.7
                      }}
                    >
                      <div className="w-12 h-12 bg-secondary rounded-xl shadow-lg flex items-center justify-center transform rotate-6">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Target/Growth icon - Signup */}
                    <div
                      className="absolute bottom-32 right-20 transition-all duration-700"
                      style={{
                        animation: 'float 3.2s ease-in-out infinite',
                        animationDelay: '0.7s',
                        opacity: !isLogin ? 1 : 0.6
                      }}
                    >
                      <div className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome text with animation */}
              <div
                className={`text-center mt-12 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
              >
                <h1
                  className="text-5xl font-bold mb-4 transition-colors duration-600"
                  style={{
                    color: isLogin ? '#8bc53f' : '#ffc93b'
                  }}
                >
                  {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                </h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                  {isLogin
                    ? 'Sign in to continue your journey with us'
                    : 'Create your account and unlock amazing features'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Animated Form */}
          <div className="relative bg-black flex items-center justify-center p-6 lg:p-18">
            <div className="w-full max-w-md relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 opacity-20 pointer-events-none" style={{
                background: `radial-gradient(circle, ${isLogin ? '#8bc53f' : '#ffc93b'} 0%, transparent 70%)`,
                animation: 'float 5s ease-in-out infinite',
                transition: 'background 0.6s ease'
              }} />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 opacity-20 pointer-events-none" style={{
                background: `radial-gradient(circle, ${isLogin ? '#ffc93b' : '#8bc53f'} 0%, transparent 70%)`,
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '1s',
                transition: 'background 0.6s ease'
              }} />

              {/* Form card with animation */}
              <div
                className={`relative bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-800 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
                  }`}
                style={{
                  boxShadow: `0 20px 60px rgba(${isLogin ? '139, 197, 63' : '255, 201, 59'}, 0.25)`
                }}
              >
                {/* Form header */}
                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500"
                    style={{
                      backgroundColor: isLogin ? '#8bc53f' : '#ffc93b',
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isLogin ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      )}
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-gray-400 text-xs mt-1.5">
                    {isLogin ? 'Enter your credentials to continue' : 'Fill in your details to get started'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username field (only for signup) */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${!isLogin ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="relative group">
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Username
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('username')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 pl-11 border-2 rounded-xl focus:outline-none transition-all duration-300 text-white text-sm"
                          style={{
                            borderColor: focusedField === 'username' ? '#ffc93b' : '#374151',
                            backgroundColor: focusedField === 'username' ? '#1f2937' : '#111827',
                            transform: focusedField === 'username' ? 'translateY(-2px)' : 'translateY(0)',
                            boxShadow: focusedField === 'username' ? '0 8px 16px rgba(255, 201, 59, 0.25)' : 'none'
                          }}
                          placeholder="Choose a username"
                        />
                        <div
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-300"
                          style={{
                            color: focusedField === 'username' ? '#ffc93b' : '#9ca3af',
                            transform: focusedField === 'username' ? 'scale(1.1)' : 'scale(1)'
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        {formData.username && (
                          <div
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary"
                            style={{ animation: 'float 2s ease-in-out infinite' }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 pl-11 border-2 rounded-xl focus:outline-none transition-all duration-300 text-white text-sm"
                        style={{
                          borderColor: focusedField === 'email' ? (isLogin ? '#8bc53f' : '#ffc93b') : '#374151',
                          backgroundColor: focusedField === 'email' ? '#1f2937' : '#111827',
                          transform: focusedField === 'email' ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: focusedField === 'email'
                            ? isLogin
                              ? '0 8px 16px rgba(139, 197, 63, 0.25)'
                              : '0 8px 16px rgba(255, 201, 59, 0.25)'
                            : 'none'
                        }}
                        placeholder="your@email.com"
                        required
                      />
                      <div
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-300"
                        style={{
                          color: focusedField === 'email' ? (isLogin ? '#8bc53f' : '#ffc93b') : '#9ca3af',
                          transform: focusedField === 'email' ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {formData.email && (
                        <div
                          className="absolute right-3.5 top-1/2 -translate-y-1/2"
                          style={{
                            color: isLogin ? '#8bc53f' : '#ffc93b',
                            animation: 'float 2s ease-in-out infinite'
                          }}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Password
                    </label>

                    <div className="relative">

                      {/* Input */}
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 pl-11 pr-11 border-2 rounded-xl focus:outline-none transition-all duration-300 text-white text-sm"
                        style={{
                          borderColor: focusedField === 'password' ? '#8bc53f' : '#374151',
                          backgroundColor: focusedField === 'password' ? '#1f2937' : '#111827',
                          transform: focusedField === 'password' ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: focusedField === 'password'
                            ? '0 8px 16px rgba(139, 197, 63, 0.25)'
                            : 'none'
                        }}
                        placeholder="Enter your password"
                        minLength={6}
                        required
                      />

                      {/* Lock Icon (Left) */}
                      <div
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-300"
                        style={{
                          color: focusedField === 'password' ? '#8bc53f' : '#9ca3af',
                          transform: focusedField === 'password' ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>

                      {/* Eye Button (Right - Perfect Center) */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-[#8bc53f] transition"
                      >
                        {showPassword ? (
                          // Eye Off
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3l18 18"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5c5 0 9 4 10 7-1 3-5 7-10 7S3 15 2 12c1-3 5-7 10-7z"
                            />
                          </svg>
                        ) : (
                          // Eye
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>

                    </div>

                    {/* Password strength */}
                    {formData.password && !isLogin && (
                      <div className="mt-3">
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-1.5 flex-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor:
                                  formData.password.length >= i * 2
                                    ? formData.password.length >= 8
                                      ? '#8bc53f'
                                      : '#ffc93b'
                                    : '#374151'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Remember me / Forgot password */}
                  {isLogin && (
                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 cursor-pointer rounded"
                          style={{ accentColor: '#8bc53f' }}
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ color: '#8bc53f' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ffc93b'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#8bc53f'}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 mt-5 relative overflow-hidden group"
                    style={{
                      backgroundColor: isLogin ? '#8bc53f' : '#ffc93b',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = isLogin
                        ? '0 12px 24px rgba(139, 197, 63, 0.3)'
                        : '0 12px 24px rgba(255, 201, 59, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 relative z-10 text-sm">
                      {isLogin ? 'Sign In Now' : 'Create Account'}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>

                    {/* Animated background on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite'
                      }}
                    />
                  </button>

                  {/* Divider */}
                  <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-gray-900 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  {/* Social login buttons */}

                  <div className="w-full">
                    <button
                      type="button"
                      onClick={googleLogin}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border-2 rounded-xl transition-all duration-300 group relative overflow-hidden"
                      style={{ backgroundColor: "#111827", borderColor: "#374151" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#8bc53f";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(139, 197, 63, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#374151";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Google Icon */}
                      <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>

                      {/* Text */}
                      <span className="text-xs font-medium text-white relative z-10">
                        Continue with Google
                      </span>
                    </button>
                  </div>

                </form>

                {/* Footer text */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={toggleAuthMode}
                      className="font-semibold transition-all duration-300"
                      style={{ color: isLogin ? '#8bc53f' : '#ffc93b' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isLogin ? '#ffc93b' : '#8bc53f';
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isLogin ? '#8bc53f' : '#ffc93b';
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                    >
                      {isLogin ? 'Sign up now' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}