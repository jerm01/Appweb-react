import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar fixed-bottom navbar-light bg-white border-top d-lg-none shadow-sm">
      <div className="container d-flex justify-content-around">
        <Link className={`nav-link ${pathname === "/" ? "text-primary" : ""}`} to="/">
          <i className="bi bi-house-door-fill"></i><br />Inicio
        </Link>
        <Link className={`nav-link ${pathname === "/quizzes" ? "text-primary" : ""}`} to="/quizzes">
          <i className="bi bi-list-check"></i><br />Quizzes
        </Link>
        <Link className={`nav-link ${pathname === "/contact" ? "text-primary" : ""}`} to="/contact">
          <i className="bi bi-envelope-fill"></i><br />Contacto
        </Link>
        <Link className={`nav-link ${pathname === "/about" ? "text-primary" : ""}`} to="/about">
          <i className="bi bi-info-circle-fill"></i><br />Nosotros
        </Link>
      </div>
    </nav>
  );
}
