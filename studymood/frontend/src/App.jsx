import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sessions from "./pages/Sessions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="*" element={<Register />} /> {/* default route */}
      </Routes>
    </Router>
  );
}

export default App;
