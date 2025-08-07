import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Row,
  Col
} from "react-bootstrap";

export default function ProfilePage() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!user || !user.uid) return;

      try {
        const resultsRef = collection(db, "users", user.uid, "results");
        const q = query(resultsRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setResults(fetched);
      } catch (err) {
        console.error("Error al cargar resultados:", err);
        setError("Hubo un problema al cargar tus resultados.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Perfil de {user?.displayName || "Usuario"}</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando resultados...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {results.length === 0 && !loading && (
        <Alert variant="info" className="text-center">
          Aún no has contestado ningún quiz.
        </Alert>
      )}

      <Row>
        {results.map(result => (
          <Col key={result.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{result.tema} / Quiz ID: {result.quizId}</Card.Title>
                <Card.Text>
                  Aciertos: {result.correctCount} de {result.total}
                  <br />
                  Puntaje: <strong>{result.score.toFixed(2)}%</strong>
                  <br />
                  Fecha:{" "}
                  {result.timestamp?.toDate
                    ? result.timestamp.toDate().toLocaleString()
                    : new Date(result.timestamp).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
