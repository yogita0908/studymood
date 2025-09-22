import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      
      // Success animation
      document.querySelector('.login-card').classList.add('success-animation');
      
      setTimeout(() => {
        navigate("/sessions");
      }, 1500);
      
    } catch (err) {
      console.error(err.response?.data || err.message);
      
      // Error shake animation
      document.querySelector('.login-card').classList.add('error-shake');
      setTimeout(() => {
        document.querySelector('.login-card').classList.remove('error-shake');
      }, 500);
      
      alert(err.response?.data?.message || "Login failed!");
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
        <div className="login-card">
          {/* Header */}
          <div className="auth-header">
            <div className="logo-section">
              <img
                src="/sounds/fav-icon.png" // 👈 Corrected path here
                alt="StudyMood Logo"
                className="logo-icon-img"
              />
              <h1 className="app-title">StudyMood</h1>
              <p className="app-subtitle">Welcome back to your focus journey</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="form-title">Sign In</h2>
            <p className="form-subtitle">Continue your focus training</p>

            <div className="form-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {showPassword ? (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    ) : (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    )}
                    <circle cx="12" cy="12" r="3" />
                    {showPassword && <path d="M1 1l22 22" />}
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Navigation */}
          <div className="auth-navigation">
            <p className="nav-text">Don't have an account?</p>
            <Link to="/register" className="nav-link">
              Create Account
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Quick Demo */}
          <div className="demo-section">
            <button className="demo-btn" onClick={() => {
              setFormData({ email: "demo@studymood.com", password: "demo123" });
            }}>
              <span className="demo-icon">⚡</span>
              Try Demo Account
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="welcome-section">
            <h3 className="welcome-title">Focus. Grow. Achieve.</h3>
            <div className="welcome-content">
              <div className="feature-highlight">
                <div className="feature-icon-large">🎯</div>
                <h4>Adaptive Focus Sessions</h4>
                <p>AI-powered sessions that adapt to your mental state and energy levels</p>
              </div>
              
              <div className="feature-highlight">
                <div className="feature-icon-large">🌱</div>
                <h4>Growth Visualization</h4>
                <p>Watch your virtual forest grow as you complete focus sessions</p>
              </div>
              
              <div className="feature-highlight">
                <div className="feature-icon-large">📊</div>
                <h4>Smart Analytics</h4>
                <p>Get insights into your focus patterns and productivity trends</p>
              </div>
            </div>

            <div className="achievements-preview">
              <h4>Your Journey Awaits</h4>
              <div className="achievement-badges">
                <div className="badge">🏅 First Focus</div>
                <div className="badge">🌟 Week Warrior</div>
                <div className="badge">🔥 Streak Master</div>
                <div className="badge">🌳 Forest Guardian</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}