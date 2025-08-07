import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SobreODS from "./pages/SobreODS";
import Contacto from "./pages/Contacto";
import Quizzes from "./pages/Quizzes";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import BottomNavbar from "./components/BottomNavbar";
import Sobre from "./pages/SobreODS";
import SelectTema from "./pages/SelectTema";
import QuizzesByTema from "./pages/QuizzesByTema";
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ods" element={<SobreODS />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quizzes" element={<SelectTema />} />
            <Route path="/quizzes/:tema" element={<QuizzesByTema />} />
            <Route path="/quiz/:tema/:quizId" element={<QuizPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Routes>
        </main>

        <Footer />
      </div>

    </Router>
    
  );
}

export default App;
