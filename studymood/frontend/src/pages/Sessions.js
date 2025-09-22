import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../components/Timer";
import "./Sessions.css";

// Biometric Mood Detection Component
const BiometricMoodDetection = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [stressLevel, setStressLevel] = useState('low');

  useEffect(() => {
    const simulateBiometrics = () => {
      const hr = Math.floor(Math.random() * 30) + 60; // 60-90 BPM
      setHeartRate(hr);

      if (hr > 80) setStressLevel('high');
      else if (hr > 70) setStressLevel('medium');
      else setStressLevel('low');
    };

    const interval = setInterval(simulateBiometrics, 5000);
    simulateBiometrics(); // Initial call
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="biometric-panel">
      <h3>🫀 Real-time Mood Detection</h3>
      <div className="metrics">
        <div className="metric">
          <span>Heart Rate: {heartRate || '--'} BPM</span>
          <div className={`stress-indicator ${stressLevel}`}>
            Stress: {stressLevel}
          </div>
        </div>
      </div>
    </div>
  );
};

// Virtual Forest Component
const VirtualForest = ({ sessions }) => {
  const [trees, setTrees] = useState([]);
  const [forestLevel, setForestLevel] = useState(1);

  useEffect(() => {
    const newTrees = sessions.slice(0, 15).map((session, idx) => ({
      id: idx,
      type: session.duration > 60 ? 'oak' : session.duration > 30 ? 'pine' : 'sapling',
      health: Math.min(session.focusScore * 10, 100),
      position: {
        x: 50 + (idx % 5) * 60,
        y: 50 + Math.floor(idx / 5) * 40
      }
    }));
    setTrees(newTrees);
    setForestLevel(Math.floor(sessions.length / 10) + 1);
  }, [sessions]);

  return (
    <div className="virtual-forest">
      <h3>🌳 Your Focus Forest (Level {forestLevel})</h3>
      <div className="forest-container">
        <svg width="100%" height="200" className="forest-svg">
          {trees.map(tree => (
            <g key={tree.id}>
              <circle
                cx={tree.position.x}
                cy={tree.position.y}
                r={tree.type === 'oak' ? 15 : tree.type === 'pine' ? 12 : 6}
                fill={`hsl(120, ${tree.health}%, 40%)`}
                className="tree-crown"
              />
              <rect
                x={tree.position.x - 2}
                y={tree.position.y}
                width="4"
                height={tree.type === 'oak' ? 20 : tree.type === 'pine' ? 15 : 10}
                fill="#8B4513"
                className="tree-trunk"
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="forest-stats">
        <span>🌲 Trees: {trees.length}</span>
        <span>🏆 Level: {forestLevel}</span>
        <span>💚 Health: {Math.round(trees.reduce((acc, t) => acc + t.health, 0) / trees.length || 0)}%</span>
      </div>
    </div>
  );
};

// Focus Challenges Component
const FocusChallenges = ({ sessions }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const weeklySessionCount = sessions.filter(s =>
      new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    const longestSession = Math.max(...sessions.map(s => s.duration), 0);
    const consecutiveDays = calculateConsecutiveDays(sessions);

    setChallenges([
      {
        id: 1,
        title: "Week Warrior",
        description: "Complete 7 sessions this week",
        progress: weeklySessionCount,
        target: 7,
        reward: "🏅 Gold Badge"
      },
      {
        id: 2,
        title: "Deep Diver",
        description: "Complete a 2-hour session",
        progress: longestSession >= 120 ? 1 : 0,
        target: 1,
        reward: "🏊‍♂️ Deep Focus Badge"
      },
      {
        id: 3,
        title: "Consistency King",
        description: "Study 5 days in a row",
        progress: consecutiveDays,
        target: 5,
        reward: "👑 Consistency Crown"
      }
    ]);
  }, [sessions]);

  const calculateConsecutiveDays = (sessions) => {
    // Simple implementation - in real app, this would be more sophisticated
    return Math.min(sessions.length, 5);
  };

  return (
    <div className="challenges-section">
      <h3>🎯 Focus Challenges</h3>
      <div className="challenges-grid">
        {challenges.map(challenge => (
          <div key={challenge.id} className="challenge-card">
            <h4>{challenge.title}</h4>
            <p>{challenge.description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="challenge-footer">
              <span>{challenge.progress}/{challenge.target}</span>
              <span className="reward">{challenge.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Ambient Sounds Component
const AmbientSounds = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [audio, setAudio] = useState(null);

  const soundscapes = [
    { id: 'rain', name: '🌧️ Rain', description: 'Gentle rainfall', file: '/sounds/calming-rain-257596.mp3' },
    { id: 'forest', name: '🌲 Forest', description: 'Birds & rustling leaves', file: '/sounds/forest-sounds-nature-233882.mp3' },
    { id: 'ocean', name: '🌊 Ocean Waves', description: 'Calming ocean sounds', file: '/sounds/ocean-waves-sound-01-321570.mp3' },
    { id: 'music', name: '🎶 Calm Music', description: 'Relaxing background music', file: '/sounds/calm-music-64526.mp3' },
    { id: 'ukulele', name: '🎸 Ukulele Loop', description: 'Whistling ukulele melody', file: '/sounds/calypso-ukulele-loop-3-whistle-melody-louder-334694.mp3' },
  ];

  const playSound = (sound) => {
    if (currentSound === sound.id) {
      // Stop if clicked again
      if (audio) audio.pause();
      setCurrentSound(null);
      return;
    }

    // Stop existing sound
    if (audio) {
      audio.pause();
    }

    // Create and play new sound
    const newAudio = new Audio(sound.file);
    newAudio.loop = true; // background loop
    newAudio.play();

    setAudio(newAudio);
    setCurrentSound(sound.id);
  };

  return (
    <div className="ambient-sounds">
      <h3>🎧 Focus Soundscapes</h3>
      <div className="sounds-grid">
        {soundscapes.map(sound => (
          <button
            key={sound.id}
            onClick={() => playSound(sound)}
            className={`sound-card ${currentSound === sound.id ? 'active' : ''}`}
          >
            <span className="sound-emoji">{sound.name.split(' ')[0]}</span>
            <div className="sound-info">
              <h4>{sound.name}</h4>
              <p>{sound.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


// Main Sessions Component
export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [focusScore, setFocusScore] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [duration, setDuration] = useState(25);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('session');

  const token = localStorage.getItem("token");

  // Fetch session history on mount
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5001/api/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [token]);

  // Adaptive duration logic based on focusScore
  const getAdaptiveDuration = (score) => {
    if (score >= 10) return 120;
    if (score >= 7) return 90;
    if (score >= 5) return 60;
    if (score >= 3) return 30;
    return 15;
  };

  // Get session type description
  const getSessionDescription = (score) => {
    if (score >= 10) return "Deep Focus Marathon";
    if (score >= 7) return "Extended Focus Session";
    if (score >= 5) return "Standard Focus Session";
    if (score >= 3) return "Quick Focus Boost";
    return "Micro Focus Session";
  };

  // Start session with adaptive timer
  const startSession = () => {
    const score = Number(focusScore);
    if (isNaN(score) || score < 0 || score > 10) {
      alert("Enter a valid score between 0 and 10");
      return;
    }
    const adaptiveDuration = getAdaptiveDuration(score);
    setDuration(adaptiveDuration);
    setShowTimer(true);
    setActiveTab('timer');
  };

  // When timer completes, save session automatically
  const handleSessionComplete = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5001/api/sessions",
        {
          focusScore: Number(focusScore),
          duration: duration,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessions([res.data, ...sessions]);
      setFocusScore("");
      setShowTimer(false);
      setActiveTab('session');
      // Success notification could be added here
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save session");
    } finally {
      setLoading(false);
    }
  };

  // Handle timer cancel/stop
  const handleTimerCancel = () => {
    setShowTimer(false);
    setFocusScore("");
    setActiveTab('session');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sessions-container">
      {/* Header */}
      <header className="sessions-header">
        <div className="header-content">
          <div className="logo-title-wrapper">
            <img
              src="/sounds/fav-icon.png"
              alt="StudyMood Logo"
              className="logo-icon-img"
            />
            <h1 className="main-title">StudyMood Focus Sessions</h1>
          </div>
          <p className="subtitle">Adaptive focus training based on your current mental state</p>
          <button onClick={handleLogout} className="logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z"/>
            </svg>
            Logout
          </button>
        </div>
      </header>


      <div className="main-content">
        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button
            className={`tab ${activeTab === 'session' ? 'active' : ''}`}
            onClick={() => setActiveTab('session')}
          >
            🎯 Focus Session
          </button>
          <button
            className={`tab ${activeTab === 'forest' ? 'active' : ''}`}
            onClick={() => setActiveTab('forest')}
          >
            🌳 My Forest
          </button>
          <button
            className={`tab ${activeTab === 'sounds' ? 'active' : ''}`}
            onClick={() => setActiveTab('sounds')}
          >
            🎧 Sounds
          </button>
          <button
            className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            🏆 Challenges
          </button>
        </div>

        {/* Biometric Panel - Always visible */}
        <BiometricMoodDetection />

        {/* Tab Content */}
        {activeTab === 'session' && (
          <>
            {/* Session Starter */}
            {!showTimer && (
              <div className="session-starter-card">
                <div className="card-header">
                  <h2>Start New Session</h2>
                  <p>Rate your current focus level to get a personalized session</p>
                </div>

                <div className="focus-input-section">
                  <label className="focus-label">Current Focus Level</label>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="0"
                      value={focusScore}
                      onChange={(e) => setFocusScore(e.target.value)}
                      className="focus-input"
                      min="0"
                      max="10"
                    />
                    <span className="input-suffix">/ 10</span>
                  </div>

                  {focusScore && (
                    <div className="session-preview">
                      <div className="preview-card">
                        <h3>{getSessionDescription(Number(focusScore))}</h3>
                        <div className="preview-details">
                          <div className="detail-item">
                            <span className="label">Duration:</span>
                            <span className="value">{getAdaptiveDuration(Number(focusScore))} minutes</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">Type:</span>
                            <span className="value">{Number(focusScore) > 6 ? 'Deep Focus' : 'Micro Session'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={startSession}
                    className="start-session-btn"
                    disabled={!focusScore || loading}
                  >
                    {loading ? 'Starting...' : 'Begin Focus Session'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Session History */}
            <div className="history-section">
              <div className="section-header">
                <h2>Session History</h2>
                {sessions.length > 0 && (
                  <span className="session-count">{sessions.length} sessions completed</span>
                )}
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading sessions...</p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎯</div>
                  <h3>No sessions yet</h3>
                  <p>Start your first focus session to begin tracking your progress!</p>
                </div>
              ) : (
                <div className="sessions-grid">
                  {sessions.map((session, index) => (
                    <div key={session._id} className="session-card">
                      <div className="session-header">
                        <span className="session-number">#{sessions.length - index}</span>
                        <span className={`session-type ${session.sessionType}`}>
                          {session.sessionType}
                        </span>
                      </div>
                      <div className="session-stats">
                        <div className="stat-item">
                          <span className="stat-label">Duration</span>
                          <span className="stat-value">{session.duration} min</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Focus Score</span>
                          <span className="stat-value">{session.focusScore} / 10</span>
                        </div>
                      </div>
                      <div className="session-date">
                        {new Date(session.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Timer Section */}
        {(activeTab === 'timer' || showTimer) && showTimer && (
          <div className="timer-section">
            <Timer
              minutes={duration}
              onComplete={handleSessionComplete}
              onCancel={handleTimerCancel}
            />
          </div>
        )}

        {/* Forest Tab */}
        {activeTab === 'forest' && <VirtualForest sessions={sessions} />}

        {/* Sounds Tab */}
        {activeTab === 'sounds' && <AmbientSounds />}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && <FocusChallenges sessions={sessions} />}
      </div>
    </div>
  );
}