import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const testimonials = [
    {
      content: "StudyMood transformed my productivity. The adaptive sessions and biometric integration make focusing effortless!",
      avatar: "👨‍💻",
      name: "Alex Chen",
      role: "Software Engineer"
    },
    {
      content: "Finally a focus app that feels motivating! The forest growth feature keeps me engaged and disciplined.",
      avatar: "🌱",
      name: "Maria Lopez",
      role: "Designer"
    },
    {
      content: "The progress analytics gave me clear insights into how I study. My grades improved significantly.",
      avatar: "📈",
      name: "Rahul Sharma",
      role: "Student"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://studymood-7ynk.onrender.com/api/auth/register", formData);

      document.querySelector(".register-card").classList.add("success-animation");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      document.querySelector(".register-card").classList.add("error-shake");
      setTimeout(() => {
        document.querySelector(".register-card").classList.remove("error-shake");
      }, 500);
      alert(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        <div className="register-card">
          {/* Header */}
          <div className="auth-header">
            <div className="logo-section">
              {/* Logo Image */}
              <img
                src="/sounds/fav-icon.png" // 👈 Corrected path here
                alt="StudyMood Logo"
                className="logo-icon-img"
              />
              <h1 className="app-title">StudyMood</h1>
              <p className="app-subtitle">Transform your focus, elevate your mind</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="form-title">Create Your Account</h2>
            <p className="form-subtitle">Join thousands of focused learners</p>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Navigation */}
          <div className="auth-navigation">
            <p className="nav-text">Already have an account?</p>
            <Link to="/login" className="nav-link">
              Sign In →
            </Link>
          </div>

          {/* Features Preview */}
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Adaptive Focus Sessions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌳</span>
              <span className="feature-text">Virtual Forest Growth</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Progress Analytics</span>
            </div>
          </div>
        </div>

        {/* Side Panel with Carousel */}
        <div className="side-panels">
          <div className="testimonial-section">
            <h3 className="testimonial-title">Join the Focus Revolution</h3>

            <div className="testimonial fade">
              <div className="testimonial-content">
                "{testimonials[currentIndex].content}"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[currentIndex].avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonials[currentIndex].name}</div>
                  <div className="author-role">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Sessions Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Focus Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}