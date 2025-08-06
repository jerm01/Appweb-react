import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";

const temas = [
  { id: "educacion", nombre: "Educación de calidad" },
  { id: "salud", nombre: "Salud y bienestar" },
  { id: "medioambiente", nombre: "Medio Ambiente" },
];

export default function SelectTema() {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2>Selecciona un tema</h2>
      <Row>
        {temas.map((tema) => (
          <Col md={4} key={tema.id} className="mb-4">
            <Card
              className="h-100"
              onClick={() => navigate(`/quizzes/${tema.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{tema.nombre}</Card.Title>
                <Card.Text>Explora los quizzes de este tema.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
