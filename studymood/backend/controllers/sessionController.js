import Session from "../models/Session.js"; // ✅ make sure .js is included

// Create new session
export const createSession = async (req, res) => {
  try {
    const { focusScore, duration } = req.body; // ⬅️ user can also pass duration

    // Adaptive logic
    let sessionType = focusScore > 6 ? "deep" : "micro";

    // If user provides duration, validate it (1–120 min)
    let finalDuration;
    if (duration) {
      if (duration < 1 || duration > 120) {
        return res.status(400).json({ message: "Duration must be between 1 and 120 minutes" });
      }
      finalDuration = duration;
    } else {
      // fallback to default adaptive logic
      finalDuration = sessionType === "deep" ? 30 : 10;
    }

    const session = new Session({
      user: req.user.id,
      focusScore,
      sessionType,
      duration: finalDuration
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Error creating session", error: err.message });
  }
};

// Get all sessions for logged-in user
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sessions", error: err.message });
  }
};
