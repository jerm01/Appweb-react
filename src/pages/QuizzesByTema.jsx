import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function QuizzesByTema() {
  const { tema } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log("📥 Obteniendo quizzes para el tema:", tema);
        const quizzesRef = collection(db, "temas", tema, "quizzes");
        const snapshot = await getDocs(quizzesRef);
        
        if (snapshot.empty) {
          setError("No hay quizzes disponibles para este tema.");
          setQuizzes([]);
        } else {
          const quizList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setQuizzes(quizList);
        }
      } catch (error) {
        console.error("❌ Error al obtener quizzes:", error);
        setError("Hubo un problema al cargar los quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [tema]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Quizzes del tema: <strong>{tema}</strong></h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p className="mt-2">Cargando quizzes...</p>
        </div>
      )}

      {error && (
        <Alert variant="warning" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {quizzes.map(quiz => (
          <Col key={quiz.id} sm={6} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        localStorage.setItem('temaSeleccionado', tema);
                        window.location.href = `/quiz/${quiz.id}`;
                    }}
                    >
                    Contestar
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
