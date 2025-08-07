import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ODSQuiz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
            <Nav.Link as={Link} to="/sobre">Sobre los ODS</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link href="/perfil">Perfil</Nav.Link>
                <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
                <Navbar.Text className="ms-3">Bienvenido, {user.displayName || user.email}</Navbar.Text>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link href="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
