import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const tema = "educacion"; // Este puede cambiar según el tema seleccionado

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesRef = collection(db, `temas/${tema}/quizzes`);
        const snapshot = await getDocs(quizzesRef);
        const filtered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((quiz) => quiz.isPublic);

        setQuizzes(filtered);
      } catch (error) {
        console.error("Error al obtener quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Quizzes disponibles</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando quizzes...</p>
        </div>
      ) : quizzes.length === 0 ? (
        <p>No hay quizzes disponibles por ahora.</p>
      ) : (
        <Row>
          {quizzes.map((quiz) => (
            <Col md={6} lg={4} key={quiz.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{quiz.title}</Card.Title>
                  <Card.Text>{quiz.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Aquí puedes navegar a la página de preguntas
                      window.location.href = `/quizzes/${tema}/${quiz.id}`;
                    }}
                  >
                    Comenzar Quiz
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Quizzes;
