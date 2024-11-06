import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Characters from "./pages/Characters";
import CharacterForm from "./pages/CharacterForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Characters" element={<Characters />} />
        <Route path="/Characters/:id" element={<CharacterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/character-creator" element={<CharacterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
