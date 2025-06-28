import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SobreODS from "./pages/SobreODS";
import Contacto from "./pages/Contacto";
import Quizzes from "./pages/Quizzes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BottomNavbar from "./components/BottomNavbar";
import Sobre from "./pages/SobreODS";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/ods" element={<SobreODS />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
        <BottomNavbar />
    </Router>
    
  );
}

export default App;
